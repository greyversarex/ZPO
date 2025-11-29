import { useRef, useState, useEffect, useCallback } from 'react';
import { getCropTransformStyle } from '@/lib/cropUtils';

interface CroppedImageProps {
  src: string;
  alt?: string;
  cropX: number | null | undefined;
  cropY: number | null | undefined;
  cropZoom: number | null | undefined;
  className?: string;
}

export function CroppedImage({ src, alt = '', cropX, cropY, cropZoom, className = '' }: CroppedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    objectFit: 'cover',
    objectPosition: 'center center'
  });

  const updateStyle = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newStyle = getCropTransformStyle(cropX, cropY, cropZoom, rect.width, rect.height);
    setStyle(newStyle);
  }, [cropX, cropY, cropZoom]);

  useEffect(() => {
    updateStyle();

    const observer = new ResizeObserver(updateStyle);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [updateStyle]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full ${className}`}
        style={style}
      />
    </div>
  );
}
