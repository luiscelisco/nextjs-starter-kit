import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Página no encontrada</h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Lo sentimos, no pudimos encontrar la página que buscas.
        </p>
        <div className="mt-10">
          <Button
            variant="default"
            onClick={() => window.location.href = '/'}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </main>
  )
}
