import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "El Pulqui - Transporte de Pasajeros en Argentina y Paraguay",
  description:
    "El Pulqui, empresa líder en transporte de pasajeros con más de 60 años de experiencia. Viajes nacionales e internacionales con confort y seguridad.",
  keywords: "El Pulqui, transporte, pasajeros, Argentina, Paraguay, boletos, viajes, ómnibus",
  authors: [{ name: "El Pulqui" }],
  viewport: "width=device-width, initial-scale=1",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  )
}



import './globals.css'