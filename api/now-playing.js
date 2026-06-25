// Vercel serverless function — returns the currently-playing Spotify track,
// falling back to the most recently played one. Secrets stay server-side.
//
// Required env vars (set in Vercel project settings):
//   SPOTIFY_CLIENT_ID
//   SPOTIFY_CLIENT_SECRET
//   SPOTIFY_REFRESH_TOKEN   (one-time — see scripts/get-spotify-token.mjs)

const TOKEN_URL  = 'https://accounts.spotify.com/api/token';
const NOW_URL    = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken(id, secret, refresh) {
  const basic = Buffer.from(`${id}:${secret}`).toString('base64');
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
  });
  if (!res.ok) throw new Error('token request failed');
  return res.json();
}

function normalize(track, isPlaying) {
  return {
    isPlaying,
    track: {
      title:  track.name,
      artist: (track.artists || []).map(a => a.name).join(', '),
      album:  track.album?.name ?? '',
      image:  track.album?.images?.[0]?.url ?? null,
      url:    track.external_urls?.spotify ?? null,
    },
  };
}

export default async function handler(req, res) {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!id || !secret || !refresh) {
    return res.status(200).json({ configured: false });
  }

  try {
    const { access_token } = await getAccessToken(id, secret, refresh);
    const auth = { Authorization: `Bearer ${access_token}` };

    // 1) Currently playing
    const now = await fetch(NOW_URL, { headers: auth });
    if (now.status === 200) {
      const data = await now.json();
      if (data && data.item) {
        res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=20');
        return res.status(200).json({ configured: true, ...normalize(data.item, !!data.is_playing) });
      }
    }

    // 2) Fallback: most recently played
    const recent = await fetch(RECENT_URL, { headers: auth });
    if (recent.status === 200) {
      const data = await recent.json();
      const track = data.items?.[0]?.track;
      if (track) {
        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
        return res.status(200).json({ configured: true, ...normalize(track, false) });
      }
    }

    return res.status(200).json({ configured: true, isPlaying: false, track: null });
  } catch (err) {
    return res.status(200).json({ configured: true, error: true });
  }
}
