'use client';

import React, { useEffect, useRef, useState } from 'react';


export default function WavesCursor() {
  const theme = 'goth';
  const isGoth = theme === 'goth';
  const isGlass = theme === 'glass';
  const isCute = theme === 'cute';

  const svgRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef(null);


  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const points = useRef([]);

  const [radiusStart, setRadiusStart] = useState(250);
  const nbrParticles = isGoth ? 25 : 50;

  const colors = {
    glass: { color1: '#88c0ff', color2: '#5b9bd5' },
    goth: { color1: '#ff1a1a', color2: '#4a0000' },
    cute: { color1: '#f5b4c8', color2: '#f0a0b4' }
  };

  const currentColors = colors[theme] || colors.cute;
  const gradientId = "waves-gradient";

  useEffect(() => {

    mouse.current.x = window.innerWidth / 2;
    mouse.current.y = window.innerHeight / 2;
    pos.current.x = mouse.current.x;
    pos.current.y = mouse.current.y;

    const updateRadius = () => {
      const diag = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2));
      setRadiusStart(isGoth ? 60 : diag / 5);
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);

    points.current = Array(nbrParticles).fill().map(() => ({
      x: mouse.current.x,
      y: mouse.current.y
    }));

    const onMouseMove = (e) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        mouse.current.x = e.clientX - rect.left;
        mouse.current.y = e.clientY - rect.top;
      }
    };

    const onTouchMove = (e) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        mouse.current.x = e.touches[0].clientX - rect.left;
        mouse.current.y = e.touches[0].clientY - rect.top;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const loop = () => {

      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;


      let posTrail = { x: pos.current.x, y: pos.current.y };

      for (let i = 0; i < points.current.length; i++) {
        const point = points.current[i];
        const nextParticle = points.current[i + 1] || points.current[0];

        point.x = posTrail.x;
        point.y = posTrail.y;

        if (particlesRef.current[i]) {
          particlesRef.current[i].setAttribute('cx', posTrail.x);
          particlesRef.current[i].setAttribute('cy', posTrail.y);
        }

        const delta = 0.45;
        posTrail.x += (nextParticle.x - point.x) * delta;
        posTrail.y += (nextParticle.y - point.y) * delta;
      }

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', updateRadius);
      cancelAnimationFrame(requestRef.current);
    };
  }, [nbrParticles]);

  const radiusDiff = radiusStart / nbrParticles;
  const getRadius = (i) => Math.max(0, radiusStart - (i * radiusDiff));

  if (isCute) return null;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        width: '100%',
        height: '100%',
        opacity: isGlass ? 0.3 : isGoth ? 0.6 : 0.35,
        mixBlendMode: isGoth ? 'normal' : 'screen'
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentColors.color1} />
          <stop offset="100%" stopColor={currentColors.color2} />
        </linearGradient>
        {isGoth && (
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        )}
      </defs>

      <g className="particles" filter={isGoth ? 'url(#goo)' : undefined}>
        {Array(nbrParticles).fill().map((_, i) => (
          <circle
            key={i}
            ref={el => particlesRef.current[i] = el}
            r={getRadius(i)}
            cx={-1000}
            cy={-1000}
            fill={isGoth ? currentColors.color1 : "none"}
            stroke={isGoth ? "none" : `url(#${gradientId})`}
            strokeWidth={isGoth ? 0 : 1.5}
            strokeOpacity={0.25}
            className="transition-colors duration-500"
            style={{
              willChange: 'cx, cy'
            }}
          />
        ))}
      </g>
    </svg>
  );
}

