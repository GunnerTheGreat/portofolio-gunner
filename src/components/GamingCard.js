'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSteam, FaDiscord, FaFacebook, FaInstagram, FaYoutube, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SiRiotgames, SiUbisoft } from 'react-icons/si';
import LiveStatus from './LiveStatus';
import SteamStatus from './SteamStatus';
import XboxStatus from './XboxStatus';
import ValorantStatus from './ValorantStatus';

export default function GamingCard() {
  const [isOpen, setIsOpen] = useState(true);

  const myGames = ["Valorant", "Apex Legends", "Genshin Impact", "League of Legends"];

  const platforms = [
    { name: "Riot Games", ign: "GOD OF GUNNERS#myzil", icon: <SiRiotgames size={18} />, url: "https://tracker.gg/valorant/profile/riot/GOD%20OF%20GUNNERS%23myzil/overview" },
    { name: "Steam", ign: "Code: 492348514", icon: <FaSteam size={18} />, url: "https://steamcommunity.com/profiles/76561198452614242" },
    { name: "Ubisoft", ign: "GunnerTheGreat2", icon: <SiUbisoft size={18} />, url: "#" },
    { name: "Discord", ign: "djgunnertherevival", icon: <FaDiscord size={18} />, url: "https://discordapp.com/users/653802183795408917" },
    { name: "Facebook", ign: "GunnerTheGreat69", icon: <FaFacebook size={18} />, url: "https://www.facebook.com/GunnerTheGreat69" },
    { name: "Instagram", ign: "justgunner69", icon: <FaInstagram size={18} />, url: "https://www.instagram.com/justgunner69" },
    { name: "YouTube", ign: "@gunner5325", icon: <FaYoutube size={18} />, url: "https://www.youtube.com/@gunner5325" }
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-none border border-[#222] bg-[#050505] w-full relative group">
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#ff1a1a] opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#ff1a1a] opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="w-full relative z-10">
        
        <div className="w-full border-b border-[#333] pb-6 flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-6 bg-[#ff1a1a]" />
              <h3 className="text-xl font-bold text-[#e0e0e0] uppercase tracking-widest font-mono">
                GAMING_PROFILE
              </h3>
            </div>

            <div className="flex max-w-full">
              <h4 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#ff1a1a] drop-shadow-[0_0_15px_rgba(255,26,26,0.3)] truncate max-w-full tracking-tighter"
                style={{ fontFamily: 'var(--font-unifraktur), serif' }}>
                JustGunner
              </h4>
            </div>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 bg-[#111] border border-[#333] hover:border-[#ff1a1a] text-[#888] hover:text-[#e0e0e0] transition-colors mt-2"
            title={isOpen ? "Collapse Card" : "Expand Card"}
          >
            {isOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start w-full pt-4">
                
                <div className="flex-1 w-full min-w-0">
                  <div>
                    <p className="text-xs mb-3 font-mono tracking-widest text-[#888] uppercase">[ CURRENTLY PLAYING ]</p>
                    <div className="flex flex-wrap gap-2">
                      {myGames.map((game, i) => (
                        <span key={i} className="px-3 py-1 text-xs rounded-none border border-[#333] bg-[#111] text-[#aaa] font-mono hover:border-[#ff1a1a] hover:text-[#e0e0e0] transition-colors duration-300">
                          {game}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 w-full flex flex-col gap-4">
                    <LiveStatus />
                    <ValorantStatus />
                    <SteamStatus />
                    <XboxStatus />
                  </div>
                </div>

                <div className="w-full md:w-72 flex flex-col gap-3">
                  <p className="text-xs font-mono tracking-widest mb-1 hidden md:block text-[#888] uppercase shrink-0">[ NETWORK_CONNECTIONS ]</p>
                  <div className="flex flex-col gap-3">
                    {platforms.map((platform, i) => (
                      <a
                        key={i}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 rounded-none border border-[#222] bg-[#0a0a0a] hover:bg-[#ff1a1a] text-[#ccc] hover:text-[#000] transition-all duration-300 group/btn"
                      >
                        <span className="group-hover/btn:scale-110 transition-transform duration-300 flex items-center justify-center shrink-0">
                          {platform.icon}
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-bold font-mono uppercase tracking-wider">{platform.name}</span>
                          <span className="text-xs text-[#888] group-hover/btn:text-[#333] truncate max-w-[150px] font-mono">{platform.ign}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
