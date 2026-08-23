'use client';
import { useState } from 'react';
import Image from 'next/image';

type ViewerImage = { url: string; alt_text: string | null };
type ModelType = 'TRUE_3D' | 'IMAGE_360' | 'INTERACTIVE_2D' | null;

export default function ProductViewer3D({
  images, modelType, productName,
}: {
  images: ViewerImage[];
  modelType?: ModelType;
  productName: string;
}) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 500);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation(prev => prev + delta * 0.8);
    setStartX(e.clientX);
  };
  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    setRotation(prev => prev + delta * 0.8);
    setStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = () => setIsDragging(false);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-cream-warm flex items-center justify-center">
        <p className="text-sm text-ash">No images available</p>
      </div>
    );
  }

  // Use up to 8 frames for the 360 experience
  const frameCount = Math.min(images.length, 8);
  const currentFrame = Math.abs(Math.floor(rotation / 45)) % frameCount;
  const displayImage = images[currentFrame] || images[0];

  if (loading) {
    return (
      <div className="aspect-square bg-cream-warm flex items-center justify-center">
        <div className="w-8 h-8 border border-stone border-t-ink rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="aspect-square bg-cream-warm overflow-hidden relative cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        data-cursor="drag"
      >
        <Image
          src={displayImage.url}
          alt={displayImage.alt_text || productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          draggable={false}
        />
      </div>

      <div className="mt-5 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-ash font-light">
          {frameCount > 1 ? 'Drag to rotate' : 'Interactive View'}
        </p>
      </div>

      {frameCount > 1 && (
        <div className="mt-3 flex justify-center gap-1">
          {Array.from({ length: frameCount }).map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentFrame ? 'bg-ink' : 'bg-stone/60'}`} />
          ))}
        </div>
      )}
    </div>
  );
}
