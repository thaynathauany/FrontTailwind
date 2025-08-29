import "../styles/globals.css";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import LocaleBridge from "@/components/i18n/LocaleBridge";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Backoffice",
  description: "Dinero Latam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="font-sans">
        <NextIntlClientProvider>
          <LocaleBridge>{children}</LocaleBridge>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}