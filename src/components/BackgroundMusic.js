'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, X } from 'lucide-react';

export default function BackgroundMusic({ startPlaying }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const [isExpanded, setIsExpanded] = useState(false);
  const [lyrics, setLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const lyricsContainerRef = useRef(null);

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

  useEffect(() => {
    fetch('/Mr.Kitty - Glow.lrc')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const parsedLyrics = [];
        const regex = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/;
        lines.forEach(line => {
          const match = regex.exec(line);
          if (match) {
            const m = parseInt(match[1]);
            const s = parseInt(match[2]);
            const ms = parseInt(match[3]);
            const time = m * 60 + s + ms / 100;
            const textContent = match[4].trim();
            if (textContent) {
              parsedLyrics.push({ time, text: textContent });
            }
          }
        });
        setLyrics(parsedLyrics);
      })
      .catch(err => console.error("Failed to load lyrics:", err));
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

  useEffect(() => {
    if (isExpanded && lyricsContainerRef.current && currentLyricIndex >= 0) {
      const activeElement = lyricsContainerRef.current.children[currentLyricIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentLyricIndex, isExpanded]);

  const handleTimeUpdate = () => {
    if (!audioRef.current || lyrics.length === 0) return;
    const current = audioRef.current.currentTime;
    
    let activeIndex = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (current >= lyrics[i].time) {
        activeIndex = i;
      } else {
        break;
      }
    }
    
    if (activeIndex !== currentLyricIndex) {
      setCurrentLyricIndex(activeIndex);
    }
  };

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
        onTimeUpdate={handleTimeUpdate}
      />

      <AnimatePresence>
        {hasStarted && (
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isScrolled && !isHovered && !isExpanded ? 0.6 : 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`fixed bottom-24 right-0 sm:top-6 sm:right-0 sm:bottom-auto z-[300] rounded-none border-2 border-r-0 flex flex-col shadow-xl transition-all duration-500 origin-right scale-[0.85] sm:scale-100
              ${isScrolled && !isHovered && !isExpanded ? 'translate-x-[calc(100%-2.5rem)] sm:translate-x-[calc(100%-4rem)]' : 'translate-x-0'}
              bg-[#111] border-[#333] text-[#e0e0e0] hover:border-[#ff1a1a] hover:shadow-[0_0_15px_rgba(255,26,26,0.3)]
              ${isExpanded ? 'w-[280px] sm:w-[320px] border-[#ff1a1a] shadow-[0_0_20px_rgba(255,26,26,0.3)]' : ''}
            `}
          >
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0, x: -10, clipPath: 'polygon(0 10%, 100% 10%, 100% 30%, 0 30%)' }}
                  animate={{ 
                    height: '35vh',
                    opacity: [0.8, 1, 0, 1, 0.5, 1],
                    x: [-10, 10, -5, 5, -2, 0],
                    clipPath: [
                      'polygon(0 10%, 100% 10%, 100% 30%, 0 30%)',
                      'polygon(0 50%, 100% 50%, 100% 70%, 0 70%)',
                      'polygon(0 20%, 100% 20%, 100% 40%, 0 40%)',
                      'polygon(0 80%, 100% 80%, 100% 90%, 0 90%)',
                      'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                      'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    ],
                    filter: [
                      'hue-rotate(90deg) contrast(200%)', 
                      'hue-rotate(-90deg) invert(100%)', 
                      'hue-rotate(45deg)', 
                      'invert(100%)', 
                      'none', 
                      'none'
                    ]
                  }}
                  transition={{ duration: 0.4, times: [0, 0.15, 0.3, 0.45, 0.7, 1], ease: "linear" }}
                  exit={{ height: 0, opacity: 0, filter: 'invert(100%)', transition: { duration: 0.2 } }}
                  className="w-full border-b border-[#333] overflow-hidden flex flex-col"
                >
                  <div className="flex justify-between items-center px-4 py-2 bg-[#0a0a0a] border-b border-[#222]">
                    <span className="text-[10px] font-mono text-[#ff1a1a] tracking-widest">[ LYRICS_TERMINAL ]</span>
                    <button onClick={() => setIsExpanded(false)} className="text-[#888] hover:text-[#ff1a1a] font-mono text-xs uppercase cursor-pointer">
                       [ X ]
                    </button>
                  </div>
                  <div 
                    ref={lyricsContainerRef}
                    className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 font-mono text-[11px] sm:text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {lyrics.length > 0 ? lyrics.map((line, idx) => (
                      <div 
                        key={idx} 
                        className={`transition-all duration-300 ${idx === currentLyricIndex ? 'text-[#ff1a1a] font-bold scale-105 origin-left' : 'text-[#666]'}`}
                      >
                        {idx === currentLyricIndex && <span className="mr-2 animate-pulse">&gt;</span>}
                        {line.text}
                      </div>
                    )) : (
                      <div className="text-[#666] animate-pulse">[ DECRYPTING_AUDIO_DATA... ]</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div 
              className={`p-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3 w-full ${!isExpanded ? 'cursor-pointer' : ''}`}
              onClick={() => { if (!isExpanded) setIsExpanded(true); }}
            >
              <div 
                className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center rounded-none border border-[#333] overflow-hidden transition-colors duration-500 bg-[#1a1a1a] text-[#888] cursor-pointer hover:border-[#ff1a1a] group"
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              >
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.5 }}
                  src={trackInfo.cover}
                  alt="Cover"
                  className="absolute inset-0 w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 group-hover:bg-black/60 transition-all duration-300">
                  {isPlaying ? <Music size={14} className="text-[#ff1a1a] animate-pulse sm:w-4 sm:h-4 w-3 h-3" /> : <VolumeX size={14} className="text-[#e0e0e0] sm:w-4 sm:h-4 w-3 h-3" />}
                </div>
              </div>
              
              <div className="flex flex-col text-left items-start overflow-hidden relative max-w-[120px] sm:min-w-[120px] flex-grow">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

