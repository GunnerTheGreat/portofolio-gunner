import { client } from "@/sanity";
import FriendCard from "@/components/FriendCard";
import Link from "next/link";
import { ArrowLeft, Play, Pause, Volume2, Monitor } from "lucide-react";
import { portfolioTheme } from "@/config/theme";

import AudioPlayer from "@/components/AudioPlayer";

export const revalidate = 0;

export default async function ConnectionPage({ params }) {
  const { id } = await params;

  const query = `*[_type == "friend" && (discordId == $id || _id == $id)][0]{
    _id,
    name,
    discordId,
    description,
    "backgroundVideoUrl": backgroundVideoFile.asset->url,
    "audioUrl": audioFile.asset->url,
    audioTitle,
    audioArtist,
    twitterUrl,
    githubUrl,
    websiteUrl
  }`;

  const friend = await client.fetch(query, { id }).catch(() => null);

  if (!friend) {
    return (
      <div className="min-h-screen bg-[#000] flex flex-col items-center justify-center text-white font-mono">
        <h1 className="text-2xl text-[#ff1a1a] mb-4">CONNECTION_NOT_FOUND</h1>
        <Link href="/" className="border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors">
          {"<-"} RETURN_HOME
        </Link>
      </div>
    );
  }

  const c = portfolioTheme;

  return (
    <main className="min-h-screen bg-[#000] relative overflow-hidden flex items-center justify-center font-mono">
      {friend.backgroundVideoUrl ? (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40">
          <video
            src={friend.backgroundVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 flex items-center justify-center border-4 border-dashed border-white/10 m-8 rounded-3xl">
            <div className="text-white/20 flex flex-col items-center gap-2">
              <Monitor size={48} />
              <span>[NO_BACKGROUND_VIDEO]</span>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-md w-full mx-auto px-4 flex flex-col items-center gap-8">
        
        <div className="w-full flex justify-start">
          <Link 
            href="/" 
            className={`flex items-center gap-2 text-sm ${c.textSecondary} hover:${c.textPrimary} transition-colors`}
          >
            <ArrowLeft size={16} />
            BACK_TO_SYSTEM
          </Link>
        </div>

        <div className="w-full">
          <div className="text-xs text-[#ff1a1a] mb-2 opacity-70 tracking-widest uppercase">
            /// CONNECTION_ESTABLISHED
          </div>
          <FriendCard friend={friend} />
        </div>

        {(friend.twitterUrl || friend.githubUrl || friend.websiteUrl) ? (
          <div className="w-full p-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl">
            <div className="text-xs text-white/50 mb-3 tracking-widest uppercase">
              /// SOCIAL_LINKS.LNK
            </div>
            <div className="flex gap-4 justify-center">
              {friend.twitterUrl && (
                <a href={friend.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:bg-white/5 transition-all">
                  <span className="text-[10px]">TW</span>
                </a>
              )}
              {friend.githubUrl && (
                <a href={friend.githubUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white hover:bg-white/5 transition-all">
                  <span className="text-[10px]">GH</span>
                </a>
              )}
              {friend.websiteUrl && (
                <a href={friend.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-[#00ffcc] hover:border-[#00ffcc] hover:bg-white/5 transition-all">
                  <span className="text-[10px]">WEB</span>
                </a>
              )}
            </div>
          </div>
        ) : null}

        {friend.audioUrl && (
          <div className="w-full p-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ff1a1a]/20 text-[#ff1a1a] flex items-center justify-center">
                <Play size={18} className="ml-1" />
              </div>
              <div>
                <div className="text-xs text-white/80 font-bold">{friend.audioTitle || "Unknown Track"}</div>
                <div className="text-[10px] text-white/40">{friend.audioArtist || "Unknown Artist"}</div>
              </div>
            </div>
            <Volume2 size={16} className="text-white/40" />
            <AudioPlayer url={friend.audioUrl} />
          </div>
        )}

      </div>
    </main>
  );
}
