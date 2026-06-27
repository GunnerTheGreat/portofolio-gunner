import { FaJava } from 'react-icons/fa';
import {
  SiAdobephotoshop, SiAdobeillustrator, SiAdobexd, SiAdobedreamweaver,
  SiAffinitydesigner, SiCanva, SiNextdotjs, SiReact, SiVuedotjs,
  SiTailwindcss, SiJavascript, SiTypescript, SiPhp, SiMysql, SiMongodb
} from 'react-icons/si';

import { AbletonIcon, FLStudioIcon } from '../components/icons/CustomIcons';

export const MAIN_SKILLS = [
  { name: "Graphic Design", level: 95 },
  { name: "Video Editing", level: 90 },
  { name: "Music Production", level: 85 },
  { name: "Programming", level: 80 },
];

export const SOFTWARE_SKILLS = [
  { name: "Photoshop", icon: SiAdobephotoshop, level: 98 },
  { name: "Illustrator", icon: SiAdobeillustrator, level: 90 },
  { name: "Adobe Xd", icon: SiAdobexd, level: 50 },
  { name: "Dreamweaver", icon: SiAdobedreamweaver, level: 60 },
  { name: "Affinity", icon: SiAffinitydesigner, level: 90 },
  { name: "Canva", icon: SiCanva, level: 80 },
  { name: "Ableton", icon: AbletonIcon, level: 90 },
  { name: "FL Studio", icon: FLStudioIcon, level: 85 },
];

export const TECH_SKILLS = [
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
