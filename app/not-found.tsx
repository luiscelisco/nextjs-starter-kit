import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-4xl font-bold mb-4">Página no encontrada</h2>
      <p className="text-xl mb-4">No pudimos encontrar la página que buscas</p>
      <Link
        href="/"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
