"use client"
import { useEffect } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactModal() {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("contactoModal")
      if (modal && event.target === modal) {
        modal.style.transform = "scale(0)"
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const modal = document.getElementById("contactoModal")
        if (modal) {
          modal.style.transform = "scale(0)"
        }
      }
    }

    document.addEventListener("click", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  return (
    <div
      id="contactoModal"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-transform duration-300 scale-0"
    >
      <div className="bg-white/90 border border-blue-900 p-8 rounded-br-4xl max-w-2xl w-full mx-4 shadow-2xl">
        <h2 className="text-blue-900 text-2xl font-bold text-center mb-8 relative">
          Nuestro Contacto
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-orange-500"></span>
        </h2>

        <div className="space-y-4">
          <div className="flex items-center bg-orange-500 border border-blue-900 p-4 rounded-lg transition-all duration-300 hover:scale-102 hover:shadow-md">
            <div className="bg-white p-2 rounded-full mr-4">
              <MapPin className="text-blue-900" size={24} />
            </div>
            <p className="text-blue-900 text-xl">Blvd. Hipólito Yrigoyen 302, Reconquista (3560)</p>
          </div>

          <div className="flex items-center bg-orange-500 border border-blue-900 p-4 rounded-lg transition-all duration-300 hover:scale-102 hover:shadow-md">
            <div className="bg-white p-2 rounded-full mr-4">
              <Phone className="text-blue-900" size={24} />
            </div>
            <p className="text-blue-900 text-xl">0810-810-9999</p>
          </div>

          <div className="flex items-center bg-orange-500 border border-blue-900 p-4 rounded-lg transition-all duration-300 hover:scale-102 hover:shadow-md">
            <div className="bg-white p-2 rounded-full mr-4">
              <Phone className="text-blue-900" size={24} />
            </div>
            <p className="text-blue-900 text-xl">3482-669999</p>
          </div>

          <div className="flex items-center bg-orange-500 border border-blue-900 p-4 rounded-lg transition-all duration-300 hover:scale-102 hover:shadow-md">
            <div className="bg-white p-2 rounded-full mr-4">
              <Mail className="text-blue-900" size={24} />
            </div>
            <p className="text-blue-900 text-xl">info@elpulqui.com.ar</p>
          </div>
        </div>

        <p className="text-blue-900 text-xl mt-6 text-center font-medium">Horarios de Atención 24hs</p>

        <button
          className="absolute top-4 right-4 bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={() => {
            const modal = document.getElementById("contactoModal")
            if (modal) modal.style.transform = "scale(0)"
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

