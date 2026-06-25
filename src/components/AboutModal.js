'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Palette, Terminal } from 'lucide-react';
import { FaJava } from 'react-icons/fa';
import {
  SiAdobephotoshop, SiAdobeillustrator, SiAdobexd, SiAdobedreamweaver,
  SiAffinitydesigner, SiCanva, SiNextdotjs, SiReact, SiVuedotjs,
  SiTailwindcss, SiJavascript, SiTypescript, SiPhp, SiMysql, SiMongodb
} from 'react-icons/si';

const AbletonIcon = (props) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M1.6 6.4h3.2v11.2H1.6V6.4Zm6.4 0H11.2v11.2H8V6.4Zm6.4 0H17.6v11.2H14.4V6.4Zm6.4 0H24v11.2H20.8V6.4Z" />
  </svg>
);

const FLStudioIcon = (props) => (
  <svg
    role="img"
    viewBox="0 0 50.8 50.8"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.175"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17.595 16.91c-1.067 3.253-2.134 6.506-2.552 10.264-.418 3.758-.188 8.02.234 10.853.421 2.832 1.035 4.235 1.933 5.371.898 1.137 2.08 2.007 4.053 1.36 1.973-.647 4.735-2.812 7.083-5.566 2.347-2.754 4.28-6.097 5.43-8.772 1.152-2.675 1.522-4.681 1.892-6.688M17.595 16.91c-1.14.188-2.281.376-2.556-.251-.275-.627.316-2.07 1.277-3.326.96-1.257 2.291-2.33 3.725-2.843 1.435-.513 2.972-.467 4.339-.084 1.367.383 2.564 1.103 3.485 1.84.921.738 1.565 1.493 2.21 2.247" />
    <path d="M30.074 14.493c1.303-.119 2.606-.238 3.868-.022 1.262.217 2.483.77 3.444 1.65.961.88 1.662 2.086 2.043 3.385.381 1.3.443 2.693.204 3.944-.24 1.252-.78 2.363-1.491 2.386-.711.024-1.592-1.04-2.474-2.104m-5.11-11.175c.207-.8.415-1.6.735-2.339a8.662 8.662 0 0 1 1.241-2.009 8.806 8.806 0 0 1 1.548-1.499c.522-.385 1.025-.637 1.529-.89M17.595 16.91c1.864-.414 3.727-.828 4.595-.83.867 0 .738.413.773 1.421.034 1.008.232 2.61.64 3.819.407 1.209 1.024 2.023 1.658 2.539.633.515 1.284.732 2.052.67.767-.06 1.651-.398 2.608-1.226.957-.83 1.987-2.149 2.638-2.573.65-.424.922.046 1.377.696.455.65 1.094 1.478 1.732 2.306" />
  </svg>
);

const MAIN_SKILLS = [
  { name: "Graphic Design", level: 95 },
  { name: "Video Editing", level: 90 },
  { name: "Music Production", level: 85 },
  { name: "Programming", level: 80 },
];

const SOFTWARE_SKILLS = [
  { name: "Photoshop", icon: SiAdobephotoshop, level: 98 },
  { name: "Illustrator", icon: SiAdobeillustrator, level: 90 },
  { name: "Adobe Xd", icon: SiAdobexd, level: 50 },
  { name: "Dreamweaver", icon: SiAdobedreamweaver, level: 60 },
  { name: "Affinity", icon: SiAffinitydesigner, level: 90 },
  { name: "Canva", icon: SiCanva, level: 80 },
  { name: "Ableton", icon: AbletonIcon, level: 90 },
  { name: "FL Studio", icon: FLStudioIcon, level: 85 },
];

const TECH_SKILLS = [
  { name: "Next.js", icon: SiNextdotjs, level: 90 },
  { name: "React", icon: SiReact, level: 92 },
  { name: "Tailwind", icon: SiTailwindcss, level: 95 },
  { name: "JavaScript", icon: SiJavascript, level: 88 },
  { name: "TypeScript", icon: SiTypescript, level: 50 },
  { name: "PHP", icon: SiPhp, level: 75 },
  { name: "MySQL", icon: SiMysql, level: 70 },
  { name: "MongoDB", icon: SiMongodb, level: 65 },
  { name: "Java", icon: FaJava, level: 60 },
  { name: "Vue.js", icon: SiVuedotjs, level: 50 },
];

export default function AboutModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('software');
  const currentSkills = activeTab === 'software' ? SOFTWARE_SKILLS : TECH_SKILLS;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-[#000]/95 backdrop-blur-sm animate-in fade-in duration-300">

      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-5xl bg-[#050505] border border-[#ff1a1a] flex flex-col md:flex-row max-h-[90vh] overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#0a0a0a] hover:bg-[#ff1a1a] text-[#888] hover:text-[#000] border border-[#333] hover:border-[#ff1a1a] transition-colors duration-300"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <div className="w-full md:w-2/5 relative">
          <div className="h-64 md:h-full w-full bg-[#000]">
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
              GunneR
            </h2>
            <div className="w-12 h-1 bg-[#ff1a1a] mb-4"></div>
            <p className="text-xs font-mono uppercase tracking-widest mb-4 text-[#ff1a1a]">Daniel Angelou Alorro</p>
            <p className="text-sm font-mono leading-relaxed text-[#888]">
              Multidisciplinary creative based in Davao. Bridging the gap between design, code, and sound to create immersive digital experiences.
              <br /><br />
              SYS.BUILD // BRANDS _ APPS _ BEATS
            </p>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-[#0a0a0a] border-l border-[#222]">

          <div className="mb-12">
            <h3 className="text-sm font-mono font-bold text-[#e0e0e0] mb-6 border-b border-[#333] pb-3 flex items-center gap-3 uppercase tracking-widest">
              <Terminal size={16} className="text-[#ff1a1a]" /> Core Capabilities
            </h3>
            <div className="space-y-6">
              {MAIN_SKILLS.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-xs font-mono font-medium text-[#888] mb-2 uppercase">
                    <span>{skill.name}</span>
                    <span className="text-[#ff1a1a]">{skill.level}%</span>
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
              <h3 className="text-sm font-mono font-bold text-[#e0e0e0] uppercase tracking-widest">Efficiency</h3>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('software')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase transition-colors border ${activeTab === 'software' ? 'bg-[#ff1a1a] text-[#000] border-[#ff1a1a]' : 'bg-[#111] text-[#666] border-[#222] hover:text-[#fff]'}`}
                >
                  <Palette size={14} /> Software
                </button>
                <button
                  onClick={() => setActiveTab('tech')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase transition-colors border ${activeTab === 'tech' ? 'bg-[#ff1a1a] text-[#000] border-[#ff1a1a]' : 'bg-[#111] text-[#666] border-[#222] hover:text-[#fff]'}`}
                >
                  <Cpu size={14} /> Stack
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
                        <span>{sw.name}</span>
                        <span className="text-[#e0e0e0]">{sw.level}%</span>
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
