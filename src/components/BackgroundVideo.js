'use client';

import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';

export default function BackgroundVideo({ url }) {
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40 overflow-hidden">
      <ReactPlayer
        url={url}
        playing={isReady}
        loop={true}
        muted={true}
        width="150vw"
        height="150vh"
        playsinline={true}
        onReady={() => setIsReady(true)}
        onError={(e) => console.error('ReactPlayer Error:', e)}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              mute: 1,
              controls: 0,
              disablekb: 1,
              modestbranding: 1,
              iv_load_policy: 3,
              playsinline: 1,
            }
          }
        }}
      />
    </div>
  );
}
