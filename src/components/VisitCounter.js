'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';


export default function VisitCounter() {
  const [views, setViews] = useState(null);
  const theme = 'goth';
  const isGoth = theme === 'goth';
  const isGlass = theme === 'glass';

  useEffect(() => {

    fetch('/api/views', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data.views !== null) {
          setViews(data.views);
        }
      })
      .catch((err) => console.error("Error fetching views:", err));
  }, []);

  if (views === null) return null;

  const c = isGlass ? {
    text: 'text-[rgba(230,237,243,0.7)]',
    icon: 'text-[#88c0ff]'
  } : isGoth ? {
    text: 'text-[#666]',
    icon: 'text-[#444]'
  } : {
    text: 'text-[#d4839a]',
    icon: 'text-[#f5b4c8]'
  };

  return (
    <div className={`flex items-center gap-2 ${c.text} text-sm font-medium transition-colors duration-300`}>
      <Eye size={14} className={c.icon} />
      <span>{views.toLocaleString()} {views === 1 ? 'view' : 'views'}</span>
    </div>
  );
}

