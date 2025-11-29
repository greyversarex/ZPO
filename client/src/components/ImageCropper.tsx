import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropperProps {
  imageUrl: string;
  aspectRatio?: number;
  initialCrop?: { x: number; y: number };
  initialZoom?: number;
  onCropComplete: (cropData: { x: number; y: number; zoom: number; croppedArea: CropArea }) => void;
  onCancel?: () => void;
}

export function ImageCropper({
  imageUrl,
  aspectRatio = 16 / 9,
  initialCrop = { x: 0, y: 0 },
  initialZoom = 1,
  onCropComplete,
  onCancel
}: ImageCropperProps) {
  const [crop, setCrop] = useState(initialCrop);
  const [zoom, setZoom] = useState(initialZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [croppedAreaPercentages, setCroppedAreaPercentages] = useState<CropArea | null>(null);

  const onCropChange = useCallback((location: { x: number; y: number }) => {
    setCrop(location);
  }, []);

  const onZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const onCropCompleteInternal = useCallback(
    (croppedArea: CropArea, croppedAreaPx: CropArea) => {
      setCroppedAreaPercentages(croppedArea);
      setCroppedAreaPixels(croppedAreaPx);
    },
    []
  );

  const handleSave = () => {
    if (croppedAreaPercentages) {
      onCropComplete({
        x: crop.x,
        y: crop.y,
        zoom,
        croppedArea: croppedAreaPercentages
      });
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[300px] bg-muted rounded-md overflow-hidden">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropCompleteInternal}
          showGrid={true}
          style={{
            containerStyle: {
              borderRadius: "0.375rem"
            }
          }}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <ZoomOut className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(value) => setZoom(value[0])}
            className="flex-1"
            data-testid="slider-zoom"
          />
          <ZoomIn className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground w-12 text-right">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            data-testid="button-reset-crop"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Сброс
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
              data-testid="button-cancel-crop"
            >
              Отмена
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            data-testid="button-save-crop"
          >
            Применить
          </Button>
        </div>
      </div>
    </div>
  );
}

interface CroppedImageProps {
  src: string;
  alt: string;
  cropX?: number;
  cropY?: number;
  cropZoom?: number;
  className?: string;
}

export function CroppedImage({
  src,
  alt,
  cropX = 0,
  cropY = 0,
  cropZoom = 1,
  className = ""
}: CroppedImageProps) {
  const scale = cropZoom || 1;
  const translateX = -(cropX || 0);
  const translateY = -(cropY || 0);

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          transform: `translate(${translateX}%, ${translateY}%) scale(${scale})`,
          transformOrigin: "center center"
        }}
      />
    </div>
  );
}
