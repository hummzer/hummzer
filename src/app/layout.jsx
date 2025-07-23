import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import TerminalPortfolio from "./page.jsx" // Corrected import for .jsx

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Hamza Salim - Full Stack Software Engineer", // Updated title
  description: "Explore the dynamic portfolio of Hamza Salim, a Full Stack Software Engineer.", // Updated description
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children} {/* Keep children for other potential routes, though this setup is SPA-like */}
      </body>
    </html>
  )
}
