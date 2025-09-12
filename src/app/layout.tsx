import { Geist } from "next/font/google";
import type { Metadata } from "next";
import AntDesignProvider from "@/components/providers/AntDesignProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CULTrix - School ERP",
  description: "A comprehensive school management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AntDesignProvider>{children}</AntDesignProvider>
      </body>
    </html>
  );
}
