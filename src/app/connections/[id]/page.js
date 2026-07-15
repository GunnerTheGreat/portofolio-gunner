import { client } from "@/sanity";
import FriendCard from "@/components/FriendCard";
import Link from "next/link";
import { ArrowLeft, Play, Pause, Volume2, Monitor } from "lucide-react";
import { portfolioTheme } from "@/config/theme";
import { FaXTwitter, FaGithub, FaInstagram, FaFacebook, FaTiktok, FaGlobe } from "react-icons/fa6";

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
    websiteUrl,
    instagramUrl,
    facebookUrl,
    tiktokUrl,
    spotifyUrl
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

  let audioTitle = friend.audioTitle || "Unknown Track";
  let audioArtist = friend.audioArtist || "Unknown Artist";
  let coverArtUrl = null;

  if (friend.spotifyUrl) {
    try {
      const res = await fetch(`https://open.spotify.com/oembed?url=${friend.spotifyUrl}`);
      if (res.ok) {
        const data = await res.json();
        coverArtUrl = data.thumbnail_url;
        audioTitle = data.title || audioTitle;
        audioArtist = data.author_name || friend.audioArtist || "Unknown Artist";
      }
    } catch (e) {
      console.error("Failed to fetch Spotify oEmbed data");
    }
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

        {(friend.twitterUrl || friend.githubUrl || friend.websiteUrl || friend.instagramUrl || friend.facebookUrl || friend.tiktokUrl) ? (
          <div className="w-full p-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl">
            <div className="text-xs text-white/50 mb-3 tracking-widest uppercase">
              /// SOCIAL_LINKS.LNK
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {friend.twitterUrl && (
                <a href={friend.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:bg-white/5 transition-all">
                  <FaXTwitter size={16} />
                </a>
              )}
              {friend.githubUrl && (
                <a href={friend.githubUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white hover:bg-white/5 transition-all">
                  <FaGithub size={16} />
                </a>
              )}
              {friend.instagramUrl && (
                <a href={friend.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-white/5 transition-all">
                  <FaInstagram size={18} />
                </a>
              )}
              {friend.facebookUrl && (
                <a href={friend.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-white/5 transition-all">
                  <FaFacebook size={16} />
                </a>
              )}
              {friend.tiktokUrl && (
                <a href={friend.tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-[#ff0050] hover:border-[#ff0050] hover:bg-white/5 transition-all">
                  <FaTiktok size={16} />
                </a>
              )}
              {friend.websiteUrl && (
                <a href={friend.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-[#00ffcc] hover:border-[#00ffcc] hover:bg-white/5 transition-all">
                  <FaGlobe size={16} />
                </a>
              )}
            </div>
          </div>
        ) : null}

        {friend.audioUrl && (
          <div className="w-full p-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              {coverArtUrl ? (
                <img src={coverArtUrl} alt={audioTitle} className="w-12 h-12 rounded-md object-cover border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#ff1a1a]/20 text-[#ff1a1a] flex items-center justify-center">
                  <Play size={18} className="ml-1" />
                </div>
              )}
              <div className="ml-2">
                <div className="text-xs text-white/80 font-bold max-w-[180px] truncate">{audioTitle}</div>
                <div className="text-[10px] text-white/40 truncate">{audioArtist}</div>
              </div>
            </div>
            <Volume2 size={16} className="text-white/40 flex-shrink-0" />
            <AudioPlayer url={friend.audioUrl} />
          </div>
        )}

      </div>
    </main>
  );
}
