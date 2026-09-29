'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';


export default function VisitCounter() {
  const [views, setViews] = useState(null);


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

  const c = {
    text: 'text-[#666]',
    icon: 'text-[#444]'
  };

  return (
    <div className={`flex items-center gap-2 ${c.text} text-sm font-medium transition-colors duration-300`}>
      <Eye size={14} className={c.icon} />
      <span>{views.toLocaleString()} {views === 1 ? 'view' : 'views'}</span>
    </div>
  );
}

