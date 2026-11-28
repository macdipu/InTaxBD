// Pulls current notices from the National Board of Revenue (nbr.gov.bd) and writes public/nbr-feed.json.
// Runs in CI before each build (see .github/workflows/deploy.yml, which also runs on a schedule),
// because browsers cannot read nbr.gov.bd directly (no CORS). Never fails the build: on any error the
// previous feed (or an empty one) is kept.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const OUT = new URL('../public/nbr-feed.json', import.meta.url);
const HOME = 'https://nbr.gov.bd';
const bn2en = (s) => s.replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d));
const strip = (h) => h.normalize('NFC').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const abs = (u) => (u.startsWith('http') ? u : new URL(u, HOME).href).replace(/ /g, '%20');

// Only items about income tax / returns are shown on the site.
const RELEVANT = new RegExp('আয়কর|রিটার্ন|ট্যাক্স|করবর্ষ|করদাতা|টিআইএন|income tax|return|tax|\\btin\\b|audit'.normalize('NFC'), 'i');
const MONTHS = { জানুয়ারি: 1, ফেব্রুয়ারি: 2, মার্চ: 3, এপ্রিল: 4, মে: 5, জুন: 6, জুলাই: 7, আগস্ট: 8, সেপ্টেম্বর: 9, অক্টোবর: 10, নভেম্বর: 11, ডিসেম্বর: 12,
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12 };

const DEADLINE_WORDS = new RegExp('সময়সীমা|সময় বৃদ্ধি|শেষ তারিখ|দাখিলের|deadline|last date|extension|extended'.normalize('NFC'), 'i');

// A deadline is only reported when a notice title states one explicitly.
const findDeadline = (items) => {
  for (const it of items) {
    if (!DEADLINE_WORDS.test(it.title)) continue;
    const t = bn2en(it.title);
    const m = t.match(/(\d{1,2})\s*([^\s\d,]+)[\s,]*(\d{4})/);
    const mon = m && MONTHS[m[2].toLowerCase()];
    if (m && mon) {
      const date = `${m[3]}-${String(mon).padStart(2, '0')}-${m[1].padStart(2, '0')}`;
      return { date, label: `${Number(m[1])} ${m[2]} ${m[3]}`, source: it.url, title: it.title };
    }
  }
  return null;
};

const main = async () => {
  const res = await fetch(HOME, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; feed-fetch)' }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`NBR returned ${res.status}`);
  const html = await res.text();
  const items = [];
  const seen = new Set();
  for (const m of html.matchAll(/<a[^>]*href="([^"]+)"[^>]*>\s*<p>([\s\S]*?)<\/p>/g)) {
    const title = strip(m[2]);
    const url = abs(m[1]);
    if (!title || seen.has(url) || !/\/uploads\//.test(url)) continue;
    seen.add(url);
    if (RELEVANT.test(title)) items.push({ title, url });
  }
  if (!items.length) throw new Error('No notices found (page layout may have changed)');
  const feed = { fetchedAt: new Date().toISOString(), source: HOME, items: items.slice(0, 8), deadline: findDeadline(items) };
  await mkdir(new URL('.', OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(feed, null, 2));
  console.log(`NBR feed: ${feed.items.length} notices, deadline ${feed.deadline ? feed.deadline.label : 'not published'}`);
};

main().catch(async (e) => {
  console.warn(`NBR feed skipped: ${e.message}`);
  try { await readFile(OUT); } catch { await mkdir(new URL('.', OUT), { recursive: true }); await writeFile(OUT, JSON.stringify({ fetchedAt: null, source: HOME, items: [], deadline: null })); }
});
