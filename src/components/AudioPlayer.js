'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ExternalLink } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa6';

export default function AudioPlayer({
  audioUrl,
  videoRef,
  hasVideo,
  audioTitle = 'Unknown Track',
  audioArtist = 'Unknown Artist',
  coverArtUrl = null,
  spotifyUrl = null,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const hasAudioTrack = Boolean(audioUrl);
  const canPlaySound = hasAudioTrack || hasVideo;

  useEffect(() => {
    const startPlay = async () => {
      try {
        if (hasAudioTrack && audioRef.current) {
          audioRef.current.volume = 0.8;
          await audioRef.current.play();
          setIsPlaying(true);
          setIsMuted(false);
        } else if (hasVideo && videoRef?.current) {
          setIsMuted(videoRef.current.muted);
          setIsPlaying(!videoRef.current.paused);
        }
      } catch (e) {
        setIsPlaying(false);
        setIsMuted(true);
      }
    };

    startPlay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioUrl, hasVideo, videoRef, hasAudioTrack]);

  const togglePlay = () => {
    if (hasAudioTrack && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        }).catch(console.error);
      }
    } else if (hasVideo && videoRef?.current) {
      if (isPlaying && !isMuted) {
        videoRef.current.muted = true;
        setIsMuted(true);
        setIsPlaying(false);
      } else {
        videoRef.current.muted = false;
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        }).catch(console.error);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (hasAudioTrack && audioRef.current) {
      const nextMute = !isMuted;
      audioRef.current.muted = nextMute;
      setIsMuted(nextMute);
    } else if (hasVideo && videoRef?.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
      if (!nextMute) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    }
  };

  if (!canPlaySound && !spotifyUrl) return null;

  return (
    <div className="w-full p-4 border border-white/10 bg-black/60 backdrop-blur-md rounded-xl flex flex-col gap-3 shadow-lg font-mono">
      {hasAudioTrack && (
        <audio
          ref={audioRef}
          src={audioUrl}
          loop
        />
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1">
          <div className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-white/20 shadow-md">
            {coverArtUrl ? (
              <img
                src={coverArtUrl}
                alt={audioTitle}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#ff1a1a]/30 to-black flex items-center justify-center text-[#ff1a1a]">
                <Music size={20} />
              </div>
            )}

            {isPlaying && !isMuted && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center gap-1">
                <span className="w-1 bg-[#ff1a1a] h-4 animate-[bounce_0.6s_infinite_100ms] rounded-full" />
                <span className="w-1 bg-[#ff1a1a] h-6 animate-[bounce_0.6s_infinite_300ms] rounded-full" />
                <span className="w-1 bg-[#ff1a1a] h-3 animate-[bounce_0.6s_infinite_200ms] rounded-full" />
              </div>
            )}
          </div>

          <div className="flex flex-col overflow-hidden min-w-0">
            <span className="text-xs text-white/90 font-bold truncate tracking-wide">
              {audioTitle}
            </span>
            <span className="text-[11px] text-white/50 truncate mt-0.5">
              {audioArtist}
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-[9px] text-[#ff1a1a] uppercase tracking-wider opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a1a] animate-pulse" />
              {hasAudioTrack ? 'TRACK_LOOP' : 'VIDEO_AUDIO_LOOP'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff1a1a]/20 border border-white/20 hover:border-[#ff1a1a] flex items-center justify-center text-white hover:text-[#ff1a1a] transition-all shadow-md active:scale-95 cursor-pointer"
            title={isPlaying && !isMuted ? 'Pause Audio' : 'Play / Unmute Audio'}
          >
            {isPlaying && !isMuted ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>

          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all active:scale-95 cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>

      {spotifyUrl && (
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs gap-2">
          <span className="text-[10px] text-white/40 uppercase tracking-widest truncate">
            /// SPOTIFY_LINK
          </span>
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/40 text-[#1DB954] hover:bg-[#1DB954] hover:text-black font-semibold text-[11px] transition-all duration-300 shadow-[0_0_10px_rgba(29,185,84,0.15)] hover:shadow-[0_0_15px_rgba(29,185,84,0.4)] shrink-0"
          >
            <FaSpotify size={14} />
            <span>Listen on Spotify</span>
            <ExternalLink size={10} className="ml-0.5 opacity-70" />
          </a>
        </div>
      )}
    </div>
  );
}
