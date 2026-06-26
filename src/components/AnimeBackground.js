'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';


export default function AnimeBackground() {
  const theme = 'goth';
  const isGoth = theme === 'goth';
  const isGlass = theme === 'glass';
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const orbs = containerRef.current.querySelectorAll('.bg-orb');
    

    anime({
      targets: orbs,
      translateX: () => anime.random(-250, 250),
      translateY: () => anime.random(-250, 250),
      scale: () => anime.random(0.8, 1.4),
      duration: () => anime.random(10000, 20000),
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
    });
  }, [theme]);


  const orbColors = isGlass 
    ? ['bg-[#3859a0]', 'bg-[#582882]', 'bg-[#1e7882]', 'bg-[#88c0ff]']
    : isGoth 
      ? ['bg-[#222222]', 'bg-[#111111]', 'bg-[#333333]', 'bg-[#1a1a1a]']
      : ['bg-[#f5b4c8]', 'bg-[#f0a0b4]', 'bg-[#f8d0dc]', 'bg-[#e890a8]'];


  const orbBaseStyles = [
    { width: '40vw', height: '40vw', top: '-10%', left: '-10%' },
    { width: '50vw', height: '50vw', top: '40%', left: '50%' },
    { width: '35vw', height: '35vw', top: '60%', left: '-5%' },
    { width: '45vw', height: '45vw', top: '-5%', left: '60%' },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0 bg-transparent">

      <div className="absolute inset-0 backdrop-blur-[120px] z-10 pointer-events-none" />
      
      {orbColors.map((color, i) => (
        <div
          key={i}
          className={`bg-orb absolute rounded-full ${color} opacity-60 transition-colors duration-1000`}
          style={{
            ...orbBaseStyles[i],
            minWidth: '300px',
            minHeight: '300px',
            filter: 'blur(100px)',
            mixBlendMode: isGoth ? 'normal' : 'multiply',
          }}
        />
      ))}
    </div>
  );
}

