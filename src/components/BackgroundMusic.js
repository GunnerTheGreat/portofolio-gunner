'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';


export default function BackgroundMusic({ startPlaying }) {
  const theme = 'goth';
  const audioRef = useRef(null);
  const fadeInterval = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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


  const tracks = {
    glass: '/glass_bg.mp3',
    goth: '/goth_bg.mp3',
    cute: '/cute_bg.mp3'
  };

  const trackInfo = {
    glass: { title: 'Time', artist: 'Hans Zimmer', cover: '/glass.jpg' },
    goth: { title: 'Glow', artist: 'Mr. Kitty', cover: '/goth.jpg' },
    cute: { title: 'Poems are Forever', artist: 'Dan Salvato, Shoji', cover: '/cute.jpg' }
  };

  const [activeTrack, setActiveTrack] = useState(tracks[theme] || tracks.cute);


  useEffect(() => {
    if (startPlaying && !hasStarted && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(err => console.log("Audio autoplay failed:", err));
    }
  }, [startPlaying, hasStarted]);


  useEffect(() => {
    const newTrack = tracks[theme] || tracks.cute;
    if (newTrack === activeTrack) return;

    if (!hasStarted || !isPlaying || !audioRef.current) {
      setActiveTrack(newTrack);
      return;
    }

    if (fadeInterval.current) clearInterval(fadeInterval.current);

    let vol = audioRef.current.volume;
    fadeInterval.current = setInterval(() => {
      vol -= 0.1;
      if (vol <= 0) {
        vol = 0;
        clearInterval(fadeInterval.current);


        setActiveTrack(newTrack);


        setTimeout(() => {
          if (audioRef.current && isPlaying) {
            audioRef.current.volume = 0;
            audioRef.current.play().catch(console.log);

            fadeInterval.current = setInterval(() => {
              let v = audioRef.current.volume + 0.1;
              if (v >= 1) {
                v = 1;
                clearInterval(fadeInterval.current);
              }
              if (audioRef.current) audioRef.current.volume = v;
            }, 50);
          }
        }, 50);
      }
      if (audioRef.current) audioRef.current.volume = vol;
    }, 40);

    return () => {
      if (fadeInterval.current) clearInterval(fadeInterval.current);
    };
  }, [theme, hasStarted, isPlaying, activeTrack]);

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

  const isGoth = theme === 'goth';
  const isGlass = theme === 'glass';

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
            className={`fixed bottom-24 right-0 sm:top-6 sm:right-0 sm:bottom-auto z-[300] p-2 sm:px-4 sm:py-3 rounded-l-xl rounded-r-none border-2 border-r-0 flex items-center gap-2 sm:gap-3 shadow-xl transition-all duration-500 cursor-pointer origin-right scale-[0.85] sm:scale-100
              ${isScrolled && !isHovered ? 'translate-x-[calc(100%-2.5rem)] sm:translate-x-[calc(100%-4rem)]' : 'translate-x-0 hover:scale-[0.88] sm:hover:scale-105'}
              ${isGlass
                ? 'bg-[rgba(13,17,23,0.6)] border-[rgba(136,192,255,0.2)] text-[#e6edf3] hover:border-[rgba(136,192,255,0.5)] hover:shadow-[0_0_20px_rgba(136,192,255,0.2)]'
                : isGoth
                  ? 'bg-[#111] border-[#333] text-[#e0e0e0] hover:border-[#666] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                  : 'bg-[#fff8f0] border-[#f5b4c8] text-[#d4839a] hover:border-[#e890a8] hover:shadow-[0_4px_15px_rgba(245,180,200,0.3)]'
              }`}
            style={isGlass ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } : undefined}
          >
            <div className={`relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full overflow-hidden transition-colors duration-500
              ${isGlass ? 'bg-[rgba(136,192,255,0.1)] text-[#88c0ff]' : isGoth ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#fce4ec] text-[#f0a0b4]'}`}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={theme}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={trackInfo[theme]?.cover || trackInfo.cute.cover}
                  alt="Cover"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                {isPlaying ? <Music size={14} className="text-white animate-pulse sm:w-4 sm:h-4 w-3 h-3" /> : <VolumeX size={14} className="text-white sm:w-4 sm:h-4 w-3 h-3" />}
              </div>
            </div>
            <div className="flex flex-col text-left items-start overflow-hidden relative max-w-[120px] sm:min-w-[120px]">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider opacity-70 transition-colors duration-500">
                {isPlaying ? 'Now Playing' : 'Paused'}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <span className="text-xs sm:text-sm font-bold truncate max-w-[120px] sm:max-w-[160px] transition-colors duration-500">{trackInfo[theme]?.title}</span>
                  <span className="text-[10px] sm:text-xs opacity-75 truncate max-w-[120px] sm:max-w-[160px] transition-colors duration-500">{trackInfo[theme]?.artist}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

