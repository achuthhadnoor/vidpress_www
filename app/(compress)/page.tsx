import { Metadata } from "next";
import dynamic from "next/dynamic";
const CompressVideo = dynamic(() => import("./components/compress"), {
  ssr: false,
});

export const metadata: Metadata = {
  alternates: {
    canonical: "/video",
    languages: {
      "en-US": "/en-US",
    },
  },
  title:
    "Compress & Convert Videos and Image Like a Pro - Free, High-Quality Online Tool",
  description:
    "Say goodbye to bulky video files! Compress and convert videos effortlessly with our free online tool. Enjoy high-quality results without sacrificing clarity, perfect for sharing, uploading, or editing. Convert like a pro, for free!",
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
      "Compress & Convert Videos Like a Pro - Free, High-Quality Online Tool",
    description:
      "Say goodbye to bulky video files! Compress and convert videos effortlessly with our free online tool. Enjoy high-quality results without sacrificing clarity, perfect for sharing, uploading, or editing. Convert like a pro, for free!",
    url: `${process.env.NEXT_PUBLIC_URL}/video`,
    type: "website",
    images: "/og-image.png",
    siteName: "Video Compression Hub",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ThatsPranav",
    creator: "@ThatsPranav",
  },
};

const Page = () => {
  return (
    <>
      <CompressVideo />
    </>
  );
};

export default Page;
