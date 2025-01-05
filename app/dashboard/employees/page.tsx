import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { EmployeesList } from '../_components/employees-list'

export default async function EmployeesPage() {
  return (
    <div className='flex flex-col justify-center items-start flex-wrap px-4 pt-4 gap-4'>
      <Card className='w-full'>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">
              Empleados
            </CardTitle>
            <CardDescription>
              Gestiona y visualiza todos los empleados de la empresa
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            <Link href="/dashboard/employees/new" className="flex items-center gap-1">
              Añadir Empleado
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <EmployeesList />
        </CardContent>
      </Card>
    </div>
  )
}
