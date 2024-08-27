import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar/Navbar";

const poppins = Poppins({
  subsets:['latin'],
  display: 'swap',
  weight:['300','600']
});

export const metadata: Metadata = {
  title: "StuckBuild CatalogPro | Your One-Stop Shop",
  description: "A robust and intuitive software solution designed to streamline and enhance your e-commerce and production listing processes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
    <Navbar />

        {children}
        </body>
    </html>
  );
}
