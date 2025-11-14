// Import all skill icons
import javascriptIcon from '../assets/skillicons/javascript.svg';
import reactIcon from '../assets/skillicons/react.svg';
import hooksIcon from '../assets/skillicons/hooks.svg';
import reduxIcon from '../assets/skillicons/redux.svg';
import axiosIcon from '../assets/skillicons/axios.svg';
import jestIcon from '../assets/skillicons/jest.svg';
import cypressIcon from '../assets/skillicons/cypress.svg';
import htmlIcon from '../assets/skillicons/html.svg';
import cssIcon from '../assets/skillicons/css.svg';
import tailwindIcon from '../assets/skillicons/tailwind.svg';
import javaIcon from '../assets/skillicons/java.svg';
import oopIcon from '../assets/skillicons/oop.svg';
import datastructuresIcon from '../assets/skillicons/datastructures.svg';
import designpatternsIcon from '../assets/skillicons/designpatterns.svg';
import algorithmsIcon from '../assets/skillicons/algorithms.svg';
import springIcon from '../assets/skillicons/spring.svg';
import springbootIcon from '../assets/skillicons/springboot.svg';
import securityIcon from '../assets/skillicons/security.svg';
import jpaIcon from '../assets/skillicons/jpa.svg';
import mavenIcon from '../assets/skillicons/maven.svg';
import postgresqlIcon from '../assets/skillicons/postgresql.svg';
import sqlIcon from '../assets/skillicons/sql.svg';
import junitIcon from '../assets/skillicons/junit.svg';
import mockitoIcon from '../assets/skillicons/mockito.svg';
import dotnetIcon from '../assets/skillicons/dotnet.svg';
import gitIcon from '../assets/skillicons/git.svg';
import figmaIcon from '../assets/skillicons/figma.svg';
import debuggingIcon from '../assets/skillicons/debugging.svg';
import problemsolvingIcon from '../assets/skillicons/problemsolving.svg';
import teamworkIcon from '../assets/skillicons/teamwork.svg';
import deploymentIcon from '../assets/skillicons/deployment.svg';
import contextIcon from '../assets/skillicons/context.svg';
import yupIcon from '../assets/skillicons/yup.svg';
import defaultFrontendIcon from '../assets/skillicons/default-frontend.svg';
import defaultBackendIcon from '../assets/skillicons/default-backend.svg';
import defaultAdditionalIcon from '../assets/skillicons/default-additional.svg';

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'additional';
  description: string;
  icon?: string; // Path to icon image
}

export const skillsData: Skill[] = [
  // Front End
  {
    name: 'Javascript',
    category: 'frontend',
    description: 'Modern ES6+ JavaScript for building dynamic and interactive web applications.',
    icon: javascriptIcon
  },
  {
    name: 'React.js',
    category: 'frontend',
    description: 'Building scalable and performant single-page applications with React ecosystem.',
    icon: reactIcon
  },
  {
    name: 'Hooks',
    category: 'frontend',
    description: 'Managing state and side effects with React Hooks for functional components.',
    icon: hooksIcon
  },
  {
    name: 'Context API',
    category: 'frontend',
    description: 'Global state management using React Context API for prop drilling solutions.',
    icon: contextIcon
  },
  {
    name: 'Redux',
    category: 'frontend',
    description: 'Predictable state container for complex application state management.',
    icon: reduxIcon
  },
  {
    name: 'Axios',
    category: 'frontend',
    description: 'Promise-based HTTP client for making API requests and handling responses.',
    icon: axiosIcon
  },
  {
    name: 'Jest',
    category: 'frontend',
    description: 'Unit testing framework for JavaScript with snapshot testing capabilities.',
    icon: jestIcon
  },
  {
    name: 'Cypress',
    category: 'frontend',
    description: 'End-to-end testing framework for modern web applications.',
    icon: cypressIcon
  },
  {
    name: 'HTML',
    category: 'frontend',
    description: 'Semantic HTML5 markup for accessible and SEO-friendly web structures.',
    icon: htmlIcon
  },
  {
    name: 'CSS',
    category: 'frontend',
    description: 'Modern CSS3 with animations, flexbox, grid, and responsive design.',
    icon: cssIcon
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    description: 'Utility-first CSS framework for rapid UI development.',
    icon: tailwindIcon
  },
  
  // Back End
  {
    name: 'Java',
    category: 'backend',
    description: 'Enterprise-level backend development with Java for robust applications.',
    icon: javaIcon
  },
  {
    name: 'OOP',
    category: 'backend',
    description: 'Object-oriented programming principles for maintainable code architecture.',
    icon: oopIcon
  },
  {
    name: 'Data Structures',
    category: 'backend',
    description: 'Efficient data organization using arrays, lists, trees, and graphs.',
    icon: datastructuresIcon
  },
  {
    name: 'Design Patterns',
    category: 'backend',
    description: 'Proven solutions for common software design problems and best practices.',
    icon: designpatternsIcon
  },
  {
    name: 'Maven',
    category: 'backend',
    description: 'Build automation and dependency management for Java projects.',
    icon: mavenIcon
  },
  {
    name: 'Spring Core',
    category: 'backend',
    description: 'Dependency injection and inversion of control with Spring Framework.',
    icon: springIcon
  },
  {
    name: 'Spring Boot',
    category: 'backend',
    description: 'Rapid development of production-ready Spring applications.',
    icon: springbootIcon
  },
  {
    name: 'Spring Data JPA',
    category: 'backend',
    description: 'Object-relational mapping and database operations with JPA.',
    icon: jpaIcon
  },
  {
    name: 'Spring Security',
    category: 'backend',
    description: 'Authentication and authorization framework for secure applications.',
    icon: securityIcon
  },
  {
    name: 'SQL',
    category: 'backend',
    description: 'Structured query language for database management and operations.',
    icon: sqlIcon
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    description: 'Advanced open-source relational database with ACID compliance.',
    icon: postgresqlIcon
  },
  {
    name: 'JUnit',
    category: 'backend',
    description: 'Unit testing framework for Java applications with annotations.',
    icon: junitIcon
  },
  {
    name: 'Mockito',
    category: 'backend',
    description: 'Mocking framework for unit testing with dependencies.',
    icon: mockitoIcon
  },
  {
    name: 'Git',
    category: 'backend',
    description: 'Version control system for tracking code changes and collaboration.',
    icon: gitIcon
  },
  {
    name: '.Net',
    category: 'backend',
    description: 'Microsoft framework for building cross-platform applications.',
    icon: dotnetIcon
  },
  {
    name: 'Algorithms',
    category: 'backend',
    description: 'Solving complex problems with efficient algorithmic approaches.',
    icon: algorithmsIcon
  },
  
  // Additional
  {
    name: 'Debugging',
    category: 'additional',
    description: 'Systematic approach to finding and fixing code issues.',
    icon: debuggingIcon
  },
  {
    name: 'Deployment',
    category: 'additional',
    description: 'CI/CD pipelines and application deployment strategies.',
    icon: deploymentIcon
  },
  {
    name: 'Problem Solving',
    category: 'additional',
    description: 'Analytical thinking and creative solutions for technical challenges.',
    icon: problemsolvingIcon
  },
  {
    name: 'Figma',
    category: 'additional',
    description: 'Collaborative interface design and prototyping tool.',
    icon: figmaIcon
  },
  {
    name: 'Teamwork',
    category: 'additional',
    description: 'Agile collaboration and effective communication in development teams.',
    icon: teamworkIcon
  },
  {
    name: 'Yup',
    category: 'additional',
    description: 'Schema validation for form inputs.',
    icon: yupIcon
  }
];

// Default icons for each category
export const defaultIcons = {
  frontend: defaultFrontendIcon,
  backend: defaultBackendIcon,
  additional: defaultAdditionalIcon
};

export const skillsByCategory = {
  frontend: skillsData.filter(skill => skill.category === 'frontend'),
  backend: skillsData.filter(skill => skill.category === 'backend'),
  additional: skillsData.filter(skill => skill.category === 'additional')
};
