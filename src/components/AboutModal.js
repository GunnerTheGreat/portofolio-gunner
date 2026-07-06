'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Palette, Terminal } from 'lucide-react';
import { ScrambleText } from './ui/ScrambleText';
import { MAIN_SKILLS, SOFTWARE_SKILLS, TECH_SKILLS } from '../data/skills';

export default function AboutModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('software');
  const currentSkills = activeTab === 'software' ? SOFTWARE_SKILLS : TECH_SKILLS;

  return (
    <div className="fixed inset-0 z-[10005] flex items-center justify-center px-4 bg-[#000]/95 backdrop-blur-sm animate-in fade-in duration-300">

      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, x: -20, clipPath: 'polygon(0 10%, 100% 10%, 100% 30%, 0 30%)' }}
        animate={{ 
          opacity: [0.8, 1, 0, 1, 0.5, 1],
          x: [-20, 20, -10, 10, -5, 0],
          y: [10, -10, 5, -5, 2, 0],
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
        exit={{ 
          scale: 0.95, 
          opacity: 0,
          filter: 'invert(100%)',
          transition: { duration: 0.2 }
        }}
        className="relative w-full max-w-5xl bg-[#050505] border border-[#ff1a1a] flex flex-col md:flex-row max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#0a0a0a] hover:bg-[#ff1a1a] text-[#888] hover:text-[#000] border border-[#333] hover:border-[#ff1a1a] transition-colors duration-300"
        >
          <X size={20} strokeWidth={2.5} />
        </button>



        <div className="w-full md:w-2/5 relative z-10">
          <div className="h-64 md:h-full w-full bg-[#000] relative overflow-hidden">
            <Image
              src="/ew.jpg"
              alt="My Profile Picture"
              fill
              className="object-cover object-[60%_center] grayscale contrast-125 opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent mix-blend-multiply" />
            
            <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 pointer-events-none" />
          </div>

          <div className="absolute bottom-0 left-0 p-8">
            <h2 
              className="text-4xl md:text-5xl tracking-tighter text-[#e0e0e0] mb-2" 
              style={{ fontFamily: 'var(--font-unifraktur), serif', textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}
            >
              <ScrambleText text="GunneR" />
            </h2>
            <div className="w-12 h-1 bg-[#ff1a1a] mb-4"></div>
            <p className="text-xs font-mono uppercase tracking-widest mb-4 text-[#ff1a1a]"><ScrambleText text="Daniel Angelou Alorro" /></p>
            <p className="text-sm font-mono leading-relaxed text-[#888]">
              <ScrambleText text="Multidisciplinary creative based in Davao. Bridging the gap between design, code, and sound to create immersive digital experiences." />
              <br /><br />
              <ScrambleText text="SYS.BUILD // BRANDS _ APPS _ BEATS" />
            </p>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-[#0a0a0a] border-l border-[#222]">

          <div className="mb-12">
            <h3 className="text-sm font-mono font-bold text-[#e0e0e0] mb-6 border-b border-[#333] pb-3 flex items-center gap-3 uppercase tracking-widest">
              <Terminal size={16} className="text-[#ff1a1a]" /> <ScrambleText text="Core Capabilities" />
            </h3>
            <div className="space-y-6">
              {MAIN_SKILLS.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-xs font-mono font-medium text-[#888] mb-2 uppercase">
                    <span><ScrambleText text={skill.name} /></span>
                    <span className="text-[#ff1a1a]"><ScrambleText text={`${skill.level}%`} /></span>
                  </div>
                  <div className="h-1.5 w-full bg-[#111] overflow-hidden border border-[#222]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-[#ff1a1a]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-8 border-b border-[#333] pb-3">
              <h3 className="text-sm font-mono font-bold text-[#e0e0e0] uppercase tracking-widest"><ScrambleText text="Efficiency" /></h3>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('software')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase transition-colors border ${activeTab === 'software' ? 'bg-[#ff1a1a] text-[#000] border-[#ff1a1a]' : 'bg-[#111] text-[#666] border-[#222] hover:text-[#fff]'}`}
                >
                  <Palette size={14} /> <ScrambleText text="Software" />
                </button>
                <button
                  onClick={() => setActiveTab('tech')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase transition-colors border ${activeTab === 'tech' ? 'bg-[#ff1a1a] text-[#000] border-[#ff1a1a]' : 'bg-[#111] text-[#666] border-[#222] hover:text-[#fff]'}`}
                >
                  <Cpu size={14} /> <ScrambleText text="Stack" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[240px]">
              <AnimatePresence mode="wait">
                {currentSkills.map((sw) => (
                  <motion.div
                    key={sw.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-3 bg-[#111] border border-[#222] hover:border-[#ff1a1a] transition-colors group"
                  >
                    <div className="p-2 bg-[#050505] text-[#888] group-hover:text-[#ff1a1a] border border-[#222] transition-colors">
                      <sw.icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-mono text-[#888] mb-1.5 uppercase">
                        <span><ScrambleText text={sw.name} /></span>
                        <span className="text-[#e0e0e0]"><ScrambleText text={`${sw.level}%`} /></span>
                      </div>
                      <div className="h-1 w-full bg-[#222] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${sw.level}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="h-full bg-[#ff1a1a]"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
