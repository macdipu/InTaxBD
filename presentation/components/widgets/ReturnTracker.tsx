import React from 'react';
import { Stamp, Tick } from '../ui/Motion';

// A mock "your return" card. `reached` (0-6) is driven by scroll in the Process section.
const ReturnTracker: React.FC<{ steps: { id: string; title: string }[]; reached: number }> = ({ steps, reached }) => {
  const done = reached >= steps.length - 1;
  return (
    <div className="mt-8 hidden rounded-xl border border-ink bg-surface p-5 shadow-[5px_5px_0_0_#0E1B33] lg:block" aria-hidden="true">
      <div className="flex items-baseline justify-between">
        <p className="font-display text-lg font-semibold tracking-tight">Your return</p>
        <p className="text-[13px] text-muted">{Math.min(reached, steps.length)} of {steps.length} done</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-rule">
        <div className="h-full rounded-full bg-leaf transition-[width] duration-500 ease-out" style={{ width: `${(Math.min(reached, steps.length) / steps.length) * 100}%` }} />
      </div>
      <ul className="mt-4 space-y-2">
        {steps.map((s, i) => {
          const on = i < reached;
          return (
            <li key={s.id} className={`flex items-center gap-2.5 text-[14px] transition-colors duration-300 ${on ? 'text-ink' : 'text-muted'}`}>
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${on ? 'border-leaf-deep bg-leaf-deep text-white' : 'border-ink/30'}`}>
                {on ? <Tick mode="toggle" on className="h-3 w-3" strokeWidth={3.5} /> : i + 1}
              </span>
              {s.title}
            </li>
          );
        })}
      </ul>
      <div className="relative mt-3 h-10">
        <Stamp show={done}>Filed with NBR</Stamp>
      </div>
    </div>
  );
};

export default ReturnTracker;
