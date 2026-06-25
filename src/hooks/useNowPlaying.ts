import { useEffect, useState } from 'react';

export interface NowPlayingTrack {
  title: string;
  artist: string;
  album: string;
  image: string | null;
  url: string | null;
}
export interface NowPlaying {
  configured?: boolean;
  isPlaying?: boolean;
  track?: NowPlayingTrack | null;
  error?: boolean;
}

// Polls the serverless /api/now-playing endpoint. Fails silently (returns null)
// in environments where the function isn't available (e.g. plain `vite dev`).
export function useNowPlaying(intervalMs = 30000) {
  const [data, setData] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch('/api/now-playing')
        .then(r => (r.ok ? r.json() : null))
        .then(d => { if (alive && d) setData(d); })
        .catch(() => {});
    load();
    const id = setInterval(load, intervalMs);
    return () => { alive = false; clearInterval(id); };
  }, [intervalMs]);

  return data;
}
