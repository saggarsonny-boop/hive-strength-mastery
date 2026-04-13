import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hive Strength Mastery",
  description: "Strength training from first principles. Personalized, shame-free, built on biomechanics.",
  manifest: "/manifest.json",
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
