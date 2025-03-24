"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const promoItems = [
  {
    image: "https://elpulqui.com/resources/images/clients/index/club/promo-1.webp",
    alt: "Promoción especial en boletos de El Pulqui",
    id: 1,
  },
  {
    image: "https://elpulqui.com/resources/images/clients/index/club/promo-2.webp",
    alt: "Descuentos en viajes con El Pulqui",
    id: 2,
  },
  {
    image: "https://elpulqui.com/resources/images/clients/index/club/promo-3.webp",
    alt: "Ofertas exclusivas para socios del Club Pulqui",
    id: 3,
  },
  //{
  //  image: "https://elpulqui.com/resources/images/clients/index/club/club_pulqui.webp",
  //  alt: "Club Pulqui: beneficios y descuentos para pasajeros",
  //  id: 4,
  //},
  {
    image: "https://elpulqui.com/resources/images/clients/index/club/promo-4.webp",
    alt: "Promociones exclusivas en boletos de El Pulqui",
    id: 5,
  },
  {
    image: "https://elpulqui.com/resources/images/clients/index/club/promo-5.webp",
    alt: "Grandes ofertas en viajes con El Pulqui",
    id: 6,
  },
  {
    image: "https://elpulqui.com/resources/images/clients/index/club/promo-6.webp",
    alt: "Descuentos en boletos de larga distancia con El Pulqui",
    id: 7,
  },
]

export default function ClubSection() {
  const [startIndex, setStartIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(5)

  // Determinar cuántos elementos mostrar basado en el ancho de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(2)
      } else if (window.innerWidth < 768) {
        setVisibleCount(3)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(4)
      } else {
        setVisibleCount(5)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % promoItems.length)
  }

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + promoItems.length) % promoItems.length)
  }

  // Auto-carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [startIndex])

  // Obtener elementos visibles en este momento
  const visibleItems = () => {
    const items = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % promoItems.length
      items.push(promoItems[index])
    }
    return items
  }

  return (
    <section id="club" className="py-16">
      <div
        className="w-full h-full rounded-4xl bg-cover bg-center relative flex flex-col justify-between py-16 overflow-hidden shadow-xl"
        style={{ backgroundImage: "url('https://elpulqui.com/resources/images/clients/index/club/fondo.jpg')" }}
      >
        {/* Overlay para mejorar contraste */}
        <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[2px]"></div>

        <div className="flex flex-col items-center relative z-10">
          <div className="bg-white px-10 py-6 rounded-3xl shadow-lg transform -rotate-1 mb-16">
            <h2 className="text-4xl font-bold text-blue-900 animate-pulse-slow">SUPER</h2>
            <h2 className="text-4xl font-bold text-orange-500 animate-pulse-slow">PROMOCIONES</h2>
          </div>

          {/* Carrusel */}
          <div className="relative max-w-7xl w-full px-12">
            {/* Controles de navegación */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg text-blue-900 hover:bg-blue-900 hover:text-white transition-colors"
              aria-label="Promoción anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg text-blue-900 hover:bg-blue-900 hover:text-white transition-colors"
              aria-label="Siguiente promoción"
            >
              <ChevronRight size={20} />
            </button>

            {/* Elementos del carrusel */}
            <div className="flex justify-center gap-4 overflow-hidden py-4">
              {visibleItems().map((item) => (
                <div key={item.id} className="transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className="bg-white p-2 rounded-xl shadow-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      className="rounded-lg object-cover min-w-[150px] min-h-[200px] max-w-[150px] max-h-[200px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 gap-2">
            {promoItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index >= startIndex && index < startIndex + visibleCount ? "bg-orange-500" : "bg-white/50"
                  }`}
                onClick={() => setStartIndex(index)}
                aria-label={`Ver promoción ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-xs mx-auto mt-12 relative z-10">
          <a
            href="https://pulqui.vercel.app/search"
            className="bg-white hover:brightness-90 text-blue-900 font-bold py-3 px-6 rounded-lg block text-center transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            CONSEGUÍ TU BOLETO
          </a>
        </div>
      </div>
    </section>
  )
}

