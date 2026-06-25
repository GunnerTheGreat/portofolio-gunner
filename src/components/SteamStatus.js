'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { MonitorPlay, Clock } from 'lucide-react';

export default function SteamStatus() {
  const theme = 'goth';
  const isGoth = theme === 'goth';
  const isGlass = theme === 'glass';
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSteam() {
      try {
        const res = await fetch('/api/steam');
        const json = await res.json();
        if (res.ok) {
          setData(json);
        } else {
          setError(json.error);
        }
      } catch (err) {
        setError('Failed to load Steam data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchSteam();


    const interval = setInterval(fetchSteam, 60000);
    return () => clearInterval(interval);
  }, []);

  const c = isGlass ? {
    bg: '',
    border: 'border-[rgba(255,255,255,0.1)]',
    textPrimary: 'text-[#e6edf3]',
    textSecondary: 'text-[rgba(230,237,243,0.5)]',
    icon: 'text-[#88c0ff]',
    divider: 'via-[rgba(255,255,255,0.1)]'
  } : isGoth ? {
    bg: 'bg-[#111]',
    border: 'border-[#333]',
    textPrimary: 'text-[#e0e0e0]',
    textSecondary: 'text-[#888]',
    icon: 'text-[#666]',
    divider: 'via-[#333]'
  } : {
    bg: 'bg-[#fff8f0]',
    border: 'border-[#f5b4c8]',
    textPrimary: 'text-[#d4839a]',
    textSecondary: 'text-[#c4728a]/80',
    icon: 'text-[#f0a0b4]',
    divider: 'via-[#f8d0dc]'
  };

  const glassStyle = isGlass ? {
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  } : undefined;

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 p-3 rounded-xl border-2 ${c.border} ${c.bg}`} style={glassStyle}>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
        <span className={`text-sm font-semibold ${c.textSecondary}`}>Connecting to Steam...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`flex flex-col gap-1 p-3 rounded-xl border-2 ${c.border} ${c.bg}`} style={glassStyle}>
        <span className={`text-sm font-semibold ${c.textSecondary}`}>Steam Integration Setup Required</span>
        <span className={`text-xs ${c.textSecondary} opacity-70`}>Waiting for API keys in .env.local...</span>
      </div>
    );
  }

  const { profile, recentGames } = data;


  let statusClasses = 'border-gray-500 bg-gray-500';
  if (profile.statusColor === 'blue') statusClasses = 'border-blue-400 bg-blue-400';
  if (profile.statusColor === 'green') statusClasses = 'border-green-400 bg-green-400';

  return (
    <div className={`flex flex-col gap-3 p-4 rounded-xl border-2 ${c.border} ${c.bg} transition-colors duration-500 w-full overflow-hidden`} style={glassStyle}>


      <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
        <div className={`relative shrink-0 w-12 h-12 rounded-sm border-2 overflow-hidden shadow-md ${statusClasses.split(' ')[0]}`}>
          <Image src={profile.avatarUrl} alt="Steam Avatar" fill className="object-cover" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold truncate ${c.textPrimary}`}>{profile.name}</span>
            <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${statusClasses.split(' ')[1]}`}>
              {profile.statusText === 'Offline' ? 'Probably Touching grass' : profile.statusText}
            </div>
          </div>
          {profile.currentGame ? (
            <span className={`text-xs truncate ${c.textSecondary} font-semibold text-green-500`}>
              Playing: {profile.currentGame}
            </span>
          ) : (
            <span className={`text-xs truncate ${c.textSecondary}`}>
              Steam Profile
            </span>
          )}
        </div>
      </a>

      <div className={`w-full h-[1px] bg-gradient-to-r from-transparent ${c.divider} to-transparent`} />


      {recentGames.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 mb-1">
            <MonitorPlay size={12} className={c.icon} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Recently Played</span>
          </div>

          <div className="flex flex-col gap-2">
            {recentGames.map((game) => (
              <div key={game.appid} className="flex items-center gap-2">
                <div className="relative w-6 h-6 shrink-0 rounded overflow-hidden">
                  <Image
                    src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                    alt={game.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-bold truncate ${c.textPrimary}`}>{game.name}</span>
                  <span className={`text-[10px] ${c.textSecondary} flex items-center gap-1`}>
                    <Clock size={10} /> {Math.round(game.playtime_2weeks / 60)} hrs past 2 weeks
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

