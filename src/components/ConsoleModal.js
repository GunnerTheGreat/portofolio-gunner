'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ASCII_ART = `
  ____ _   _ _   _ _   _ _____ ____  
 / ___| | | | \\ | | \\ | | ____|  _ \\ 
| |  _| | | |  \\| |  \\| |  _| | |_) |
| |_| | |_| | |\\  | |\\  | |___|  _ < 
 \\____|\\___/|_| \\_|_| \\_|_____|_| \\_\\
`;

export default function ConsoleModal({ onClose, onAbout }) {
  const [logs, setLogs] = useState([
    { type: 'system', text: 'G-SEC TERMINAL v9.4.1 [RESTRICTED ACCESS]' },
    { type: 'warning', text: 'WARNING: UNAUTHORIZED ACCESS DETECTED. YOU ARE BREACHING G-SEC SYSTEMS.' },
    { type: 'ascii', text: ASCII_ART },
    { type: 'system', text: 'Type /help to view available commands.' }
  ]);
  const [input, setInput] = useState('');
  const logsEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newLogs = [...logs, { type: 'user', text: `> ${cmd}` }];

    if (cmd === '/help') {
      newLogs.push({ type: 'system', text: 'AVAILABLE COMMANDS:' });
      newLogs.push({ type: 'system', text: '  /hx about   - Breach bio-data (Opens About)' });
      newLogs.push({ type: 'system', text: '  /clear      - Clear terminal output' });
      newLogs.push({ type: 'system', text: '  /exit       - Close terminal' });
    } else if (cmd === '/hx about') {
      newLogs.push({ type: 'system', text: 'BREACHING BIO-DATA...' });
      setLogs(newLogs);
      setTimeout(() => {
        onClose();
        onAbout();
      }, 500);
      return; // Exit early to prevent state update conflict
    } else if (cmd === '/clear') {
      setLogs([{ type: 'system', text: 'G-SEC TERMINAL v9.4.1 [RESTRICTED ACCESS]' }]);
      setInput('');
      return;
    } else if (cmd === '/exit') {
      onClose();
      return;
    } else {
      newLogs.push({ type: 'error', text: `[!] UNRECOGNIZED COMMAND: ${cmd}` });
    }

    setLogs(newLogs);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#000]/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-3xl bg-[#050505] border border-[#ff1a1a] shadow-[0_0_30px_rgba(255,26,26,0.2)] flex flex-col overflow-hidden"
        style={{ height: '60vh' }}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-b border-[#333]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-none bg-[#ff1a1a]" />
            <div className="w-3 h-3 rounded-none bg-[#444]" />
            <div className="w-3 h-3 rounded-none bg-[#444]" />
          </div>
          <div className="text-xs font-mono text-[#888] tracking-widest uppercase">G-SEC // TERMINAL</div>
          <button onClick={onClose} className="text-[#888] hover:text-[#ff1a1a] transition-colors font-mono font-bold">
            [X]
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 font-mono text-sm md:text-base">
          {logs.map((log, idx) => {
            if (log.type === 'ascii') {
              return (
                <pre key={idx} className="text-[10px] md:text-sm leading-tight text-[#ff1a1a] font-bold overflow-x-auto my-4">
                  {log.text}
                </pre>
              );
            }
            if (log.type === 'warning') {
              return (
                <div key={idx} className="text-yellow-500 animate-pulse my-2 font-bold uppercase">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'error') {
              return (
                <div key={idx} className="text-[#ff1a1a] my-1">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'user') {
              return (
                <div key={idx} className="text-[#e0e0e0] my-1">
                  {log.text}
                </div>
              );
            }
            return (
              <div key={idx} className="text-[#888] my-1 whitespace-pre-wrap">
                {log.text}
              </div>
            );
          })}
          <div ref={logsEndRef} />
        </div>

        <div className="p-4 border-t border-[#333] bg-[#0a0a0a]">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-[#ff1a1a] font-mono font-bold">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#e0e0e0] font-mono"
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        </div>
      </motion.div>
    </div>
  );
}
