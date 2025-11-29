import { useRef, useState, useEffect, useCallback } from 'react';

interface CropStyle {
  transform: string;
  transformOrigin: string;
  objectFit: 'cover';
}

export function useCropStyle(
  cropX: number | null | undefined,
  cropY: number | null | undefined,
  cropZoom: number | null | undefined
): { ref: React.RefObject<HTMLDivElement>; style: CropStyle } {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CropStyle>({
    transform: 'none',
    transformOrigin: 'center center',
    objectFit: 'cover'
  });

  const x = cropX ?? 0;
  const y = cropY ?? 0;
  const zoom = cropZoom ?? 1;

  const updateStyle = useCallback(() => {
    if (!ref.current) return;

    if (zoom <= 1 && x === 0 && y === 0) {
      setStyle({
        transform: 'none',
        transformOrigin: 'center center',
        objectFit: 'cover'
      });
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;

    const maxPanX = (containerWidth * (zoom - 1)) / 2;
    const maxPanY = (containerHeight * (zoom - 1)) / 2;

    const translateX = -(x / 100) * maxPanX;
    const translateY = -(y / 100) * maxPanY;

    setStyle({
      transform: `translate(${translateX}px, ${translateY}px) scale(${zoom})`,
      transformOrigin: 'center center',
      objectFit: 'cover'
    });
  }, [x, y, zoom]);

  useEffect(() => {
    updateStyle();

    const observer = new ResizeObserver(updateStyle);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [updateStyle]);

  return { ref, style };
}

export function getCropStyle(
  cropX: number | null | undefined,
  cropY: number | null | undefined,
  cropZoom: number | null | undefined
): React.CSSProperties {
  const x = cropX ?? 0;
  const y = cropY ?? 0;
  const zoom = cropZoom ?? 1;

  if (zoom <= 1 || (x === 0 && y === 0)) {
    return {
      objectFit: 'cover' as const,
      objectPosition: 'center center'
    };
  }

  const posX = 50 - (x / 100) * 50;
  const posY = 50 - (y / 100) * 50;

  return {
    objectFit: 'cover' as const,
    objectPosition: `${Math.round(posX)}% ${Math.round(posY)}%`,
    transform: `scale(${zoom})`,
    transformOrigin: `${Math.round(posX)}% ${Math.round(posY)}%`
  };
}
