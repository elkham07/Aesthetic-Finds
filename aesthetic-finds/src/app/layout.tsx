import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aesthetic Finds | Curated Home & Living",
  description: "A minimal, curated collection of the best home decor, furniture, and living essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased text-black bg-background selection:bg-stone-200 selection:text-black transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}
