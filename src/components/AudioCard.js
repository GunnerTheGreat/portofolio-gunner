export default function AudioCard({ title, src, coverArt, type = "file" }) {

  const cardClass = 'group relative bg-[#050505] rounded-none overflow-hidden border-2 border-[#222] hover:border-[#ff1a1a] transition-colors duration-300';

  const CornerAccents = () => (
    <>
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff1a1a] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff1a1a] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />
    </>
  );

  if (type === "spotify") {
    return (
      <div className={cardClass}>
        <CornerAccents />
        <iframe
          style={{ borderRadius: "0" }}
          src={src}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="transition-all duration-700 transform-gpu"
        />
      </div>
    );
  }

  if (type === "soundcloud") {
    return (
      <div className={cardClass}>
        <CornerAccents />
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="0"
          allow="autoplay"
          src={src}
          className="transition-all duration-700 transform-gpu"
        />
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <CornerAccents />
      
      <div className="relative h-48 w-full bg-[#0a0a0a]">
        <img
          src={coverArt || "/default-music-cover.jpg"}
          alt={title}
          className="w-full h-full object-cover pointer-events-none select-none transition-all duration-700 transform-gpu"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      
      <div className="p-4 border-t border-[#222] group-hover:border-[#ff1a1a]/50 bg-[#111] transition-colors">
        <h3 className="text-[#e0e0e0] group-hover:text-[#ff1a1a] font-bold font-mono uppercase tracking-widest text-sm transition-colors truncate mb-3">
          {title}
        </h3>
        <audio
          controls
          controlsList="nodownload"
          className="w-full h-8 accent-[#ff1a1a]"
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <p className="text-[10px] text-[#555] font-mono mt-3 tracking-widest uppercase">
          [ AUDIO_PLAYBACK_MODULE ]
        </p>
      </div>
    </div>
  );
}
