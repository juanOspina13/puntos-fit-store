import Footer from "@/components/layout/Footer";
import AutoLoginHandler from "@/components/auth/AutoLoginHandler";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Auto-login global: si llega `?tk=` o `?userToken=` en cualquier
          página, se inicia sesión y se persiste en cookie + localStorage. */}
      <AutoLoginHandler />
      {children}
      <div>
        <Footer />
      </div>
    </div>
  );
}
