import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MainContainer } from "@/components/MainContainer";
import { ToastifyContainer } from "@/components/ToastifyContainer";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <MainContainer>
        <main className="flex-1">{children}</main>
      </MainContainer>
      <Footer />

      <ToastifyContainer />
    </div>
  );
}
