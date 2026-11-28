import React from 'react';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import { useNbrFeed } from '../../hooks/useNbrFeed';

// A small countdown ring to the return deadline. The date lives in ContentRepository.getDeadline().
const DeadlineChip: React.FC = () => {
  const fallback = ContentRepository.getDeadline();
  const feed = useNbrFeed();
  const official = feed?.deadline ?? null;
  const d = official ?? fallback;
  const end = new Date(`${d.date}T23:59:59+06:00`).getTime();
  const days = Math.ceil((end - Date.now()) / 86400000);
  const total = 60; // ring is full when 60+ days remain
  const left = Math.max(0, Math.min(total, days));
  const R = 16;
  const C = 2 * Math.PI * R;
  const urgent = days <= 7;

  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-rule bg-surface px-3.5 py-2.5 text-sm">
      <svg viewBox="0 0 40 40" className="h-11 w-11 shrink-0 -rotate-90" aria-hidden="true">
        <circle cx="20" cy="20" r={R} fill="none" strokeWidth="4" className="stroke-rule" />
        <circle cx="20" cy="20" r={R} fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray={C}
          strokeDashoffset={C * (1 - left / total)} className={`${urgent ? 'stroke-brand' : 'stroke-leaf'} transition-[stroke-dashoffset] duration-1000`} />
        <text x="20" y="20" textAnchor="middle" dominantBaseline="central" transform="rotate(90 20 20)" className="fill-ink text-[12px] font-bold">
          {days < 0 ? '!' : days}
        </text>
      </svg>
      <p className="leading-snug">
        <span className="block font-semibold text-ink">
          {days < 0 ? 'Deadline has passed' : days === 0 ? 'Last day to file' : `${days} day${days === 1 ? '' : 's'} left to file`}
        </span>
        <span className="block text-[13px] text-muted">
          {days < 0
            ? 'Late filing can cost a penalty. We can still help.'
            : official
              ? <>Return deadline: {d.label} (<a href={official.source} target="_blank" rel="noopener" className="underline">NBR notice</a>)</>
              : `Usual deadline: ${d.label}. Check the latest NBR notice.`}
        </span>
      </p>
    </div>
  );
};

export default DeadlineChip;
