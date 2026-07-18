'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Target, Trophy, Swords, Medal, History } from 'lucide-react';
import { getStatusTheme } from '../config/theme';

export default function ValorantStatus() {
  const theme = 'goth';
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchValorant() {
      try {
        const res = await fetch(`/api/valorant?t=${Date.now()}`);
        const json = await res.json();
        if (res.ok) {
          setData(json);
        } else {
          setError(json.error);
        }
      } catch (err) {
        setError('Failed to load Valorant data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchValorant();

    const interval = setInterval(fetchValorant, 60000);
    return () => clearInterval(interval);
  }, []);

  const { c, glassStyle } = getStatusTheme(theme);

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 p-3 rounded-xl border-2 ${c.border} ${c.bg}`} style={glassStyle}>
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        <span className={`text-sm font-semibold ${c.textSecondary}`}>Connecting to Riot Games...</span>
      </div>
    );
  }

  if (error || !data) {
    const isRateLimited = error && (error.toLowerCase().includes('failed') || error.includes('429') || error.includes('fetch'));
    if (isRateLimited) {
      return (
        <div className={`flex items-center gap-3 p-3 rounded-xl border-2 ${c.border} ${c.bg}`} style={glassStyle}>
          <div className="w-4 h-4 rounded-full border-2 border-[#ff4655] border-t-transparent animate-spin" />
          <div className="flex flex-col">
            <span className={`text-sm font-semibold text-[#ff4655]`}>API Refreshing...</span>
            <span className={`text-xs ${c.textSecondary} opacity-70`}>Please wait a few minutes (Rate Limit Active)</span>
          </div>
        </div>
      );
    }
    return (
      <div className={`flex flex-col gap-1 p-3 rounded-xl border-2 ${c.border} ${c.bg}`} style={glassStyle}>
        <span className={`text-sm font-semibold ${c.textSecondary}`}>Valorant Integration Setup Required</span>
        <span className={`text-xs ${c.textSecondary} opacity-70`}>Waiting for VALORANT_API_KEY in .env.local...</span>
      </div>
    );
  }

  const { mmr, account, recentMatches, bestAgent } = data;
  const current = mmr?.current_data;
  const peak = mmr?.highest_rank;

  return (
    <div className={`relative flex flex-col gap-4 p-4 rounded-xl border-2 border-[#ff4655]/20 bg-black/60 transition-colors duration-500 w-full overflow-hidden`} style={glassStyle}>

      {account?.card?.wide && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.25]">
          <Image src={account.card.wide} alt="Valorant Player Card" fill className="object-cover blur-[2px]" priority={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
      )}

      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-gradient-to-br from-[#ff4655]/10 via-transparent to-transparent" />

      <div className="relative z-10 flex items-start justify-between w-full">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`relative shrink-0 w-12 h-12 rounded-lg border-2 border-[#ff4655] overflow-hidden shadow-md bg-black`}>
            {account?.card?.small ? (
               <Image src={account.card.small} alt="Player Avatar" fill className="object-cover" />
            ) : (
               <Target className="w-6 h-6 m-auto text-[#ff4655]" />
            )}
          </div>
          
          <div className="flex flex-col overflow-hidden min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold truncate ${c.textPrimary}`}>{account.name}</span>
              <span className={`text-xs font-mono text-[#ff4655]`}>#{account.tag}</span>
            </div>
            <span className={`text-xs truncate ${c.textSecondary} font-semibold`}>
              Level {account.account_level}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div 
            className="flex items-center justify-center h-11 px-3 rounded-md border-[2px] border-[#ff4655]/50 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] shadow-[0_0_12px_rgba(255,70,85,0.2)] shrink-0 gap-2"
            title="Rank Rating"
          >
            {current?.images?.small && (
               <div className="relative w-6 h-6">
                 <Image src={current.images.small} alt={current.currenttierpatched} fill className="object-contain drop-shadow-md" />
               </div>
            )}
            <span className="text-[#e2e2e2] font-bold text-sm drop-shadow-md">{current?.ranking_in_tier || 0} RR</span>
          </div>
        </div>
      </div>

      <div className={`relative z-10 w-full h-[1px] bg-gradient-to-r from-transparent border-[#ff4655]/20 border-t to-transparent`} />

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Trophy size={11} className="text-[#ff4655]" />
            <span className={`text-[9px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Current</span>
          </div>
          <div className="flex flex-col bg-black/40 p-2 rounded border border-white/5 shadow-inner">
             <span className={`text-[13px] font-bold text-[#ff4655] truncate`}>{current?.currenttierpatched || 'Unrated'}</span>
             <span className={`text-[10px] text-gray-400 mt-0.5`}>Elo: {current?.elo || 0}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Medal size={11} className="text-[#ff4655]" />
            <span className={`text-[9px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Peak Rank</span>
          </div>
          <div className="flex flex-col bg-black/40 p-2 rounded border border-white/5 shadow-inner">
             <span className={`text-[13px] font-bold text-yellow-400 truncate drop-shadow-[0_0_2px_rgba(250,204,21,0.5)]`}>
               {peak?.patched_tier || 'Unrated'}
             </span>
             <span className={`text-[10px] text-gray-400 mt-0.5`}>{peak?.season ? `Episode ${peak.season.charAt(1)}` : '-'}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Target size={11} className="text-[#ff4655]" />
            <span className={`text-[9px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Best Agent</span>
          </div>
          <div className="flex items-center bg-black/40 p-2 rounded border border-white/5 shadow-inner gap-2">
             {bestAgent?.icon ? (
                <div className="relative w-7 h-7 rounded border border-white/10 overflow-hidden bg-black/50 shrink-0">
                  <Image src={bestAgent.icon} alt={bestAgent.name} fill className="object-cover" />
                </div>
             ) : (
                <div className="w-7 h-7 rounded border border-white/10 bg-black/50 shrink-0" />
             )}
             <span className={`text-[13px] font-bold ${c.textPrimary} truncate`}>{bestAgent?.name || 'Unknown'}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Swords size={11} className="text-[#ff4655]" />
            <span className={`text-[9px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Last RR</span>
          </div>
          <div className="flex flex-col bg-black/40 p-2 rounded border border-white/5 shadow-inner h-[46px] justify-center">
             <div className="flex items-center gap-2">
               <span className={`text-sm font-mono font-bold ${(current?.mmr_change_to_last_game || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                 {(current?.mmr_change_to_last_game || 0) >= 0 ? '+' : ''}{current?.mmr_change_to_last_game || 0}
               </span>
             </div>
          </div>
        </div>

      </div>

      {recentMatches && recentMatches.length > 0 && (
        <>
          <div className={`relative z-10 w-full h-[1px] bg-gradient-to-r from-transparent border-[#ff4655]/20 border-t to-transparent mt-1`} />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 mb-1">
              <History size={12} className="text-[#ff4655]" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Match History</span>
            </div>
            <div className="flex flex-col gap-2">
              {recentMatches.map((match, i) => (
                <div key={match.id} className="match-row-wrapper relative flex items-center justify-between p-2 rounded bg-black/60 border border-white/10 overflow-hidden hover:border-[#ff4655]/50 transition-all duration-300 cursor-pointer">
                  {match.mapImage && (
                    <div className="match-bg absolute inset-0 z-0 overflow-hidden">
                      <Image src={match.mapImage} alt={match.map} fill className="object-cover object-right" />
                      <div className="match-gradient absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
                    </div>
                  )}
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded border border-white/20 overflow-hidden bg-black/80 shrink-0 shadow-lg">
                      {match.agentIcon && <Image src={match.agentIcon} alt={match.agent} fill className="object-cover" />}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-bold ${c.textPrimary} drop-shadow-md`}>{match.mode}</span>
                        {match.isMatchMvp && <span className="px-1 py-[1px] bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 text-[8px] rounded uppercase font-bold drop-shadow-md">Match MVP</span>}
                        {match.isTeamMvp && <span className="px-1 py-[1px] bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[8px] rounded uppercase font-bold drop-shadow-md">Team MVP</span>}
                      </div>
                      <span className="text-[10px] text-gray-300 font-mono drop-shadow-md">{match.map} • {match.kills} / {match.deaths} / {match.assists}</span>
                    </div>
                  </div>
                  <div className={`relative z-10 text-[10px] font-bold font-mono px-2 py-1 rounded border ${match.isWin ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'} backdrop-blur-sm shadow-lg`}>
                    {match.isWin ? 'VICTORY' : 'DEFEAT'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
}
