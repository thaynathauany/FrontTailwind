import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

import { getTranslations } from "next-intl/server";
import ShrinkOnScrollClient from "./ShrinkOnScrollClient";
import NavLinksClient from "./NavLinksClient";
import UserMenuClient from "./UserMenuClient";
import MobileMenuClient from "./MobileMenuClient";

export default async function Header() {
  const t = await getTranslations("Header");

  const nav = [
    { label: t("home"), href: "/" },
    { label: t("comoFunciona"), href: "/como-funciona" },
    { label: t("contato"), href: "/contato" },
    { label: t("sobre"), href: "/sobre" },
  ];

  const labels = {
    signIn: t("btn_signIn"),
    signUp: t("btn_signUp"),
    profile: t("profile"),
    newTransfer: t("newTransfer"),
    personalData: t("personalData"),
    history: t("history"),
    signOut: t("signOut"),
  };

  return (
    <header
      id="site-header"
      className="fixed inset-x-0 top-0 z-50 w-full bg-white transition-all duration-300 h-[110px]"
    >
      <ShrinkOnScrollClient targetId="site-header" tallClass="h-[110px]" shortClass="h-[90px]" />

      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center gap-x-6">
          <Link href="/" aria-label="Dinero Latam - Home" className="block">
            <Image
              src="/images/logos/logodinero.jpg"
              alt="Dinero Latam"
              width={52}
              height={72}
              priority
            />
          </Link>

          <nav className="hidden lg:flex gap-x-8 text-sm font-semibold text-primary">
            <NavLinksClient items={nav} />
          </nav>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="hidden lg:flex gap-x-2">
            <Link
              href="/sign-in"
              className="flex items-center justify-center font-normal h-[36px] px-3 rounded-[120px] border border-secondary text-secondary"
            >
              {labels.signIn}
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center justify-center font-normal h-[36px] px-3 rounded-[120px] border border-secondary bg-secondary text-white"
            >
              {labels.signUp}
            </Link>
          </div>

          <LanguageSwitcher />

          <UserMenuClient labels={labels} />

          <MobileMenuClient navItems={nav} labels={labels} />
        </div>
      </div>
    </header>
  );
}