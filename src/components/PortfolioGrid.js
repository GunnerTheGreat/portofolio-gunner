'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Github } from 'lucide-react';
import ImageMagnifier from './ImageMagnifier';

import { motion } from 'framer-motion';

export default function PortfolioGrid({ items, isApp = false }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const gridRef = useRef(null);



  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedItem]);

  return (
    <>
      <div ref={gridRef} className={`grid grid-cols-1 gap-6 ${isApp ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {items.map((item, index) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedItem(item)}
            className="portfolio-card group relative cursor-pointer rounded-none overflow-hidden bg-[#050505] border-2 border-[#222] hover:border-[#ff1a1a] transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff1a1a] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff1a1a] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

            <div className={`w-full overflow-hidden bg-[#111] ${isApp ? 'aspect-video' : 'aspect-[4/5]'}`}>
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0 transform-gpu"
                />
              ) : (
               <div className="w-full h-full flex items-center justify-center text-[#555] font-mono text-xs uppercase tracking-widest">[ NO_IMAGE_DATA ]</div>
              )}
            </div>

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#000]/95 via-[#000]/80 to-transparent p-6 pt-12 border-t border-[#ff1a1a]/0 group-hover:border-[#ff1a1a]/30 transition-colors">
              <h3 className="text-xl font-bold text-[#e0e0e0] group-hover:text-[#ff1a1a] tracking-widest uppercase font-mono transition-colors">
                {item.title}
              </h3>
              <p className="text-[10px] text-[#888] mt-2 uppercase tracking-widest font-mono">
                [ OPEN_DETAILS_VIEW ]
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedItem && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#000]/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setSelectedItem(null)} />

          <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#050505] border-2 border-[#333] shadow-[0_0_30px_rgba(255,26,26,0.1)] rounded-none overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
            
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-0 right-0 z-20 px-4 py-2 bg-[#ff1a1a] text-[#000] font-mono font-bold hover:bg-[#fff] transition-colors"
            >
              [ ESC ]
            </button>

            <div className="w-full md:w-3/5 bg-[#0a0a0a] overflow-y-auto max-h-[50vh] md:max-h-[90vh] p-4 md:p-8 border-b md:border-b-0 md:border-r border-[#333] custom-scrollbar space-y-6">
              {selectedItem.imageUrl && (
                <div className="border border-[#222] p-1 bg-[#111]">
                  <ImageMagnifier src={selectedItem.imageUrl} alt={selectedItem.title} />
                </div>
              )}
              {selectedItem.gallery?.map((img, index) => (
                <div key={index} className="border border-[#222] p-1 bg-[#111]">
                  <ImageMagnifier src={img} alt={`Gallery ${index}`} />
                </div>
              ))}
            </div>

            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col bg-[#050505] overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-6 bg-[#ff1a1a]" />
                <h2 className="text-2xl font-bold text-[#e0e0e0] font-mono uppercase tracking-widest">{selectedItem.title}</h2>
              </div>
              
              <div className="w-full border-t border-[#222] mb-6" />

              <div className="text-[#aaa] font-mono text-sm leading-relaxed space-y-4 mb-8">
                <p className="whitespace-pre-wrap">{selectedItem.description}</p>
              </div>

              <div className="mt-auto space-y-3 pt-6 border-t border-[#222]">
                {selectedItem.appLink && (
                  <a
                    href={selectedItem.appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#111] border border-[#ff1a1a] text-[#ff1a1a] hover:bg-[#ff1a1a] hover:text-[#000] py-3 rounded-none font-mono font-bold transition-all uppercase tracking-widest"
                  >
                    <ExternalLink size={16} /> [ EXECUTE_LIVE_APP ]
                  </a>
                )}
                {selectedItem.githubLink && (
                  <a
                    href={selectedItem.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#0a0a0a] border border-[#555] text-[#888] hover:border-[#e0e0e0] hover:text-[#e0e0e0] py-3 rounded-none font-mono font-bold transition-all uppercase tracking-widest"
                  >
                    <Github size={16} /> [ VIEW_SOURCE_CODE ]
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}
