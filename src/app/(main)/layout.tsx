import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header is rendered for every page under (main) so the Puntos Fit
          balance is always visible while the user navigates. */}
      <Header />
      {children}
      <div>
        <Footer />
      </div>
    </div>
  );
}
