import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "~/components/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#616161",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title:
    "vidpress",
  description:
    "A video compression tool ",
  keywords: [
    "Free Video Compressor",
    "Online Video Converter",
    "Video Compression Tool",
    "Image Compression Tool",
    "Compress Video Online",
    "Convert Video Online",
    "High-Quality Video Compression",
    "Shrink Video File Size",
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "Vidpress, High-Quality Online Tool",
    description:
      "A Video Compression tool ",
    url: process.env.NEXT_PUBLIC_URL,
    type: "website",
    images: "/og-image.jpg",
    siteName: "Video Compression Hub",
  },
  twitter: {
    card: "summary_large_image",
    site: "@achuth_hadnoor",
    creator: "@achuth_hadnoor",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#616161" />
        <meta name="msapplication-TileColor" content="#616161" />
        <meta name="theme-color" content="#616161" />
      </head>
      <body
        className={`h-full w-full ${inter.className}`}
      >
        <div className="fixed w-full h-full top-0 " />
        <div className="relative">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
