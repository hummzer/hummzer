import "./globals.css";
import type { Metadata } from "next";
import { DM_Serif_Display, Gravitas_One } from "next/font/google";
import React from "react";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif-display",
});

const gravitasOne = Gravitas_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gravitas-one",
});

export const metadata: Metadata = {
  title: "Hamza Salim - Full Stack Software Engineer",
  description: "Explore the dynamic portfolio of Hamza Salim, a Full Stack Software Engineer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${gravitasOne.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
