"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Reclamos", href: "#", action: "openReclamos" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Promociones", href: "#promos" },
  { name: "Contacto", href: "#", action: "openContacto" },
  { name: "Destinos", href: "#destinos" },
  {
    name: "Club Pulqui",
    href: "https://fideclub.sittnet.net/login.aspx?id=0E2D7E0D-ED54-432D-B237-36FD8F6BE308",
    external: true,
  },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleNavClick = (action?: string) => {
    if (action === "openReclamos") {
      const modal = document.getElementById("reclamosModal")
      if (modal) modal.style.transform = "scale(1)"
    } else if (action === "openContacto") {
      const modal = document.getElementById("contactoModal")
      if (modal) modal.style.transform = "scale(1)"
    }
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/90"}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">El Pulqui</span>
            <img
              src="https://elpulqui.com/resources/images/logos/logo_blue_long.png"
              alt="El Pulqui Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open main menu"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              className="text-base font-semibold text-blue-900 hover:text-blue-700 transition-colors relative group"
              onClick={(e) => {
                if (item.action) {
                  e.preventDefault()
                  handleNavClick(item.action)
                }
              }}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/20" aria-hidden="true" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">El Pulqui</span>
                <Image
                  src="https://elpulqui.com/resources/images/logos/logo_blue_long.png"
                  alt="El Pulqui Logo"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                  unoptimized
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-900 hover:bg-gray-50"
                      onClick={(e) => {
                        if (item.action) {
                          e.preventDefault()
                          handleNavClick(item.action)
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

