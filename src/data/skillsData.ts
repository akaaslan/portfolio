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
    icon: '/src/assets/skillicons/javascript.svg'
  },
  {
    name: 'React.js',
    category: 'frontend',
    description: 'Building scalable and performant single-page applications with React ecosystem.',
    icon: '/src/assets/skillicons/react.svg'
  },
  {
    name: 'Hooks',
    category: 'frontend',
    description: 'Managing state and side effects with React Hooks for functional components.',
    icon: '/src/assets/skillicons/hooks.svg'
  },
  {
    name: 'Context API',
    category: 'frontend',
    description: 'Global state management using React Context API for prop drilling solutions.',
    icon: '/src/assets/skillicons/react.svg'
  },
  {
    name: 'Redux',
    category: 'frontend',
    description: 'Predictable state container for complex application state management.',
    icon: '/src/assets/skillicons/redux.svg'
  },
  {
    name: 'Axios',
    category: 'frontend',
    description: 'Promise-based HTTP client for making API requests and handling responses.',
    icon: '/src/assets/skillicons/axios.svg'
  },
  {
    name: 'Jest',
    category: 'frontend',
    description: 'Unit testing framework for JavaScript with snapshot testing capabilities.',
    icon: '/src/assets/skillicons/jest.svg'
  },
  {
    name: 'Cypress',
    category: 'frontend',
    description: 'End-to-end testing framework for modern web applications.',
    icon: '/src/assets/skillicons/cypress.svg'
  },
  {
    name: 'HTML',
    category: 'frontend',
    description: 'Semantic HTML5 markup for accessible and SEO-friendly web structures.',
    icon: '/src/assets/skillicons/html.svg'
  },
  {
    name: 'CSS',
    category: 'frontend',
    description: 'Modern CSS3 with animations, flexbox, grid, and responsive design.',
    icon: '/src/assets/skillicons/css.svg'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    description: 'Utility-first CSS framework for rapid UI development.',
    icon: '/src/assets/skillicons/tailwind.svg'
  },
  
  // Back End
  {
    name: 'Java',
    category: 'backend',
    description: 'Enterprise-level backend development with Java for robust applications.',
    icon: '/src/assets/skillicons/java.svg'
  },
  {
    name: 'OOP',
    category: 'backend',
    description: 'Object-oriented programming principles for maintainable code architecture.',
    icon: '/src/assets/skillicons/oop.svg'
  },
  {
    name: 'Data Structures',
    category: 'backend',
    description: 'Efficient data organization using arrays, lists, trees, and graphs.',
    icon: '/src/assets/skillicons/datastructures.svg'
  },
  {
    name: 'Design Patterns',
    category: 'backend',
    description: 'Proven solutions for common software design problems and best practices.',
    icon: '/src/assets/skillicons/designpatterns.svg'
  },
  {
    name: 'Maven',
    category: 'backend',
    description: 'Build automation and dependency management for Java projects.',
    icon: '/src/assets/skillicons/maven.svg'
  },
  {
    name: 'Spring Core',
    category: 'backend',
    description: 'Dependency injection and inversion of control with Spring Framework.',
    icon: '/src/assets/skillicons/spring.svg'
  },
  {
    name: 'Spring Boot',
    category: 'backend',
    description: 'Rapid development of production-ready Spring applications.',
    icon: '/src/assets/skillicons/spring.svg'
  },
  {
    name: 'Spring Data JPA',
    category: 'backend',
    description: 'Object-relational mapping and database operations with JPA.',
    icon: '/src/assets/skillicons/jpa.svg'
  },
  {
    name: 'Spring Security',
    category: 'backend',
    description: 'Authentication and authorization framework for secure applications.',
    icon: '/src/assets/skillicons/security.svg'
  },
  {
    name: 'SQL',
    category: 'backend',
    description: 'Structured query language for database management and operations.',
    icon: '/src/assets/skillicons/sql.svg'
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    description: 'Advanced open-source relational database with ACID compliance.',
    icon: '/src/assets/skillicons/postgresql.svg'
  },
  {
    name: 'JUnit',
    category: 'backend',
    description: 'Unit testing framework for Java applications with annotations.',
    icon: '/src/assets/skillicons/junit.svg'
  },
  {
    name: 'Mockito',
    category: 'backend',
    description: 'Mocking framework for unit testing with dependencies.',
    icon: '/src/assets/skillicons/mockito.svg'
  },
  {
    name: 'Git',
    category: 'backend',
    description: 'Version control system for tracking code changes and collaboration.',
    icon: '/src/assets/skillicons/git.svg'
  },
  {
    name: '.Net',
    category: 'backend',
    description: 'Microsoft framework for building cross-platform applications.',
    icon: '/src/assets/skillicons/dotnet.svg'
  },
  
  // Additional
  {
    name: 'Algorithms',
    category: 'additional',
    description: 'Problem-solving with efficient algorithms and complexity analysis.',
    icon: '/src/assets/skillicons/algorithms.svg'
  },
  {
    name: 'Debugging',
    category: 'additional',
    description: 'Systematic approach to finding and fixing code issues.',
    icon: '/src/assets/skillicons/debugging.svg'
  },
  {
    name: 'Deployment',
    category: 'additional',
    description: 'CI/CD pipelines and application deployment strategies.',
    icon: '/src/assets/skillicons/deployment.svg'
  },
  {
    name: 'Problem Solving',
    category: 'additional',
    description: 'Analytical thinking and creative solutions for technical challenges.',
    icon: '/src/assets/skillicons/problemsolving.svg'
  },
  {
    name: 'Figma',
    category: 'additional',
    description: 'Collaborative interface design and prototyping tool.',
    icon: '/src/assets/skillicons/figma.svg'
  },
  {
    name: 'Teamwork',
    category: 'additional',
    description: 'Agile collaboration and effective communication in development teams.',
    icon: '/src/assets/skillicons/teamwork.svg'
  }
];

// Default icons for each category
export const defaultIcons = {
  frontend: '/src/assets/skillicons/default-frontend.svg',
  backend: '/src/assets/skillicons/default-backend.svg',
  additional: '/src/assets/skillicons/default-additional.svg'
};

export const skillsByCategory = {
  frontend: skillsData.filter(skill => skill.category === 'frontend'),
  backend: skillsData.filter(skill => skill.category === 'backend'),
  additional: skillsData.filter(skill => skill.category === 'additional')
};
