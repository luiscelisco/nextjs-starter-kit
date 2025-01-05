import Image from 'next/image';

interface Logo {
  url: string;
  alt: string;
}

const logos: Logo[] = [
  // Asumiendo que estos son tus logos actuales
  { url: '/logos/logo1.png', alt: 'Logo 1' },
  { url: '/logos/logo2.png', alt: 'Logo 2' },
  // ... más logos
];

export function StaticLogoCloud() {
  return (
    <div className="relative flex h-20 w-full items-center justify-center gap-4 overflow-hidden bg-white dark:bg-black">
      <div className="flex items-center justify-around gap-4">
        {logos.map((logo, i) => (
          <div key={i} className="relative h-16 w-16">
            <Image
              src={logo.url}
              alt={logo.alt}
              fill
              className="object-contain"
              sizes="(max-width: 64px) 100vw, 64px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}