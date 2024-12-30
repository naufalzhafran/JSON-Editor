import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Easy JSON Editor",
  description: "A secure, privacy-focused JSON editor for everyone.",
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
