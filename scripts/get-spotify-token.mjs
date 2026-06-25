// One-time helper to obtain a Spotify REFRESH TOKEN for the now-playing widget.
//
// Prereqs (Spotify dashboard → your app → settings):
//   • Add this Redirect URI exactly:  http://127.0.0.1:8888/callback
//   • Copy your Client ID & Client Secret
//
// Run:
//   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-spotify-token.mjs
// (PowerShell:  $env:SPOTIFY_CLIENT_ID="xxx"; $env:SPOTIFY_CLIENT_SECRET="yyy"; node scripts/get-spotify-token.mjs )
//
// It opens a browser, you approve, and it prints SPOTIFY_REFRESH_TOKEN.
// Paste that (plus id/secret) into Vercel → Project → Settings → Environment Variables.

import http from 'node:http';
import { exec } from 'node:child_process';
import crypto from 'node:crypto';
import { existsSync } from 'node:fs';

// Auto-load a local .env (gitignored) so you don't have to export vars manually.
for (const f of ['.env', '.env.local']) {
  if (existsSync(f)) { try { process.loadEnvFile(f); } catch { /* older node */ } }
}

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = 'user-read-currently-playing user-read-recently-played';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n✖ Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars first.\n');
  process.exit(1);
}

const state = crypto.randomBytes(8).toString('hex');
const authUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
  response_type: 'code',
  client_id: CLIENT_ID,
  scope: SCOPES,
  redirect_uri: REDIRECT_URI,
  state,
}).toString();

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) { res.writeHead(404).end(); return; }
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const code = url.searchParams.get('code');
  if (!code) { res.writeHead(400).end('Missing code'); return; }

  try {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
    });
    const data = await tokenRes.json();
    if (data.refresh_token) {
      console.log('\n✓ SUCCESS — add this to Vercel env vars:\n');
      console.log('SPOTIFY_REFRESH_TOKEN=' + data.refresh_token + '\n');
      res.writeHead(200, { 'Content-Type': 'text/html' })
         .end('<h2>Done — refresh token printed in your terminal. You can close this tab.</h2>');
    } else {
      console.error('\n✖ No refresh_token in response:', data, '\n');
      res.writeHead(500).end('Failed — see terminal.');
    }
  } catch (e) {
    console.error(e);
    res.writeHead(500).end('Error — see terminal.');
  } finally {
    setTimeout(() => server.close(() => process.exit(0)), 500);
  }
});

server.listen(PORT, () => {
  console.log('\nOpening browser for Spotify authorization…');
  console.log('If it does not open, visit:\n' + authUrl + '\n');
  const open = process.platform === 'win32' ? `start "" "${authUrl}"`
            : process.platform === 'darwin' ? `open "${authUrl}"`
            : `xdg-open "${authUrl}"`;
  exec(open);
});
