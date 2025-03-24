"use client"
import { useEffect } from "react"
import { Mail, Phone, MessageSquare } from "lucide-react"

export default function ReclaimModal() {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("reclamosModal")
      if (modal && event.target === modal) {
        modal.style.transform = "scale(0)"
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const modal = document.getElementById("reclamosModal")
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
      id="reclamosModal"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-transform duration-300 scale-0"
    >
      <div className="bg-white/90 border border-blue-900 p-8 rounded-br-4xl max-w-2xl w-full mx-4 shadow-2xl">
        <h2 className="text-blue-900 text-2xl font-bold text-center mb-4 relative">
          ¡Tu opinión es importante para nosotros!
          <span className="absolute bottom-0 right-0 w-3/4 h-1 bg-orange-500"></span>
        </h2>

        <p className="text-blue-900 mb-8 leading-relaxed">
          Si has tenido algún inconveniente durante tu viaje o con nuestro servicio, por favor, cuéntanoslo. Nos puedes
          dejar tu mensaje en los medios que se muestran a continuación para que podamos mejorar y brindarte una mejor
          experiencia. Estamos comprometidos en resolver tu reclamo lo antes posible.
        </p>

        <div className="space-y-4">
          <div className="flex items-center bg-orange-500 border border-blue-900 p-4 rounded-lg transition-all duration-300 hover:scale-102 hover:shadow-md">
            <div className="bg-white p-2 rounded-full mr-4">
              <Phone className="text-blue-900" size={24} />
            </div>
            <p className="text-blue-900 text-xl">0810-810-9999</p>
          </div>

          <div className="flex items-center bg-orange-500 border border-blue-900 p-4 rounded-lg transition-all duration-300 hover:scale-102 hover:shadow-md">
            <div className="bg-white p-2 rounded-full mr-4">
              <MessageSquare className="text-blue-900" size={24} />
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

        <p className="text-blue-900 text-xl mt-6 text-center font-medium">Horarios de Atención de 08 a 00hs</p>

        <button
          className="absolute top-4 right-4 bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={() => {
            const modal = document.getElementById("reclamosModal")
            if (modal) modal.style.transform = "scale(0)"
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

