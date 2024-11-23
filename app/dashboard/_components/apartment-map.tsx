"use client"

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Corregir el problema de los íconos de Leaflet en Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface ApartmentMapProps {
  latitude: number
  longitude: number
}

export function ApartmentMap({ latitude, longitude }: ApartmentMapProps) {
  useEffect(() => {
    // Crear un ID único para cada instancia del mapa
    const mapId = `map-${latitude}-${longitude}`
    const container = document.getElementById(mapId)
    
    // Verificar si el contenedor existe y si ya tiene un mapa
    if (container && !container.hasChildNodes()) {
      const map = L.map(mapId).setView([latitude, longitude], 15)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: ' OpenStreetMap contributors'
      }).addTo(map)

      L.marker([latitude, longitude], { icon }).addTo(map)

      // Deshabilitar zoom con la rueda del ratón para evitar el scroll accidental
      map.scrollWheelZoom.disable()

      return () => {
        map.remove()
      }
    }
  }, [latitude, longitude])

  return (
    <div 
      id={`map-${latitude}-${longitude}`} 
      className="h-[200px] w-full rounded-md" 
    />
  )
}
