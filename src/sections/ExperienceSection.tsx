import { useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import './ExperienceSection.css';

const TIMELINE = {
  en: [
    { year: '2020', title: 'Computer Engineering', place: 'Technical University of Sofia', desc: 'Began my Computer Engineering degree. Dived deep into algorithms, data structures and OOP — the foundation of everything I build.' },
    { year: '2022', title: 'React Ecosystem', place: 'Self-directed', desc: 'Built first production-ready web apps. Mastered React hooks, Redux, REST APIs and responsive design patterns.' },
    { year: '2023', title: 'Backend Engineering', place: 'Self-directed', desc: 'Went deep on Java & Spring Boot. Designed REST APIs, JPA repositories, Spring Security auth flows and PostgreSQL schemas.' },
    { year: '2024', title: 'Mobile Development', place: 'Graduation Thesis', desc: 'Built a cross-platform React Native app (Virtual Tour Guide) with real-time geolocation and Google Maps integration as my graduation thesis.' },
    { year: '2024', title: 'Fullstack Projects', place: 'Freelance & Personal', desc: 'Delivering end-to-end products: React frontends, Spring Boot backends, deployed on Vercel & cloud. Focused on performance and clean architecture.' },
  ],
  tr: [
    { year: '2020', title: 'Bilgisayar Mühendisliği', place: 'Sofya Teknik Üniversitesi', desc: 'Bilgisayar Mühendisliği eğitimine başladım. Algoritmalar, veri yapıları ve OOP — inşa ettiğim her şeyin temeli.' },
    { year: '2022', title: 'React Ekosistemi', place: 'Kendi kendine öğrenme', desc: 'İlk production-ready web uygulamalarını geliştirdim. React hooks, Redux, REST API ve responsive tasarım konularında uzmanlaştım.' },
    { year: '2023', title: 'Backend Mühendisliği', place: 'Kendi kendine öğrenme', desc: 'Java ve Spring Boot konularına derinlemesine girdim. REST API\'lar, JPA, Spring Security ve PostgreSQL şemaları tasarladım.' },
    { year: '2024', title: 'Mobil Geliştirme', place: 'Bitirme Tezi', desc: 'Gerçek zamanlı konum takibi ve Google Maps entegrasyonu ile çapraz platform React Native uygulaması (Sanal Tur Rehberi) geliştirdim.' },
    { year: '2024', title: 'Fullstack Projeler', place: 'Freelance & Kişisel', desc: 'Uçtan uca ürünler: React frontend\'ler, Spring Boot backend\'ler, Vercel\'de deploy. Performans ve temiz mimari odaklı çalışmalar.' },
  ],
};

export function ExperienceSection() {
  const { language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const items = TIMELINE[language];

  return (
    <section className="section exp" id="experience" ref={ref}>
      <div className="sec-head">
        <span className="sec-index">04 / 07</span>
        <div className="sec-titles">
          <span className="sec-label">{language === 'tr' ? 'deneyim' : 'experience'}</span>
          <h2 className="sec-title mask-line"><span>{language === 'tr' ? 'yolculuğum' : 'the journey'}</span></h2>
        </div>
      </div>

      <div className="exp__list">
        {items.map((item, i) => (
          <article className="exp__item reveal" key={i}>
            <div className="exp__year">{item.year}</div>
            <div className="exp__body">
              <span className="exp__place mono">{item.place}</span>
              <h3 className="exp__title">{item.title}</h3>
              <p className="body exp__desc">{item.desc}</p>
            </div>
            <span className="exp__idx mono">{String(i + 1).padStart(2, '0')}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
