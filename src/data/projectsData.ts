export interface ProjectDetail {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  techStack: string[];
  images: {
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
  };
  githubLink: string;
  viewSiteLink: string;
  features: string[];
}

type ProjectsData = {
  [key: string]: ProjectDetail;
};

export const projectsDetailData: { tr: ProjectsData; en: ProjectsData } = {
  tr: {
    sanalturrehberi: {
      id: 'sanalturrehberi',
      title: 'Sanal Tur Rehberi',
      shortDescription: 'Bitirme tezi projem olarak geliştirdiğim sanal tur rehberi uygulaması.',
      detailedDescription: `Sanal Tur Rehberi, kullanıcılara turistik mekanları sanal ortamda keşfetme imkanı sunan bir mobil uygulamadır.
      
      React Native kullanılarak geliştirilmiş olan bu proje, gerçek zamanlı konum takibi, harita entegrasyonu ve detaylı mekan bilgileri sunmaktadır.
      
      Bitirme tezi projesi olarak geliştirilen uygulama, modern mobil uygulama geliştirme tekniklerini kullanmaktadır.`,
      techStack: ['JavaScript', 'React Native', 'Google Maps API', 'Geolocation'],
      images: {
        photo1: '/api/placeholder/800/600',
        photo2: '/api/placeholder/800/600',
        photo3: '/api/placeholder/800/600',
        photo4: '/api/placeholder/800/600'
      },
      githubLink: 'https://github.com/akaaslan/guideapp3',
      viewSiteLink: '#',
      features: [
        'React Native - Cross-platform mobil uygulama',
        'Gerçek zamanlı konum takibi',
        'Google Maps harita entegrasyonu',
        'Detaylı mekan bilgileri ve fotoğraflar'
      ]
    },
    'e-ticaretsitesi': {
      id: 'e-ticaretsitesi',
      title: 'E-Ticaret Sitesi',
      shortDescription: 'Modern ve kullanıcı dostu bir e-ticaret platformu.',
      detailedDescription: `Modern ve kullanıcı dostu bir e-ticaret platformu. TypeScript ve React kullanılarak geliştirilmiş, Redux ile state yönetimi sağlanmıştır.
      
      Ürün listeleme, detaylı ürün sayfaları, sepet yönetimi ve kullanıcı oturumu gibi temel e-ticaret özellikleri içermektedir.
      
      Responsive tasarımı ile tüm cihazlarda sorunsuz çalışmaktadır.`,
      techStack: ['TypeScript', 'React', 'Redux', 'CSS3', 'REST API'],
      images: {
        photo1: '/api/placeholder/800/600',
        photo2: '/api/placeholder/800/600',
        photo3: '/api/placeholder/800/600',
        photo4: '/api/placeholder/800/600'
      },
      githubLink: 'https://github.com/akaaslan/adrianred',
      viewSiteLink: 'https://adrianred.vercel.app/',
      features: [
        'TypeScript - Tip güvenli kod yapısı',
        'Redux State Management - Merkezi veri yönetimi',
        'Responsive Design - Her cihazda uyumlu',
        'Ürün kataloğu ve sepet sistemi'
      ]
    },
    'birseylerahahaguncellerizburayı.': {
      id: 'birseylerahahaguncellerizburayı.',
      title: 'Bir şeyler aha ha güncelleriz burayı.',
      shortDescription: 'Yakında yeni projelerle güncellenecek.',
      detailedDescription: `Bu alan yakında yeni projelerle güncellenecektir.
      
      Üzerinde çalışılan yeni projeler burada yer alacaktır.`,
      techStack: ['Yakında', 'Güncellenecek'],
      images: {
        photo1: '/api/placeholder/800/600',
        photo2: '/api/placeholder/800/600',
        photo3: '/api/placeholder/800/600',
        photo4: '/api/placeholder/800/600'
      },
      githubLink: '#',
      viewSiteLink: '#',
      features: [
        'Yakında eklenecek özellikler',
        'Yeni teknolojiler',
        'Modern yaklaşımlar'
      ]
    },
    portfoliowebsite: {
      id: 'portfoliowebsite',
      title: 'Portfolio Website',
      shortDescription: 'Modern tasarım ve animasyonlar içeren kişisel portfolio websitem.',
      detailedDescription: `React, TypeScript ve Vite ile geliştirilmiş modern ve responsive bir portfolio websitesi.
      
      Bu proje, becerilerimi ve projelerimi temiz, minimalist bir tasarımla sergiliyor. Smooth animasyonlar, dark mode desteği ve interaktif proje modal sistemi gibi özellikler içeriyor.
      
      Modern web teknolojileri ve best practice'ler kullanılarak, performans ve kullanıcı deneyimine odaklanarak geliştirildi.`,
      techStack: ['React', 'TypeScript', 'Vite', 'CSS3', 'Framer Motion'],
      images: {
        photo1: '/api/placeholder/800/600',
        photo2: '/api/placeholder/800/600',
        photo3: '/api/placeholder/800/600',
        photo4: '/api/placeholder/800/600'
      },
      githubLink: 'https://github.com/akaaslan/portfolio2',
      viewSiteLink: '#',
      features: [
        'TypeScript ile modern React',
        'Tüm cihazlar için responsive tasarım',
        'Akıcı animasyonlar ve geçişler',
        'Modal sistemi ile interaktif proje vitrini'
      ]
    }
  },
  en: {
    virtualtourguideapplication: {
      id: 'virtualtourguideapplication',
      title: 'Virtual Tour Guide Application',
      shortDescription: 'A virtual tour guide mobile application developed as my graduation thesis.',
      detailedDescription: `Virtual Tour Guide is a mobile application that allows users to explore tourist attractions in a virtual environment.
      
      Developed using React Native, this project offers real-time location tracking, map integration, and detailed location information.
      
      Created as a graduation thesis project, the application utilizes modern mobile app development techniques.`,
      techStack: ['JavaScript', 'React Native', 'Google Maps API', 'Geolocation'],
      images: {
        photo1: '/api/placeholder/800/600',
        photo2: '/api/placeholder/800/600',
        photo3: '/api/placeholder/800/600',
        photo4: '/api/placeholder/800/600'
      },
      githubLink: 'https://github.com/akaaslan/guideapp3',
      viewSiteLink: '#',
      features: [
        'React Native - Cross-platform mobile app',
        'Real-time location tracking',
        'Map integration with Google Maps',
        'Detailed location information and photos'
      ]
    },
    'e-commercesite': {
      id: 'e-commercesite',
      title: 'E-Commerce Site',
      shortDescription: 'A modern e-commerce platform.',
      detailedDescription: `A modern and user-friendly e-commerce platform. Developed using TypeScript and React, with Redux for state management.
      
      Features include product listings, detailed product pages, shopping cart management, and user authentication.
      
      Responsive design ensures seamless functionality across all devices.`,
      techStack: ['TypeScript', 'React', 'Redux', 'CSS3', 'REST API'],
      images: {
        photo1: '/api/placeholder/800/600',
        photo2: '/api/placeholder/800/600',
        photo3: '/api/placeholder/800/600',
        photo4: '/api/placeholder/800/600'
      },
      githubLink: 'https://github.com/akaaslan/adrianred',
      viewSiteLink: 'https://adrianred.vercel.app/',
      features: [
        'TypeScript - Type-safe code structure',
        'Redux State Management - Centralized data management',
        'Responsive Design - Compatible with all devices',
        'Product catalog and cart system'
      ]
    },
    gonnaupdatesoon: {
      id: 'gonnaupdatesoon',
      title: 'Gonna Update Soon',
      shortDescription: 'Coming soon with new features.',
      detailedDescription: `This section will be updated soon with new projects.
      
      New projects in development will be featured here.`,
      techStack: ['Coming', 'Soon'],
      images: {
        photo1: '/api/placeholder/800/600',
        photo2: '/api/placeholder/800/600',
        photo3: '/api/placeholder/800/600',
        photo4: '/api/placeholder/800/600'
      },
      githubLink: '#',
      viewSiteLink: '#',
      features: [
        'Features to be added soon',
        'New technologies',
        'Modern approaches'
      ]
    },
    portfoliowebsite: {
      id: 'portfoliowebsite',
      title: 'Portfolio Website',
      shortDescription: 'My personal portfolio website featuring modern design and smooth animations.',
      detailedDescription: `A modern and responsive portfolio website built with React, TypeScript, and Vite.
      
      This project showcases my skills and projects with a clean, minimalist design. Features include smooth animations, dark mode support, and an interactive project modal system.
      
      Built with modern web technologies and best practices, focusing on performance and user experience.`,
      techStack: ['React', 'TypeScript', 'Vite', 'CSS3', 'Framer Motion'],
      images: {
        photo1: '/api/placeholder/800/600',
        photo2: '/api/placeholder/800/600',
        photo3: '/api/placeholder/800/600',
        photo4: '/api/placeholder/800/600'
      },
      githubLink: 'https://github.com/akaaslan/portfolio2',
      viewSiteLink: '#',
      features: [
        'Modern React with TypeScript',
        'Responsive design for all devices',
        'Smooth animations and transitions',
        'Interactive project showcase with modals'
      ]
    }
  }
};
