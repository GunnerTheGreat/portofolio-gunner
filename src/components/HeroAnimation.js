'use client';

import { TypeAnimation } from 'react-type-animation';


export default function HeroAnimation() {
  const theme = 'goth';
  const isGoth = theme === 'goth';
  const isGlass = theme === 'glass';

  return (
    <div className={`text-xl md:text-2xl max-w-2xl h-8 font-medium ${isGlass ? 'text-[rgba(230,237,243,0.8)]' : isGoth ? 'text-[#888]' : 'text-white'}`}
      style={isGlass ? { textShadow: '0 0 15px rgba(136,192,255,0.4)', filter: 'drop-shadow(0 0 8px rgba(136,192,255,0.2))', fontWeight: '400' } : isGoth ? { textShadow: '0 0 10px rgba(255,255,255,0.1)', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.1))' } : { filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}>
      <TypeAnimation
        sequence={[
          'This took me months to make', 1500,
          'Currently obsessed with Project Zomboid', 1500,
          'I do Graphic Design', 1500,
          'I can make beats too', 1500,
          'I hate updating this page lol', 1500,
          'Hit me up for a Remote work :3', 1500,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
      />
    </div>
  );
}
