import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  isPlaying: boolean;
  onEnded?: () => void;
}

export function VideoPlayer({ src, isPlaying, onEnded }: VideoPlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    } else {
      player.pause();
    }

    return () => {
      // Guardar una referencia al player actual antes de la limpieza
      const currentPlayer = player;
      if (currentPlayer) {
        currentPlayer.pause();
      }
    };
  }, [isPlaying]); // Agregamos isPlaying como dependencia

  return (
    <video
      ref={playerRef}
      src={src}
      className="h-full w-full rounded-md object-cover"
      onEnded={onEnded}
      playsInline
      muted
    />
  );
}