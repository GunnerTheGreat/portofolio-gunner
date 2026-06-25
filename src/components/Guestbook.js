'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, Loader2 } from 'lucide-react';

export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (Array.isArray(data)) setEntries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to post message.');
      } else {
        setEntries([data, ...entries]);
        setFormData({ name: '', message: '' });
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full rounded-none border-2 border-[#222] bg-[#050505] overflow-hidden min-h-[500px]">
      
      <div className="w-full md:w-1/3 lg:w-2/5 flex flex-col border-b md:border-b-0 md:border-r border-[#333] bg-[#0a0a0a] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff1a1a]" />
        
        <div className="p-4 md:p-6 border-b border-[#222] flex items-center gap-3">
          <Terminal size={20} className="text-[#ff1a1a]" />
          <h3 className="text-base font-bold text-[#e0e0e0] tracking-widest uppercase font-mono">
            GUESTBOOK_SYS
          </h3>
        </div>

        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
          <div className="mb-6">
            <p className="text-xs text-[#888] font-mono mb-2 uppercase">[ INJECT YOUR TRACE ]</p>
            <p className="text-sm text-[#555] font-mono leading-tight">
              Leave a mark on the mainframe. Anonymous entities are permitted.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <div className="text-yellow-500 text-xs font-mono font-bold animate-pulse">[!] {error}</div>}
            
            <div className="flex flex-col">
              <label className="text-[10px] text-[#ff1a1a] font-mono uppercase mb-1 tracking-widest">ID / NICKNAME</label>
              <input
                type="text"
                value={formData.name}
                maxLength={50}
                placeholder="ANONYMOUS_USER"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#111] border border-[#333] text-[#e0e0e0] font-mono p-3 rounded-none focus:outline-none focus:border-[#ff1a1a] transition-colors placeholder-[#444]"
                disabled={submitting}
                spellCheck="false"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-[#ff1a1a] font-mono uppercase mb-1 tracking-widest">TRANSMISSION_PAYLOAD</label>
              <textarea
                value={formData.message}
                maxLength={500}
                rows={4}
                placeholder="INPUT_DATA_STREAM..."
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#111] border border-[#333] text-[#e0e0e0] font-mono p-3 rounded-none focus:outline-none focus:border-[#ff1a1a] transition-colors resize-none placeholder-[#444]"
                disabled={submitting}
                spellCheck="false"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !formData.name.trim() || !formData.message.trim()}
              className="mt-2 w-full py-3 bg-[#ff1a1a]/10 border border-[#ff1a1a] text-[#ff1a1a] font-mono font-bold hover:bg-[#ff1a1a] hover:text-[#000] transition-all disabled:opacity-50 disabled:hover:bg-[#ff1a1a]/10 disabled:hover:text-[#ff1a1a] disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : 'EXECUTE_BROADCAST'}
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className="w-full md:w-2/3 lg:w-3/5 flex flex-col bg-[#050505]">
        <div className="p-4 border-b border-[#222] flex justify-between items-center bg-[#0a0a0a]">
          <span className="text-xs font-mono text-[#555] uppercase tracking-widest">[ CONNECTION_LOGS ]</span>
          {loading && <span className="text-[10px] text-[#ff1a1a] animate-pulse font-mono uppercase tracking-widest">SYNCING...</span>}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 font-mono flex flex-col gap-4 custom-scrollbar">
          <div ref={messagesEndRef} />
          
          {loading ? (
            <div className="flex justify-center py-8 opacity-50">
              <Loader2 className="animate-spin text-[#ff1a1a]" size={24} />
            </div>
          ) : entries.length === 0 ? (
            <p className="text-left py-4 text-sm text-[#555] border-l-2 border-[#333] pl-4">
              {'>'} NO_DATA_FOUND. AWAITING_FIRST_TRANSMISSION...
            </p>
          ) : (
            entries.map((entry) => (
              <div key={entry._id} className="relative pl-6 py-2 border-l border-[#333] group hover:border-[#ff1a1a] transition-colors">
                <div className="absolute left-[-4px] top-4 w-2 h-2 bg-[#111] border border-[#333] group-hover:bg-[#ff1a1a] group-hover:border-[#ff1a1a] transition-colors rotate-45" />
                
                <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
                  <span className="font-bold text-[#e0e0e0] text-sm break-all">
                    USER: {entry.name}
                  </span>
                  <span className="text-[10px] text-[#555] tracking-widest">
                    TS: {new Date(entry.createdAt).toISOString().split('T')[0]}
                  </span>
                </div>
                
                <p className="text-sm text-[#aaa] break-words whitespace-pre-wrap leading-relaxed">
                  {entry.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
