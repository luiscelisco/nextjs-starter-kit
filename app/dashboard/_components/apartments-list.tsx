"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, BedDouble, Bath, Square, MapPin } from 'lucide-react'
import { DynamicMap } from './map-client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Apartment {
  id: number
  title: string
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  price: number
  status: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

export function ApartmentsList() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchApartments() {
      try {
        const { data, error } = await supabase
          .from('apartments')
          .select('*')
        
        if (error) {
          console.error('Error al cargar apartamentos:', error)
          return
        }

        setApartments(data || [])
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApartments()
  }, [])

  if (loading) {
    return <div className="text-center py-4">Cargando apartamentos...</div>
  }

  if (apartments.length === 0) {
    return <div className="text-center py-4">No hay apartamentos disponibles</div>
  }

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
