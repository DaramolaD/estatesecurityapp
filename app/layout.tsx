import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EstateOS — Secure Smart Estate Management",
  description: "Invisible Security. Visible Luxury. The estate operating system for modern gated communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
