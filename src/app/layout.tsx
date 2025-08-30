import "./globals.css";
import type { Metadata } from "next";
import { DM_Serif_Display } from "next/font/google";
import React from "react";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif-display",
});

export const metadata: Metadata = {
  title: "Hamza Salim - Full Stack Software Engineer",
  description:
    "Portfolio of Hamza Salim, a Full Stack Software Engineer specializing in Next.js, Laravel, and modern web solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSerifDisplay.variable}>
      <body className="antialiased font-sans bg-white text-black">
        {children}
      </body>
    </html>
  );
}
