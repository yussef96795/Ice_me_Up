import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: "Ice Me Up — Handcrafted Small Batch Ice Cream",
  description:
    "Fresh flavors, real ingredients, and a little bit of joy in every cup.",
  openGraph: {
    title: "Ice Me Up",
    description:
      "Fresh flavors, real ingredients, and a little bit of joy in every cup.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${dmSerif.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preload" href="/frames/webp/frame_0001.webp" as="image" fetchPriority="high" />
        <script dangerouslySetInnerHTML={{
          __html: "history.scrollRestoration='manual'"
        }} />
      </head>
      <body className="min-h-full flex flex-col">
        <img
          src="/frames/webp/frame_0001.webp"
          alt=""
          fetchPriority="high"
          decoding="async"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        {children}
      </body>
    </html>
  );
}
