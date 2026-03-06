import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Exodia — The Operating System for the Modern Municipal Clerk",
  description:
    "Exodia helps municipal clerks manage agendas, dockets, meeting minutes, and ordinance tracking in one streamlined platform.",
  openGraph: {
    title: "Exodia — The Operating System for the Modern Municipal Clerk",
    description:
      "Streamline your clerk operations. Manage agendas, dockets, minutes, and ordinances in one place.",
    url: "https://exodia.co",
    siteName: "Exodia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exodia",
    description: "The operating system for the modern municipal clerk.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
