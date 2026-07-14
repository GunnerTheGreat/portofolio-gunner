'use client';

import { useLanyardWS } from 'use-lanyard';
import Image from 'next/image';
import Link from 'next/link';
import { getStatusTheme } from '../config/theme';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function FriendCard({ friend }) {
  const theme = 'goth';
  const { c, glassStyle } = getStatusTheme(theme);
  const status = useLanyardWS(friend.discordId);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const discordUser = status?.discord_user;
  const avatarUrl = discordUser?.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : null;
  const avatarDecorationAsset = discordUser?.avatar_decoration_data?.asset;
  const avatarDecorationUrl = avatarDecorationAsset ? `https://cdn.discordapp.com/avatar-decoration-presets/${avatarDecorationAsset}.png?size=96` : null;
  const nameplateAsset = discordUser?.collectibles?.nameplate?.asset;
  const nameplateUrl = nameplateAsset ? `https://cdn.discordapp.com/assets/collectibles/${nameplateAsset}static.png` : null;
  
  const displayName = discordUser?.global_name || discordUser?.display_name || discordUser?.username || friend.name || 'Discord User';
  
  let statusColor = c.offline;
  let statusText = 'Offline';
  
  if (status) {
    if (status.discord_status === 'online') { statusColor = c.online; statusText = 'Online'; }
    if (status.discord_status === 'idle') { statusColor = c.idle; statusText = 'Idle'; }
    if (status.discord_status === 'dnd') { statusColor = c.dnd; statusText = 'Do Not Disturb'; }
  }

  const customStatus = status?.activities?.find(a => a.type === 4);

  return (
    <>
      <Link href={`/connections/${friend.discordId || friend._id}`} className="block w-full">
        <div 
          className={`group relative flex flex-col p-4 rounded-xl border-2 ${c.border} ${c.bg} transition-colors duration-500 w-full overflow-hidden hover:border-[#ff1a1a] cursor-pointer`} 
          style={glassStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          
          {nameplateUrl && (
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
              <img src={nameplateUrl} alt="Nameplate" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>
          )}

          <div className="relative z-10 flex flex-col gap-3 h-full">
            <div className="relative flex items-center gap-3 w-full p-2 rounded-lg border border-white/5 bg-black/10">
              
              <div className="relative z-10 shrink-0 w-12 h-12">
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-md border border-white/10">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt="Discord Avatar" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-black/40 flex items-center justify-center text-xs text-white/50">?</div>
                  )}
                </div>
                {avatarDecorationUrl && (
                  <div className="absolute -inset-[18%] z-20 pointer-events-none">
                    <img 
                      src={avatarDecorationUrl} 
                      alt="Avatar Decoration" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                )}
              </div>
              
              <div className="relative z-10 flex flex-col overflow-hidden min-w-0 flex-1">
                <span className={`text-sm font-bold truncate ${c.textPrimary}`}>{displayName}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className={`relative flex items-center justify-center shrink-0`}>
                    <div className={`absolute w-2.5 h-2.5 rounded-full ${statusColor} ${status?.discord_status !== 'offline' ? 'animate-ping' : ''} opacity-75`} />
                    <div className={`relative w-2.5 h-2.5 rounded-full ${statusColor}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${c.textSecondary} truncate`}>
                    {statusText}
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
          </div>
        </div>
      </Link>

      {mounted && isHovered && friend.description && createPortal(
        <div 
          className="fixed z-[9999] pointer-events-none px-4 py-2 bg-[#050505]/90 backdrop-blur-sm border border-[#ff1a1a] text-[#ff1a1a] text-xs font-mono rounded shadow-[0_0_15px_rgba(255,26,26,0.3)] transition-opacity duration-150 whitespace-nowrap"
          style={{
            left: mousePos.x + 15,
            top: mousePos.y + 15,
          }}
        >
          {friend.description}
        </div>,
        document.body
      )}
    </>
  );
}
