import { useEffect, useState } from 'react';

export interface NbrItem { title: string; url: string }
export interface NbrDeadline { date: string; label: string; source: string; title: string }
export interface NbrFeed { fetchedAt: string | null; source: string; items: NbrItem[]; deadline: NbrDeadline | null }

let cache: Promise<NbrFeed | null> | null = null;

// Reads /nbr-feed.json, which CI refreshes from nbr.gov.bd every few hours. Null while loading or if unavailable.
export const useNbrFeed = (): NbrFeed | null => {
  const [feed, setFeed] = useState<NbrFeed | null>(null);
  useEffect(() => {
    cache ??= fetch(`${import.meta.env.BASE_URL}nbr-feed.json`, { cache: 'no-cache' })
      .then((r) => (r.ok ? (r.json() as Promise<NbrFeed>) : null))
      .catch(() => null);
    let live = true;
    cache.then((f) => live && setFeed(f));
    return () => { live = false; };
  }, []);
  return feed;
};
