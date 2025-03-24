"use client"

import { useState, useCallback } from "react"
import { CalendarIcon, MapPin, Users, ChevronRight, ArrowLeftRight, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

// Listas realistas de ciudades para autocompletar
const commonOrigins = [
  "Santa Fe",
  "Reconquista",
  "Rosario",
  "Buenos Aires",
  "Córdoba",
  "Mendoza",
  "Resistencia",
  "Corrientes",
  "La Plata",
  "Mar del Plata",
  "Paraná",
  "Posadas",
  "San Juan",
  "Tucumán",
  "Salta",
]

const commonDestinations = [
  "Mar del Plata",
  "Retiro",
  "Bariloche",
  "Mendoza",
  "Salta",
  "Puerto Iguazú",
  "Carlos Paz",
  "Asunción",
  "Jujuy",
  "Neuquén",
  "Santa Fe",
  "Rosario",
  "Córdoba",
  "Buenos Aires",
  "La Plata",
]

// Simulación de API para búsqueda de ciudades
const searchCitiesApi = async (query: string, type: 'origin' | 'destination'): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const cities = type === 'origin' ? commonOrigins : commonDestinations;
  return cities.filter(city => city.toLowerCase().includes(query.toLowerCase()));
};

// Lista de ciudades simplificada
const ciudades = [
  { id: 1, nombre: "Reconquista" },
  { id: 2, nombre: "Santa Fe" },
  { id: 3, nombre: "Retiro" },
  { id: 4, nombre: "Mar del Plata" },
  { id: 5, nombre: "Rosario" },
  { id: 6, nombre: "Córdoba" },
  { id: 7, nombre: "Resistencia" },
  { id: 8, nombre: "Corrientes" },
]

export default function SearchForm() {
  // Estados básicos
  const [origen, setOrigen] = useState<string>("")
  const [destino, setDestino] = useState<string>("")
  const [fechaIda, setFechaIda] = useState<Date | undefined>(new Date())
  const [fechaVuelta, setFechaVuelta] = useState<Date | undefined>(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  })
  const [pasajeros, setPasajeros] = useState<number>(1)
  const [tipoViaje, setTipoViaje] = useState<string>("ida")

  // Estados para manejo de UI
  const [origenesFiltrados, setOrigenesFiltrados] = useState(ciudades)
  const [destinosFiltrados, setDestinosFiltrados] = useState(ciudades)
  const [origenAbierto, setOrigenAbierto] = useState(false)
  const [destinoAbierto, setDestinoAbierto] = useState(false)
  const [fechaIdaAbierta, setFechaIdaAbierta] = useState(false)
  const [fechaVueltaAbierta, setFechaVueltaAbierta] = useState(false)
  const [pasajerosAbierto, setPasajerosAbierto] = useState(false)

  // Función para filtrar ciudades según la entrada del usuario
  const filtrarCiudades = useCallback((input: string, tipo: 'origen' | 'destino') => {
    const resultado = ciudades.filter(ciudad =>
      ciudad.nombre.toLowerCase().includes(input.toLowerCase())
    )

    if (tipo === 'origen') {
      setOrigenesFiltrados(resultado)
    } else {
      setDestinosFiltrados(resultado)
    }
  }, [])

  // Función para intercambiar origen y destino
  const intercambiarCiudades = useCallback(() => {
    const origenTemp = origen
    setOrigen(destino)
    setDestino(origenTemp)
  }, [origen, destino])

  // Función para buscar boletos
  const buscarBoletos = useCallback(() => {
    if (!origen || !destino || !fechaIda || (tipoViaje === "idaVuelta" && !fechaVuelta)) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    const params = new URLSearchParams({
      from: origen,
      to: destino,
      departDate: format(fechaIda, 'yyyy-MM-dd'),
      passengers: pasajeros.toString(),
      tripType: tipoViaje
    })

    if (tipoViaje === "idaVuelta" && fechaVuelta) {
      params.append('returnDate', format(fechaVuelta, 'yyyy-MM-dd'))
    }

    // Aquí iría la lógica para redireccionar a la página de resultados
    window.location.href = `https://pulqui.vercel.app/search?${params.toString()}`
  }, [origen, destino, fechaIda, fechaVuelta, pasajeros, tipoViaje])

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-blue-900/10 p-3 md:p-4 max-w-6xl mx-auto">
      <div className="mb-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <h2 className="text-lg md:text-xl font-bold text-blue-900 flex items-center gap-2">
          <span className="bg-orange-500 h-5 w-1 rounded-full"></span>
          Busca tu próximo viaje
        </h2>

        {/* Selector tipo de viaje */}
        <div className="flex space-x-1 border rounded-lg overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setTipoViaje("ida")}
            className={`px-3 py-1 text-xs font-medium transition-all duration-300 ${tipoViaje === "ida"
              ? "bg-blue-900 text-white shadow-inner"
              : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            aria-pressed={tipoViaje === "ida"}
          >
            <span className="flex items-center gap-1">
              Solo ida
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTipoViaje("idaVuelta")}
            className={`px-3 py-1 text-xs font-medium transition-all duration-300 ${tipoViaje === "idaVuelta"
              ? "bg-blue-900 text-white shadow-inner"
              : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            aria-pressed={tipoViaje === "idaVuelta"}
          >
            <span className="flex items-center gap-1">
              Ida y vuelta
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:flex md:flex-row gap-1 w-full">
        {/* Contenedor de Origen y Destino en modo responsive */}
        <div className="flex flex-col md:flex-row gap-1 w-full">
          {/* Selector de Origen */}
          <div className="relative flex-1 flex items-center">
            <div className="relative flex-grow">
              <div className="relative">
                <button
                  className="flex items-center justify-between w-full py-1.5 px-2 text-left border rounded-md bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-900"
                  onClick={() => setOrigenAbierto(!origenAbierto)}
                  aria-expanded={origenAbierto}
                >
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-orange-500" />
                    <span className={`text-xs ${origen ? "text-gray-900" : "text-gray-400"}`}>
                      {origen || "Origen"}
                    </span>
                  </div>
                  <ChevronRight className={`h-3 w-3 transition-transform ${origenAbierto ? "rotate-90" : ""}`} />
                </button>
                {origenAbierto && (
                  <div className="absolute z-[100] w-full mt-1 bg-white border rounded-lg shadow-lg max-h-[250px] overflow-y-auto">
                    <div className="p-2">
                      <input
                        type="text"
                        value={origen}
                        onChange={(e) => {
                          setOrigen(e.target.value)
                          filtrarCiudades(e.target.value, 'origen')
                        }}
                        placeholder="Buscar origen..."
                        className="w-full p-1.5 border rounded-md text-xs mb-1 bg-white"
                      />
                      <div className="space-y-0.5">
                        {origenesFiltrados.map((ciudad) => (
                          <button
                            key={ciudad.id}
                            className="w-full text-left px-2 py-1.5 text-xs rounded-md bg-white hover:bg-gray-100"
                            onClick={() => {
                              setOrigen(ciudad.nombre)
                              setOrigenAbierto(false)
                            }}
                          >
                            {ciudad.nombre}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botón intercambiar (junto al input) */}
            <button
              onClick={intercambiarCiudades}
              className="ml-1 bg-white hover:bg-gray-50 border border-orange-500 text-orange-500 p-1 rounded-full shadow-sm transition-all transform hover:scale-105"
              aria-label="Intercambiar origen y destino"
            >
              <ArrowLeftRight className="h-3 w-3" />
            </button>
          </div>

          {/* Selector de Destino */}
          <div className="relative flex-1">
            <div className="relative">
              <button
                className="flex items-center justify-between w-full py-1.5 px-2 text-left border rounded-md bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-900"
                onClick={() => setDestinoAbierto(!destinoAbierto)}
                aria-expanded={destinoAbierto}
              >
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-orange-500" />
                  <span className={`text-xs ${destino ? "text-gray-900" : "text-gray-400"}`}>
                    {destino || "Destino"}
                  </span>
                </div>
                <ChevronRight className={`h-3 w-3 transition-transform ${destinoAbierto ? "rotate-90" : ""}`} />
              </button>
              {destinoAbierto && (
                <div className="absolute z-[100] w-full mt-1 bg-white border rounded-lg shadow-lg max-h-[250px] overflow-y-auto">
                  <div className="p-2">
                    <input
                      type="text"
                      value={destino}
                      onChange={(e) => {
                        setDestino(e.target.value)
                        filtrarCiudades(e.target.value, 'destino')
                      }}
                      placeholder="Buscar destino..."
                      className="w-full p-1.5 border rounded-md text-xs mb-1 bg-white"
                    />
                    <div className="space-y-0.5">
                      {destinosFiltrados.map((ciudad) => (
                        <button
                          key={ciudad.id}
                          className="w-full text-left px-2 py-1.5 text-xs rounded-md bg-white hover:bg-gray-100"
                          onClick={() => {
                            setDestino(ciudad.nombre)
                            setDestinoAbierto(false)
                          }}
                        >
                          {ciudad.nombre}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenedor de fechas */}
        <div className="flex flex-col md:flex-row gap-1 w-full">
          {/* Selector de Fecha Ida */}
          <div className="relative flex-1">
            <div className="relative">
              <button
                className="flex items-center justify-between w-full py-1.5 px-2 text-left border rounded-md bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-900"
                onClick={() => setFechaIdaAbierta(!fechaIdaAbierta)}
                aria-expanded={fechaIdaAbierta}
              >
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-gray-900">
                    {fechaIda ? format(fechaIda, "dd/MM/yy") : undefined}
                  </span>
                </div>
                <ChevronRight className={`h-3 w-3 transition-transform ${fechaIdaAbierta ? "rotate-90" : ""}`} />
              </button>
              {fechaIdaAbierta && (
                <div className="absolute z-[100] w-auto mt-1 bg-white border rounded-lg shadow-lg">
                  <div className="p-0 bg-white">
                    <Calendar
                      mode="single"
                      selected={fechaIda}
                      onSelect={(date) => {
                        setFechaIda(date)
                        setFechaIdaAbierta(false)
                        if (date && fechaVuelta && date > fechaVuelta) {
                          setFechaVuelta(undefined)
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      locale={es}
                      className="border-0 bg-white scale-90 origin-top-left"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selector de Fecha Vuelta (condicional) */}
          {tipoViaje === "idaVuelta" && (
            <div className="relative flex-1">
              <div className="relative">
                <button
                  className="flex items-center justify-between w-full py-1.5 px-2 text-left border rounded-md bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-900"
                  onClick={() => setFechaVueltaAbierta(!fechaVueltaAbierta)}
                  aria-expanded={fechaVueltaAbierta}
                >
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3 text-orange-500" />
                    <span className="text-xs text-gray-900">
                      {fechaVuelta ? format(fechaVuelta, "dd/MM/yy") : undefined}
                    </span>
                  </div>
                  <ChevronRight className={`h-3 w-3 transition-transform ${fechaVueltaAbierta ? "rotate-90" : ""}`} />
                </button>
                {fechaVueltaAbierta && (
                  <div className="absolute z-[100] w-auto mt-1 bg-white border rounded-lg shadow-lg">
                    <div className="p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={fechaVuelta}
                        onSelect={(date) => {
                          setFechaVuelta(date)
                          setFechaVueltaAbierta(false)
                        }}
                        disabled={(date) => fechaIda ? date < fechaIda : date < new Date()}
                        locale={es}
                        className="border-0 bg-white scale-90 origin-top-left"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Contenedor de pasajeros y botón de búsqueda */}
        <div className="flex flex-col md:flex-row gap-1 w-full">
          {/* Selector de Pasajeros */}
          <div className="relative flex-1 md:mr-1">
            <div className="relative">
              <button
                className="flex items-center justify-between w-full py-1.5 px-2 text-left border rounded-md bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-900"
                onClick={() => setPasajerosAbierto(!pasajerosAbierto)}
                aria-expanded={pasajerosAbierto}
              >
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-gray-900">
                    {pasajeros} {pasajeros === 1 ? "Pas." : "Pas."}
                  </span>
                </div>
                <ChevronRight className={`h-3 w-3 transition-transform ${pasajerosAbierto ? "rotate-90" : ""}`} />
              </button>
              {pasajerosAbierto && (
                <div className="absolute z-[100] w-full mt-1 bg-white border rounded-lg shadow-lg">
                  <div className="p-3 space-y-3 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Pasajeros</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPasajeros(Math.max(1, pasajeros - 1))}
                          className="h-6 w-6 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100 transition-colors"
                          disabled={pasajeros <= 1}
                        >
                          -
                        </button>
                        <span className="text-xs font-medium w-4 text-center">{pasajeros}</span>
                        <button
                          onClick={() => setPasajeros(Math.min(10, pasajeros + 1))}
                          className="h-6 w-6 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100 transition-colors"
                          disabled={pasajeros >= 10}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => setPasajerosAbierto(false)}
                      className="w-full bg-blue-900 text-white py-1.5 rounded-md hover:bg-blue-800 transition-colors text-xs"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botón de búsqueda */}
          <div className="flex-1">
            <button
              onClick={buscarBoletos}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-1.5 px-2 rounded-md transition-colors flex items-center justify-center gap-1"
            >
              <span className="hidden md:inline text-xs">Buscar</span>
              <span className="inline md:hidden text-xs">Buscar</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
