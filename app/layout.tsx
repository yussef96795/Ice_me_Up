import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: "history.scrollRestoration='manual'"
        }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
