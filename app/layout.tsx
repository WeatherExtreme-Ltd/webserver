import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "DEMO",
  description: "DEMO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    {children}
  );
}
