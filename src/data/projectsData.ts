import ecommerceImage from '../assets/ecommerce.webp';
import edirnekirmiziImage from '../assets/edirnekirmizi.webp';
import potaImage from '../assets/ph-pota.svg';
import ayasofyaImage from '../assets/ph-ayasofya.svg';
import ramisaImage from '../assets/ph-ramisa.svg';

export interface ProjectDetail {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  techStack: string[];
  image: string;        // primary image (list + cursor preview)
  images: string[];     // gallery shown in the modal
  githubLink: string;   // '#' when there is no public repo
  viewSiteLink: string; // '#' when there is no live link
  features: string[];
}

type ProjectsData = Record<string, ProjectDetail>;

export const projectsDetailData: { tr: ProjectsData; en: ProjectsData } = {
  tr: {
    adrianred: {
      id: 'adrianred',
      title: 'Adrian Red — E-Ticaret',
      shortDescription: 'Ürün kataloğu, sepet ve ödeme akışlarına sahip, React ve Redux ile geliştirilmiş bir e-ticaret deneyimi.',
      detailedDescription:
        'Adrian Red, modern bir e-ticaret arayüzüdür. Ürün listeleme, filtreleme, sepet yönetimi ve ödeme akışlarını içerir. ' +
        'React ve Redux ile uçtan uca durum yönetimi yapılmış, responsive ve performanslı bir kullanıcı deneyimi hedeflenmiştir.',
      techStack: ['React', 'TypeScript', 'Redux', 'Vite'],
      image: ecommerceImage,
      images: [ecommerceImage],
      githubLink: 'https://github.com/akaaslan/adrianred',
      viewSiteLink: 'https://adrianred.vercel.app/',
      features: [
        'Ürün kataloğu, arama ve filtreleme',
        'Redux ile sepet yönetimi',
        'Ödeme / checkout akışı',
        'Tamamen responsive tasarım',
      ],
    },
    pota: {
      id: 'pota',
      title: 'POTA — Basketbol',
      shortDescription: 'Sokak basketbolunu sosyalleştiren mobil uygulama: saha bul, maç kur, oyuncularla buluş.',
      detailedDescription:
        'POTA, basketbol tutkunlarını bir araya getiren bir mobil uygulamadır. React Native (Expo) ile geliştirildi, ' +
        'Supabase ile gerçek zamanlı veri ve kimlik doğrulama kullanır. Yakındaki sahaları keşfet, maç oluştur ve diğer oyuncularla buluş.',
      techStack: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
      image: potaImage,
      images: [potaImage],
      githubLink: 'https://github.com/akaaslan/POTA',
      viewSiteLink: '#',
      features: [
        'Supabase ile kimlik doğrulama',
        'Gerçek zamanlı maç ve oyuncu verisi',
        'Yakındaki sahaları keşfetme',
        'Maç oluşturma ve katılma',
      ],
    },
    ayasofya: {
      id: 'ayasofya',
      title: 'Ayasofya — Ezan Vakti',
      shortDescription: 'Namaz vakitleri, kıble, Kuran ve zikir — tam çevrimdışı destekli kapsamlı bir ibadet uygulaması.',
      detailedDescription:
        'Ayasofya; namaz vakitleri, gerçek zamanlı vakit sayacı, kıble pusulası, Kuran okuyucu, esmaül hüsna ve zikir sayacı ' +
        'sunan kapsamlı bir İslami uygulamadır. React Native ile geliştirildi; tam çevrimdışı çalışır, çok dilli ve çoklu tema desteği vardır.',
      techStack: ['React Native', 'Expo', 'JavaScript'],
      image: ayasofyaImage,
      images: [ayasofyaImage],
      githubLink: 'https://github.com/akaaslan/Ayasofya',
      viewSiteLink: '#',
      features: [
        '6 vakit için gerçek zamanlı geri sayım',
        'Kıble pusulası (yön & mesafe)',
        'Kuran okuyucu ve zikir sayacı',
        'Ramazan modu, çevrimdışı & çok dilli',
      ],
    },
    edirnekirmizi: {
      id: 'edirnekirmizi',
      title: 'Edirne Kırmızısı',
      shortDescription: 'Edirne Kırmızısı’nın tarihine ve kültürüne adanmış, modern ve interaktif bir tanıtım sitesi.',
      detailedDescription:
        'Edirne Kırmızısı, geleneksel Türk tekstil sanatı Edirne Kırmızısı’nın tarihini ve kültürünü anlatan bir web sitesidir. ' +
        'Modern tasarım, akıcı animasyonlar ve interaktif öğelerle ziyaretçiye zengin bir deneyim sunar.',
      techStack: ['React', 'TypeScript', 'Vite'],
      image: edirnekirmiziImage,
      images: [edirnekirmiziImage],
      githubLink: 'https://github.com/akaaslan/edirne-kirmizi',
      viewSiteLink: 'https://edirnekirmizi.com',
      features: [
        'Anlatımsal, kaydırmaya dayalı tasarım',
        'İnteraktif görsel öğeler ve animasyonlar',
        'Performans odaklı Vite kurulumu',
        'Tamamen responsive',
      ],
    },
    ramisabarbers: {
      id: 'ramisabarbers',
      title: 'Ramisa Barbers',
      shortDescription: 'Bir berber için modern tanıtım ve randevu sitesi. (Yakında yayında)',
      detailedDescription:
        'Ramisa Barbers, bir berber dükkânı için tasarladığım modern ve şık bir tanıtım sitesidir. ' +
        'Hizmetler, galeri ve randevu akışını içerir. Henüz yayında değil — yakında.',
      techStack: ['React', 'TypeScript', 'Vite'],
      image: ramisaImage,
      images: [ramisaImage],
      githubLink: '#',
      viewSiteLink: '#',
      features: [
        'Modern tanıtım / landing sayfası',
        'Hizmet ve galeri bölümleri',
        'Randevu akışı',
        'Tamamen responsive',
      ],
    },
  },
  en: {
    adrianred: {
      id: 'adrianred',
      title: 'Adrian Red — E-Commerce',
      shortDescription: 'A full e-commerce experience with catalog, cart and checkout flows, built with React and Redux.',
      detailedDescription:
        'Adrian Red is a modern e-commerce interface featuring product listing, filtering, cart management and checkout flows. ' +
        'State is managed end-to-end with React and Redux, aiming for a responsive and performant user experience.',
      techStack: ['React', 'TypeScript', 'Redux', 'Vite'],
      image: ecommerceImage,
      images: [ecommerceImage],
      githubLink: 'https://github.com/akaaslan/adrianred',
      viewSiteLink: 'https://adrianred.vercel.app/',
      features: [
        'Product catalog, search and filtering',
        'Cart management with Redux',
        'Checkout flow',
        'Fully responsive design',
      ],
    },
    pota: {
      id: 'pota',
      title: 'POTA — Basketball',
      shortDescription: 'A mobile app that makes street basketball social: find courts, set up games, meet players.',
      detailedDescription:
        'POTA brings basketball lovers together. Built with React Native (Expo) and powered by Supabase for real-time data and auth, ' +
        'it lets you discover nearby courts, create games and meet other players.',
      techStack: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
      image: potaImage,
      images: [potaImage],
      githubLink: 'https://github.com/akaaslan/POTA',
      viewSiteLink: '#',
      features: [
        'Authentication with Supabase',
        'Real-time game & player data',
        'Discover nearby courts',
        'Create and join games',
      ],
    },
    ayasofya: {
      id: 'ayasofya',
      title: 'Ayasofya — Prayer Times',
      shortDescription: 'Prayer times, qibla, Quran and dhikr — a comprehensive worship app with full offline support.',
      detailedDescription:
        'Ayasofya is a comprehensive Islamic app offering prayer times, a real-time prayer countdown, a qibla compass, ' +
        'a Quran reader, the 99 Names of Allah and a dhikr counter. Built with React Native; it works fully offline with multi-language and multi-theme support.',
      techStack: ['React Native', 'Expo', 'JavaScript'],
      image: ayasofyaImage,
      images: [ayasofyaImage],
      githubLink: 'https://github.com/akaaslan/Ayasofya',
      viewSiteLink: '#',
      features: [
        'Real-time countdown for 6 daily prayers',
        'Qibla compass (bearing & distance)',
        'Quran reader and dhikr counter',
        'Ramadan mode, offline & multi-language',
      ],
    },
    edirnekirmizi: {
      id: 'edirnekirmizi',
      title: 'Edirne Kırmızısı',
      shortDescription: 'A modern, interactive site dedicated to the history and culture of Edirne Kırmızısı.',
      detailedDescription:
        'Edirne Kırmızısı is a website dedicated to the history and culture of the traditional Turkish textile art "Edirne Kırmızısı". ' +
        'It features a modern design, smooth animations and interactive elements to give visitors a rich experience.',
      techStack: ['React', 'TypeScript', 'Vite'],
      image: edirnekirmiziImage,
      images: [edirnekirmiziImage],
      githubLink: 'https://github.com/akaaslan/edirne-kirmizi',
      viewSiteLink: 'https://edirnekirmizi.com',
      features: [
        'Narrative, scroll-driven design',
        'Interactive visual elements and animations',
        'Performance-focused Vite setup',
        'Fully responsive',
      ],
    },
    ramisabarbers: {
      id: 'ramisabarbers',
      title: 'Ramisa Barbers',
      shortDescription: 'A modern landing & booking site for a barbershop. (Going live soon)',
      detailedDescription:
        'Ramisa Barbers is a modern, sleek landing site I designed for a barbershop, including services, a gallery and a booking flow. ' +
        'Not deployed yet — coming soon.',
      techStack: ['React', 'TypeScript', 'Vite'],
      image: ramisaImage,
      images: [ramisaImage],
      githubLink: '#',
      viewSiteLink: '#',
      features: [
        'Modern landing page',
        'Services and gallery sections',
        'Booking flow',
        'Fully responsive',
      ],
    },
  },
};

// Ordered list per language (used by the Projects section)
export const projectsList = {
  tr: Object.values(projectsDetailData.tr),
  en: Object.values(projectsDetailData.en),
};
