"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin, Building2, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"

interface Employee {
  id: number
  name: string
  email: string
  phone: string
  position: string
  department: string
  location: string
  status: string
  avatar_url: string
}

export function EmployeesList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
      
      if (error) {
        console.error('Error al cargar empleados:', error)
        return
      }

      setEmployees(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>, employeeId: number) {
    try {
      const file = event.target.files?.[0]
      if (!file) {
        toast({
          title: "Error",
          description: "Por favor, selecciona una imagen",
          variant: "destructive",
        })
        return
      }

      // Validar el tamaño del archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "La imagen no debe superar los 5MB",
          variant: "destructive",
        })
        return
      }

      // Validar el tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "El archivo debe ser una imagen",
          variant: "destructive",
        })
        return
      }

      setUploading(employeeId)

      // Subir imagen a Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${employeeId}-${Date.now()}.${fileExt}`

      // Subir el archivo
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('avatars')
        .upload(`profiles/${fileName}`, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('Error al subir la imagen:', uploadError)
        throw new Error('No se pudo subir la imagen: ' + uploadError.message)
      }

      if (!uploadData?.path) {
        throw new Error('No se recibió la ruta del archivo')
      }

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(`profiles/${fileName}`)

      if (!publicUrl) {
        throw new Error('No se pudo obtener la URL pública de la imagen')
      }

      // Actualizar el avatar_url en la base de datos
      const { error: updateError } = await supabase
        .from('employees')
        .update({ avatar_url: publicUrl })
        .eq('id', employeeId)

      if (updateError) {
        console.error('Error al actualizar el empleado:', updateError)
        throw new Error('No se pudo actualizar la información del empleado: ' + updateError.message)
      }

      // Actualizar la lista de empleados
      await fetchEmployees()

      toast({
        title: "¡Éxito!",
        description: "La foto del empleado se ha actualizado correctamente",
      })

    } catch (error) {
      console.error('Error en handleImageUpload:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo actualizar la foto del empleado",
        variant: "destructive",
      })
    } finally {
      setUploading(null)
      // Limpiar el input file
      if (event.target) {
        event.target.value = ''
      }
    }
  }

  function getInitials(name: string) {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return <div className="text-center py-4">Cargando empleados...</div>
  }

  if (employees.length === 0) {
    return <div className="text-center py-4">No hay empleados registrados</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {employees.map((employee) => (
        <Card key={employee.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="h-32 w-32">
                  {employee.avatar_url ? (
                    <AvatarImage 
                      src={employee.avatar_url} 
                      alt={employee.name}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="text-2xl">{getInitials(employee.name)}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-32 w-32 rounded-full bg-black/50 hover:bg-black/70"
                    disabled={uploading === employee.id}
                    asChild
                  >
                    <label>
                      <Upload className="h-8 w-8 text-white" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, employee.id)}
                        disabled={uploading === employee.id}
                      />
                    </label>
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">
                  {employee.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {employee.position}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                {employee.department}
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                {employee.email}
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                {employee.phone}
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                {employee.location}
              </div>
              <div className="pt-2 flex justify-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  employee.status === "Activo" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {employee.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
