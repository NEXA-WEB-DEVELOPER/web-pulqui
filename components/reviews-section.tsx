"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const reviews = [
  {
    name: "FONTANA ROSARIO",
    date: "20 de Agosto 2024",
    rating: 5.0,
    comment:
      "Excelente servicio, los colectivos siempre puntuales y muy cómodos. El personal es amable y los viajes son súper tranquilos. ¡Muy recomendable!",
  },
  {
    name: "COLUSSI LUCAS",
    date: "27 de Junio 2024",
    rating: 3.0,
    comment:
      "Muy buena experiencia de viaje. Los asientos son cómodos y los conductores profesionales. Mejoraría un poco el sistema de reservas, pero todo lo demás fue excelente.",
  },
  {
    name: "FLORES TOMAS",
    date: "16 de Junio 2024",
    rating: 4.0,
    comment:
      "Excelente experiencia. Además del viaje cómodo y puntual, me encantó el parador de café. Perfecto para relajarse antes de salir, el café gratis con el boleto es un gran detalle. Muy recomendado!",
  },
  {
    name: "RODRIGUEZ FIORELA",
    date: "28 de Abril 2024",
    rating: 5.0,
    comment:
      "Los colectivos están impecables y el viaje fue muy seguro. Me gustó la atención al cliente, siempre dispuestos a ayudar. Repetiré mis viajes con esta empresa sin duda.",
  },
  {
    name: "LOPEZ MARISEL",
    date: "19 de Marzo 2024",
    rating: 4.0,
    comment:
      "Gran calidad de servicio, desde la compra del pasaje hasta el viaje. Colectivos limpios, choferes responsables y siempre a tiempo. Muy satisfecho.",
  },
  {
    name: "PABLO RUIZ DIAZ",
    date: "17 de Enero 2024",
    rating: 3.0,
    comment:
      "Buen viaje, los colectivos están en excelente estado y el servicio es eficiente. Lo único que cambiaría sería agregar más frecuencias en rutas populares. Pero en general, muy bien.",
  },
]

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const container = sliderRef.current
      const cardWidth = container.querySelector("div")?.offsetWidth || 0
      const gap = 24 // Equivalente al gap-6 de Tailwind

      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      })

      setActiveIndex(index)
    }
  }

  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % reviews.length
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + reviews.length) % reviews.length
    scrollToIndex(newIndex)
  }

  // Auto-scroll del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex])

  // Ajustar el índice al hacer scroll manual
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const container = sliderRef.current
        const scrollPos = container.scrollLeft
        const cardWidth = container.querySelector("div")?.offsetWidth || 0
        const gap = 24

        const newIndex = Math.round(scrollPos / (cardWidth + gap))
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < reviews.length) {
          setActiveIndex(newIndex)
        }
      }
    }

    const container = sliderRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [activeIndex])

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 bg-orange-500 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-900 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-orange-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">OPINIONES DE NUESTROS CLIENTES</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Conoce las experiencias de quienes ya han viajado con nosotros. Nos enorgullece brindar un servicio que
            nuestros pasajeros recomiendan.
          </p>
        </div>

        {/* Botones de navegación para pantallas grandes */}
        <div className="hidden md:flex justify-between absolute top-1/2 left-4 right-4 z-20 -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="bg-white text-blue-900 p-3 rounded-full shadow-lg hover:bg-blue-900 hover:text-white transition-colors duration-300"
            aria-label="Opinión anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white text-blue-900 p-3 rounded-full shadow-lg hover:bg-blue-900 hover:text-white transition-colors duration-300"
            aria-label="Siguiente opinión"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carrusel de reseñas */}
        <div ref={sliderRef} className="flex overflow-x-auto gap-6 py-4 px-2 snap-x snap-mandatory no-scrollbar">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`min-w-[300px] max-w-sm flex-shrink-0 snap-center transform transition-all duration-500 ${
                activeIndex === index ? "scale-105 shadow-xl" : "scale-95 shadow-md"
              }`}
            >
              <div className="bg-white border-2 border-blue-900 rounded-lg p-5 flex flex-col h-full relative">
                {/* Icono de comillas */}
                <div className="absolute -top-3 -left-3 bg-orange-500 p-2 rounded-full">
                  <Quote size={16} className="text-white" />
                </div>

                <div className="flex items-center mb-4">
                  <div className="bg-blue-900 rounded-full p-2 mr-3">
                    <Image
                      src="https://elpulqui.com/resources/images/clients/templates/people.png"
                      alt="User"
                      width={30}
                      height={30}
                      className="rounded-full"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <p className="text-blue-900 font-bold text-xl mr-2">{review.rating.toFixed(1)}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Image
                        key={i}
                        src={`https://elpulqui.com/resources/images/clients/templates/${i < review.rating ? "star" : "star-vacia"}.png`}
                        alt={i < review.rating ? "Star" : "Empty Star"}
                        width={20}
                        height={20}
                        className="mr-1"
                        unoptimized
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm flex-grow leading-relaxed">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores de página */}
        <div className="flex justify-center mt-8 gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-orange-500 w-6" : "bg-gray-300"
              }`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Ver opinión ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

