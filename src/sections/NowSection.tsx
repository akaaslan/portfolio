import { useLanguage } from '../hooks/useLanguage';
import { useNowPlaying } from '../hooks/useNowPlaying';
import { sfxHover } from '../audio/sfx';
import './NowSection.css';

const SPOTIFY = 'https://open.spotify.com/intl-tr/artist/4rhukaFKxMJwywfcIY8ioY?si=3711b42c99c84278';

const CONTENT = {
  tr: {
    label: 'şu an',
    nowPlaying: 'çalıyor',
    lastPlayed: 'son çalınan',
    fallbackK: '♫ dinle',
    fallbackV: 'kendi müziğim',
    build: { k: '⚒ geliştir', v: 'fullstack ürünler & bu site' },
    loc:   { k: '◷ konum', v: 'İstanbul, TR' },
  },
  en: {
    label: 'now',
    nowPlaying: 'now playing',
    lastPlayed: 'last played',
    fallbackK: '♫ listening',
    fallbackV: 'my own music',
    build: { k: '⚒ building', v: 'fullstack products & this site' },
    loc:   { k: '◷ based', v: 'İstanbul, TR' },
  },
};

export function NowSection() {
  const { language } = useLanguage();
  const c = CONTENT[language];
  const np = useNowPlaying();
  const track = np?.track ?? null;

  return (
    <section className="section now section--flush" aria-label={c.label}>
      <div className="now__band reveal">
        <span className="sec-label now__label">{c.label}</span>

        <ul className="now__rows">
          <li className="now__row now__row--track">
            {track ? (
              <a
                className="now__track"
                href={track.url ?? SPOTIFY}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sfxHover()}
              >
                {track.image && <img className="now__cover" src={track.image} alt="" loading="lazy" />}
                <span className="now__track-meta">
                  <span className={`now__state mono ${np?.isPlaying ? 'is-live' : ''}`}>
                    {np?.isPlaying && <span className="now__eq"><i /><i /><i /></span>}
                    {np?.isPlaying ? c.nowPlaying : c.lastPlayed}
                  </span>
                  <span className="now__song">{track.title} — <span className="now__artist">{track.artist}</span></span>
                </span>
                <span className="now__arrow">↗</span>
              </a>
            ) : (
              <a className="now__fallback" href={SPOTIFY} target="_blank" rel="noopener noreferrer" onMouseEnter={() => sfxHover()}>
                <span className="now__k mono">{c.fallbackK}</span>
                <span className="now__v link">{c.fallbackV} ↗</span>
              </a>
            )}
          </li>

          <li className="now__row">
            <span className="now__k mono">{c.build.k}</span>
            <span className="now__v">{c.build.v}</span>
          </li>
          <li className="now__row">
            <span className="now__k mono">{c.loc.k}</span>
            <span className="now__v">{c.loc.v}</span>
          </li>
        </ul>

        <span className="now__pulse" aria-hidden><span /></span>
      </div>
    </section>
  );
}
