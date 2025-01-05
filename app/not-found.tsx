import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '24px'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>
        404 - Página no encontrada
      </h1>
      <Link
        href="/"
        style={{ 
          color: '#2563eb',
          textDecoration: 'underline' 
        }}
      >
        Volver al inicio
      </Link>
    </div>
  )
}
