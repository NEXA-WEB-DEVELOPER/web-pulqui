"use client"

import { useEffect, useRef } from "react"

export default function VideoModal() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("videoModal")
      if (modal && event.target === modal) {
        modal.style.transform = "scale(0)"

        // Pause video if playing
        if (videoRef.current) {
          videoRef.current.pause()
        }
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const modal = document.getElementById("videoModal")
        if (modal) {
          modal.style.transform = "scale(0)"

          // Pause video if playing
          if (videoRef.current) {
            videoRef.current.pause()
          }
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
      id="videoModal"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-transform duration-300 scale-0"
    >
      <div className="bg-white/80 border border-blue-900 p-4 md:p-6 rounded-br-4xl shadow-2xl max-w-4xl w-full mx-4">
        <div className="relative">
          <button
            className="absolute -top-10 right-0 bg-white rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-md"
            onClick={() => {
              const modal = document.getElementById("videoModal")
              if (modal) modal.style.transform = "scale(0)"
              if (videoRef.current) videoRef.current.pause()
            }}
          >
            ×
          </button>

          <video
            ref={videoRef}
            controls
            preload="metadata"
            poster="https://elpulqui.com/resources/images/clients/index/video.jpg"
            className="w-full rounded-br-2xl"
          >
            <source src="https://elpulqui.com/resources/videos/destinos_video.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </div>
    </div>
  )
}

