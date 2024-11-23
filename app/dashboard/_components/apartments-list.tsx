"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, BedDouble, Bath, Square, MapPin } from 'lucide-react'
import { DynamicMap } from './map-client'

// Datos de ejemplo - En un caso real, esto vendría de una base de datos
const apartments = [
  {
    id: 1,
    title: "Apartamento Moderno Centro",
    location: "Centro Ciudad",
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    price: 250000,
    status: "Disponible",
    coordinates: {
      latitude: 40.4168,
      longitude: -3.7038
    }
  },
  {
    id: 2,
    title: "Ático de Lujo",
    location: "Zona Norte",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    price: 450000,
    status: "Reservado",
    coordinates: {
      latitude: 40.4233,
      longitude: -3.6927
    }
  },
  {
    id: 3,
    title: "Estudio Céntrico",
    location: "Centro Histórico",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    price: 150000,
    status: "Disponible",
    coordinates: {
      latitude: 40.4125,
      longitude: -3.7097
    }
  },
]

export function ApartmentsList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {apartments.map((apartment) => (
        <Card key={apartment.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {apartment.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {apartment.location}
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center">
                  <BedDouble className="h-4 w-4 mr-1" />
                  {apartment.bedrooms}
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {apartment.bathrooms}
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  {apartment.area}m²
                </div>
              </div>
              <div className="w-full">
                <DynamicMap 
                  latitude={apartment.coordinates.latitude} 
                  longitude={apartment.coordinates.longitude} 
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">
                  €{apartment.price.toLocaleString()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  apartment.status === "Disponible" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {apartment.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
