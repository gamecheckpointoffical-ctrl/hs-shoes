'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface ProductViewer3DProps {
  images: { url: string; alt_text: string | null }[];
  modelType: string;
  productName: string;
}

export default function ProductViewer3D({ images, modelType, productName }: ProductViewer3DProps) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalAngles = images.length;
  const isTrue3D = modelType === 'TRUE_3D';
  const isInteractive2D = modelType === 'INTERACTIVE_2D' || modelType === 'IMAGE_360';

  useEffect(() => {
    if (images.length > 0) {
      const img = new Image();
      img.src = images[0].url;
      img.onload = () => setLoading(false);
      img.onerror = () => { setLoading(false); setError(true); };
    } else {
      setLoading(false);
      setError(true);
    }
  }, [images]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isInteractive2D) return;
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isInteractive2D) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 30) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrentAngle(prev => (prev + direction + totalAngles) % totalAngles);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isInteractive2D) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isInteractive2D) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 30) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrentAngle(prev => (prev + direction + totalAngles) % totalAngles);
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const resetView = () => setCurrentAngle(0);

  if (loading) {
    return (
      <div className="aspect-square bg-stone flex items-center justify-center">
        <div className="skeleton w-full h-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="aspect-square bg-stone flex items-center justify-center flex-col gap-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-ash">
          <circle cx="12" cy="12" r="10" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <p className="text-sm text-ash">Unable to load product view</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Viewer label */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-cream/80 backdrop-blur-sm px-3 py-1.5">
        <span className="w-1.5 h-1.5 bg-gold rounded-full" />
        <span className="text-[10px] uppercase tracking-widest">
          {isTrue3D ? '3D View' : 'Interactive View — Drag to Rotate'}
        </span>
      </div>

      {/* Reset button */}
      {isInteractive2D && (
        <button
          onClick={resetView}
          className="absolute top-4 right-4 z-10 bg-cream/80 backdrop-blur-sm p-2 hover:bg-cream transition-colors"
          aria-label="Reset view"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      )}

      {/* Main viewer */}
      <div
        ref={containerRef}
        className="aspect-square bg-stone overflow-hidden relative cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: idx === currentAngle ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.alt_text || `${productName} view ${idx + 1}`}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Angle indicators */}
      {isInteractive2D && totalAngles > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentAngle(idx)}
              className={`h-1 transition-all duration-300 ${
                idx === currentAngle ? 'w-8 bg-ink' : 'w-2 bg-ash/40'
              }`}
              aria-label={`View ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Hint text */}
      {isInteractive2D && (
        <p className="text-center text-xs text-ash mt-3">
          Drag horizontally to rotate · {currentAngle + 1} of {totalAngles}
        </p>
      )}
    </div>
  );
}
