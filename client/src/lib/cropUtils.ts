export function getCropTransformStyle(
  cropX: number | null | undefined,
  cropY: number | null | undefined,
  cropZoom: number | null | undefined,
  containerWidth: number = 0,
  containerHeight: number = 0
): React.CSSProperties {
  const x = cropX ?? 0;
  const y = cropY ?? 0;
  const zoom = cropZoom ?? 1;

  if (zoom <= 1) {
    return {
      objectFit: "cover" as const,
      objectPosition: "center center"
    };
  }

  const maxPanX = (containerWidth * (zoom - 1)) / 2;
  const maxPanY = (containerHeight * (zoom - 1)) / 2;

  const translateX = -(x / 100) * maxPanX;
  const translateY = -(y / 100) * maxPanY;

  return {
    objectFit: "cover" as const,
    transform: `translate(${translateX}px, ${translateY}px) scale(${zoom})`,
    transformOrigin: "center center"
  };
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
      objectFit: "cover" as const,
      objectPosition: "center center"
    };
  }

  const normalizedX = x / 100;
  const normalizedY = y / 100;

  const posX = 50 - (normalizedX * 50);
  const posY = 50 - (normalizedY * 50);

  return {
    objectFit: "cover" as const,
    objectPosition: `${Math.round(posX)}% ${Math.round(posY)}%`,
    transform: `scale(${zoom})`,
    transformOrigin: `${Math.round(posX)}% ${Math.round(posY)}%`
  };
}
