'use client';

import { 
  SiNextdotjs, SiReact, SiVuedotjs, SiTailwindcss, SiJavascript, 
  SiTypescript, SiPhp, SiMysql, SiMongodb 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const STACK = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React', icon: SiReact },
  { name: 'Vue.js', icon: SiVuedotjs },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'PHP', icon: SiPhp },
  { name: 'MySQL', icon: SiMysql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Java', icon: FaJava },
];

export default function TechStack() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-8 opacity-90 max-w-4xl mx-auto px-4">
      {STACK.map((item) => (
        <div key={item.name} className="group relative flex flex-col items-center">
          <item.icon 
            className="w-8 h-8 md:w-10 md:h-10 text-neutral-500 transition-all duration-300 
                       group-hover:scale-125 group-hover:text-blue-400
                       drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]" 
          />
          <span className="absolute -bottom-8 text-[10px] md:text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-blue-900/80 px-2 py-1 rounded backdrop-blur-sm border border-blue-500/30">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}