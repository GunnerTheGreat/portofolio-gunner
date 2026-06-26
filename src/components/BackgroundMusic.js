'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function BackgroundMusic({ startPlaying }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.4) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackInfo = { title: 'Glow', artist: 'Mr. Kitty', cover: '/goth.jpg' };
  const activeTrack = '/goth_bg.mp3';

  useEffect(() => {
    if (startPlaying && !hasStarted && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(err => console.log("Audio autoplay failed:", err));
    }
  }, [startPlaying, hasStarted, volume]);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={activeTrack}
        loop
        preload="auto"
      />

      <AnimatePresence>
        {hasStarted && (
          <motion.button
            onClick={toggleMute}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isScrolled && !isHovered ? 0.6 : 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`fixed bottom-24 right-0 sm:top-6 sm:right-0 sm:bottom-auto z-[300] p-2 sm:px-4 sm:py-3 rounded-none border-2 border-r-0 flex items-center gap-2 sm:gap-3 shadow-xl transition-all duration-500 cursor-pointer origin-right scale-[0.85] sm:scale-100
              ${isScrolled && !isHovered ? 'translate-x-[calc(100%-2.5rem)] sm:translate-x-[calc(100%-4rem)]' : 'translate-x-0 hover:scale-[0.88] sm:hover:scale-105'}
              bg-[#111] border-[#333] text-[#e0e0e0] hover:border-[#ff1a1a] hover:shadow-[0_0_15px_rgba(255,26,26,0.3)]
            `}
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-none border border-[#333] overflow-hidden transition-colors duration-500 bg-[#1a1a1a] text-[#888]">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5 }}
                src={trackInfo.cover}
                alt="Cover"
                className="absolute inset-0 w-full h-full object-cover grayscale-[50%]"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                {isPlaying ? <Music size={14} className="text-[#ff1a1a] animate-pulse sm:w-4 sm:h-4 w-3 h-3" /> : <VolumeX size={14} className="text-[#e0e0e0] sm:w-4 sm:h-4 w-3 h-3" />}
              </div>
            </div>
            <div className="flex flex-col text-left items-start overflow-hidden relative max-w-[120px] sm:min-w-[120px]">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff1a1a] transition-colors duration-500">
                {isPlaying ? 'Now Playing' : 'Paused'}
              </span>
              <div className="flex flex-col w-full font-mono mt-0.5">
                <span className="text-xs sm:text-sm font-bold truncate max-w-[120px] sm:max-w-[160px] text-[#e0e0e0] uppercase">{trackInfo.title}</span>
                <span className="text-[10px] sm:text-xs text-[#888] truncate max-w-[120px] sm:max-w-[160px] uppercase">{trackInfo.artist}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const newVol = parseFloat(e.target.value);
                  setVolume(newVol);
                  if (audioRef.current) audioRef.current.volume = newVol;
                }}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="rigid-slider w-full h-1.5 mt-2 rounded-none cursor-pointer transition-colors duration-500 text-[#ff1a1a] bg-[#333]"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

