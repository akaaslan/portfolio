// Import assets
import guideappImage from '../assets/guideapp.png';
import ecommerceImage from '../assets/ecommerce.png';

export const portfolioData = {
  tr: {
    name: "Kaan Aslan",
    title: "Yaratıcı düşünce ve minimalizm sevicisi :d. ",
    description: "Merhaba ben Kaan. Fullstack developer'ım. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non lorem mattis, molestie urna sit amet, faucibus metus quis libero magna. Maecenas accumsan lorem vitae rutrum enim, sed finibus nisl bibendum nec. Maecenas lorem nisi, aliquet vel enim vel, placerat ultrices arcu.",
    buttons: {
      hireMe: "Bana Ulaş",
      github: "Github",
      linkedin: "Linkedin"
    },
    navigation: {
      skills: "Yetenekler",
      projects: "Projeler",
      hireMe: "Bana Ulaş"
    },
    skills: [
      {
        name: "JavaScript",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque turpis vitae mauris."
      },
      {
        name: "React.js",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque turpis vitae mauris."
      },
      {
        name: "Node.js",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque turpis vitae mauris."
      }
    ],
    profile: {
      title: "Profil",
      sections: {
        profile: "Profil",
        aboutMe: "Hakkımda"
      },
      labels: {
        dateOfBirth: "Doğum Tarihi",
        cityOfResidence: "İkamet Şehri", 
        educationStatus: "Eğitim Durumu",
        preferredRole: "Tercih Ettiği Rol"
      },
      data: {
        dateOfBirth: "31.07.2002",
        cityOfResidence: "İstanbul, Avcılar",
        educationStatus: "Sofya Teknik Üniversitesi, Bilgisayar Bilimleri ve Mühendisliği",
        preferredRole: "Fullstack, UI, Front-end, Mobil (React Native)"
      },
      aboutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non lorem mattis, molestie urna sit amet, faucibus metus quis libero magna. Maecenas accumsan lorem vitae rutrum enim, sed finibus nisl bibendum nec. Maecenas lorem nisi, aliquet vel enim vel, placerat ultrices arcu."
    },
    projects: [
      {
        title: "Sanal Tur Rehberi",
        description: "Bitirme tezi projem olarak Sanal Tur Rehberi uygulaması kodladım.",
        image: guideappImage,
        techStack: ["JavaScript", "React Native"],
        githubLink: "https://github.com/akaaslan/guideapp3",
        viewSiteLink: "#"
      },
      {
        title: "E-Ticaret Sitesi",
        description: "Bir e-ticaret sitesi.",
        image: ecommerceImage,
        techStack: ["TypeScript", "React", "Redux"],
        githubLink: "https://github.com/akaaslan/adrianred",
        viewSiteLink: "https://ecommerce.vercel.app/"
      },
      {
        title: "Bir şeyler daha var güncelleriz burayı.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non lorem mattis, molestie urna sit amet, faucibus metus quis libero magna.",
        image: "/api/placeholder/400/300",
        techStack: ["bekleyin", "azıcık"],
        githubLink: "#",
        viewSiteLink: "#"
      }
    ],
    footer: {
      title: "Bir sonraki ürününüzün kaliteli ellerden çıkması için.",
      email: "ahmetkaanslan@outlook.com",
      links: {
        personalBlog: "Kişisel Blog",
        github: "Github",
        linkedin: "Linkedin"
      }
    }
  },
  en: {
    name: "Kaan Aslan",
    title: "Creative thinker Minimalism lover",
    description: "Hi, I'm Kaan. I'm a full-stack developer. If you are looking for a Developer who to craft solid and scalable frontend products with great user experiences. Let's shake hands with me.",
    buttons: {
      hireMe: "Hire me",
      github: "Github",
      linkedin: "Linkedin"
    },
    navigation: {
      skills: "Skills",
      projects: "Projects",
      hireMe: "Hire me"
    },
    skills: [
      {
        name: "JavaScript",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque turpis vitae mauris."
      },
      {
        name: "React.js",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque turpis vitae mauris."
      },
      {
        name: "Node.js",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque turpis vitae mauris."
      }
    ],
    profile: {
      title: "Profile",
      sections: {
        profile: "Profile",
        aboutMe: "About Me"
      },
      labels: {
        dateOfBirth: "Date of Birth",
        cityOfResidence: "City of Residence",
        educationStatus: "Education Status", 
        preferredRole: "Preferred Role"
      },
      data: {
        dateOfBirth: "31.07.2002",
        cityOfResidence: "İstanbul, Avcılar",
        educationStatus: "Technical University of Sofia, Bachelor of Computer Science and Engineering",
        preferredRole: "Fullstack, UI"
      },
      aboutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non lorem mattis, molestie urna sit amet, faucibus metus quis libero magna. Maecenas accumsan lorem vitae rutrum enim, sed finibus nisl bibendum nec. Maecenas lorem nisi, aliquet vel enim vel, placerat ultrices arcu."
    },
    projects: [
      {
        title: "Virtual Tour Guide Application",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non lorem mattis, molestie urna sit amet, faucibus metus quis libero magna.",
        image: guideappImage,
        techStack: ["JavaScript", "React Native"],
        githubLink: "https://github.com/akaaslan/guideapp3",
        viewSiteLink: "#"
      },
      {
        title: "E-Commerce Site",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non lorem mattis, molestie urna sit amet, faucibus metus quis libero magna.",
        image: ecommerceImage,
        techStack: ["JavaScript", "React", "Redux"],
        githubLink: "https://github.com/akaaslan/adrianred",
        viewSiteLink: "https://adrianred.vercel.app/"
      },
      {
        title: "gonna update soon.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non lorem mattis, molestie urna sit amet, faucibus metus quis libero magna.",
        image: "/api/placeholder/400/300",
        techStack: ["none"],
        githubLink: "https://github.com/akaaslan/guideapp3",
        viewSiteLink: "#"
      }
    ],
    footer: {
      title: "Let's work together on your next product.",
      email: "ahmetkaanslan@outlook.com",
      links: {
        personalBlog: "Personal Blog",
        github: "Github",
        linkedin: "Linkedin"
      }
    }
  }
};
