import { useLanguage } from '../hooks/useLanguage';
import { sfxHover } from '../audio/sfx';
import './NowSection.css';

const SPOTIFY = 'https://open.spotify.com/intl-tr/artist/4rhukaFKxMJwywfcIY8ioY?si=3711b42c99c84278';

const CONTENT = {
  tr: {
    label: 'şu an',
    rows: [
      { k: '♫ dinle', v: 'kendi müziğim', href: SPOTIFY },
      { k: '⚒ geliştir', v: 'fullstack ürünler & bu site', href: undefined },
      { k: '◷ konum', v: 'İstanbul, TR', href: undefined },
    ],
  },
  en: {
    label: 'now',
    rows: [
      { k: '♫ listening', v: 'my own music', href: SPOTIFY },
      { k: '⚒ building', v: 'fullstack products & this site', href: undefined },
      { k: '◷ based', v: 'İstanbul, TR', href: undefined },
    ],
  },
};

export function NowSection() {
  const { language } = useLanguage();
  const c = CONTENT[language];

  return (
    <section className="section now section--flush" aria-label={c.label}>
      <div className="now__band reveal">
        <span className="sec-label now__label">{c.label}</span>
        <ul className="now__rows">
          {c.rows.map(r => (
            <li key={r.k} className="now__row">
              <span className="now__k mono">{r.k}</span>
              {r.href
                ? <a className="now__v link" href={r.href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => sfxHover()}>{r.v} ↗</a>
                : <span className="now__v">{r.v}</span>}
            </li>
          ))}
        </ul>
        <span className="now__pulse" aria-hidden><span /></span>
      </div>
    </section>
  );
}
