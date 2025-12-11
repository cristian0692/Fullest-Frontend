import type { ReactNode } from "react";
import Header from "@/Designs/Main/Header.tsx";
import Footer from "@/Designs/Main/Footer.tsx";
import Hero from "@/Designs/Hero/Hero.tsx";

type Props = {
  showHero?: boolean;
  children: ReactNode;
};

const Layout = ({ showHero = false, children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-helvetica font-bold overflow-hidden max-w-[100vw] ">
      <Header />
      {showHero && <Hero />}
      <div className="flex-1 py-10 md:px-7 px-2">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
