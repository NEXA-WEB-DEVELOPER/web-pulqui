"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react"

export default function PromoSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Imágenes para el slider
  const slides = [
    {
      id: 1,
      image: "/images/promos/promo-3.webp",
      title: "Con más de 200 Destinos",
      subtitle: "Para que llegues",
      ctaText: "Buscar Ahora",
    },
    {
      id: 2,
      image: "/images/promos/promo-1.webp",
      title: "Tus boletos ONLINE",
      subtitle: "Sin complicaciones",
      ctaText: "Comprar Ahora",
    },
    {
      id: 3,
      image: "/images/promos/promo-2.webp",
      title: "Viajá Cómodo",
      subtitle: "Con nuestros servicios",
      ctaText: "Ver Servicios",
    },
  ]

  // Cambiar slide automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Abrir modal de video
  const openVideoModal = () => {
    const modal = document.getElementById("videoModal")
    if (modal) modal.style.transform = "scale(1)"
  }

  return (
    <section id="promos" className="relative py-16 mt-8">
      <div className="container mx-auto px-4">
        <div className="h-full overflow-hidden rounded-4xl shadow-xl relative">
          {/* Slider */}
          <div className="relative h-[80vh] md:h-[70vh] overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
              >
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={`Promoción ${index + 1} - El Pulqui`}
                  className="absolute inset-0 w-full h-full object-cover md:object-contain lg:object-cover"
                  style={{
                    objectPosition: 'center',
                  }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Texto promocional */}
                <div
                  className="absolute top-0 left-0 z-20 transform transition-transform duration-1000 delay-300 
                  ${index === currentSlide ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}"
                >
                  <div className="bg-white rounded-br-4xl p-6 md:p-8 shadow-lg">
                    <h2 className="text-3xl md:text-3xl font-light">
                      {slide.title.split(" ").map((word, i) => (
                        <span
                          key={i}
                          className={i === 2 ? "text-blue-900 font-bold text-4xl md:text-4xl block md:inline" : ""}
                        >
                          {word}{" "}
                        </span>
                      ))}
                    </h2>
                    <h2 className="text-3xl md:text-3xl font-light mt-1">
                      <span className="text-orange-500 font-bold text-4xl md:text-4xl">{slide.subtitle}</span>
                    </h2>
                  </div>
                </div>

                {/* CTA Inferior */}
                <div
                  className="absolute bottom-0 left-0 z-20 bg-white rounded-tr-4xl p-6 md:p-8 flex flex-col md:flex-row items-center shadow-lg
                  transform transition-transform duration-1000 delay-500 
                  ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}"
                >
                  <h3 className="text-2xl md:text-2xl font-light mb-4 md:mb-0 md:mr-8 text-center md:text-left">
                    Consigue tu
                    <br />
                    boleto online
                  </h3>
                  <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-lg">
                    {slide.ctaText}
                  </button>
                </div>
              </div>
            ))}

            {/* Controles del slider */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30">
              <button
                onClick={prevSlide}
                className="bg-white/80 hover:bg-white text-blue-900 rounded-full p-2 shadow-lg transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30">
              <button
                onClick={nextSlide}
                className="bg-white/80 hover:bg-white text-blue-900 rounded-full p-2 shadow-lg transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-orange-500 w-10" : "bg-white/50 hover:bg-white"
                    }`}
                  aria-label={`Ver promoción ${index + 1}`}
                />
              ))}
            </div>

            {/* Video Card */}
            <div className="hidden md:flex absolute bottom-4 right-4 z-30 bg-white/80 p-4 rounded-lg flex-col md:flex-row items-center md:w-1/3 lg:w-1/4 max-w-xs shadow-lg backdrop-blur-sm">
              <p className="text-blue-900 text-sm mb-3 md:mb-0 md:mr-4 text-center md:text-left">
                ¡Trabajamos para que llegues a esos momentos donde tus sueños se hacen realidad!
              </p>
              <div
                className="relative cursor-pointer hover:opacity-90 transition-all duration-300 transform hover:scale-105 group"
                onClick={openVideoModal}
              >
                <Image
                  src="https://elpulqui.com/resources/images/clients/index/video.jpg"
                  alt="Video promocional"
                  width={140}
                  height={80}
                  className="rounded-lg border-2 border-blue-900"
                  unoptimized
                />
                <div className="absolute inset-0 flex items-center justify-center bg-blue-900/20 group-hover:bg-blue-900/40 transition-colors rounded-lg">
                  <PlayCircle size={32} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

