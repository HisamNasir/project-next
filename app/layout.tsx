import type { Metadata } from "next";
import { Lobster } from "next/font/google";
import "./ui/globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import { FaCompass } from "react-icons/fa6";
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
          <div className="h-screen">
            <div className=" h-screen mx-auto tracking-widest">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
