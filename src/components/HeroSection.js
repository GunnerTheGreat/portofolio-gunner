import { Terminal } from 'lucide-react';
import anime from 'animejs';
import HeroAnimation from './HeroAnimation';
import HeroIcons from './HeroIcons';
import AnimeBackground from './AnimeBackground';
import WavesCursor from './WavesCursor';
import { portfolioTheme as c } from '../config/theme';

export default function HeroSection({ isLoading, setShowConsole, handleGetStarted }) {
  return (
    <section id="hero-section" className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <WavesCursor />
      {!isLoading && <AnimeBackground />}

      <div className={`absolute inset-0 ${c.heroOverlay} pointer-events-none`} />

      {/* 3D VHS Ambient Text with Static Glitch Effect */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20 overflow-hidden">
        {/* Top Left Text with Fisheye Distortion */}
        <div className="absolute top-10 left-10" style={{ transform: 'perspective(300px) rotateX(15deg) rotateY(15deg)', transformOrigin: 'top left' }}>
          <div className="font-mono text-sm tracking-widest text-[#e0e0e0] mix-blend-screen opacity-80 whitespace-pre vhs-text-glitch" style={{ textShadow: '2px 0 1px rgba(255,0,0,0.8), -2px 0 1px rgba(0,255,255,0.8)' }}>
            SYS_INIT // SUCCESS<br/>
            LOAD_MODULES // OK<br/>
            AWAITING_COMMAND<span className="animate-pulse">_</span>
          </div>
        </div>
        
        {/* Bottom Right Text with Fisheye Distortion */}
        <div className="absolute bottom-10 right-10" style={{ transform: 'perspective(300px) rotateX(-15deg) rotateY(-15deg)', transformOrigin: 'bottom right' }}>
          <div className="text-right font-mono text-sm tracking-widest text-[#e0e0e0] mix-blend-screen opacity-80 whitespace-pre vhs-text-glitch-alt" style={{ textShadow: '2px 0 1px rgba(255,0,0,0.8), -2px 0 1px rgba(0,255,255,0.8)' }}>
            0x000000 // CORE<br/>
            MEM: ALLOCATED
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gsap-hero-content">
        <h1
          onClick={() => setShowConsole(true)}
          title="Click to open terminal"
          className={`text-7xl md:text-9xl tracking-tighter mb-4 ${c.titleColor} cursor-pointer hover:text-[#ff1a1a] transition-colors duration-500 select-none`}
          style={{
            fontFamily: 'var(--font-unifraktur), serif',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)'
          }}
        >
          {"GunneR".split('').map((char, index) => (
            <span key={index} className="gsap-letter inline-block">
              <span 
                className="hero-letter inline-block opacity-0 px-1 hover:text-[#ff1a1a] transition-colors duration-300"
                onMouseEnter={(e) => {
                  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                  anime.remove(e.target);
                  anime({
                    targets: e.target,
                    translateY: [-15, 0],
                    scale: [1.15, 1],
                    opacity: 1,
                    easing: 'easeOutExpo',
                    duration: 600
                  });
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </h1>

        <div className="mb-4">
          <HeroAnimation />
        </div>

        <HeroIcons />
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 gsap-hero-btn">
        <button
          onClick={handleGetStarted}
          className={`group relative px-8 py-3 ${c.btnBg} border-2 ${c.btnBorder} 
                     rounded-none transition-all duration-300 ${c.btnHoverBg}
                     cursor-pointer flex items-center gap-3`}
        >
          <span className={`text-sm font-mono font-bold tracking-widest uppercase ${c.btnText} ${c.btnHoverText} transition-colors duration-300`}>
            EXECUTE
          </span>
          <span className={`${c.btnAccent} ${c.btnAccentHover} transition-colors duration-300`}>
            <Terminal size={16} />
          </span>
        </button>
      </div>
    </section>
  );
}
