'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Gamepad2, Trophy, Clock } from 'lucide-react';
import { getStatusTheme } from '../config/theme';

export default function XboxStatus() {
  const theme = 'goth';
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchXbox() {
      try {
        const res = await fetch(`/api/xbox?t=${Date.now()}`);
        const json = await res.json();
        if (res.ok) {
          setData(json);
        } else {
          setError(json.error);
        }
      } catch (err) {
        setError('Failed to load Xbox data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchXbox();

    const interval = setInterval(fetchXbox, 60000);
    return () => clearInterval(interval);
  }, []);

  const { c, glassStyle } = getStatusTheme(theme);

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 p-3 rounded-xl border-2 ${c.border} ${c.bg}`} style={glassStyle}>
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        <span className={`text-sm font-semibold ${c.textSecondary}`}>Connecting to Xbox Live...</span>
      </div>
    );
  }

  if (error || !data) {
    const isRateLimited = error && (error.toLowerCase().includes('failed') || error.includes('429') || error.includes('fetch'));
    if (isRateLimited) {
      return (
        <div className={`flex items-center gap-3 p-3 rounded-xl border-2 ${c.border} ${c.bg}`} style={glassStyle}>
          <div className="w-4 h-4 rounded-full border-2 border-green-500 border-t-transparent animate-spin" />
          <div className="flex flex-col">
            <span className={`text-sm font-semibold text-green-500`}>API Refreshing...</span>
            <span className={`text-xs ${c.textSecondary} opacity-70`}>Please wait a few minutes (Rate Limit Active)</span>
          </div>
        </div>
      );
    }
    return (
      <div className={`flex flex-col gap-1 p-3 rounded-xl border-2 ${c.border} ${c.bg}`} style={glassStyle}>
        <span className={`text-sm font-semibold ${c.textSecondary}`}>Xbox Integration Setup Required</span>
        <span className={`text-xs ${c.textSecondary} opacity-70`}>Waiting for XBL_API_KEY in .env.local...</span>
      </div>
    );
  }

  const { profile, recentGames } = data;

  let statusClasses = 'border-gray-500 bg-gray-500';
  if (profile.statusColor === 'blue') statusClasses = 'border-blue-400 bg-blue-400';
  if (profile.statusColor === 'green') statusClasses = 'border-green-500 bg-green-500';

  return (
    <div className={`relative flex flex-col gap-4 p-4 rounded-xl border-2 border-green-500/20 bg-black/60 transition-colors duration-500 w-full overflow-hidden`} style={glassStyle}>

      {recentGames?.[0]?.img_icon_url && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <Image src={recentGames[0].img_icon_url} alt="Game Background" fill className="object-cover blur-[4px]" priority={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      )}

      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-gradient-to-br from-green-500/20 via-transparent to-transparent" />

      <div className="relative z-10 flex items-start justify-between w-full">
        <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group hover:opacity-80 transition-opacity min-w-0">
          <div className={`relative shrink-0 w-12 h-12 rounded-full border-2 overflow-hidden shadow-md ${statusClasses.split(' ')[0]}`}>
            <Image src={profile.avatarUrl} alt="Xbox Avatar" fill className="object-cover" />
          </div>
          
          <div className="flex flex-col overflow-hidden min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold truncate ${c.textPrimary}`}>{profile.name}</span>
              <div className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${statusClasses.split(' ')[1]}`}>
                {profile.statusText === 'Offline' ? 'Offline' : profile.statusText}
              </div>
            </div>
            {profile.currentGame ? (
              <span className={`text-xs truncate ${c.textSecondary} font-semibold text-blue-400`}>
                Playing: {profile.currentGame}
              </span>
            ) : (
              <span className={`text-xs truncate ${c.textSecondary}`}>
                Xbox Live Profile
              </span>
            )}
          </div>
        </a>

        <div className="flex items-center gap-3 shrink-0">
          <div 
            className="flex items-center justify-center h-11 px-3 rounded-full border-[3px] border-green-600 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] shadow-[0_0_12px_rgba(34,197,94,0.3)] shrink-0 gap-1.5"
            title="Gamerscore"
          >
            <span className="text-green-500 drop-shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </span>
            <span className="text-[#e2e2e2] font-bold text-[15px] drop-shadow-md">{parseInt(profile.gamerscore).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className={`relative z-10 w-full h-[1px] bg-gradient-to-r from-transparent ${c.divider} to-transparent`} />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Gamepad2 size={12} className="text-green-500" />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Recent Activity</span>
          </div>
          <div className="flex flex-col gap-2">
            {recentGames && recentGames.length > 0 ? (
              recentGames.map((game, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="relative w-8 h-8 shrink-0 rounded overflow-hidden">
                    {game.img_icon_url ? (
                      <Image src={game.img_icon_url} alt={game.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black/20 flex items-center justify-center border border-white/5">
                        <Gamepad2 size={14} className={c.icon} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-xs font-bold truncate ${c.textPrimary}`}>{game.name}</span>
                    <span className={`text-[10px] ${c.textSecondary} flex items-center gap-1`}>
                      <Trophy size={10} className="text-green-600" /> 
                      {game.earnedAchievements}/{game.totalAchievements} Achievements
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
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Status Details</span>
          </div>
          <div className="flex flex-col gap-2">
             <div className="flex flex-col bg-black/20 p-2 rounded border border-white/5 shadow-inner">
               <span className={`text-xs font-bold ${c.textPrimary}`}>Gamerscore</span>
               <span className={`text-sm text-green-500 font-mono mt-0.5`}>{parseInt(profile.gamerscore).toLocaleString()} G</span>
             </div>
             {profile.currentGame && (
               <div className="flex flex-col bg-black/20 p-2 rounded border border-white/5 shadow-inner mt-1">
                 <span className={`text-xs font-bold ${c.textPrimary}`}>Currently Playing</span>
                 <span className={`text-[10px] ${c.textSecondary} truncate mt-0.5`}>{profile.currentGame}</span>
               </div>
             )}
          </div>
        </div>

      </div>

    </div>
  );
}
