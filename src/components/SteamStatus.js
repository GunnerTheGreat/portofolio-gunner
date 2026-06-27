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
        const res = await fetch(`/api/steam?t=${Date.now()}`);
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
    <div className={`relative flex flex-col gap-4 p-4 rounded-xl border-2 ${c.border} ${c.bg} transition-colors duration-500 w-full overflow-hidden`} style={glassStyle}>

      {(profile.miniprofileVideoUrl || profile.miniprofileBackgroundUrl) && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
          {profile.miniprofileVideoUrl ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
              <source src={profile.miniprofileVideoUrl} type="video/mp4" />
            </video>
          ) : (
            <Image src={profile.miniprofileBackgroundUrl} alt="Background" fill className="object-cover opacity-40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 flex items-center gap-3 group hover:opacity-80 transition-opacity">
        <div className={`relative shrink-0 w-12 h-12 ${!profile.avatarFrameUrl ? `rounded-sm border-2 overflow-hidden shadow-md ${statusClasses.split(' ')[0]}` : ''}`}>
          <div className={profile.avatarFrameUrl ? "absolute inset-[5px] rounded-sm overflow-hidden shadow-sm" : "w-full h-full"}>
            <Image src={profile.avatarUrl} alt="Steam Avatar" fill className="object-cover" />
          </div>
          {profile.avatarFrameUrl && (
            <div className="absolute inset-[-7px] z-10 pointer-events-none scale-[1.05]">
              <Image src={profile.avatarFrameUrl} alt="Avatar Frame" fill className="object-contain" />
            </div>
          )}
        </div>
        <div className="flex flex-col overflow-hidden min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold truncate ${c.textPrimary}`}>{profile.name}</span>
            <div className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${statusClasses.split(' ')[1]}`}>
              {profile.statusText === 'Offline' ? 'Touching grass' : profile.statusText}
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

      <div className={`relative z-10 w-full h-[1px] bg-gradient-to-r from-transparent ${c.divider} to-transparent`} />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 mb-1">
            <MonitorPlay size={12} className={c.icon} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Recent Activity</span>
          </div>
          <div className="flex flex-col gap-2">
            {recentGames && recentGames.length > 0 ? (
              recentGames.map((game) => (
                <div key={game.appid} className="flex items-center gap-2">
                  <div className="relative w-6 h-6 shrink-0 rounded overflow-hidden">
                    {game.img_icon_url ? (
                      <Image src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt={game.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black/20" />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-xs font-bold truncate ${c.textPrimary}`}>{game.name}</span>
                    <span className={`text-[10px] ${c.textSecondary} flex items-center gap-1`}>
                      <Clock size={10} /> {Math.round(game.playtime_2weeks / 60)} hrs past 2 weeks
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className={`text-xs ${c.textSecondary}`}>No recent activity</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c.icon}>
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
            </svg>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Top Games</span>
          </div>
          <div className="flex flex-col gap-2">
            {data.topGames && data.topGames.length > 0 ? (
              data.topGames.map((game) => (
                <div key={game.appid} className="flex items-center gap-2">
                  <div className="relative w-6 h-6 shrink-0 rounded overflow-hidden">
                    {game.img_icon_url ? (
                      <Image src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt={game.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black/20" />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-xs font-bold truncate ${c.textPrimary}`}>{game.name}</span>
                    <span className={`text-[10px] ${c.textSecondary} flex items-center gap-1`}>
                      <Clock size={10} /> {Math.round(game.playtime_forever / 60)} hrs total
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className={`text-xs ${c.textSecondary}`}>No games found</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c.icon}>
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Favorite Games</span>
          </div>
          <div className="flex flex-col gap-2">
            {data.favoriteGames && data.favoriteGames.length > 0 ? (
              data.favoriteGames.map((game) => (
                <div key={game.appid} className="flex items-center gap-2">
                  <div className="relative w-6 h-6 shrink-0 rounded overflow-hidden">
                    {game.img_icon_url ? (
                      <Image src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt={game.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black/20 flex items-center justify-center">
                        <span className="text-[8px] text-white/50">{game.appid}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-xs font-bold truncate ${c.textPrimary}`}>{game.name}</span>
                    <span className={`text-[10px] ${c.textSecondary} flex items-center gap-1`}>
                      <Clock size={10} /> {Math.round(game.playtime_forever / 60)} hrs total
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className={`text-xs ${c.textSecondary}`}>No favorites set</span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

