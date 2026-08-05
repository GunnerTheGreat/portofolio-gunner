'use client';

import { useRef } from 'react';
import { Monitor } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

export default function ConnectionMedia({
  backgroundVideoUrl,
  audioUrl,
  audioTitle,
  audioArtist,
  coverArtUrl,
  spotifyUrl,
  children,
}) {
  const videoRef = useRef(null);

  return (
    <>
      {backgroundVideoUrl ? (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40">
          <video
            ref={videoRef}
            src={backgroundVideoUrl}
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
            <div className="text-white/20 flex flex-col items-center gap-2 font-mono">
              <Monitor size={48} />
              <span>[NO_BACKGROUND_VIDEO]</span>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-md w-full mx-auto px-4 flex flex-col items-center gap-8 py-8">
        {children}

        {(audioUrl || backgroundVideoUrl || spotifyUrl) && (
          <AudioPlayer
            audioUrl={audioUrl}
            videoRef={videoRef}
            hasVideo={Boolean(backgroundVideoUrl)}
            audioTitle={audioTitle}
            audioArtist={audioArtist}
            coverArtUrl={coverArtUrl}
            spotifyUrl={spotifyUrl}
          />
        )}
      </div>
    </>
  );
}
