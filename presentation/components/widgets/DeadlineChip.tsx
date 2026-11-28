import React, { useEffect, useState } from 'react';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import { useNbrFeed } from '../../hooks/useNbrFeed';
import { usePrefersReducedMotion } from '../../motion/hooks';

const SEASON_START = (deadline: number) => {
  // The filing season is shown as the 90 days before the deadline.
  return deadline - 90 * 86400000;
};

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

// A live countdown "tear-off calendar": ticking time, a season progress bar with a
// "you are here" marker, a mood line that changes as the date nears, and the last day to start.
const DeadlineChip: React.FC = () => {
  const fallback = ContentRepository.getDeadline();
  const feed = useNbrFeed();
  const official = feed?.deadline ?? null;
  const d = official ?? fallback;
  const reduce = usePrefersReducedMotion();

  const end = new Date(`${d.date}T23:59:59+06:00`).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), reduce ? 60000 : 1000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const ms = end - now;
  const passed = ms < 0;
  const left = Math.max(0, ms);
  const days = Math.floor(left / 86400000);
  const hours = Math.floor((left % 86400000) / 3600000);
  const mins = Math.floor((left % 3600000) / 60000);
  const secs = Math.floor((left % 60000) / 1000);

  const start = SEASON_START(end);
  const progress = Math.min(1, Math.max(0, (now - start) / (end - start)));
  const startBy = new Date(end - 2 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

  const mood = passed
    ? { text: 'The date has passed. Late filing can cost a penalty, but we can still help.', tone: 'late' }
    : days === 0
      ? { text: 'Last day! Message us now.', tone: 'hot' }
      : days <= 7
        ? { text: 'Final week. Send your documents today.', tone: 'hot' }
        : days <= 21
          ? { text: 'Getting close. Start this week to stay relaxed.', tone: 'warm' }
          : { text: 'You have time. Filing takes us only 48 hours.', tone: 'calm' };
  const accent = mood.tone === 'calm' ? 'bg-leaf' : 'bg-brand';

  const cells: [string, number][] = [['days', days], ['hrs', hours], ['min', mins], ['sec', secs]];

  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-xl border border-ink bg-surface shadow-[3px_3px_0_0_rgb(var(--c-ink))]" role="timer" aria-label={`Time left to file: ${days} days`}>
      <div className="flex items-center justify-between gap-3 border-b border-rule bg-ink px-3.5 py-2 text-[12px] font-semibold text-[rgb(var(--c-on-ink))]">
        <span className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${accent} ${mood.tone === 'hot' ? 'animate-pulse' : ''}`} aria-hidden="true" />
          {passed ? 'Deadline passed' : 'Return deadline'}
        </span>
        <span>{d.label}</span>
      </div>

      <div className="px-3.5 pb-3.5 pt-3">
        <div className="grid grid-cols-4 gap-2 text-center">
          {cells.map(([label, v]) => (
            <div key={label} className="rounded-lg bg-paper px-1 py-2">
              <div className="font-display text-[28px] font-semibold leading-none tabular-nums tracking-tight text-ink sm:text-[32px]">
                <span key={v} className={reduce || label === 'days' ? '' : 'swap-in inline-block'}>{label === 'days' ? v : pad(v)}</span>
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</div>
            </div>
          ))}
        </div>

        {/* Season bar */}
        <div className="relative mt-4 h-2 rounded-full bg-rule" aria-hidden="true">
          <div className={`h-full rounded-full ${accent} transition-[width] duration-1000`} style={{ width: `${progress * 100}%` }} />
          <span className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-surface bg-ink shadow" style={{ left: `${progress * 100}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-muted" aria-hidden="true">
          <span>Season opens</span>
          <span>{d.label}</span>
        </div>

        <p className="mt-2.5 text-[14px] font-semibold leading-snug text-ink">{mood.text}</p>
        {!passed && days >= 2 && (
          <p className="mt-0.5 text-[13px] leading-snug text-muted">
            Send documents by <b className="text-ink">{startBy}</b> and we file before the deadline.
            {official && (
              <> <a href={official.source} target="_blank" rel="noopener" className="underline">NBR notice</a></>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default DeadlineChip;
