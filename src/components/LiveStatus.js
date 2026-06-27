'use client';

import { useLanyardWS } from 'use-lanyard';

import { Music, Gamepad2, Activity } from 'lucide-react';
import Image from 'next/image';

const DISCORD_ID = "653802183795408917";

export default function LiveStatus() {
  const theme = 'goth';
  const isGoth = theme === 'goth';
  const isGlass = theme === 'glass';
  const status = useLanyardWS(DISCORD_ID);

  const c = isGlass ? {
    bg: '',
    border: 'border-[rgba(255,255,255,0.1)]',
    textPrimary: 'text-[#e6edf3]',
    textSecondary: 'text-[rgba(230,237,243,0.5)]',
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
    icon: 'text-[#88c0ff]',
    divider: 'via-[rgba(255,255,255,0.1)]'
  } : isGoth ? {
    bg: 'bg-[#111]',
    border: 'border-[#333]',
    textPrimary: 'text-[#e0e0e0]',
    textSecondary: 'text-[#888]',
    online: 'bg-green-600',
    idle: 'bg-yellow-600',
    dnd: 'bg-red-600',
    offline: 'bg-gray-600',
    icon: 'text-[#666]',
    divider: 'via-[#333]'
  } : {
    bg: 'bg-[#fff8f0]',
    border: 'border-[#f5b4c8]',
    textPrimary: 'text-[#d4839a]',
    textSecondary: 'text-[#c4728a]/80',
    online: 'bg-green-400',
    idle: 'bg-yellow-400',
    dnd: 'bg-red-400',
    offline: 'bg-gray-400',
    icon: 'text-[#f0a0b4]',
    divider: 'via-[#f8d0dc]'
  };

  const glassStyle = isGlass ? {
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  } : undefined;

  const glassIconBgStyle = isGlass ? {
    background: 'rgba(136, 192, 255, 0.1)',
  } : undefined;

  if (!status) {
    return (
      <div className={`flex items-center gap-2 p-3 rounded-xl border-2 ${c.border} ${c.bg}`} style={glassStyle}>
        <div className={`w-3 h-3 rounded-full ${c.offline} animate-pulse`} />
        <span className={`text-sm font-semibold ${c.textSecondary}`}>Connecting to Discord...</span>
      </div>
    );
  }


  let statusColor = c.offline;
  if (status.discord_status === 'online') statusColor = c.online;
  if (status.discord_status === 'idle') statusColor = c.idle;
  if (status.discord_status === 'dnd') statusColor = c.dnd;

  const activity = status.activities.find(a => a.type !== 4);


  const customStatus = status.activities.find(a => a.type === 4);
  const spotify = status.spotify;

  const discordUser = status.discord_user;
  const avatarUrl = discordUser && discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : null;
  const nameplateAsset = discordUser?.collectibles?.nameplate?.asset;
  const nameplateUrl = nameplateAsset ? `https://cdn.discordapp.com/assets/collectibles/${nameplateAsset}static.png` : null;
  const displayName = discordUser?.display_name || discordUser?.username || 'Discord User';

  return (
    <div className={`relative flex flex-col p-4 rounded-xl border-2 ${c.border} ${c.bg} transition-colors duration-500 w-full overflow-hidden`} style={glassStyle}>

      {nameplateUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
          <img src={nameplateUrl} alt="Nameplate" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-3">
        <div className="relative flex items-center gap-3 w-full p-2 rounded-lg border border-white/5 bg-black/10">
          
          <div className="relative z-10 shrink-0 w-12 h-12 rounded-sm overflow-hidden shadow-md border border-white/10">
            {avatarUrl ? (
              <Image src={avatarUrl} alt="Discord Avatar" fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-black/40 flex items-center justify-center text-xs text-white/50">?</div>
            )}
          </div>
          
          <div className="relative z-10 flex flex-col overflow-hidden min-w-0 flex-1">
            <span className={`text-sm font-bold truncate ${c.textPrimary}`}>{displayName}</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={`relative flex items-center justify-center shrink-0`}>
                <div className={`absolute w-2.5 h-2.5 rounded-full ${statusColor} animate-ping opacity-75`} />
                <div className={`relative w-2.5 h-2.5 rounded-full ${statusColor}`} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${c.textSecondary} truncate`}>
                {status.discord_status === 'dnd' ? 'Do Not Disturb' : status.discord_status}
              </span>
            </div>
          </div>
        </div>

        {(customStatus && customStatus.state) && (
          <div className="flex flex-col gap-1.5 px-1 mt-1">
            <div className={`text-sm italic ${c.textSecondary} flex items-center gap-1.5`}>
              {customStatus.emoji && customStatus.emoji.id ? (
                <img
                  src={`https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}`}
                  alt="emoji"
                  className="w-4 h-4 object-contain"
                />
              ) : customStatus.emoji && customStatus.emoji.name ? (
                <span>{customStatus.emoji.name}</span>
              ) : null}
              <span className="truncate">{customStatus.state}</span>
            </div>
          </div>
        )}

        <div className={`w-full h-[1px] bg-gradient-to-r from-transparent ${c.divider} to-transparent`} />

        <div className="flex flex-col gap-3">

        {spotify ? (
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 w-12 h-12 rounded-md overflow-hidden shadow-md">
              <Image src={spotify.album_art_url} alt="Album Art" fill className="object-cover" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center gap-1.5">
                <Music size={12} className={c.icon} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Listening to Spotify</span>
              </div>
              <span className={`text-sm font-bold truncate ${c.textPrimary}`}>{spotify.song}</span>
              <span className={`text-xs truncate ${c.textSecondary}`}>by {spotify.artist}</span>
            </div>
          </div>
        ) : activity ? (

          <div className="flex items-center gap-3">
            {activity.assets && activity.assets.large_image && activity.application_id ? (
              <div className="relative shrink-0 w-12 h-12 rounded-md overflow-hidden shadow-md">
                <img 
                  src={activity.assets.large_image.startsWith('mp:external/') 
                    ? `https://media.discordapp.net/external/${activity.assets.large_image.replace('mp:external/', '')}`
                    : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png?size=128`}
                  alt={activity.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className="hidden items-center justify-center w-full h-full border-2 border-[#333] bg-[#0a0a0a]">
                  <Gamepad2 size={24} className={c.icon} />
                </div>
              </div>
            ) : (
              <div className={`flex items-center justify-center shrink-0 w-12 h-12 rounded-md border-2 ${c.border} ${isGoth ? 'bg-[#0a0a0a]' : 'bg-[#111]'}`}>
                <Gamepad2 size={24} className={c.icon} />
              </div>
            )}
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center gap-1.5">
                <Activity size={12} className={c.icon} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Currently Playing</span>
              </div>
              <span className={`text-sm font-bold truncate ${c.textPrimary}`}>{activity.name}</span>
              <span className={`text-xs truncate ${c.textSecondary}`}>{activity.details || 'In Game'}</span>
            </div>
          </div>
        ) : (

          <div className={`text-xs italic ${c.textSecondary}`}>
            Probably out touching grass . . .
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

