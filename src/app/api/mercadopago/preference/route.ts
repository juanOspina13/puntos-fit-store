import { NextResponse } from "next/server";

interface PreferenceItem {
  title: string;
  description?: string;
  unit_price: number;
  quantity: number;
  currency_id?: string;
}

interface PreferenceRequest {
  items: PreferenceItem[];
  external_reference: string;
  payer_email?: string;
}

export async function POST(request: Request) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "MercadoPago not configured" },
      { status: 500 }
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://puntosfitstore.gymconnect.com.co";

  let body: PreferenceRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { items, external_reference, payer_email } = body;

  if (!items?.length || !external_reference) {
    return NextResponse.json(
      { error: "items and external_reference are required" },
      { status: 400 }
    );
  }

  const payload: Record<string, unknown> = {
    items: items.map((item) => ({
      ...item,
      currency_id: item.currency_id ?? "COP",
    })),
    external_reference,
    back_urls: {
      success: `https://utils.gymconnect.com.co`,
      failure: `https://utils.gymconnect.com.co`,
      pending: `https://utils.gymconnect.com.co`,
    },
    auto_return: "approved",
    notification_url:
      "https://api.gymconnect.com.co/training-connect-services/web/app_dev.php/api/transaccions/confirmacion_mercadopagos",
  };

  if (payer_email) {
    payload.payer = { email: payer_email };
  }
  console.log(payload)
  try {
    const mpResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      return NextResponse.json(
        { error: "MercadoPago error", details: data },
        { status: mpResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      preference_id: data.id,
      init_point: data.init_point,       // production checkout URL
      sandbox_init_point: data.sandbox_init_point,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create preference", message },
      { status: 500 }
    );
  }
}
