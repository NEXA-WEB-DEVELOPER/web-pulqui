"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, FileText, Instagram, Linkedin, Facebook, ChevronUp } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [fileError, setFileError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("")
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Validar tamaño (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFileError("El archivo es demasiado grande. Máximo 5MB.")
        return
      }

      // Validar tipo
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!validTypes.includes(selectedFile.type)) {
        setFileError("Solo se permiten archivos PDF o Word (.doc, .docx)")
        return
      }

      setFile(selectedFile)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !file) {
      return
    }

    // En una implementación real, aquí enviaríamos el CV
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setEmail("")
      setFile(null)
      setSubmitted(false)
    }, 3000)
  }

  const handleModalOpen = (modalId: string) => {
    const modal = document.getElementById(modalId)
    if (modal) modal.style.transform = "scale(1)"
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-blue-900 text-white relative z-10">
      {/* Decoración superior */}
      {/*<div className="w-full h-12 bg-orange-500 rounded-bl-[80px] rounded-br-[80px] relative -top-6 mx-auto transform -skew-y-1"></div>*/}

      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* CV Form */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl mb-4 font-semibold flex items-center justify-center md:justify-start gap-2">
              <FileText size={20} className="text-orange-500" />
              ¿Quieres trabajar con nosotros?
            </h3>
            <p className="text-gray-300 mb-6">
              Envíanos tu CV y forma parte de nuestro equipo. Valoramos la experiencia, pero también las ganas de
              aprender y crecer.
            </p>

            {submitted ? (
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-white">
                <p className="font-medium">¡Gracias por tu interés!</p>
                <p className="text-sm mt-1">
                  Hemos recibido tu CV correctamente. Nos pondremos en contacto contigo pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="relative mb-4">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={18} />
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="pl-10 p-3 rounded text-black w-full border-2 border-transparent focus:border-orange-500 outline-none transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative mb-2">
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors cursor-pointer bg-white/80">
                    <input
                      type="file"
                      id="cvFile"
                      accept=".pdf,.doc,.docx"
                      className="opacity-0 absolute inset-0 z-10 cursor-pointer"
                      onChange={handleFileChange}
                      required
                    />
                    <label
                      htmlFor="cvFile"
                      className="cursor-pointer flex flex-col items-center justify-center text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-900 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      {file ? (
                        <span className="font-medium text-blue-900 truncate max-w-full block">
                          {file.name.length > 25 ? file.name.substring(0, 22) + "..." : file.name}
                        </span>
                      ) : (
                        <span>Seleccionar tu CV (PDF o Word)</span>
                      )}
                    </label>
                  </div>

                  {fileError && <p className="text-orange-300 text-xs mt-1">{fileError}</p>}
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded-lg transition-colors mt-4 flex items-center justify-center gap-2 font-medium"
                >
                  <Send size={18} />
                  Enviar CV
                </button>
              </form>
            )}
          </div>

          {/* Logo and Company Info */}
          <div className="flex flex-col items-center justify-center">
            <Image
              src="https://elpulqui.com/resources/images/logos/logo_white_long.png"
              alt="El Pulqui Logo"
              width={300}
              height={100}
              className="mb-8"
              unoptimized
            />

            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-full flex-shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <p className="text-sm">Blvd. Hipólito Yrigoyen 302, Reconquista (3560)</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-full flex-shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <p className="text-sm">0810-810-9999 / 3482-669999</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-full flex-shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <p className="text-sm">info@elpulqui.com.ar</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/elpulquiok/"
                target="_blank"
                className="bg-white/10 p-2 rounded-full hover:bg-orange-500 transition-colors"
                aria-label="Instagram"
                rel="noreferrer"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="https://ar.linkedin.com/company/elpulqui"
                target="_blank"
                className="bg-white/10 p-2 rounded-full hover:bg-orange-500 transition-colors"
                aria-label="LinkedIn"
                rel="noreferrer"
              >
                <Linkedin size={20} className="text-white" />
              </a>
              <a
                href="https://www.facebook.com/ElPulqui/"
                target="_blank"
                className="bg-white/10 p-2 rounded-full hover:bg-orange-500 transition-colors"
                aria-label="Facebook"
                rel="noreferrer"
              >
                <Facebook size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl mb-6 font-semibold text-center md:text-left">Enlaces rápidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-y-4 gap-x-2">
              <a href="#home" className="group flex items-center hover:text-orange-500 transition-colors">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform"></span>
                Home
              </a>
              <a
                href="#"
                className="group flex items-center hover:text-orange-500 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  handleModalOpen("reclamosModal")
                }}
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform"></span>
                Reclamos
              </a>
              <a href="#nosotros" className="group flex items-center hover:text-orange-500 transition-colors">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform"></span>
                Nosotros
              </a>
              <a href="#promos" className="group flex items-center hover:text-orange-500 transition-colors">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform"></span>
                Promociones
              </a>
              <a
                href="#"
                className="group flex items-center hover:text-orange-500 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  handleModalOpen("contactoModal")
                }}
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform"></span>
                Contacto
              </a>
              <a href="#destinos" className="group flex items-center hover:text-orange-500 transition-colors">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform"></span>
                Destinos
              </a>
              <a
                href="https://pulqui.vercel.app/search"
                className="group flex items-center hover:text-orange-500 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform"></span>
                Nuevo boleto
              </a>
              <a
                href="https://fideclub.sittnet.net/login.aspx?id=0E2D7E0D-ED54-432D-B237-36FD8F6BE308"
                className="group flex items-center hover:text-orange-500 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform"></span>
                Club Pulqui
              </a>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold mb-2 text-orange-500">Nuestros Horarios</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="flex justify-between">
                  <span>Lunes a Viernes:</span>
                  <span>8:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábados:</span>
                  <span>9:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingos y Feriados:</span>
                  <span>10:00 - 15:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Empresas Asociadas */}
        <div className="py-6 border-t border-white/20 mb-6">
          <h4 className="text-center mb-6 text-sm uppercase tracking-wider text-gray-300">Empresas asociadas</h4>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <a
              href="https://www.instagram.com/turismo.vantur/"
              target="_blank"
              className="p-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
              rel="noreferrer"
            >
              <Image
                src="https://elpulqui.com/resources/images/logos/vantur.png"
                alt="Van Tur"
                width={160}
                height={80}
                unoptimized
              />
            </a>
            <div className="p-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
              <Image
                src="https://elpulqui.com/resources/images/logos/la-tosta.png"
                alt="La Tostadense"
                width={160}
                height={80}
                unoptimized
              />
            </div>
            <a
              href="https://www.instagram.com/pulquipack/"
              target="_blank"
              className="p-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
              rel="noreferrer"
            >
              <Image
                src="https://elpulqui.com/resources/images/logos/pulqui-pack.png"
                alt="Pulqui Pack"
                width={160}
                height={80}
                unoptimized
              />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-6">
          <p className="text-sm text-gray-300">Copyright © {new Date().getFullYear()} El Pulqui S.A. - Todos los derechos reservados</p>

          <div className="mt-4 md:mt-0">
            <button
              onClick={scrollToTop}
              className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors animate-bounce"
              aria-label="Volver arriba"
            >
              <ChevronUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

