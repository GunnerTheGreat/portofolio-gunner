'use client';

import { useState } from 'react';


const MAGNIFIER_SIZE = 150;
const ZOOM_LEVEL = 3;

export default function ImageMagnifier({ src, alt }) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const [bgSize, setBgSize] = useState({ w: 0, h: 0 });

  if (!src) return null;

  const handleMouseEnter = (e) => {
    setShowMagnifier(true);
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setBgSize({ w: width * ZOOM_LEVEL, h: height * ZOOM_LEVEL });
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    const x = e.clientX - left;
    const y = e.clientY - top;

    setCursorPosition({ x, y });

    const bgX = (x * ZOOM_LEVEL) - (MAGNIFIER_SIZE / 2);
    const bgY = (y * ZOOM_LEVEL) - (MAGNIFIER_SIZE / 2);

    setBgPosition({ x: bgX, y: bgY });
  };

  return (
    <div
      className="relative w-full h-auto overflow-hidden cursor-crosshair rounded-none border border-[#222]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt || 'Gallery Image'}
        className="w-full h-auto object-cover"
      />

      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            left: `${cursorPosition.x - (MAGNIFIER_SIZE / 2)}px`,
            top: `${cursorPosition.y - (MAGNIFIER_SIZE / 2)}px`,
            pointerEvents: "none",
            height: `${MAGNIFIER_SIZE}px`,
            width: `${MAGNIFIER_SIZE}px`,
            border: "2px solid #ff1a1a",
            backgroundColor: "#050505",
            backgroundImage: `url("${src}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${bgSize.w}px ${bgSize.h}px`,
            backgroundPosition: `-${bgPosition.x}px -${bgPosition.y}px`,
            zIndex: 50,
            borderRadius: "0",
            boxShadow: "0 0 30px rgba(255, 26, 26, 0.2), inset 0 0 20px rgba(255, 26, 26, 0.4)"
          }}
        />
      )}
    </div>
  );
}
