export default function VideoCard({ title, src, thumbnail }) {
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(src);

  return (
    <div className="group relative bg-[#050505] rounded-none overflow-hidden border-2 border-[#222] hover:border-[#ff1a1a] transition-colors duration-300">
      
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff1a1a] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff1a1a] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />

      <div className="relative w-full aspect-video bg-[#0a0a0a]">
        {videoId ? (
          <iframe
            className="w-full h-full transition-all duration-700 transform-gpu"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            controls
            controlsList="nodownload"
            poster={thumbnail}
            className="w-full h-full object-cover transition-all duration-700 transform-gpu"
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="p-4 border-t border-[#222] group-hover:border-[#ff1a1a]/50 bg-[#111] transition-colors">
        <h3 className="text-[#e0e0e0] group-hover:text-[#ff1a1a] font-bold font-mono uppercase tracking-widest text-sm transition-colors">{title}</h3>
        <p className="text-[10px] text-[#555] font-mono mt-1 tracking-widest uppercase">
          [ VIDEO_PLAYBACK_MODULE ]
        </p>
      </div>
    </div>
  );
}
