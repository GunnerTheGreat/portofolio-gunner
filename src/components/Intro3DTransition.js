'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_SEQUENCE = [
  "INIT... OK",
  "Loading Kernel Modules........ [ OK ]",
  "Mounting Virtual Filesystems.. [ OK ]",
  "Starting Security Daemon...... [ OK ]",
  "Initializing Graphics Drivers. [ OK ]",
  "Loading Memory Modules........ [ OK ]",
  "WARNING: Bypass detected in sector 7G.",
  "Compiling Assets.............. 100%",
  "Establishing Secure Connection [ OK ]",
  "SYSTEM READY."
];

const ASCII_ART = `
  ____ _   _ _   _ _   _ _____ ____  
 / ___| | | | \\ | | \\ | | ____|  _ \\ 
| |  _| | | |  \\| |  \\| |  _| | |_) |
| |_| | |_| | |\\  | |\\  | |___|  _ < 
 \\____|\\___/|_| \\_|_| \\_|_____|_| \\_\\
`;

const LoadingScene = () => {
  const group = useRef();
  
  useFrame((state) => {
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.mouse.x * Math.PI) / 10, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (state.mouse.y * Math.PI) / 10, 0.05);
  });

  return (
    <group ref={group}>
      <fog attach="fog" args={['#000', 5, 30]} />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} color="#ff1a1a" intensity={8} distance={30} />
      <pointLight position={[5, 5, 5]} color="#4a0000" intensity={3} />

      {Array.from({ length: 40 }).map((_, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={2}
          floatIntensity={1}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30 - 10
          ]}
        >
          <mesh>
            <octahedronGeometry args={[Math.random() * 0.8 + 0.2, 0]} />
            <meshStandardMaterial 
              color="#111" 
              emissive="#ff1a1a" 
              emissiveIntensity={Math.random() * 0.8} 
              wireframe={Math.random() > 0.7} 
            />
          </mesh>
        </Float>
      ))}
      <Stars radius={50} depth={20} count={1500} factor={3} saturation={0} fade speed={1.5} />
    </group>
  );
};

const CameraController = ({ isTransitioning, onTransitionComplete }) => {
  const { camera } = useThree();
  const speed = useRef(0);
  const swoop = useRef(0);

  useFrame((state, delta) => {
    if (isTransitioning) {
      speed.current = THREE.MathUtils.lerp(speed.current, 60, 0.05);
      camera.position.z -= speed.current * delta;
      
      if (camera.position.z < -40) {
        onTransitionComplete();
      }
    } else {
      swoop.current = THREE.MathUtils.lerp(swoop.current, 0, 0.04);
      
      camera.position.x = swoop.current;
      camera.position.y = swoop.current * 0.5;
      
      camera.lookAt(0, 0, 0);

      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5, 0.02);
    }
  });

  return null;
};

export default function Intro3DTransition({ onEnterSite }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fakeProgress, setFakeProgress] = useState(0);
  
  const [visibleLines, setVisibleLines] = useState([]);
  const [bootFinished, setBootFinished] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  const [commandInput, setCommandInput] = useState('');
  const [commandError, setCommandError] = useState(false);
  
  const linesEndRef = useRef(null);

  useEffect(() => {
    let currentLine = 0;
    let timeoutId;
    let isMounted = true;
    
    const printNextLine = () => {
      if (!isMounted) return;
      
      if (currentLine < BOOT_SEQUENCE.length) {
        const lineToAdd = BOOT_SEQUENCE[currentLine];
        setVisibleLines(prev => [...prev, lineToAdd]);
        currentLine++;
        
        const nextDelay = Math.random() * 150 + 50; 
        timeoutId = setTimeout(printNextLine, nextDelay);
      } else {
        setBootFinished(true);
      }
    };
    
    timeoutId = setTimeout(printNextLine, 300);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (fakeProgress < 100) {
      interval = setInterval(() => {
        setFakeProgress(p => {
          const next = p + Math.floor(Math.random() * 10) + 2;
          return next > 100 ? 100 : next;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [fakeProgress]);

  useEffect(() => {
    linesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleLines]);

  useEffect(() => {
    if (bootFinished && fakeProgress === 100) {
      const timer = setTimeout(() => setShowButton(true), 600);
      return () => clearTimeout(timer);
    }
    const fallbackTimer = setTimeout(() => {
      if (bootFinished) setShowButton(true);
    }, 4000);
    
    return () => clearTimeout(fallbackTimer);
  }, [bootFinished, fakeProgress]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (commandInput.trim() === '/hx prof') {
      setIsTransitioning(true);
    } else if (commandInput.trim() === '/help') {
      setCommandError('AVAILABLE COMMANDS: /hx prof');
      setCommandInput('');
    } else {
      setCommandError('UNAUTHORIZED COMMAND');
      setCommandInput('');
    }
  };

  const handleTransitionComplete = () => {
    onEnterSite();
  };

  return (
    <motion.div 
      initial={{ opacity: 1, backgroundColor: '#000' }}
      animate={{ backgroundColor: '#000' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100]" 
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <LoadingScene />
        <CameraController 
          isTransitioning={isTransitioning} 
          onTransitionComplete={handleTransitionComplete} 
        />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none p-6 md:p-12 overflow-hidden flex flex-col justify-between">
        
        {!isTransitioning && (
          <div className="flex-1 font-mono text-sm md:text-base text-[#ff1a1a] opacity-90 drop-shadow-[0_0_8px_rgba(255,26,26,0.6)]">
            <div className="mb-4 text-[#ff1a1a]/60">vlad@burca loader overridden... injecting GunneR...</div>
            
            {visibleLines.map((line, idx) => {
              if (!line) return null;
              return (
                <div key={idx} className="mb-1">
                  <span className="text-[#888] mr-2">[{String(idx + 1).padStart(2, '0')}]</span>
                  {line.includes('WARNING') ? (
                    <span className="text-yellow-500 animate-pulse">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              );
            })}
            
            <AnimatePresence>
              {bootFinished && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <pre className="mt-8 text-[10px] md:text-sm leading-tight text-[#ff1a1a] font-bold overflow-x-hidden">
                    {ASCII_ART}
                  </pre>
                  <div className="mt-4">
                    <span className="text-[#888] mr-2">[SYS]</span>
                    Asset Compile Progress: {fakeProgress}%
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={linesEndRef} />
          </div>
        )}

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex justify-center w-full px-6">
          <AnimatePresence mode="wait">
            {showButton && !isTransitioning ? (
              <motion.div
                key="terminal-input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="pointer-events-auto flex flex-col items-center"
              >
                <div className="hidden md:block bg-[#050505]/80 p-4 border border-[#ff1a1a] shadow-[0_0_20px_rgba(255,26,26,0.3)] backdrop-blur-sm w-full max-w-md">
                  <form onSubmit={handleCommandSubmit} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[#ff1a1a] font-mono font-bold">&gt;</span>
                      <input
                        type="text"
                        autoFocus
                        value={commandInput}
                        onChange={(e) => {
                          setCommandInput(e.target.value);
                          setCommandError(false);
                        }}
                        placeholder="Type /hx prof to breach..."
                        className="bg-transparent border-none outline-none text-[#e0e0e0] font-mono w-full"
                        spellCheck="false"
                        autoComplete="off"
                      />
                    </div>
                    {commandError && (
                      <div className="text-yellow-500 font-mono text-xs mt-2 animate-pulse">
                        [SYS] {commandError}
                      </div>
                    )}
                  </form>
                </div>

                <button
                  onClick={() => setIsTransitioning(true)}
                  className="md:hidden group relative px-8 py-3 bg-[#050505] text-[#ff1a1a] border border-[#ff1a1a] 
                             hover:bg-[#ff1a1a] hover:text-[#000] hover:shadow-[0_0_30px_rgba(255,26,26,0.5)]
                             transition-all duration-300 font-mono font-bold tracking-widest uppercase text-sm
                             flex items-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#ff1a1a]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">[ CONSOLE ]</span>
                  <span className="relative z-10 animate-pulse">_</span>
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
