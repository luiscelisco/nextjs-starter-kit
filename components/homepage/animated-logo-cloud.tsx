import Image from 'next/image';
import { useEffect, useState } from 'react';

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

export function AnimatedLogoCloud() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative flex h-20 w-full items-center justify-center gap-4 overflow-hidden bg-white dark:bg-black [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
      <div className="flex min-w-full shrink-0 animate-infinite-scroll items-center justify-around gap-4">
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
      <div className="flex min-w-full shrink-0 animate-infinite-scroll items-center justify-around gap-4">
        {logos.map((logo, i) => (
          <div key={`duplicate-${i}`} className="relative h-16 w-16">
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