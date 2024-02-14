import type { Metadata } from "next";
import { Lobster } from "next/font/google";
import "./ui/globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import { FaCompass } from "react-icons/fa6";
import SideNav from "./ui/sidenav";
const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Invoice App made by Hisam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={lobster.className}>
        <Providers>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full md:w-64">
              <SideNav />
            </div>
            <div className="flex-grow p-4 md:overflow-y-auto">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
