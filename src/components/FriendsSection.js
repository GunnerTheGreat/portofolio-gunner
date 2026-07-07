'use client';

import { Users } from 'lucide-react';
import { portfolioTheme } from '../config/theme';
import FriendCard from './FriendCard';

export default function FriendsSection({ friends }) {
  const c = portfolioTheme;

  const displayFriends = friends || [];

  return (
    <section id="friends" className="gsap-section scroll-mt-32">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2.5 ${c.sectionIconBg} rounded-none ${c.sectionIconColor} border border-[#222]`}>
          <Users size={22} />
        </div>
        <h2 className={`text-xl font-mono font-bold ${c.sectionTitle} tracking-widest uppercase`}>/// CONNECTIONS.LNK</h2>
      </div>
      <div className={`border-b border-solid ${c.dashedBorder} mb-10`} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayFriends.map((friend) => (
          <FriendCard key={friend._id || friend.discordId} friend={friend} />
        ))}
      </div>
    </section>
  );
}
