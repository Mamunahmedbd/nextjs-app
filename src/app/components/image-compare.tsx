"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
  width?: number | string;
  height?: number | string;
}

const ImageCompare: React.FC<ImageCompareProps> = ({
  beforeImage,
  afterImage,
  width = "100%",
  height = "400px",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // Slider starts at 50%

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((event.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100)); // Clamp to [0, 100]
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position =
      ((event.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100)); // Clamp to [0, 100]
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-ew-resize"
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${beforeImage})` }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${afterImage})`,
          clipPath: `inset(0 0 0 ${sliderPosition}%)`,
        }}
      />
      <div
        className="absolute top-0 bottom-0 w-1 bg-white border border-gray-300 cursor-ew-resize transform -translate-x-1/2"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
          <ChevronLeft className="h-6 w-6 text-green-600" />
          <ChevronRight className="h-6 w-6 text-green-600" />
        </div>
      </div>
    </div>
  );
};

export default ImageCompare;
