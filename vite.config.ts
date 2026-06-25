import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only: serve /api/now-playing during `npm run dev` (reads .env) so the
// "now playing" widget works locally. On Vercel the real serverless function
// at api/now-playing.js handles this; the plugin only applies on `serve`.
function spotifyDevApi(): PluginOption {
  const TOKEN_URL  = 'https://accounts.spotify.com/api/token'
  const NOW_URL    = 'https://api.spotify.com/v1/me/player/currently-playing'
  const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

  const normalize = (t: any, isPlaying: boolean) => ({
    isPlaying,
    track: {
      title:  t.name,
      artist: (t.artists || []).map((a: any) => a.name).join(', '),
      album:  t.album?.name ?? '',
      image:  t.album?.images?.[0]?.url ?? null,
      url:    t.external_urls?.spotify ?? null,
    },
  })

  return {
    name: 'spotify-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/now-playing', async (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        try { process.loadEnvFile('.env') } catch { /* no local .env */ }

        const id = process.env.SPOTIFY_CLIENT_ID
        const secret = process.env.SPOTIFY_CLIENT_SECRET
        const refresh = process.env.SPOTIFY_REFRESH_TOKEN
        if (!id || !secret || !refresh) { res.end(JSON.stringify({ configured: false })); return }

        try {
          const basic = Buffer.from(`${id}:${secret}`).toString('base64')
          const tok = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
          }).then(r => r.json()) as any
          const auth = { Authorization: `Bearer ${tok.access_token}` }

          const now = await fetch(NOW_URL, { headers: auth })
          if (now.status === 200) {
            const d = await now.json() as any
            if (d?.item) { res.end(JSON.stringify({ configured: true, ...normalize(d.item, !!d.is_playing) })); return }
          }
          const recent = await fetch(RECENT_URL, { headers: auth })
          if (recent.status === 200) {
            const d = await recent.json() as any
            const track = d.items?.[0]?.track
            if (track) { res.end(JSON.stringify({ configured: true, ...normalize(track, false) })); return }
          }
          res.end(JSON.stringify({ configured: true, isPlaying: false, track: null }))
        } catch {
          res.end(JSON.stringify({ configured: true, error: true }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), spotifyDevApi()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  optimizeDeps: {
    include: ['three'],
  },
})
