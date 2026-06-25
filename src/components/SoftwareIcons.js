'use client';

import { 
  SiAdobephotoshop, 
  SiCoreldraw, 
  SiAdobeillustrator, 
  SiAdobepremierepro, 
  SiAdobedreamweaver, 
  SiAdobexd,
  SiFigma, 
  SiAffinitydesigner, 
  SiCanva,
} from 'react-icons/si';

const AbletonIcon = (props) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>Ableton Live</title>
    <path d="M1.6 6.4h3.2v11.2H1.6V6.4Zm6.4 0H11.2v11.2H8V6.4Zm6.4 0H17.6v11.2H14.4V6.4Zm6.4 0H24v11.2H20.8V6.4Z" />
  </svg>
);

const FLStudioIcon = (props) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>FL Studio</title>
    <path d="M4.09 1.455a1.818 1.818 0 0 0-1.818 1.818v17.455c0 1.004.814 1.818 1.818 1.818h16.273a1.818 1.818 0 0 0 1.818-1.818V3.273a1.818 1.818 0 0 0-1.818-1.818H4.09Zm2.636 4.364h10.91v2.182H6.726V5.819Zm0 4.363h10.91v2.182H6.726v-2.182Zm0 4.364h7.273v2.182H6.726v-2.182Z" />
  </svg>
);

const ICONS = [
  { name: 'Photoshop', icon: SiAdobephotoshop },
  { name: 'CorelDRAW', icon: SiCoreldraw },
  { name: 'Illustrator', icon: SiAdobeillustrator },
  { name: 'Premiere Pro', icon: SiAdobepremierepro },
  { name: 'DreamWeaver', icon: SiAdobedreamweaver },
  { name: 'Adobe XD', icon: SiAdobexd },
  { name: 'Figma', icon: SiFigma },
  { name: 'Affinity', icon: SiAffinitydesigner },
  { name: 'Canva', icon: SiCanva },
  { name: 'Ableton Live', icon: AbletonIcon },
  { name: 'FL Studio', icon: FLStudioIcon },
];

export default function SoftwareIcons() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-8 opacity-80 max-w-4xl mx-auto px-4">
      {ICONS.map((item) => (
        <div key={item.name} className="group relative flex flex-col items-center">
          <item.icon 
            className="w-8 h-8 md:w-10 md:h-10 text-neutral-400 transition-all duration-300 
                       group-hover:scale-125 group-hover:text-white
                       drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" 
          />
          <span className="absolute -bottom-8 text-[10px] md:text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}