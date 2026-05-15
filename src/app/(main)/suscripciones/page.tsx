import Header from "@/components/layout/Header";
import { getServerUser } from "@/lib/server-auth";
import SuscripcionesPage from "./SuscripcionesClient";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  let token: string | undefined;
  if (searchParams) {
    const sp = await searchParams;
    const tkParam = sp.tk;
    token = typeof tkParam === "string" ? tkParam : undefined;
  }
  const userData = await getServerUser(token);

  return (
    <>
      <Header userData={userData} />
      <SuscripcionesPage />
    </>
  );
}
