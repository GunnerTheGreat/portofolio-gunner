'use client';

import { useState, useEffect, useRef } from 'react';

export default function AudioPlayer({ url }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Auto-play prevented", e));
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [url]);

  return (
    <audio 
      ref={audioRef} 
      src={url} 
      loop 
      style={{ display: 'none' }} 
    />
  );
}
