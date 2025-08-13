"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = useTranslations("Header");

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("comoFunciona"), href: "/como-funciona" },
    { name: t("contato"), href: "/contato" },
    { name: t("sobre"), href: "/sobre" },
  ];

  const profileItems = [
    { label: t("profile"), href: "/my-panel", img: "/images/icones/minha-area.png" },
    { label: t("send_money"), href: "/my-panel?tab=1", img: "/images/icones/transferencia.png" },
    { label: t("signOut"), href: "#", img: "/images/icones/sair.png" },
  ];
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 w-full bg-white transition-all duration-300 ${isScrolled ? "h-[90px]" : "h-[110px]"}`}>
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
          {/* Logo + nav */}
          <div className="flex items-center gap-x-6">
            <Link href="/">
              <img
                src="/images/logos/logodinero.jpg"
                alt="Logotipo da Dinero"
                className="w-[52px] h-[72px]"
              />
            </Link>

            {/* Desktop nav (apenas >= lg) */}
            <nav className="hidden lg:flex gap-x-8 text-sm font-semibold text-gray-700">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-base font-medium ${pathname === item.href ? "text-secondary" : "text-black"} hover:text-secondary`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Área da direita (botões + menu mobile + usuário) */}
          <div className="flex items-center gap-x-4">
            {/* Botões Entrar/Cadastrar - visíveis só no desktop (>= lg) */}
            <div className="hidden lg:flex gap-x-2">
              <Link
                href="/sign-up"
                className="flex items-center justify-center font-normal w-auto h-[36px] px-3 rounded-[120px] border border-secondary text-secondary"
              >
                {t("btn_signIn")}
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center justify-center font-normal w-auto h-[36px] px-3 rounded-[120px] border border-secondary bg-secondary text-white"
              >
                {t("btn_signUp")}
              </Link>
            </div>

            <LanguageSwitcher />

            {/* Menu do usuário - apenas desktop (>= lg) */}
            <Menu as="div" className="relative hidden lg:block">
              <MenuButton className="-m-1.5 flex items-center p-1.5 gap-2">
                <p className="text-small text-black">Renato</p>
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ background: "#B3B3B3", border: "3px solid #E0E0E0" }}
                >
                  <p className="text-white text-sm font-medium">R</p>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none border border-[#CBCBCB]">
                <ul className="flex flex-col gap-2">
                  {profileItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className={`flex flex-row-reverse items-center justify-between gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded ${item.label === t("signOut") ? "text-orange" : "text-black"
                          }`}
                      >
                        <img src={item.img} alt={item.label} className="w-5 h-5" />
                        <span className="text-right w-full">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </MenuItems>
            </Menu>

            {/* Botão de menu mobile/tablet (visível < lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-3"
            >
              <span className="sr-only">Abrir menu</span>
              <Bars3Icon aria-hidden="true" className="size-5 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet menu (ativo < lg) */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-5 pb-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="max-w-[375px] mx-auto w-full">
              {/* Topo mobile: logo e botão de fechar */}
              <div className="flex h-16 items-center justify-between mt-4">
                <img
                  src="/images/logos/logodinero.jpg"
                  alt="Dinero logo"
                  className="w-[58px] h-[72px]"
                />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 text-gray-700"
                >
                  <span className="sr-only">Fechar menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Itens do menu */}
              <div className="mt-4 flex flex-col items-end space-y-4 text-right">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-base font-medium ${pathname === item.href ? "text-secondary" : "text-black"} hover:text-secondary`}
                  >
                    {item.name}
                  </a>
                ))}

                {/* Botões no mobile/tablet */}
                <div className="flex w-full mt-4 gap-2">
                  <Link
                    href="/login"
                    className="w-1/2 h-[48px] rounded-[120px] border border-secondary text-secondary font-normal flex items-center justify-center"
                  >
                    {t("btn_signIn")}
                  </Link>

                  <Link
                    href="/sign-up"
                    className="w-1/2 h-[48px] rounded-[120px] border border-secondary bg-secondary text-white font-normal flex items-center justify-center"
                  >
                    {t("btn_signUp")}
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}