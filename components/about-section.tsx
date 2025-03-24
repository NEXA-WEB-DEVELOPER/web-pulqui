"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export default function AboutSection() {
  const [activeGalleryItem, setActiveGalleryItem] = useState(0)
  const [galleryVisible, setGalleryVisible] = useState(false)
  const galleryContainerRef = useRef<HTMLDivElement>(null)

  // Imágenes para la galería exactamente como en el sitio original
  const galleryImages = [
    {
      id: 0,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-0.webp",
      alt: "Historia de El Pulqui 1",
    },
    {
      id: 1,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-1.webp",
      alt: "Historia de El Pulqui 2",
    },
    {
      id: 2,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-2.webp",
      alt: "Historia de El Pulqui 3",
    },
    {
      id: 3,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-3.webp",
      alt: "Historia de El Pulqui 4",
    },
    {
      id: 4,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-4.webp",
      alt: "Historia de El Pulqui 5",
    },
    {
      id: 5,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-5.webp",
      alt: "Historia de El Pulqui 6",
    },
    {
      id: 6,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-6.webp",
      alt: "Historia de El Pulqui 7",
    },
    {
      id: 7,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-7.webp",
      alt: "Historia de El Pulqui 8",
    },
    {
      id: 8,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-8.webp",
      alt: "Historia de El Pulqui 9",
    },
    {
      id: 9,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-9.webp",
      alt: "Historia de El Pulqui 10",
    },
    {
      id: 10,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-10.jpg",
      alt: "Historia de El Pulqui 11",
    },
    {
      id: 11,
      src: "https://elpulqui.com/resources/images/clients/index/nosotros/item-11.jpg",
      alt: "Historia de El Pulqui 12",
    },
  ]

  const toggleGallery = () => {
    setGalleryVisible(!galleryVisible)
    document.body.style.overflow = !galleryVisible ? "hidden" : ""
  }

  const nextImage = () => {
    setActiveGalleryItem((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setActiveGalleryItem((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Scroll al elemento activo en la galería de miniaturas
  useEffect(() => {
    if (galleryContainerRef.current && galleryVisible) {
      const container = galleryContainerRef.current
      const activeItem = container.querySelector(`[data-index="${activeGalleryItem}"]`)

      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [activeGalleryItem, galleryVisible])

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryVisible) return

      if (e.key === "Escape") {
        toggleGallery()
      } else if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [galleryVisible])

  // Auto-slider para miniaturas
  useEffect(() => {
    const interval = setInterval(() => {
      if (!galleryVisible) {
        const scrollContent = document.querySelector("#thumbnail-slider") as HTMLElement
        if (scrollContent) {
          scrollContent.scrollLeft += 2 // Movimiento suave

          // Si llegamos al final, reiniciamos
          const maxScroll = scrollContent.scrollWidth - scrollContent.clientWidth
          if (scrollContent.scrollLeft >= maxScroll) {
            scrollContent.scrollLeft = 0
          }
        }
      }
    }, 30)

    return () => clearInterval(interval)
  }, [galleryVisible])

  return (
    <section id="nosotros" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute left-0 top-0 w-20 h-full bg-blue-900/5 -skew-x-12 z-0"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-orange-500/5 skew-x-12 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2 relative">
            NOSOTROS
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-orange-500"></span>
          </h2>
          <p className="text-xl mt-4 font-light text-gray-700">
            <span className="font-normal">MÁS QUE UNA EMPRESA...</span>{" "}
            <span className="text-orange-500 font-bold">UNA FAMILIA</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Columna izquierda - Imagen principal y slider de miniaturas */}
          <div className="w-full lg:w-7/12 space-y-6">
            {/* Imagen principal con fecha */}
            <div className="relative mx-auto lg:mx-0 max-w-md lg:max-w-none w-full">
              <div
                className="relative shadow-xl rounded-lg overflow-hidden group cursor-pointer"
                onClick={toggleGallery}
              >
                <Image
                  src="https://elpulqui.com/resources/images/clients/index/nosotros/colectivo.jpg"
                  alt="Autobús de El Pulqui en 1963"
                  width={600}
                  height={400}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-t-lg shadow-md">
                  <p className="font-medium">13 de marzo de 1963</p>
                </div>

                <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">Ver Galería</span>
                </div>
              </div>

              {/* Decoración de aniversario */}
              <div className="absolute -left-4 md:-left-8 -bottom-8 transform -rotate-7 z-10">
                <div className="bg-orange-500 text-white text-center px-4 py-1 rounded-lg mb-2 shadow-md font-semibold">
                  61 AÑOS
                </div>
                <div className="bg-blue-900 text-white text-center px-4 py-1 rounded-lg mb-2 shadow-md font-semibold">
                  CON USTEDES
                </div>
                <div className="bg-orange-500 text-white text-center px-4 py-1 rounded-lg shadow-md font-semibold">
                  POR USTEDES
                </div>
              </div>
            </div>

            {/* Slider de miniaturas */}
            {/*<div className="bg-blue-900 py-3 px-2 rounded-lg shadow-md">
              <div id="thumbnail-slider" className="flex overflow-x-auto gap-2 no-scrollbar">
                {galleryImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="flex-shrink-0 cursor-pointer relative"
                    onClick={() => {
                      setActiveGalleryItem(index)
                      toggleGallery()
                    }}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={120}
                      height={80}
                      className="h-20 w-32 object-cover rounded border-2 border-transparent hover:border-orange-500 transition-all duration-200"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>*/}
          </div>

          {/* Columna derecha - Texto e historia */}
          <div className="w-full lg:w-5/12">
            <div className="border-l-4 border-orange-500 pl-6 py-2">
              <p className="text-gray-800 leading-relaxed">
                La Empresa inicia sus actividades en el rubro del transporte público de pasajeros en el año 1963, bajo
                la denominación de <span className="font-semibold text-blue-900">La Tostadense y Cía SRL</span>, en la
                provincia de Santa Fe.
              </p>
            </div>

            <div className="mt-8 relative">
              <p className="text-gray-800 leading-relaxed mb-8">
                En el año 1995, ante un mercado en franco crecimiento y expansión, amplía su área de influencia e
                incorpora a sus prestaciones nuevas trazas, destinos y servicios, ya bajo la denominación de
                <span className="font-semibold text-orange-500"> El Pulqui</span>.
              </p>

              <p className="text-gray-800 leading-relaxed mb-8">
                Actualmente, con <span className="font-semibold">más de 60 años de experiencia</span>, nuestra empresa
                continúa creciendo y expandiéndose, manteniendo siempre los valores fundamentales:
                <span className="text-blue-900 font-semibold"> calidad de servicio, seguridad y confort</span> para
                todos nuestros pasajeros.
              </p>

              <div className="flex justify-center lg:justify-start mt-8">
                <button
                  className="bg-blue-900 text-white px-8 py-3 rounded-full hover:bg-blue-800 transition-all duration-300 shadow-lg transform hover:-translate-y-1 font-semibold flex items-center group"
                  onClick={toggleGallery}
                >
                  <span>DESCUBRE NUESTRA HISTORIA</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Galería modal en pantalla completa */}
      {galleryVisible && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
          {/* Botón cerrar */}
          <button
            className="absolute top-4 right-4 z-50 bg-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-gray-200 transition-colors"
            onClick={toggleGallery}
          >
            ×
          </button>

          {/* Navegación */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-50">
            <button
              className="bg-white/20 hover:bg-white/40 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              onClick={prevImage}
              aria-label="Imagen anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-50">
            <button
              className="bg-white/20 hover:bg-white/40 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              onClick={nextImage}
              aria-label="Siguiente imagen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Imagen principal */}
          <div className="relative w-full h-full flex items-center justify-center p-10">
            <Image
              src={galleryImages[activeGalleryItem].src || "/placeholder.svg"}
              alt={galleryImages[activeGalleryItem].alt}
              width={1200}
              height={800}
              className="max-h-[70vh] max-w-full object-contain"
              unoptimized
            />
          </div>

          {/* Miniaturas */}
          <div
            ref={galleryContainerRef}
            className="absolute bottom-8 left-0 right-0 px-4 overflow-x-auto py-2 flex gap-2 justify-center"
          >
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                data-index={index}
                className={`cursor-pointer transition-all duration-200 ${activeGalleryItem === index ? "scale-110" : "opacity-60 hover:opacity-100"}`}
                onClick={() => setActiveGalleryItem(index)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={`Miniatura ${index + 1}`}
                  width={100}
                  height={60}
                  className={`h-16 w-24 object-cover rounded ${activeGalleryItem === index ? "border-2 border-orange-500" : "border border-white/30"}`}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

