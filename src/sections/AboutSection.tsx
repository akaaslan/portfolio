import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import './AboutSection.css';

const sx = (i: number) => ({ '--i': i } as CSSProperties);

const CONTENT = {
  tr: {
    label: 'hakkımda',
    title: 'ben kimim',
    paragraphs: [
      'Merhaba, ben Kaan.',
      'Modern web ve mobil deneyimler geliştiren bir Fullstack developer\'ım. React ekosistemiyle arayüzler geliştiriyor, Spring Boot ile ölçeklenebilir backend mimarileri kuruyorum.',
      'Karmaşık problemleri sade bir yapıya dönüştürmeyi ve doğru hissettiren ürünler üretmeyi seviyorum. Kod yazmadığım zamanlarda spor yapıyor ve müzik üretiyorum.',
    ],
    info: [
      { label: 'Doğum', value: '31.07.2002' },
      { label: 'Konum', value: 'İstanbul, Avcılar' },
      { label: 'Eğitim', value: 'Bilgisayar Müh.' },
      { label: 'Pozisyon', value: 'Fullstack Developer' },
    ],
  },
  en: {
    label: 'about me',
    title: 'who i am',
    paragraphs: [
      'Hi, I\'m Kaan.',
      'I\'m a Fullstack developer who builds clean, modern web and mobile experiences. I craft UIs with React and architect scalable backends with Spring Boot.',
      'I love turning complex problems into elegant solutions and shipping products that actually feel good to use. Outside of coding, I work out and produce music.',
    ],
    info: [
      { label: 'Born', value: '31.07.2002' },
      { label: 'Based', value: 'Istanbul, Avcılar' },
      { label: 'Degree', value: 'Computer Eng.' },
      { label: 'Role', value: 'Fullstack Developer' },
    ],
  },
};

export function AboutSection() {
  const { language } = useLanguage();
  const c = CONTENT[language];
  const ref = useRef<HTMLElement>(null);

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="sec-head">
        <span className="sec-index">01 / 07</span>
        <div className="sec-titles">
          <span className="sec-label">{c.label}</span>
          <h2 className="sec-title mask-line"><span>{c.title}</span></h2>
        </div>
      </div>

      <div className="about__grid">
        <div className="about__lead">
          {c.paragraphs.map((p, i) => (
            <p key={i} className={`${i === 0 ? 'lead' : 'body'} reveal`} style={sx(i)}>{p}</p>
          ))}
        </div>

        <aside className="about__panel">
          <div className="about__info reveal">
            {c.info.map(item => (
              <div key={item.label} className="about__row">
                <span className="about__row-k mono">{item.label}</span>
                <span className="about__row-v">{item.value}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
