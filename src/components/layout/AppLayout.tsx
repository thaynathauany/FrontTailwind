"use client";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div>
        {pathname !== "/login" && <Header />}
        <main>{children}</main>
        {pathname !== "/login" && <Footer />}
      </div>
    </>
  );
}
