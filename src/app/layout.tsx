import React from "react";
import type { Metadata } from "next";
import cl from "classnames";
import { Inter } from "next/font/google";
import "./globals.css";
import Crisp from "@/components/crisp";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://getlapseapp.com"),
  title: {
    default: "Lapse – Save instant time-lapse screen recording ✨",
    template: "%s | Lapse",
  },
  description: "A simple app to record screen in time-lapse on Mac and windows",
  openGraph: {
    title: "Lapse",
    description:
      "A simple app to record screen in time-lapse on Mac and windows",
    url: "https://getlapseapp.com",
    siteName: "Lapse",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Lapse – Save instant time-lapse screen recording ✨",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cl(inter.className, "bg-[#000B02] text-neutral-200")}>
        <Header />
        <main className="container mx-auto">{children}</main>
        <Crisp />
        <Analytics />
      </body>
    </html>
  );
}
