'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
import { Video, Music, Image as ImageIcon, Smartphone, Terminal, Cpu } from 'lucide-react';

import HeroAnimation from './HeroAnimation';
import PortfolioGrid from './PortfolioGrid';
import AudioCard from './AudioCard';
import VideoCard from './VideoCard';
import HeroIcons from './HeroIcons';
import AboutModal from './AboutModal';
import ConsoleModal from './ConsoleModal';
import AnimeBackground from './AnimeBackground';
import VisitCounter from './VisitCounter';
import GamingCard from './GamingCard';
import Guestbook from './Guestbook';
import WavesCursor from './WavesCursor';
import BackgroundMusic from './BackgroundMusic';
import anime from 'animejs';
import Intro3DTransition from './Intro3DTransition';

export default function PortfolioContent({ graphics, videos, music, apps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showEnter, setShowEnter] = useState(false);
  const [startMusic, setStartMusic] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  const container = useRef();
  const isAutoScrolling = useRef(false);

  useGSAP(() => {
    if (isLoading || showAbout) return;

    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray('.gsap-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      gsap.to(['.gsap-letter', '.gsap-hero-content > div'], {
        y: (index) => -100 - (index * 40),
        opacity: 0, 
        stagger: 0.04, 
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: 'bottom 10%', 
          scrub: 2, 
        }
      });

      gsap.to('.gsap-hero-btn', {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: 'bottom 10%',
          scrub: 2,
        }
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.utils.toArray('.gsap-section').forEach((section) => {
        gsap.set(section, { opacity: 1, y: 0 });
      });
      gsap.set(['.gsap-letter', '.gsap-hero-content > div'], { opacity: 1, y: 0 });
      gsap.set('.gsap-hero-btn', { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: container, dependencies: [isLoading, isLocked, showAbout, graphics, videos, music, apps] });

  useEffect(() => {
    const timer = setTimeout(() => setShowEnter(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterSite = () => {
    setIsLoading(false);
    setStartMusic(true);
  };

  useEffect(() => {
    if (!isLoading) {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        anime({
          targets: '.hero-letter',
          translateY: [-50, 0],
          opacity: [0, 1],
          scale: [0.8, 1],
          easing: 'easeOutElastic(1, .6)',
          duration: 1500,
          delay: anime.stagger(150, { start: 200 })
        });
      } else {
        anime.set('.hero-letter', { opacity: 1, translateY: 0, scale: 1 });
      }
    }
  }, [isLoading]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLoading && (e.key === '`' || e.key === '~')) {
        e.preventDefault();
        setShowConsole(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading]);

  useEffect(() => {
    if (isLocked || showAbout || showConsole) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.height = '';
    }
  }, [isLocked, showAbout, showConsole]);

  useEffect(() => {
    const handleScroll = () => {
      if (isLocked || isAutoScrolling.current || showAbout) return;
      if (window.scrollY <= 5) {
        window.scrollTo(0, 0);
        setIsLocked(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLocked, showAbout]);

  const handleGetStarted = () => {
    isAutoScrolling.current = true;
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.height = '';
    setIsLocked(false);

    setTimeout(() => {
      ScrollTrigger.refresh();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      gsap.to(window, {
        duration: reduceMotion ? 0 : 2, 
        scrollTo: { y: '#main-nav', offsetY: 20 },
        ease: 'power3.inOut'
      });
    }, 50);

    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 2500);
  };

  const c = {
    heroOverlay: 'bg-[#000]/60',
    titleColor: 'text-[#e0e0e0]',
    navBg: 'bg-[#0a0a0a]',
    navBorder: 'border-[#333]',
    navLinkBorder: 'border-[#222]',
    navLinkText: 'text-[#888]',
    navLinkHover: 'hover:text-[#ff1a1a] hover:border-[#ff1a1a]',
    navLinkBg: 'bg-[#111]',
    cardBg: 'bg-[#050505]',
    cardBorder: 'border-[#222]',
    sectionIconBg: 'bg-[#111]',
    sectionIconColor: 'text-[#ff1a1a]',
    sectionTitle: 'text-[#e0e0e0]',
    dashedBorder: 'border-[#333]',
    footerBorder: 'border-[#222]',
    footerBg: 'bg-[#0a0a0a]',
    footerText: 'text-[#555]',
    btnBg: 'bg-[#050505]',
    btnBorder: 'border-[#ff1a1a]',
    btnText: 'text-[#ff1a1a]',
    btnHoverBg: 'hover:bg-[#ff1a1a]',
    btnHoverText: 'group-hover:text-[#000]',
    btnAccent: 'text-[#ff1a1a]',
    btnAccentHover: 'group-hover:text-[#000]',
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <Intro3DTransition onEnterSite={handleEnterSite} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
        {showConsole && (
          <ConsoleModal 
            onClose={() => setShowConsole(false)} 
            onAbout={() => setShowAbout(true)} 
          />
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowConsole(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-4 bg-[#050505] text-[#ff1a1a] border border-[#ff1a1a] shadow-[0_0_15px_rgba(255,26,26,0.3)] hover:bg-[#ff1a1a] hover:text-[#000] transition-colors font-mono font-bold text-lg rounded-none"
        aria-label="Open Terminal"
      >
        {"[>_]"}
      </button>

      <BackgroundMusic startPlaying={startMusic} />

      <main className="min-h-screen relative z-[1] bg-[#000]" ref={container}>

        <section id="hero-section" className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
          <WavesCursor />
          {!isLoading && <AnimeBackground />}

          <div className={`absolute inset-0 ${c.heroOverlay} pointer-events-none`} />

          <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
            <div className="text-left font-mono text-xs tracking-widest text-[#ff1a1a] opacity-40 whitespace-pre absolute top-10 left-10">
              SYS_INIT // SUCCESS<br/>
              LOAD_MODULES // OK<br/>
              AWAITING_COMMAND<span className="animate-pulse">_</span>
            </div>
            <div className="text-right font-mono text-xs tracking-widest text-[#333] whitespace-pre absolute bottom-10 right-10">
              0x000000 // CORE<br/>
              MEM: ALLOCATED
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

        <nav id="main-nav" className={`sticky top-0 z-50 w-full md:w-auto md:mx-auto overflow-x-auto ${c.navBg} border-b md:border md:mt-4 ${c.navBorder} md:rounded-none px-4 py-3 mb-12 transition-all duration-500`}>
          <ul className="flex flex-nowrap md:justify-center gap-2 md:gap-4 text-xs font-mono font-bold uppercase tracking-widest">
            <li><a href="#graphics" className={`px-4 py-2 rounded-none border ${c.navLinkBorder} ${c.navLinkText} ${c.navLinkHover} transition-all duration-200 block ${c.navLinkBg}`}>SYS.GFX</a></li>
            <li><a href="#video" className={`px-4 py-2 rounded-none border ${c.navLinkBorder} ${c.navLinkText} ${c.navLinkHover} transition-all duration-200 block ${c.navLinkBg}`}>SYS.VID</a></li>
            <li><a href="#music" className={`px-4 py-2 rounded-none border ${c.navLinkBorder} ${c.navLinkText} ${c.navLinkHover} transition-all duration-200 block ${c.navLinkBg}`}>SYS.SND</a></li>
            <li><a href="#apps" className={`px-4 py-2 rounded-none border ${c.navLinkBorder} ${c.navLinkText} ${c.navLinkHover} transition-all duration-200 block ${c.navLinkBg}`}>SYS.APP</a></li>
            <li><a href="#hobbies" className={`px-4 py-2 rounded-none border ${c.navLinkBorder} ${c.navLinkText} ${c.navLinkHover} transition-all duration-200 block ${c.navLinkBg}`}>SYS.GAM</a></li>
          </ul>
        </nav>

        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className={`${c.cardBg} rounded-none border ${c.cardBorder} overflow-hidden`}>

            <div className="h-8 flex items-center px-4 bg-[#0a0a0a] border-b border-[#222]">
              <div className="font-mono text-[10px] text-[#ff1a1a] tracking-widest uppercase opacity-70">
                0x000000_INIT // USER_OVERRIDE
              </div>
            </div>

            <div className="px-4 sm:px-6 md:px-12 py-12 md:py-20 space-y-24">

              <section id="hobbies" className="gsap-section scroll-mt-32">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 ${c.sectionIconBg} rounded-none ${c.sectionIconColor} border border-[#222]`}>
                    <Cpu size={22} />
                  </div>
                  <h2 className={`text-xl font-mono font-bold ${c.sectionTitle} tracking-widest uppercase`}>/// PROTOCOLS.BIN</h2>
                </div>
                <div className={`border-b border-solid ${c.dashedBorder} mb-10`} />
                <div className="flex flex-col gap-8">
                  <GamingCard />
                  <Guestbook />
                </div>
              </section>

              {graphics.length > 0 && (
                <section id="graphics" className="gsap-section scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 ${c.sectionIconBg} rounded-none ${c.sectionIconColor} border border-[#222]`}><ImageIcon size={22} /></div>
                    <h2 className={`text-xl font-mono font-bold ${c.sectionTitle} tracking-widest uppercase`}>/// GRAPHICS.OBJ</h2>
                  </div>
                  <div className={`border-b border-solid ${c.dashedBorder} mb-10`} />
                  <PortfolioGrid items={graphics} />
                </section>
              )}

              {videos.length > 0 && (
                <section id="video" className="gsap-section scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 ${c.sectionIconBg} rounded-none ${c.sectionIconColor} border border-[#222]`}><Video size={22} /></div>
                    <h2 className={`text-xl font-mono font-bold ${c.sectionTitle} tracking-widest uppercase`}>/// VIDEO.MP4</h2>
                  </div>
                  <div className={`border-b border-solid ${c.dashedBorder} mb-10`} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.map((item) => (
                      <VideoCard
                        key={item._id}
                        title={item.title}
                        description={item.description}
                        src={item.videoUrl}
                        thumbnail={item.imageUrl}
                      />
                    ))}
                  </div>
                </section>
              )}

              {music.length > 0 && (
                <section id="music" className="gsap-section scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 ${c.sectionIconBg} rounded-none ${c.sectionIconColor} border border-[#222]`}><Music size={22} /></div>
                    <h2 className={`text-xl font-mono font-bold ${c.sectionTitle} tracking-widest uppercase`}>/// AUDIO.WAV</h2>
                  </div>
                  <div className={`border-b border-solid ${c.dashedBorder} mb-10`} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {music.map((item) => (
                      <AudioCard
                        key={item._id}
                        title={item.title}
                        description={item.description}
                        src={item.audioUrl}
                        coverArt={item.imageUrl}
                        type={item.type || "file"}
                      />
                    ))}
                  </div>
                </section>
              )}

              {apps.length > 0 && (
                <section id="apps" className="gsap-section scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 ${c.sectionIconBg} rounded-none ${c.sectionIconColor} border border-[#222]`}><Smartphone size={22} /></div>
                    <h2 className={`text-xl font-mono font-bold ${c.sectionTitle} tracking-widest uppercase`}>/// DEPLOYED.EXE</h2>
                  </div>
                  <div className={`border-b border-solid ${c.dashedBorder} mb-10`} />
                  <PortfolioGrid items={apps} isApp={true} />
                </section>
              )}

            </div>

            <div className="h-6 flex items-center justify-end px-4 bg-[#0a0a0a] border-t border-[#222]">
              <div className="font-mono text-[10px] text-[#ff1a1a] tracking-widest uppercase opacity-50">
                END_OF_FILE //
              </div>
            </div>

            <footer className={`text-center flex flex-col items-center gap-4 py-8 ${c.footerText} text-xs font-mono uppercase tracking-widest border-t ${c.footerBorder} ${c.footerBg}`}>
              <VisitCounter />
              <p className="flex items-center justify-center gap-2">
                SYS.COPYRIGHT 2025 // BUILT W. <Terminal size={12} className="text-[#ff1a1a]" />
              </p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}