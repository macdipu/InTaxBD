import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useNbrFeed } from '../../hooks/useNbrFeed';

// Latest income-tax notices from nbr.gov.bd. Renders nothing until a feed with items is available.
const NbrNews: React.FC<{ className?: string }> = ({ className = '' }) => {
  const feed = useNbrFeed();
  if (!feed || feed.items.length === 0) return null;
  const when = feed.fetchedAt ? new Date(feed.fetchedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
  return (
    <section className={className} aria-labelledby="nbr-news">
      <h2 id="nbr-news" className="font-display text-2xl font-semibold tracking-tight">Latest from the NBR</h2>
      <p className="mt-1 text-[14px] text-muted">
        Official notices, copied from <a href={feed.source} target="_blank" rel="noopener" className="underline">nbr.gov.bd</a>
        {when ? `. Last checked ${when}.` : '.'}
      </p>
      <ul className="mt-4 divide-y divide-rule rounded-xl border border-rule bg-surface">
        {feed.items.slice(0, 5).map((n) => (
          <li key={n.url}>
            <a href={n.url} target="_blank" rel="noopener" className="flex min-h-[56px] items-center justify-between gap-3 px-4 py-3 text-[15px] hover:bg-ink/[.03]">
              <span className="min-w-0">{n.title}</span>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NbrNews;
