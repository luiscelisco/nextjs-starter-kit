"use client"

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

interface MapClientProps {
  latitude: number
  longitude: number
}

const MapClient = ({ latitude, longitude }: MapClientProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let isMounted = true

    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default

        if (!isMounted || !mapRef.current) return

        // Limpiar mapa existente si existe
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }

        // Asegurarse de que el contenedor tenga dimensiones
        mapRef.current.style.height = '200px'
        mapRef.current.style.width = '100%'

        // Configurar el icono del marcador
        const icon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })

        // Crear nueva instancia del mapa con opciones específicas
        const map = L.map(mapRef.current, {
          center: [latitude, longitude],
          zoom: 15,
          scrollWheelZoom: false,
          attributionControl: true
        })

        mapInstanceRef.current = map

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: ' OpenStreetMap contributors'
        }).addTo(map)

        L.marker([latitude, longitude], { icon }).addTo(map)

        // Usar requestAnimationFrame para asegurar que el DOM está listo
        requestAnimationFrame(() => {
          if (map && isMounted) {
            map.invalidateSize()
          }
        })

      } catch (error) {
        console.error('Error initializing map:', error)
      }
    }

    // Pequeño delay para asegurar que el DOM está listo
    const timer = setTimeout(() => {
      initMap()
    }, 100)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [latitude, longitude])

  return (
    <div 
      ref={mapRef}
      className="h-[200px] w-full rounded-md relative"
    />
  )
}

// Exportar el componente como dinámico con un componente de carga
export const DynamicMap = dynamic(() => Promise.resolve(MapClient), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] w-full rounded-md bg-muted flex items-center justify-center">
      <span className="text-muted-foreground">Cargando mapa...</span>
    </div>
  )
})
