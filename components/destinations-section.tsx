"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPinIcon, ChevronRight } from "lucide-react"

const destinations = [
  {
    title: "SANTA FE",
    text: "Rodeada en parte por ríos y tiene paseos costeros con vistas al Puente Colgante.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/santa-fe.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Santa%20Fe",
  },
  {
    title: "RETIRO",
    text: "El corazón del transporte en Buenos Aires, con conexiones a todo el país y su emblemática estación ferroviaria.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/retiro.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Retiro",
  },
  {
    title: "RECONQUISTA",
    text: "Ubicada al noreste de Santa Fe, conocida por sus actividades al aire libre y su rica historia cultural.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/reconquista.jpg",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Reconquista",
  },
  {
    title: "MAR DEL PLATA",
    text: "La ciudad balnearia más importante de Argentina, con hermosas playas y una vibrante vida nocturna.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/mar-del-plata.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Mar%20del%20Plata",
  },
  {
    title: "CÓRDOBA",
    text: "Capital provincial con rica arquitectura colonial y hermosas sierras en sus alrededores.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/cordoba.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Córdoba",
  },
  {
    title: "MENDOZA",
    text: "Famosa por sus viñedos y bodegas, con impresionantes vistas a la Cordillera de los Andes.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/mendoza.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Mendoza",
  },
  {
    title: "BARILOCHE",
    text: "Destino turístico de montaña con lagos cristalinos y excelentes pistas de esquí en invierno.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/bariloche.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Bariloche",
  },
  {
    title: "ROSARIO",
    text: "Ciudad portuaria con el emblemático Monumento a la Bandera y hermosa costanera sobre el río Paraná.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/rosario.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Rosario",
  },
  {
    title: "SALTA",
    text: "Conocida como 'La Linda' por su arquitectura colonial bien preservada y paisajes montañosos.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/salta.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Salta",
  },
  {
    title: "IGUAZÚ",
    text: "Hogar de las impresionantes Cataratas del Iguazú, una de las maravillas naturales del mundo.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/iguazu.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Iguazú",
  },
  {
    title: "USHUAIA",
    text: "La ciudad más austral del mundo, punto de partida para expediciones a la Antártida.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/ushuaia.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Ushuaia",
  },
  {
    title: "TUCUMÁN",
    text: "Cuna de la independencia argentina con rica historia y hermosos paisajes montañosos.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/tucuman.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Tucumán",
  },
  {
    title: "CORRIENTES",
    text: "Provincia con rica cultura guaraní y hogar de los famosos Esteros del Iberá.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/corrientes.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Corrientes",
  },
  {
    title: "LA PLATA",
    text: "Ciudad planificada con trazado único y sede de una prestigiosa universidad nacional.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/la-plata.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20La%20Plata",
  },
  {
    title: "JUJUY",
    text: "Famosa por sus coloridos cerros y rica cultura andina en el noroeste argentino.",
    image: "https://elpulqui.com/resources/images/clients/index/destinos/jujuy.webp",
    link: "https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20el%20destino%20Jujuy",
  }
]

export default function DestinationsSection() {
  const [currentDestinations, setCurrentDestinations] = useState<typeof destinations>([]);
  const [previousDestinationIds, setPreviousDestinationIds] = useState<number[]>([]);

  // Función para obtener 3 destinos nuevos que no estén en el grupo anterior
  const getNextDestinations = () => {
    // Verificamos el ancho de la pantalla para determinar cuántos destinos mostrar
    const isMobile = window.innerWidth < 768; // 768px es el breakpoint 'md' en Tailwind
    const destinationsToShow = isMobile ? 1 : 3;

    // Creamos un array con todos los índices posibles
    const allIndices = Array.from({ length: destinations.length }, (_, i) => i);

    // Filtramos los índices que estaban en el grupo anterior
    const availableIndices = allIndices.filter(index => !previousDestinationIds.includes(index));

    // Si no hay suficientes índices disponibles, usamos todos menos los del grupo actual
    const shuffleIndices = availableIndices.length >= destinationsToShow
      ? availableIndices
      : allIndices.filter(index => !currentDestinations.includes(destinations[index]));

    // Mezclamos aleatoriamente y tomamos la cantidad necesaria según el tamaño de pantalla
    const randomIndices = shuffleIndices.sort(() => Math.random() - 0.5).slice(0, destinationsToShow);

    // Guardamos los índices actuales como previos para el próximo cambio
    const currentIds = randomIndices.map(index => index);
    setPreviousDestinationIds(currentIds);

    // Devolvemos los nuevos destinos
    return randomIndices.map(index => destinations[index]);
  };

  // Inicializar los destinos al cargar
  useEffect(() => {
    setCurrentDestinations(getNextDestinations());

    // Configurar el cambio automático cada 7 segundos
    const interval = setInterval(() => {
      setCurrentDestinations(getNextDestinations());
    }, 7000);

    // Limpiar el intervalo al desmontar
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="destinos" className="py-24 relative overflow-hidden">
      {/* Background Circles - Fixed to prevent overflow issues */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[90vw] h-[90vw] sm:w-[80vw] sm:h-[80vw] border-2 border-orange-500/30 rounded-full relative animate-pulse-slow">
          <div className="w-[74vw] h-[74vw] sm:w-[65vw] sm:h-[65vw] border-2 border-orange-500/50 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slower"></div>
        </div>
      </div>

      <div className="container mx-auto z-10 relative px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light">
            El{" "}
            <span className="text-orange-500 font-bold text-5xl transform -rotate-3 inline-block animate-pulse-slow">
              DESTINO
            </span>{" "}
            que te imagines
          </h2>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
            Descubre todos los lugares a los que puedes viajar con nosotros. Con más de 200 destinos, te llevamos a los
            rincones más hermosos de Argentina y Paraguay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {currentDestinations.map((destination, index) => (
            <a
              href={destination.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-2 border-blue-900 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-lg bg-white"
            >
              <div className="relative h-64">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-blue-900 p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-blue-900 font-bold text-xl">{destination.title}</h3>
                    <div className="bg-blue-900 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                  <p className="text-sm mt-1">{destination.text}</p>
                </div>

                {/* Indicador de ubicación */}
                <div className="absolute top-2 left-2 bg-orange-500 text-white p-1 rounded-full">
                  <MapPinIcon size={16} />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://wa.me/3482669999?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20sus%20destinos"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-900 text-white px-10 py-3 rounded-full text-xl font-bold inline-flex items-center hover:bg-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Consultar Destinos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

