import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-6 bg-background">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          404
        </h1>
        <h2 className="text-2xl font-semibold">Página no encontrada</h2>
        <p className="text-muted-foreground">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          Volver al inicio
        </Link>
      </Button>
    </div>
  )
}
