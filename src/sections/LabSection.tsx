import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { sfxHover } from '../audio/sfx';
import './LabSection.css';

const sx = (i: number) => ({ '--i': i } as CSSProperties);

const LAB_ITEMS = {
  en: [
    { tag: 'A—01 / audio', title: 'Sound & Code', desc: 'I produce music when I\'m not writing code. Sometimes they meet — generative audio experiments, WebAudio synthesis, procedural sound. Always weird, occasionally good.', links: [{ label: 'spotify', href: 'https://open.spotify.com/intl-tr/artist/4rhukaFKxMJwywfcIY8ioY?si=3711b42c99c84278' }, { label: 'github', href: 'https://github.com/akaaslan' }] },
    { tag: 'V—02 / visual', title: 'UI Experiments', desc: 'CSS animations, canvas playgrounds, WebGL snippets. A sandbox for things that probably shouldn\'t work — but sometimes do.', links: [{ label: 'github', href: 'https://github.com/akaaslan' }] },
    { tag: 'O—03 / open source', title: 'Open Source', desc: 'I believe in giving back. Side projects, utilities and contributions that I\'ve shared with the community. The boring ones and the fun ones alike.', links: [{ label: 'github', href: 'https://github.com/akaaslan' }] },
  ],
  tr: [
    { tag: 'A—01 / ses', title: 'Ses & Kod', desc: 'Kod yazmadığım zamanlarda müzik üretiyorum. Bazen ikisi birleşiyor — generative ses deneyleri, WebAudio sentezi. Her zaman tuhaf, bazen güzel.', links: [{ label: 'spotify', href: 'https://open.spotify.com/intl-tr/artist/4rhukaFKxMJwywfcIY8ioY?si=3711b42c99c84278' }, { label: 'github', href: 'https://github.com/akaaslan' }] },
    { tag: 'V—02 / görsel', title: 'UI Deneyleri', desc: 'CSS animasyonları, canvas oyun alanları, WebGL parçacıkları. Muhtemelen çalışmaması gereken ama bazen çalışan şeyler için bir sandbox.', links: [{ label: 'github', href: 'https://github.com/akaaslan' }] },
    { tag: 'O—03 / açık kaynak', title: 'Açık Kaynak', desc: 'Geri vermeye inanıyorum. Toplulukla paylaştığım yan projeler, araçlar ve katkılar. Sıkıcıları da eğlencelileri de.', links: [{ label: 'github', href: 'https://github.com/akaaslan' }] },
  ],
};

export function LabSection() {
  const { language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const items = LAB_ITEMS[language];

  return (
    <section className="section lab" id="lab" ref={ref}>
      <div className="sec-head">
        <span className="sec-index">05 / 07</span>
        <div className="sec-titles">
          <span className="sec-label">{language === 'tr' ? 'lab' : 'the lab'}</span>
          <h2 className="sec-title mask-line"><span>{language === 'tr' ? 'deney alanı' : 'playground'}</span></h2>
        </div>
      </div>

      <div className="lab__grid">
        {items.map((itm, i) => (
          <article className="lab__card card reveal" key={i} style={sx(i)} onMouseEnter={() => sfxHover()}>
            <span className="lab__tag mono">{itm.tag}</span>
            <h3 className="lab__title">{itm.title}</h3>
            <p className="body lab__desc">{itm.desc}</p>
            <div className="lab__links">
              {itm.links.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                   className="link" onMouseEnter={() => sfxHover()}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
