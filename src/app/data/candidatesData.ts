// Datos completos de candidatos para Product Designer Senior

export interface CandidateData {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  avatar: string;
  currentStage: string;
  status: 'active' | 'rejected' | 'hired';
  appliedDate: string;
  expectedSalary: string;
  availability: string;
  yearsExperience: number;
  
  // Información personal adicional
  firstName?: string;
  lastName?: string;
  identificationNumber?: string;
  identificationType?: string;
  nationality?: string;
  linkedin?: string;
  birthDate?: string;
  
  // Ubicación detallada
  city?: string;
  country?: string;
  willingToRelocate?: boolean;
  interestedLocations?: string[];
  
  // Información laboral adicional
  noticePeriod?: string;
  noticePeriodUnit?: string;
  currency?: string;
  
  // Perfil profesional
  description?: string;
  matchScore?: number;
  confidence?: 'high' | 'medium' | 'low';
  
  // Experiencia laboral
  experience: Array<{
    id?: string;
    company: string;
    position: string;
    duration: string;
    description: string;
    location?: string;
    startDate?: string;
    endDate?: string | null;
    current?: boolean;
    achievements?: string[];
  }>;
  
  // Educación
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    description?: string;
  }>;
  
  // Skills y competencias
  skills: {
    technical: string[];
    soft: string[];
  };
  
  // Portfolio
  portfolio: {
    url: string;
    projects: Array<{
      name: string;
      description: string;
      impact: string;
    }>;
  };
  
  // Scores por etapa
  scores: {
    cvScore?: number;
    psychometricScore?: number;
    serenaScore?: number;
    technicalScore?: number;
    productManagerScore?: number;
    hiringManagerScore?: number;
  };
  
  // Notas y comentarios
  notes: string[];
  rejectionReason?: string;
}

export const candidatesData: CandidateData[] = [
  // ====== ETAPA 9: SELECCIONADO (1 HIRED) ======
  {
    id: 'cand-001',
    name: 'María García López',
    email: 'maria.garcia@email.com',
    phone: '+57 300 123 4567',
    age: 28,
    location: 'Bogotá, Colombia',
    avatar: 'MG',
    currentStage: 'seleccionado',
    status: 'hired',
    appliedDate: '2026-02-10',
    expectedSalary: '$8.000.000 - $10.000.000 COP',
    availability: 'Inmediata',
    yearsExperience: 5,
    
    // Información personal adicional
    firstName: 'María',
    lastName: 'García López',
    identificationNumber: '1015432189',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/mariagarcia',
    birthDate: '15/03/1998',
    
    // Ubicación detallada
    city: 'Bogotá',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Medellín', 'Remote'],
    
    // Información laboral adicional
    noticePeriod: '2',
    noticePeriodUnit: 'Semanas',
    currency: 'Peso colombiano (COP)',
    
    // Perfil profesional
    description: 'Product Designer con más de 5 años de experiencia creando experiencias digitales centradas en el usuario. Especializada en diseño de sistemas escalables, investigación UX y prototipado rápido. He trabajado con equipos multidisciplinarios en startups tecnológicas líderes como Rappi y Platzi, liderando proyectos desde la conceptualización hasta el lanzamiento. Mi enfoque combina pensamiento estratégico con ejecución visual impecable, siempre basándome en datos y feedback de usuarios. Apasionada por la educación digital y el impacto social a través del diseño.',
    matchScore: 92,
    confidence: 'high',
    
    experience: [
      {
        company: 'Rappi',
        position: 'Senior Product Designer',
        duration: 'Ene 2023 - Presente',
        description: 'Lideré el rediseño del sistema de diseño de la app principal, impactando a +10M usuarios. Trabajé en estrecha colaboración con Product Managers y desarrolladores para crear experiencias intuitivas.',
        location: 'Bogotá, Colombia',
        startDate: 'Enero 2023',
        endDate: null,
        current: true,
        achievements: [
          'Rediseñé el sistema de diseño impactando a +10M usuarios',
          'Lideré iniciativas de accesibilidad aumentando el cumplimiento WCAG del 60% al 95%',
          'Mentoría de 3 diseñadores junior en mejores prácticas de producto',
          'Colaboración directa con C-level en definición de estrategia de diseño'
        ]
      },
      {
        company: 'Platzi',
        position: 'Product Designer',
        duration: 'Mar 2021 - Dic 2022',
        description: 'Diseñé la experiencia de usuario para nuevos cursos y plataformas de aprendizaje. Implementé metodologías de design thinking y research de usuarios.',
        location: 'Bogotá, Colombia',
        startDate: 'Marzo 2021',
        endDate: 'Diciembre 2022',
        current: false,
        achievements: [
          'Diseñé el nuevo flujo de rutas de aprendizaje con 25% de incremento en completion rate',
          'Implementé programa de user research con +200 entrevistas realizadas',
          'Creé componentes reutilizables que redujeron tiempo de desarrollo en 40%',
          'Lideré rediseño de experiencia mobile con mejora del NPS de 45 a 68'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad de los Andes',
        degree: 'Diseño Industrial',
        year: '2020',
        description: 'Enfoque en diseño de productos digitales y experiencia de usuario. Proyecto de grado sobre accesibilidad en plataformas educativas.'
      }
    ],
    skills: {
      technical: ['Figma', 'Sketch', 'Design Systems', 'Prototyping', 'User Research', 'Adobe Creative Suite', 'FigJam', 'Miro', 'Maze', 'UserTesting', 'Analytics'],
      soft: ['Liderazgo', 'Comunicación', 'Trabajo en equipo', 'Pensamiento crítico', 'Adaptabilidad', 'Empatía', 'Mentoría', 'Presentación ejecutiva']
    },
    portfolio: {
      url: 'https://mariagarcia.design',
      projects: [
        {
          name: 'Rappi Design System 2.0',
          description: 'Rediseño completo del sistema de diseño con enfoque en accesibilidad',
          impact: 'Reducción del 40% en tiempo de desarrollo de features'
        },
        {
          name: 'Platzi Learning Path',
          description: 'Nueva experiencia de rutas de aprendizaje personalizadas',
          impact: 'Incremento del 25% en completion rate'
        }
      ]
    },
    scores: {
      cvScore: 92,
      psychometricScore: 88,
      serenaScore: 91,
      technicalScore: 94,
      productManagerScore: 90,
      hiringManagerScore: 93
    },
    notes: [
      'Excelente portfolio con casos de estudio detallados',
      'Experiencia relevante en startups tech colombianas',
      'Muy buena presentación de proyectos de impacto',
      'Fit cultural excepcional',
      'Referencias muy positivas'
    ]
  },

  // ====== ETAPA 8: VERIFICACIÓN ANTECEDENTES (1 ACTIVO, 1 RECHAZADO) ======
  {
    id: 'cand-002',
    name: 'Valentina Herrera Castro',
    email: 'valentina.herrera@email.com',
    phone: '+57 318 789 0123',
    age: 31,
    location: 'Bogotá, Colombia',
    avatar: 'VH',
    currentStage: 'antecedentes',
    status: 'active',
    appliedDate: '2026-02-12',
    expectedSalary: '$9.500.000 - $11.500.000 COP',
    availability: '1 mes',
    yearsExperience: 8,
    
    // Información personal adicional
    firstName: 'Valentina',
    lastName: 'Herrera Castro',
    identificationNumber: '1023456789',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/valentinaherrera',
    birthDate: '22/08/1995',
    
    // Ubicación detallada
    city: 'Bogotá',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Remote (Global)', 'USA', 'Europa'],
    
    // Información laboral adicional
    noticePeriod: '1',
    noticePeriodUnit: 'Mes',
    currency: 'Peso colombiano (COP)',
    
    // Perfil profesional
    description: 'Product Designer Senior con 8 años de experiencia trabajando con equipos globales en Google y Accenture Interactive. Especializada en diseño de sistemas escalables, investigación de usuarios internacional y colaboración cross-cultural. He liderado proyectos de transformación digital para corporaciones Fortune 500 y startups tecnológicas, siempre enfocándome en crear experiencias intuitivas y accesibles. Mi experiencia en consultoría me ha dado una visión estratégica única para resolver problemas complejos de negocio a través del diseño. Apasionada por la accesibilidad digital, las metodologías ágiles y el liderazgo de equipos distribuidos. Certificada en Design Operations y con experiencia trabajando en ambientes altamente colaborativos y de ritmo acelerado.',
    matchScore: 94,
    confidence: 'high',
    
    experience: [
      {
        company: 'Google (Contractor)',
        position: 'UX Designer',
        duration: 'Ene 2023 - Presente',
        description: 'Diseño de features para productos Google Workspace. Colaboración con equipos internacionales en Mountain View, Londres y Bangalore. Research y testing con usuarios globales de diferentes culturas y contextos.',
        location: 'Remote (USA)',
        startDate: 'Enero 2023',
        endDate: null,
        current: true,
        achievements: [
          'Diseñé 3 features clave para Google Workspace adoptadas por +50M usuarios',
          'Lideré iniciativas de accesibilidad logrando WCAG 2.1 AAA compliance',
          'Colaboré con equipos en 5 países diferentes, optimizando procesos de trabajo remoto',
          'Implementé sistema de componentes reutilizables que redujo tiempo de diseño en 35%',
          'Mentoría a 2 diseñadores contratistas en mejores prácticas de Google'
        ]
      },
      {
        company: 'Accenture Interactive',
        position: 'Senior UX Designer',
        duration: 'Jun 2019 - Dic 2022',
        description: 'Consultoría de diseño estratégico para clientes Fortune 500 en banca, retail y telecomunicaciones. Liderazgo de proyectos end-to-end de transformación digital. Mentoría de diseñadores junior y coordinación con stakeholders C-level.',
        location: 'Bogotá, Colombia',
        startDate: 'Junio 2019',
        endDate: 'Diciembre 2022',
        current: false,
        achievements: [
          'Lideré transformación digital de banco regional con 80% de incremento en usuarios digitales',
          'Diseñé sistema de diseño adoptado por 20+ equipos de producto del cliente',
          'Facilitación de +50 workshops de Design Thinking con stakeholders ejecutivos',
          'Mentoría de equipo de 5 diseñadores junior en metodologías ágiles',
          'Implementé procesos de user research que redujeron tiempo de validación en 40%'
        ]
      },
      {
        company: 'Globant',
        position: 'UX Designer',
        duration: 'Ago 2017 - May 2019',
        description: 'Diseño de productos digitales para clientes de USA y Latam en retail, fintech y media. Trabajo en equipos ágiles internacionales. Especialización en mobile-first y responsive design.',
        location: 'Bogotá, Colombia',
        startDate: 'Agosto 2017',
        endDate: 'Mayo 2019',
        current: false,
        achievements: [
          'Diseñé app fintech que alcanzó 100K descargas en primeros 3 meses',
          'Creé sistema de design tokens adoptado por 3 proyectos del estudio',
          'Colaboré con equipos en Argentina, México y USA en proyectos simultáneos',
          'Lideré iniciativa de UI/UX best practices para todo el equipo de diseño'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad de los Andes',
        degree: 'Diseño',
        year: '2017',
        description: 'Título con distinción en Diseño con énfasis en diseño de interacción y medios digitales. Proyecto de grado sobre accesibilidad en interfaces móviles.'
      },
      {
        institution: 'General Assembly',
        degree: 'UX Design Immersive',
        year: '2018',
        description: 'Bootcamp intensivo de 12 semanas en diseño UX/UI con enfoque en metodologías ágiles, design thinking y prototipado rápido.'
      },
      {
        institution: 'Nielsen Norman Group',
        degree: 'UX Certification',
        year: '2021',
        description: 'Certificación profesional en User Experience del Nielsen Norman Group.'
      }
    ],
    skills: {
      technical: ['Figma', 'Sketch', 'Design Systems', 'Advanced Prototyping', 'User Research', 'Design Ops', 'Accessibility (WCAG)', 'Analytics', 'A/B Testing', 'Maze', 'UserTesting', 'Miro', 'FigJam', 'Design Tokens', 'Component Libraries'],
      soft: ['Liderazgo', 'Comunicación intercultural', 'Pensamiento estratégico', 'Mentoría', 'Adaptabilidad', 'Stakeholder Management', 'Presentaciones ejecutivas', 'Facilitación de workshops', 'Trabajo remoto', 'Inglés fluido (C1)']
    },
    portfolio: {
      url: 'https://valentinaherrera.design',
      projects: [
        {
          name: 'Google Workspace Feature (NDA)',
          description: 'Feature de productividad y colaboración para Google Workspace con enfoque en accesibilidad global',
          impact: 'Adoptado por +50M usuarios en 6 meses. Incremento del 22% en engagement'
        },
        {
          name: 'Banking Digital Transformation - Accenture',
          description: 'Transformación digital completa de banco regional latinoamericano con 5M+ clientes',
          impact: 'Incremento del 80% en usuarios digitales, NPS de 78, reducción del 60% en llamadas a call center'
        },
        {
          name: 'Accenture Design System',
          description: 'Sistema de diseño escalable para cliente enterprise con +20 productos digitales',
          impact: 'Adoptado por 20+ equipos, reducción del 50% en tiempo de diseño a producción'
        },
        {
          name: 'Fintech Mobile App - Globant',
          description: 'App móvil de pagos y transferencias para mercado latinoamericano',
          impact: '100K descargas en 3 meses, rating de 4.7/5 en stores'
        }
      ]
    },
    scores: {
      cvScore: 94,
      psychometricScore: 90,
      serenaScore: 92,
      technicalScore: 95,
      productManagerScore: 91,
      hiringManagerScore: 94
    },
    notes: [
      'Experiencia internacional excepcional - trabajó en Google',
      'Portfolio de alto nivel con proyectos de gran impacto medible',
      'Excelente fit cultural: colaborativa, estratégica y orientada a resultados',
      'Certificaciones de Nielsen Norman Group y General Assembly',
      'Expectativa salarial en el límite superior pero completamente justificada',
      'Fuerte enfoque en accesibilidad y design ops',
      'Inglés fluido - apto para colaboración internacional',
      'Proceso de verificación de antecedentes en curso'
    ]
  },
  {
    id: 'cand-003',
    name: 'Andrés Parra Gómez',
    email: 'andres.parra@email.com',
    phone: '+57 313 456 7890',
    age: 33,
    location: 'Santa Marta, Colombia',
    avatar: 'AP',
    currentStage: 'antecedentes',
    status: 'rejected',
    appliedDate: '2026-02-14',
    expectedSalary: '$9.000.000 - $10.000.000 COP',
    availability: '1 mes',
    yearsExperience: 8,
    
    // Información personal adicional
    firstName: 'Andrés',
    lastName: 'Parra Gómez',
    identificationNumber: '1098765432',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiano',
    linkedin: 'https://www.linkedin.com/in/andresparra',
    birthDate: '10/05/1993',
    
    // Ubicación detallada
    city: 'Santa Marta',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Remote'],
    
    // Información laboral adicional
    noticePeriod: '1',
    noticePeriodUnit: 'Mes',
    currency: 'Peso colombiano (COP)',
    
    // Perfil profesional
    description: 'Diseñador Digital con 8 años de experiencia en desarrollo web y diseño de interfaces. He trabajado en diversos proyectos para agencias digitales y clientes corporativos, con enfoque en sitios web responsivos, landing pages de alta conversión y experiencias de usuario intuitivas. Mi background técnico en ingeniería de sistemas me permite colaborar efectivamente con equipos de desarrollo y entender las limitaciones técnicas. Busco hacer la transición hacia diseño de producto digital en startups tech. Apasionado por el diseño limpio, la usabilidad y las últimas tendencias en desarrollo web.',
    matchScore: 76,
    confidence: 'medium',
    
    experience: [
      {
        company: 'Digital Agency Colombia',
        position: 'Diseñador Web Senior',
        duration: 'Mar 2018 - Presente',
        description: 'Diseño y desarrollo de sitios web corporativos para clientes nacionales e internacionales. Liderazgo de proyectos desde el brief inicial hasta el lanzamiento. Coordinación con equipos de marketing y desarrollo.',
        location: 'Santa Marta, Colombia',
        startDate: 'Marzo 2018',
        endDate: null,
        current: true,
        achievements: [
          'Diseñé +40 sitios web para clientes de diversos sectores',
          'Implementé mejores prácticas de SEO aumentando tráfico orgánico en 35%',
          'Creé sistema de templates reutilizables que redujo tiempo de desarrollo en 25%',
          'Lideré rediseño de sitio e-commerce con incremento de conversión del 18%'
        ]
      },
      {
        company: 'TechSolutions SAS',
        position: 'Desarrollador Frontend / Diseñador',
        duration: 'Ene 2016 - Feb 2018',
        description: 'Desarrollo frontend con HTML, CSS, JavaScript y diseño de interfaces para aplicaciones web. Trabajo con frameworks como Bootstrap y WordPress. Colaboración con backend para integración de APIs.',
        location: 'Barranquilla, Colombia',
        startDate: 'Enero 2016',
        endDate: 'Febrero 2018',
        current: false,
        achievements: [
          'Desarrollé +20 landing pages con tasas de conversión superiores al 8%',
          'Implementé diseño responsive para 15 aplicaciones web legacy',
          'Colaboré en migración de sitios a WordPress mejorando mantenibilidad',
          'Mentoría a 2 diseñadores junior en buenas prácticas frontend'
        ]
      },
      {
        company: 'Freelance',
        position: 'Diseñador Web Freelance',
        duration: 'Jun 2014 - Dic 2015',
        description: 'Proyectos freelance de diseño web para pequeñas empresas y emprendimientos. Gestión completa del proceso desde briefing hasta entrega y hosting.',
        location: 'Santa Marta, Colombia',
        startDate: 'Junio 2014',
        endDate: 'Diciembre 2015',
        current: false,
        achievements: [
          'Completé +15 proyectos web para pymes locales',
          'Desarrollo de identidad visual y branding para 5 startups',
          'Implementé estrategias de posicionamiento web básico'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad del Magdalena',
        degree: 'Ingeniería de Sistemas',
        year: '2015',
        description: 'Título profesional en Ingeniería de Sistemas con énfasis en desarrollo web y bases de datos. Proyecto de grado sobre sistemas de información para pymes.'
      },
      {
        institution: 'Platzi',
        degree: 'Curso de Diseño Web y UX/UI',
        year: '2017',
        description: 'Cursos online de especialización en diseño web, UX/UI y desarrollo frontend.'
      }
    ],
    skills: {
      technical: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Bootstrap', 'Responsive Design', 'SEO Básico', 'Git (básico)'],
      soft: ['Versatilidad', 'Problem solving', 'Gestión de proyectos', 'Comunicación con clientes', 'Autogestión', 'Aprendizaje continuo']
    },
    portfolio: {
      url: 'https://andresparra.dev',
      projects: [
        {
          name: 'E-commerce Tienda Regional',
          description: 'Sitio e-commerce con WordPress y WooCommerce para cadena de retail',
          impact: 'Conversión del 4.2%, +200 transacciones mensuales'
        },
        {
          name: 'Landing Pages Alta Conversión',
          description: 'Portfolio de +30 landing pages para campañas digitales',
          impact: 'Tasa promedio de conversión del 8.5%'
        },
        {
          name: 'Sitios Corporativos',
          description: 'Diseño y desarrollo de sitios web para empresas B2B',
          impact: 'Portfolio de 15+ clientes corporativos activos'
        }
      ]
    },
    scores: {
      cvScore: 76,
      psychometricScore: 72,
      serenaScore: 70,
      technicalScore: 68,
      productManagerScore: 65,
      hiringManagerScore: 71
    },
    notes: [
      'Perfil con experiencia en web development pero limitada en producto digital',
      'Background técnico interesante - ingeniería de sistemas',
      'Portfolio enfocado en agencias y sitios corporativos tradicionales',
      'Poca experiencia en metodologías UX research y design thinking',
      'No tiene experiencia en startups tech ni productos SaaS',
      'Durante verificación de antecedentes se encontraron inconsistencias',
      'ALERTA: Empresa "TechSolutions SAS" no confirmó fechas de trabajo declaradas'
    ],
    rejectionReason: 'Inconsistencias encontradas en verificación de referencias laborales. La empresa TechSolutions SAS no pudo confirmar las fechas de empleo declaradas (Ene 2016 - Feb 2018). El contacto de RRHH indicó que el candidato trabajó desde Junio 2016 hasta Octubre 2017, con una diferencia de 8 meses respecto a lo declarado en CV. Esta discrepancia genera dudas sobre la veracidad de la información proporcionada.'
  },

  // ====== ETAPA 7: ENTREVISTA HIRING MANAGER (1 ACTIVO) ======
  {
    id: 'cand-004',
    name: 'Carolina Mendoza Ríos',
    email: 'carolina.mendoza@email.com',
    phone: '+57 321 654 9870',
    age: 29,
    location: 'Medellín, Colombia',
    avatar: 'CM',
    currentStage: 'entrevista-hiring',
    status: 'active',
    appliedDate: '2026-02-15',
    expectedSalary: '$8.500.000 - $10.000.000 COP',
    availability: '2 semanas',
    yearsExperience: 6,
    
    // Información personal adicional
    firstName: 'Carolina',
    lastName: 'Mendoza Ríos',
    identificationNumber: '1037654321',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/carolinamendoza',
    birthDate: '12/09/1997',
    
    // Ubicación detallada
    city: 'Medellín',
    country: 'Colombia',
    willingToRelocate: false,
    interestedLocations: ['Remote (Global)', 'Medellín'],
    
    // Información laboral adicional
    noticePeriod: '2',
    noticePeriodUnit: 'Semanas',
    currency: 'Peso colombiano (COP)',
    
    // Perfil profesional
    description: 'Product Designer con 6 años de experiencia diseñando productos fintech de alto impacto para usuarios globales. Actualmente trabajo en Stripe diseñando experiencias de pago que son utilizadas por miles de merchants alrededor del mundo. Mi enfoque combina investigación de usuarios profunda, pensamiento estratégico de producto y excelencia en ejecución visual. He trabajado 100% remoto con equipos distribuidos en múltiples zonas horarias, desarrollando habilidades excepcionales de comunicación asíncrona y autonomía. Especializada en design systems escalables, optimización de conversión mediante A/B testing y diseño centrado en datos. Apasionada por crear experiencias simples para problemas complejos, especialmente en el ecosistema de pagos digitales y fintech.',
    matchScore: 91,
    confidence: 'high',
    
    experience: [
      {
        id: 'exp-carolina-001',
        company: 'Stripe (Remote)',
        position: 'Product Designer',
        duration: 'Mar 2022 - Presente',
        description: 'Diseño de experiencias de pago para merchants globales en el equipo de Payment Products. Trabajo 100% remoto con equipos distribuidos en San Francisco, Dublín y Singapur. Responsable del diseño end-to-end de features desde research hasta lanzamiento.',
        location: 'Remote (USA)',
        startDate: 'Marzo 2022',
        endDate: null,
        current: true,
        achievements: [
          'Diseñé Payment Links feature adoptado por +50K merchants con $120M en volumen procesado',
          'Lideré rediseño del dashboard de pagos incrementando NPS de 67 a 81',
          'Implementé sistema de A/B testing que optimizó conversión en checkout en 12%',
          'Creé componentes de design system utilizados por 8 equipos de producto',
          'Facilitación de user research con +100 merchants en 15 países diferentes',
          'Colaboración directa con Engineering, PM y Data Science en ambiente altamente técnico'
        ]
      },
      {
        id: 'exp-carolina-002',
        company: 'Bold',
        position: 'UX Designer',
        duration: 'Ago 2019 - Feb 2022',
        description: 'Diseño de productos fintech para comercios colombianos (POS, pagos digitales, analytics). Research y testing con usuarios reales en terreno. Primera experiencia en startup tech de rápido crecimiento.',
        location: 'Medellín, Colombia',
        startDate: 'Agosto 2019',
        endDate: 'Febrero 2022',
        current: false,
        achievements: [
          'Diseñé Bold POS System alcanzando NPS de 82 entre +3K comercios',
          'Lideré research cualitativo con 80+ comercios para identificar pain points',
          'Creé flujos de onboarding reduciendo tiempo de activación de 45min a 12min',
          'Implementé design system que estandarizó experiencia en 4 productos',
          'Colaboré en estrategia de producto participando en definición de roadmap',
          'Diseñé analytics dashboard aumentando engagement de merchants en 35%'
        ]
      },
      {
        id: 'exp-carolina-003',
        company: 'Platzi',
        position: 'UX/UI Designer',
        duration: 'Ene 2018 - Jul 2019',
        description: 'Diseño de experiencias educativas para plataforma de educación online con +3M estudiantes. Optimización de flujos de aprendizaje y gamificación. Trabajo en equipo ágil con sprints de 2 semanas.',
        location: 'Remoto',
        startDate: 'Enero 2018',
        endDate: 'Julio 2019',
        current: false,
        achievements: [
          'Diseñé sistema de logros y badges incrementando completion rate en 18%',
          'Rediseñé player de video mejorando tiempo de engagement de 12min a 19min',
          'Creé 120+ pantallas para nuevas features de la plataforma educativa',
          'Implementé mejoras de usabilidad basadas en heatmaps y session recordings',
          'Colaboré en investigación con +50 estudiantes para validar hipótesis de diseño'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad EAFIT',
        degree: 'Diseño de Interacción',
        year: '2018',
        description: 'Pregrado en Diseño de Interacción con énfasis en experiencia de usuario y diseño de servicios digitales. Proyecto de grado sobre diseño de aplicaciones fintech para población no bancarizada.'
      },
      {
        institution: 'Interaction Design Foundation',
        degree: 'User Research - Methods and Best Practices',
        year: '2020',
        description: 'Certificación en métodos avanzados de investigación de usuarios, incluyendo entrevistas, testing de usabilidad y análisis de datos cualitativos.'
      },
      {
        institution: 'Reforge',
        degree: 'Product Strategy',
        year: '2023',
        description: 'Programa intensivo de estrategia de producto enfocado en growth, métricas de producto y toma de decisiones basada en datos.'
      }
    ],
    skills: {
      technical: ['Figma (Expert)', 'Design Systems', 'Advanced Prototyping', 'User Research', 'A/B Testing', 'Analytics (Mixpanel, Amplitude)', 'SQL (Basic)', 'HTML/CSS (Basic)', 'Maze', 'UserTesting', 'Hotjar', 'Optimal Workshop', 'Design Tokens', 'Component Libraries'],
      soft: ['Trabajo remoto', 'Comunicación asíncrona', 'Autonomía', 'Colaboración global', 'Stakeholder management', 'Presentaciones de producto', 'Pensamiento estratégico', 'Data-driven decision making', 'Inglés fluido (C1)', 'Facilitación de workshops']
    },
    portfolio: {
      url: 'https://carolinamendoza.co',
      projects: [
        {
          name: 'Stripe Payment Links',
          description: 'Feature de links de pago simplificados que permite a merchants crear y compartir links de pago sin integración técnica. Diseño end-to-end desde research hasta launch.',
          impact: 'Adoptado por +50K merchants, $120M en volumen de pagos procesados, NPS de 85'
        },
        {
          name: 'Stripe Dashboard Redesign',
          description: 'Rediseño completo del dashboard principal de pagos enfocado en claridad de información y acción rápida para merchants',
          impact: 'Incremento del NPS de 67 a 81, reducción de 40% en tickets de soporte relacionados con navegación'
        },
        {
          name: 'Bold POS System',
          description: 'Sistema de punto de venta físico y digital para comercios colombianos con gestión de inventario, reportes y analíticas en tiempo real',
          impact: 'NPS de 82 entre +3K usuarios activos, reducción de 73% en tiempo de onboarding'
        },
        {
          name: 'Bold Analytics Dashboard',
          description: 'Dashboard de analíticas financieras para merchants con visualización de ventas, transacciones y tendencias',
          impact: 'Incremento del 35% en engagement de merchants, feature más valorada según encuestas'
        }
      ]
    },
    scores: {
      cvScore: 91,
      psychometricScore: 87,
      serenaScore: 89,
      technicalScore: 92,
      productManagerScore: 88
    },
    notes: [
      'Experiencia en Stripe muy valorada - producto de clase mundial',
      'Excelente manejo de trabajo remoto y comunicación asíncrona',
      'Portfolio con proyectos de impacto global medible y cuantificable',
      'Fit cultural excepcional: autónoma, colaborativa, data-driven',
      'Background fintech muy relevante para productos de UBITS',
      'Certificaciones de Reforge e IDF demuestran inversión en aprendizaje continuo',
      'Inglés fluido - apta para colaboración internacional',
      'Expectativa salarial competitiva y alineada con experiencia',
      'En proceso de entrevista con Hiring Manager'
    ]
  },

  // ====== ETAPA 6: ENTREVISTA PRODUCT MANAGER (1 ACTIVO, 1 RECHAZADO) ======
  {
    id: 'cand-005',
    name: 'Carlos Rodríguez Méndez',
    email: 'carlos.rodriguez@email.com',
    phone: '+57 310 234 5678',
    age: 32,
    location: 'Medellín, Colombia',
    avatar: 'CR',
    currentStage: 'entrevista-pm',
    status: 'active',
    appliedDate: '2026-02-16',
    expectedSalary: '$9.000.000 - $11.000.000 COP',
    availability: '2 semanas',
    yearsExperience: 7,
    
    // Información personal adicional
    firstName: 'Carlos',
    lastName: 'Rodríguez Méndez',
    identificationNumber: '1045678901',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiano',
    linkedin: 'https://www.linkedin.com/in/carlosrodriguez',
    birthDate: '18/04/1994',
    
    // Ubicación detallada
    city: 'Medellín',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Remote', 'Medellín'],
    
    // Información laboral adicional
    noticePeriod: '2',
    noticePeriodUnit: 'Semanas',
    currency: 'Peso colombiano (COP)',
    
    // Perfil profesional
    description: 'Lead UX/UI Designer con 7 años de experiencia liderando equipos de diseño en transformación digital de productos financieros. Actualmente lidero un equipo de 5 diseñadores en Bancolombia, uno de los bancos más grandes de Latinoamérica, donde soy responsable de la estrategia de diseño de productos móviles y web utilizados por millones de usuarios. Mi enfoque combina liderazgo de equipos, pensamiento estratégico y ejecución táctica, siempre centrado en crear experiencias que generen impacto medible en métricas de negocio y satisfacción de usuarios. He trabajado en consultoría con Globant diseñando para clientes Fortune 500 en retail y fintech, lo que me ha dado una perspectiva amplia de diferentes industrias y modelos de negocio. Especializado en design systems escalables, investigación de usuarios, y gestión de stakeholders de alto nivel. Apasionado por la mentoría, he desarrollado programas de crecimiento para diseñadores junior y facilitado workshops de Design Sprint con equipos ejecutivos.',
    matchScore: 88,
    confidence: 'high',
    
    experience: [
      {
        id: 'exp-carlos-001',
        company: 'Bancolombia',
        position: 'Lead UX/UI Designer',
        duration: 'Jun 2020 - Presente',
        description: 'Lidero equipo de 5 diseñadores en la transformación digital de productos bancarios. Responsable de la estrategia de diseño end-to-end en aplicaciones móviles y web con +15M usuarios activos. Gestión directa con stakeholders C-level y Product Managers para definir roadmap de diseño alineado con objetivos de negocio.',
        location: 'Medellín, Colombia',
        startDate: 'Junio 2020',
        endDate: null,
        current: true,
        achievements: [
          'Lideré rediseño completo de app móvil incrementando NPS de 45 a 72 en 6 meses',
          'Creé BcoDS (Bancolombia Design System) adoptado por 15+ equipos de producto',
          'Reduje tiempo de diseño a producción en 45% mediante componentes reutilizables',
          'Implementé programa de mentoría que desarrolló 3 diseñadores mid a senior level',
          'Facilité +25 workshops de Design Sprint con stakeholders ejecutivos',
          'Lideré iniciativas de accesibilidad digital alcanzando WCAG 2.1 AA compliance',
          'Gestión de presupuesto de diseño de $150M COP anuales'
        ]
      },
      {
        id: 'exp-carlos-002',
        company: 'Globant',
        position: 'Senior UX Designer',
        duration: 'Ene 2018 - May 2020',
        description: 'Diseño de experiencias para clientes internacionales Fortune 500 en retail, fintech y telecomunicaciones. Facilitador de workshops de Design Sprint y Design Thinking. Trabajo en equipos ágiles distribuidos con delivery managers y desarrolladores en Argentina, USA y Colombia.',
        location: 'Medellín, Colombia',
        startDate: 'Enero 2018',
        endDate: 'Mayo 2020',
        current: false,
        achievements: [
          'Diseñé experiencia de e-commerce para retailer USA con +$5M en ventas mensuales',
          'Facilité 15+ Design Sprints con clientes en USA, México y Colombia',
          'Creé design system para cliente fintech adoptado por 8 productos digitales',
          'Lideré user research con +100 usuarios en 3 países diferentes',
          'Colaboré con equipos en 4 países simultáneamente en proyectos de alto impacto',
          'Recibí reconocimiento "Outstanding Performer" 2 años consecutivos'
        ]
      },
      {
        id: 'exp-carlos-003',
        company: 'Intergrupo',
        position: 'UX Designer',
        duration: 'Mar 2016 - Dic 2017',
        description: 'Diseño de productos digitales para conglomerado financiero colombiano (seguros, créditos, inversiones). Colaboración con equipos de marketing, desarrollo y producto. Responsable de investigación de usuarios y wireframing de nuevas features.',
        location: 'Medellín, Colombia',
        startDate: 'Marzo 2016',
        endDate: 'Diciembre 2017',
        current: false,
        achievements: [
          'Diseñé plataforma de cotización de seguros reduciendo abandono en 40%',
          'Implementé programa de user testing con +80 usuarios mensuales',
          'Creé librerías de componentes UI que aceleraron desarrollo en 30%',
          'Rediseñé flujo de solicitud de crédito incrementando conversión en 22%',
          'Colaboré en lanzamiento de 3 productos digitales nuevos al mercado'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad EAFIT',
        degree: 'Diseño de Interacción',
        year: '2017',
        description: 'Pregrado en Diseño de Interacción con distinción honorífica. Énfasis en diseño de servicios digitales y experiencia de usuario. Proyecto de grado sobre transformación digital en el sector financiero colombiano.'
      },
      {
        institution: 'Interaction Design Foundation',
        degree: 'UX Management Certificate',
        year: '2021',
        description: 'Certificación profesional en gestión de equipos de UX, incluyendo estrategia de diseño, operaciones, métricas y liderazgo de equipos creativos.'
      },
      {
        institution: 'Google',
        degree: 'Design Sprint Facilitator',
        year: '2019',
        description: 'Certificación oficial de Google Ventures en facilitación de Design Sprints. Metodología intensiva de 5 días para resolver problemas críticos de negocio mediante diseño.'
      }
    ],
    skills: {
      technical: ['Figma (Expert)', 'Design Systems', 'User Research', 'Data Analytics', 'A/B Testing', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Ops', 'Accessibility (WCAG)', 'Sketch', 'Adobe XD', 'Miro', 'FigJam', 'Hotjar', 'Google Analytics', 'SQL (Basic)'],
      soft: ['Liderazgo de equipos', 'Stakeholder management', 'Presentaciones ejecutivas', 'Mentoría', 'Facilitación de workshops', 'Pensamiento estratégico', 'Gestión de presupuesto', 'Comunicación ejecutiva', 'Design Sprints', 'Negociación', 'Gestión de proyectos']
    },
    portfolio: {
      url: 'https://carlosrodriguez.co',
      projects: [
        {
          name: 'Bancolombia App Redesign',
          description: 'Rediseño completo de la aplicación móvil principal del banco con +15M usuarios activos. Proyecto de 8 meses liderando equipo multidisciplinario de 12 personas.',
          impact: 'NPS incrementó de 45 a 72 en 6 meses, reducción del 35% en llamadas a call center, incremento del 28% en usuarios activos mensuales'
        },
        {
          name: 'BcoDS - Bancolombia Design System',
          description: 'Sistema de diseño escalable para todos los productos digitales del banco. Documentación completa de componentes, tokens y guías de uso.',
          impact: 'Adoptado por 15+ equipos de producto, reducción del 45% en tiempo de diseño a producción, estandarización visual en 20+ aplicaciones'
        },
        {
          name: 'E-commerce Retail USA - Globant',
          description: 'Experiencia completa de e-commerce para retailer estadounidense con catálogo de +50K productos',
          impact: 'Generación de +$5M en ventas mensuales, conversion rate del 3.2%, rating de 4.6/5 en satisfacción'
        },
        {
          name: 'Seguros Digital - Intergrupo',
          description: 'Plataforma de cotización y compra de seguros online con comparador inteligente',
          impact: 'Reducción del 40% en abandono, incremento del 22% en conversión, 15K pólizas vendidas en primer año'
        }
      ]
    },
    scores: {
      cvScore: 88,
      psychometricScore: 85,
      serenaScore: 86,
      technicalScore: 89,
      productManagerScore: 87
    },
    notes: [
      'Sólida experiencia en fintech y banca - sector altamente relevante',
      'Liderazgo de equipos comprobado - gestiona 5 diseñadores actualmente',
      'Certificaciones adicionales en UX Management y Design Sprint',
      'Portfolio con proyectos de alto impacto medible en métricas de negocio',
      'Excelente fit para roles de liderazgo y mentoría',
      'Experiencia con stakeholders C-level y presentaciones ejecutivas',
      'Design system de gran escala - BcoDS usado por 15+ equipos',
      'Expectativa salarial en rango superior pero justificada por experiencia',
      'En proceso de entrevista con Product Manager'
    ]
  },
  {
    id: 'cand-006',
    name: 'Sebastián Jiménez Gómez',
    email: 'sebastian.jimenez@email.com',
    phone: '+57 301 890 1234',
    age: 25,
    location: 'Barranquilla, Colombia',
    avatar: 'SJ',
    currentStage: 'entrevista-pm',
    status: 'rejected',
    appliedDate: '2026-02-17',
    expectedSalary: '$6.500.000 - $8.000.000 COP',
    availability: 'Inmediata',
    yearsExperience: 3,
    experience: [
      {
        company: 'Audiomack',
        position: 'Product Designer',
        duration: 'Oct 2022 - Presente',
        description: 'Diseño de features para plataforma de música streaming. Optimización de player y discovery. Colaboración remota con equipo en USA.'
      },
      {
        company: 'Zemoga',
        position: 'Junior UX Designer',
        duration: 'Ene 2021 - Sep 2022',
        description: 'Diseño para clientes internacionales en media y entertainment. Aprendizaje rápido en ambiente ágil.'
      }
    ],
    education: [
      {
        institution: 'Universidad del Norte',
        degree: 'Diseño Gráfico',
        year: '2020'
      }
    ],
    skills: {
      technical: ['Figma', 'Prototyping', 'Visual Design', 'Motion Design', 'Illustration', 'Branding'],
      soft: ['Creatividad', 'Trabajo remoto', 'Inglés fluido', 'Autogestión', 'Curiosidad']
    },
    portfolio: {
      url: 'https://sebastianjimenez.co',
      projects: [
        {
          name: 'Audiomack Player Redesign',
          description: 'Rediseño del reproductor de música con nuevas features',
          impact: 'Engagement +28%'
        }
      ]
    },
    scores: {
      cvScore: 78,
      psychometricScore: 74,
      serenaScore: 76,
      technicalScore: 80,
      productManagerScore: 65
    },
    notes: [],
    rejectionReason: 'En entrevista con PM mostró poca profundidad en procesos de research y toma de decisiones basadas en datos.'
  },

  // ====== ETAPA 5: TEST PSICOMÉTRICO (1 ACTIVO, 1 RECHAZADO) ======
  {
    id: 'cand-007',
    name: 'Camila Andrea Martínez',
    email: 'camila.martinez@email.com',
    phone: '+57 320 345 6789',
    age: 26,
    location: 'Bogotá, Colombia',
    avatar: 'CAM',
    currentStage: 'evaluacion-psicometrica',
    status: 'active',
    appliedDate: '2026-02-18',
    expectedSalary: '$7.500.000 - $9.000.000 COP',
    availability: 'Inmediata',
    yearsExperience: 4,
    
    // Información personal adicional
    firstName: 'Camila Andrea',
    lastName: 'Martínez López',
    identificationNumber: '1024567890',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://linkedin.com/in/camila-martinez-designer',
    birthDate: '1999-05-14',
    
    // Ubicación detallada
    city: 'Bogotá',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Remoto'],
    
    // Información laboral adicional
    noticePeriod: '2',
    noticePeriodUnit: 'semanas',
    currency: 'COP',
    
    // Perfil profesional
    description: 'Product Designer con 4 años de experiencia especializada en diseño de experiencias mobile-first para e-commerce y marketplaces. Expertise en accesibilidad, design systems y colaboración con equipos de producto. Apasionada por crear experiencias inclusivas que generen impacto medible en conversión y retención.',
    matchScore: 85,
    confidence: 'high',
    
    experience: [
      {
        id: 'exp-camila-001',
        company: 'Mercado Libre Colombia',
        position: 'Product Designer',
        duration: 'Ago 2022 - Presente',
        description: 'Diseño de experiencias para el marketplace líder de Latinoamérica. Responsable del rediseño del flujo de checkout mobile y optimización de la experiencia de búsqueda y navegación.',
        location: 'Bogotá, Colombia (Remoto)',
        startDate: '2022-08',
        endDate: null,
        current: true,
        achievements: [
          'Lideré el rediseño del checkout mobile que aumentó la conversión en 18% y redujo el abandono de carrito en 22%',
          'Implementé mejoras de accesibilidad (WCAG 2.1 AA) que ampliaron la base de usuarios en segmentos vulnerables (+15%)',
          'Creé y documenté 45+ componentes del design system que redujeron tiempo de diseño en 40%',
          'Facilitó 12 sesiones de design critique con PM, developers y stakeholders, mejorando la colaboración cross-funcional',
          'Diseñé features de navegación personalizadas basadas en ML que incrementaron engagement en 28%'
        ]
      },
      {
        id: 'exp-camila-002',
        company: 'Koombea',
        position: 'UX/UI Designer',
        duration: 'Feb 2020 - Jul 2022',
        description: 'Diseño de productos digitales para clientes de USA y Latinoamérica. Especialización en aplicaciones móviles nativas para iOS y Android con enfoque en usabilidad y engagement.',
        location: 'Barranquilla, Colombia (Remoto)',
        startDate: '2020-02',
        endDate: '2022-07',
        current: false,
        achievements: [
          'Diseñé 8 apps móviles completas (iOS/Android) para clientes en healthtech, fintech y fitness',
          'Implementé estrategia de gamification en fitness app que logró 65% de retención a 30 días',
          'Conduje 25+ sesiones de user research y testing que validaron hipótesis de producto',
          'Colaboré con developers en implementación pixel-perfect usando Figma Auto Layout y Variants',
          'Mentoré a 2 diseñadores junior en mejores prácticas de UX research y visual design'
        ]
      },
      {
        id: 'exp-camila-003',
        company: 'Agencia Creativa Digital',
        position: 'Diseñadora Gráfica Jr.',
        duration: 'Ene 2019 - Ene 2020',
        description: 'Diseño de piezas gráficas y experiencias digitales para pequeñas y medianas empresas. Primera experiencia profesional enfocada en branding y diseño web.',
        location: 'Bogotá, Colombia',
        startDate: '2019-01',
        endDate: '2020-01',
        current: false,
        achievements: [
          'Diseñé identidades visuales completas para 15 clientes (logo, branding, web)',
          'Creé 20+ landing pages optimizadas para conversión con tasas superiores al 8%',
          'Aprendí fundamentos de UX research mediante proyectos reales con usuarios finales'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad Jorge Tadeo Lozano',
        degree: 'Diseño Gráfico',
        year: '2015 - 2019',
        description: 'Énfasis en diseño digital e interactivo. Proyecto de grado: "Diseño de experiencias accesibles para adultos mayores en apps de e-commerce".'
      },
      {
        institution: 'Platzi',
        degree: 'Especialización en UX/UI Design',
        year: '2020',
        description: 'Rutas de UX Research, Prototipado Avanzado, Design Systems y Accesibilidad Web.'
      },
      {
        institution: 'Interaction Design Foundation',
        degree: 'Certificación en Mobile UX Design',
        year: '2021',
        description: 'Certificación internacional enfocada en mejores prácticas de diseño para experiencias móviles.'
      }
    ],
    skills: {
      technical: [
        'Figma Advanced',
        'Adobe XD',
        'Prototyping',
        'Mobile-First Design',
        'Accessibility (WCAG 2.1)',
        'Design Systems',
        'Design Tokens',
        'Auto Layout',
        'Component Variants',
        'Micro-interactions',
        'Animation',
        'User Research',
        'Usability Testing',
        'A/B Testing',
        'Maze',
        'Lookback',
        'FigJam',
        'Miro',
        'HTML/CSS Básico',
        'Notion'
      ],
      soft: [
        'Colaboración cross-funcional',
        'Empatía con usuarios',
        'Problem solving',
        'Pensamiento crítico',
        'Comunicación visual',
        'Storytelling',
        'Resiliencia',
        'Curiosidad',
        'Atención al detalle',
        'Gestión del tiempo'
      ]
    },
    portfolio: {
      url: 'https://camilamartinez.design',
      projects: [
        {
          name: 'MercadoLibre Checkout Redesign',
          description: 'Rediseño completo del flujo de checkout mobile aplicando principios de simplificación, reducción de fricción y optimización de conversión.',
          impact: 'Conversión aumentó 18%, abandono de carrito redujo 22%, tiempo de compra redujo 35%'
        },
        {
          name: 'Accessibility Improvements - MercadoLibre',
          description: 'Implementación de mejoras de accesibilidad WCAG 2.1 AA en navegación, búsqueda y checkout. Incluye contraste, navegación por teclado, screen readers y tamaños táctiles.',
          impact: '+15% usuarios en segmentos vulnerables, 4.8★ rating de accesibilidad en tiendas'
        },
        {
          name: 'Fitness App con Gamification - Koombea',
          description: 'App de entrenamiento personalizado para cliente USA. Diseño de sistema de logros, badges, challenges y leaderboards que incentivan engagement.',
          impact: '65% retención a 30 días, 3.2 sesiones/semana promedio, 4.6★ en App Store'
        },
        {
          name: 'Design System - MercadoLibre',
          description: 'Contribución al design system corporativo. Creación y documentación de 45+ componentes mobile reutilizables con variantes, estados y especificaciones técnicas.',
          impact: 'Tiempo de diseño reducido 40%, consistencia visual 95%, adopción por 8 equipos'
        }
      ]
    },
    scores: {
      cvScore: 85,
      psychometricScore: 82,
      serenaScore: 84,
      technicalScore: 86
    },
    notes: [
      'Excelente portafolio con casos de estudio bien documentados y métricas de impacto claras',
      'Expertise sólida en mobile-first design y accesibilidad, habilidades muy demandadas',
      'Experiencia relevante en e-commerce con Mercado Libre, perfecta para nuestro contexto',
      'Resultados medibles: +18% conversión, +65% retención, mejoras cuantificables en UX',
      'Fuerte colaboración cross-funcional con PM y developers, fit cultural prometedor',
      'Design systems: creó 45+ componentes, redujo tiempo de diseño 40%',
      'User research: 25+ sesiones de testing, validación de hipótesis',
      'Mentoría: capacitó a 2 diseñadores junior, habilidades de liderazgo emergentes',
      'Pasión por accesibilidad e inclusión, valores alineados con nuestra visión',
      'Perfil mid-level con potencial senior, crecimiento acelerado en MercadoLibre'
    ]
  },
  {
    id: 'cand-008',
    name: 'Natalia Rincón Castro',
    email: 'natalia.rincon@email.com',
    phone: '+57 317 567 8901',
    age: 27,
    location: 'Armenia, Colombia',
    avatar: 'NR',
    currentStage: 'test-psicometrico',
    status: 'rejected',
    appliedDate: '2026-02-19',
    expectedSalary: '$6.000.000 - $7.500.000 COP',
    availability: 'Inmediata',
    yearsExperience: 3,
    experience: [
      {
        company: 'E-commerce Local',
        position: 'Diseñadora de Contenidos',
        duration: 'Ago 2021 - Presente',
        description: 'Creación de contenidos visuales para redes sociales y e-commerce.'
      }
    ],
    education: [
      {
        institution: 'Universidad del Quindío',
        degree: 'Comunicación y Diseño',
        year: '2020'
      }
    ],
    skills: {
      technical: ['Canva', 'Photoshop', 'Illustrator', 'Redes Sociales'],
      soft: ['Creatividad', 'Organización']
    },
    portfolio: {
      url: 'https://instagram.com/nataliadesigns',
      projects: []
    },
    scores: {
      cvScore: 62,
      psychometricScore: 45,
      serenaScore: 58,
      technicalScore: 52
    },
    notes: [],
    rejectionReason: 'Test psicométrico reveló bajo score en pensamiento analítico y resolución de problemas complejos.'
  },

  // ====== ETAPA 4: PARA REVISIÓN (1 ACTIVO, 2 RECHAZADOS) ======
  {
    id: 'cand-009',
    name: 'Diego Alejandro Torres',
    email: 'diego.torres@email.com',
    phone: '+57 315 456 7890',
    age: 30,
    location: 'Cali, Colombia',
    avatar: 'DT',
    currentStage: 'para-revision',
    status: 'active',
    appliedDate: '2026-02-19',
    expectedSalary: '$8.500.000 - $10.500.000 COP',
    availability: '1 mes',
    yearsExperience: 6,
    experience: [
      {
        company: 'Nubank Colombia',
        position: 'Product Designer',
        duration: 'Mar 2021 - Presente',
        description: 'Diseño de experiencias fintech centradas en el usuario. Trabajo en features de ahorro, inversión y crédito. Research cualitativo y cuantitativo.'
      },
      {
        company: 'PSL - Pragma',
        position: 'UX Designer',
        duration: 'Ene 2019 - Feb 2021',
        description: 'Diseño de soluciones empresariales para sector bancario y retail. Facilitación de workshops y metodologías ágiles.'
      }
    ],
    education: [
      {
        institution: 'Universidad del Valle',
        degree: 'Diseño Visual',
        year: '2018'
      }
    ],
    skills: {
      technical: ['Figma', 'User Testing', 'Journey Mapping', 'Wireframing', 'Design Systems', 'Maze'],
      soft: ['Facilitación', 'Pensamiento estratégico', 'Colaboración cross-funcional', 'Orientación al usuario']
    },
    portfolio: {
      url: 'https://diegotorres.design',
      projects: [
        {
          name: 'Nubank Savings Feature',
          description: 'Feature de ahorro automático con insights personalizados',
          impact: 'Adoptado por 200K+ usuarios en 3 meses'
        },
        {
          name: 'Banking Dashboard - PSL',
          description: 'Dashboard administrativo para gestión bancaria',
          impact: 'Reducción del 50% en tiempo de tareas operativas'
        }
      ]
    },
    scores: {
      cvScore: 86,
      psychometricScore: 83,
      serenaScore: 85
    },
    notes: [
      'Experiencia en fintech muy relevante',
      'Buen balance entre research y ejecución',
      'Casos de estudio con métricas claras'
    ]
  },
  {
    id: 'cand-010',
    name: 'Camila Suárez Ortiz',
    email: 'camila.suarez@email.com',
    phone: '+57 316 123 4567',
    age: 22,
    location: 'Manizales, Colombia',
    avatar: 'CS',
    currentStage: 'para-revision',
    status: 'rejected',
    appliedDate: '2026-02-20',
    expectedSalary: '$4.500.000 - $6.000.000 COP',
    availability: 'Inmediata',
    yearsExperience: 1,
    experience: [
      {
        company: 'Pasantía Universitaria',
        position: 'Diseñadora Junior',
        duration: 'Jun 2023 - Dic 2023',
        description: 'Apoyo en diseño de material gráfico y redes sociales.'
      }
    ],
    education: [
      {
        institution: 'Universidad de Caldas',
        degree: 'Diseño Visual (En curso)',
        year: '2024'
      }
    ],
    skills: {
      technical: ['Figma (básico)', 'Illustrator', 'Photoshop'],
      soft: ['Ganas de aprender', 'Entusiasmo']
    },
    portfolio: {
      url: 'https://behance.net/camilasuarez',
      projects: []
    },
    scores: {
      cvScore: 48,
      psychometricScore: 52,
      serenaScore: 45
    },
    notes: [],
    rejectionReason: 'Perfil muy junior. Aún está estudiando y no tiene experiencia profesional relevante en producto digital.'
  },
  {
    id: 'cand-011',
    name: 'Felipe Vargas Ruiz',
    email: 'felipe.vargas@email.com',
    phone: '+57 311 012 3456',
    age: 35,
    location: 'Bucaramanga, Colombia',
    avatar: 'FV',
    currentStage: 'para-revision',
    status: 'rejected',
    appliedDate: '2026-02-21',
    expectedSalary: '$12.000.000 - $15.000.000 COP',
    availability: '2 meses',
    yearsExperience: 10,
    experience: [
      {
        company: 'Freelance',
        position: 'Diseñador Web',
        duration: '2016 - Presente',
        description: 'Desarrollo de sitios web y landing pages para diversos clientes.'
      }
    ],
    education: [
      {
        institution: 'SENA',
        degree: 'Técnico en Diseño Web',
        year: '2015'
      }
    ],
    skills: {
      technical: ['HTML', 'CSS', 'WordPress', 'Photoshop'],
      soft: ['Independencia', 'Autogestión']
    },
    portfolio: {
      url: 'https://felipevargas.com',
      projects: []
    },
    scores: {
      cvScore: 38,
      psychometricScore: 42,
      serenaScore: 35
    },
    notes: [],
    rejectionReason: 'Perfil enfocado en desarrollo web básico. No tiene experiencia en diseño de producto ni metodologías UX. Expectativa salarial fuera de rango.'
  },

  // ====== ETAPA 3: SERENA AI (2 ACTIVOS, 1 RECHAZADO) ======
  {
    id: 'cand-012',
    name: 'Patricia Daniela Ramírez',
    email: 'patricia.ramirez@email.com',
    phone: '+57 305 567 8901',
    age: 27,
    location: 'Bogotá, Colombia',
    avatar: 'PR',
    currentStage: 'serena-ai',
    status: 'active',
    appliedDate: '2026-02-21',
    expectedSalary: '$7.000.000 - $8.500.000 COP',
    availability: 'Inmediata',
    yearsExperience: 4,
    experience: [
      {
        company: 'Alegra',
        position: 'Product Designer',
        duration: 'May 2022 - Presente',
        description: 'Diseño de productos SaaS para pymes. Enfoque en simplificación de procesos contables y facturación. User research continuo.'
      },
      {
        company: 'Lemontech',
        position: 'UX/UI Designer',
        duration: 'Sep 2020 - Abr 2022',
        description: 'Diseño de herramientas legales digitales. Trabajo con usuarios B2B. Prototipado y testing de soluciones.'
      }
    ],
    education: [
      {
        institution: 'Universidad Nacional de Colombia',
        degree: 'Diseño Industrial',
        year: '2020'
      }
    ],
    skills: {
      technical: ['Figma', 'FigJam', 'Prototyping', 'User Interviews', 'Usability Testing', 'Information Architecture'],
      soft: ['Empatía', 'Comunicación clara', 'Trabajo remoto', 'Autonomía', 'Aprendizaje continuo']
    },
    portfolio: {
      url: 'https://patriciaramirez.com',
      projects: [
        {
          name: 'Alegra Invoicing Flow',
          description: 'Simplificación del flujo de facturación para pymes',
          impact: 'Tiempo de facturación reducido en 60%'
        },
        {
          name: 'Legal Management Tool',
          description: 'Herramienta de gestión de casos legales',
          impact: 'Satisfacción de usuarios del 4.5/5'
        }
      ]
    },
    scores: {
      cvScore: 82,
      psychometricScore: 80,
      serenaScore: 81
    },
    notes: [
      'Experiencia en productos B2B/SaaS',
      'Buen enfoque en simplificación de complejidad',
      'Portfolio con casos de uso reales'
    ]
  },
  {
    id: 'cand-013',
    name: 'Juliana Ortiz Mendoza',
    email: 'juliana.ortiz@email.com',
    phone: '+57 322 987 6543',
    age: 28,
    location: 'Cali, Colombia',
    avatar: 'JO',
    currentStage: 'serena-ai',
    status: 'active',
    appliedDate: '2026-02-22',
    expectedSalary: '$8.000.000 - $9.500.000 COP',
    availability: '3 semanas',
    yearsExperience: 5,
    experience: [
      {
        company: 'TuCarro (OLX Autos)',
        position: 'Product Designer',
        duration: 'Feb 2021 - Presente',
        description: 'Diseño de features para marketplace de autos. Optimización de búsqueda y flujos de compra/venta.'
      },
      {
        company: 'LatAm Startups',
        position: 'UX Designer',
        duration: 'May 2019 - Ene 2021',
        description: 'Diseño para múltiples productos digitales. Enfoque en mobile y conversión.'
      }
    ],
    education: [
      {
        institution: 'Universidad Icesi',
        degree: 'Diseño de Medios Interactivos',
        year: '2018'
      }
    ],
    skills: {
      technical: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Hotjar', 'Google Analytics'],
      soft: ['Data-driven', 'Colaboración', 'Orientación a resultados']
    },
    portfolio: {
      url: 'https://julianaortiz.design',
      projects: [
        {
          name: 'TuCarro Search Enhancement',
          description: 'Mejora en sistema de búsqueda y filtros',
          impact: 'Conversión de búsqueda a contacto +22%'
        }
      ]
    },
    scores: {
      cvScore: 83,
      psychometricScore: 79,
      serenaScore: 80
    },
    notes: [
      'Experiencia en marketplace relevante',
      'Enfoque en métricas y conversión',
      'Buen portafolio con resultados medibles'
    ]
  },
  {
    id: 'cand-014',
    name: 'Juan Camilo Vásquez',
    email: 'juancamilo.vasquez@email.com',
    phone: '+57 312 678 9012',
    age: 29,
    location: 'Medellín, Colombia',
    avatar: 'JV',
    currentStage: 'serena-ai',
    status: 'rejected',
    appliedDate: '2026-02-22',
    expectedSalary: '$8.000.000 - $9.500.000 COP',
    availability: '3 semanas',
    yearsExperience: 5,
    experience: [
      {
        company: 'Cornershop by Uber',
        position: 'Product Designer',
        duration: 'Jul 2021 - Presente',
        description: 'Diseño de experiencias para app de delivery y marketplace. Optimización de flujos de compra y navegación. A/B testing y data-driven design.'
      },
      {
        company: 'S4N',
        position: 'UX Designer',
        duration: 'Mar 2019 - Jun 2021',
        description: 'Consultoría de diseño para diversos clientes. Diseño de apps móviles y plataformas web. Workshops de co-creación.'
      }
    ],
    education: [
      {
        institution: 'Universidad Pontificia Bolivariana',
        degree: 'Comunicación Social - Énfasis Digital',
        year: '2018'
      }
    ],
    skills: {
      technical: ['Figma', 'Sketch', 'Data Visualization', 'A/B Testing', 'Mobile First', 'Responsive Design'],
      soft: ['Analítico', 'Orientado a resultados', 'Proactividad', 'Trabajo bajo presión']
    },
    portfolio: {
      url: 'https://juancamilovasquez.co',
      projects: [
        {
          name: 'Cornershop Search Optimization',
          description: 'Mejora del search y descubrimiento de productos',
          impact: 'Búsquedas exitosas +35%'
        }
      ]
    },
    scores: {
      cvScore: 84,
      psychometricScore: 81,
      serenaScore: 68
    },
    notes: [],
    rejectionReason: 'Score de Serena AI por debajo del umbral. Mostró debilidades en pensamiento sistémico y arquitectura de información.'
  },

  // ====== ETAPA 2: PSICOMÉTRICO (2 ACTIVOS, 2 RECHAZADOS) ======
  {
    id: 'cand-015',
    name: 'Daniela Castro Pinzón',
    email: 'daniela.castro@email.com',
    phone: '+57 324 111 2233',
    age: 25,
    location: 'Bogotá, Colombia',
    avatar: 'DC',
    currentStage: 'psicometrico',
    status: 'active',
    appliedDate: '2026-02-23',
    expectedSalary: '$7.000.000 - $8.500.000 COP',
    availability: 'Inmediata',
    yearsExperience: 3,
    experience: [
      {
        company: 'Nequi',
        position: 'UX/UI Designer',
        duration: 'Nov 2022 - Presente',
        description: 'Diseño de features para app de banca digital. Trabajo en equipo multifuncional ágil.'
      },
      {
        company: 'Rokk3r Labs',
        position: 'Junior Product Designer',
        duration: 'Mar 2021 - Oct 2022',
        description: 'Diseño para startups en etapa temprana. Validación rápida de hipótesis.'
      }
    ],
    education: [
      {
        institution: 'Universidad de los Andes',
        degree: 'Diseño',
        year: '2020'
      }
    ],
    skills: {
      technical: ['Figma', 'Prototyping', 'Design Thinking', 'Lean UX', 'Mobile Design'],
      soft: ['Adaptabilidad', 'Aprendizaje rápido', 'Colaboración', 'Empatía']
    },
    portfolio: {
      url: 'https://danielacastro.design',
      projects: [
        {
          name: 'Nequi Metas Feature',
          description: 'Feature de ahorro por metas personalizadas',
          impact: 'Adopción del 30% en primer mes'
        }
      ]
    },
    scores: {
      cvScore: 79,
      psychometricScore: 76
    },
    notes: [
      'Experiencia en fintech digital',
      'Portfolio con proyectos recientes',
      'Buena actitud y potencial de crecimiento'
    ]
  },
  {
    id: 'cand-016',
    name: 'Andrés Felipe Gutiérrez',
    email: 'andres.gutierrez@email.com',
    phone: '+57 318 444 5566',
    age: 31,
    location: 'Medellín, Colombia',
    avatar: 'AG',
    currentStage: 'psicometrico',
    status: 'active',
    appliedDate: '2026-02-23',
    expectedSalary: '$8.500.000 - $10.000.000 COP',
    availability: '1 mes',
    yearsExperience: 6,
    experience: [
      {
        company: 'SURA',
        position: 'Senior UX Designer',
        duration: 'Ene 2021 - Presente',
        description: 'Diseño de experiencias digitales para seguros y pensiones. Liderazgo de iniciativas de transformación digital.'
      },
      {
        company: 'Indra',
        position: 'UX Designer',
        duration: 'Jun 2018 - Dic 2020',
        description: 'Consultoría de diseño para sector financiero y público.'
      }
    ],
    education: [
      {
        institution: 'Universidad Pontificia Bolivariana',
        degree: 'Diseño Industrial',
        year: '2017'
      }
    ],
    skills: {
      technical: ['Figma', 'Axure', 'User Research', 'Service Design', 'Workshop Facilitation'],
      soft: ['Liderazgo', 'Pensamiento estratégico', 'Comunicación ejecutiva']
    },
    portfolio: {
      url: 'https://andresgutierrez.co',
      projects: [
        {
          name: 'SURA Digital Transformation',
          description: 'Rediseño de portal de clientes y app móvil',
          impact: 'Transacciones digitales +45%'
        }
      ]
    },
    scores: {
      cvScore: 85,
      psychometricScore: 82
    },
    notes: [
      'Experiencia corporativa sólida',
      'Conocimiento en seguros y finanzas',
      'Liderazgo de proyectos grandes'
    ]
  },
  {
    id: 'cand-017',
    name: 'Roberto Muñoz León',
    email: 'roberto.munoz@email.com',
    phone: '+57 319 234 5678',
    age: 40,
    location: 'Cartagena, Colombia',
    avatar: 'RM',
    currentStage: 'psicometrico',
    status: 'rejected',
    appliedDate: '2026-02-24',
    expectedSalary: '$10.000.000 - $12.000.000 COP',
    availability: '3 meses',
    yearsExperience: 15,
    experience: [
      {
        company: 'Empresa Tradicional',
        position: 'Director de Arte',
        duration: '2010 - Presente',
        description: 'Dirección creativa para campañas publicitarias tradicionales y BTL.'
      }
    ],
    education: [
      {
        institution: 'Universidad Jorge Tadeo Lozano',
        degree: 'Publicidad',
        year: '2008'
      }
    ],
    skills: {
      technical: ['Photoshop', 'Illustrator', 'Dirección de arte'],
      soft: ['Liderazgo creativo', 'Gestión de equipos']
    },
    portfolio: {
      url: 'No disponible',
      projects: []
    },
    scores: {
      cvScore: 42,
      psychometricScore: 38
    },
    notes: [],
    rejectionReason: 'Experiencia en publicidad tradicional. No tiene experiencia en diseño digital ni producto. Perfil no alineado con la posición.'
  },
  {
    id: 'cand-018',
    name: 'Mariana Gómez Peña',
    email: 'mariana.gomez@email.com',
    phone: '+57 315 777 8899',
    age: 24,
    location: 'Ibagué, Colombia',
    avatar: 'MG',
    currentStage: 'psicometrico',
    status: 'rejected',
    appliedDate: '2026-02-24',
    expectedSalary: '$5.500.000 - $7.000.000 COP',
    availability: 'Inmediata',
    yearsExperience: 2,
    experience: [
      {
        company: 'Agencia Creativa Regional',
        position: 'Diseñadora Junior',
        duration: 'Ene 2022 - Presente',
        description: 'Diseño de piezas para redes sociales y material publicitario.'
      }
    ],
    education: [
      {
        institution: 'Universidad de Ibagué',
        degree: 'Diseño Gráfico',
        year: '2021'
      }
    ],
    skills: {
      technical: ['Photoshop', 'Illustrator', 'Canva', 'After Effects'],
      soft: ['Creatividad', 'Trabajo en equipo']
    },
    portfolio: {
      url: 'https://behance.net/lauragomez',
      projects: []
    },
    scores: {
      cvScore: 50,
      psychometricScore: 44
    },
    notes: [],
    rejectionReason: 'Perfil enfocado en diseño gráfico tradicional. No cuenta con experiencia en producto digital ni conocimientos de UX.'
  },

  // ====== ETAPA 1: EVALUACIÓN CV (3 ACTIVOS) ======
  {
    id: 'cand-019',
    name: 'Mateo Sánchez Rojas',
    email: 'mateo.sanchez@email.com',
    phone: '+57 323 555 6677',
    age: 26,
    location: 'Sogamoso, Colombia',
    avatar: 'MS',
    currentStage: 'evaluacion-cv',
    status: 'active',
    appliedDate: '2026-03-07',
    expectedSalary: '$5.500.000 - $7.500.000 COP',
    availability: 'Inmediata (Remoto o reubicación)',
    yearsExperience: 3,
    experience: [
      {
        company: 'TechSolutions Latam',
        position: 'Backend Developer',
        duration: 'Ene 2024 - Presente',
        description: 'Desarrollo de APIs RESTful con Node.js y Express. Implementación de microservicios en AWS. Trabajo con bases de datos MongoDB y PostgreSQL. Optimización de consultas y rendimiento.'
      },
      {
        company: 'StartupCo',
        position: 'Junior Backend Developer',
        duration: 'Mar 2022 - Dic 2023',
        description: 'Desarrollo backend con Python y Flask. Integración de servicios de terceros. Manejo de autenticación y autorización. Colaboración en arquitectura de sistemas.'
      },
      {
        company: 'DevAgency',
        position: 'Trainee Developer',
        duration: 'Jun 2021 - Feb 2022',
        description: 'Primer rol profesional en desarrollo backend. Aprendizaje de Node.js, bases de datos y APIs. Participación en proyectos de migración y mantenimiento.'
      }
    ],
    education: [
      {
        institution: 'Universidad Santo Tomás',
        degree: 'Ingeniería de Sistemas',
        year: '2021'
      },
      {
        institution: 'AWS Training',
        degree: 'AWS Certified Solutions Architect - Associate',
        year: '2023'
      }
    ],
    skills: {
      technical: ['Node.js', 'Express', 'Python', 'Flask', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'REST APIs', 'Microservices'],
      soft: ['Trabajo en equipo', 'Resolución de problemas', 'Aprendizaje continuo', 'Comunicación técnica', 'Adaptabilidad']
    },
    portfolio: {
      url: 'https://github.com/mateosanchez',
      projects: [
        {
          name: 'E-commerce Microservices',
          description: 'Arquitectura de microservicios para plataforma e-commerce con Node.js y AWS',
          impact: 'Sistema escalable que maneja 10K+ peticiones diarias'
        },
        {
          name: 'API Gateway Python',
          description: 'Gateway de APIs con Python/Flask para integración de servicios',
          impact: 'Reducción del 30% en tiempo de respuesta'
        }
      ]
    },
    scores: {
      cvScore: 78
    },
    notes: [
      'Experiencia sólida de 3 años en backend',
      'Stack técnico: Node.js, Python, AWS, MongoDB, PostgreSQL',
      'Certificación AWS reciente',
      'Perfil junior-mid con buen potencial de crecimiento',
      'Disponible para remoto o reubicación desde Sogamoso'
    ]
  },
  {
    id: 'cand-020',
    name: 'Isabella Moreno Cruz',
    email: 'isabella.moreno@email.com',
    phone: '+57 311 888 9900',
    age: 26,
    location: 'Cali, Colombia',
    avatar: 'IM',
    currentStage: 'evaluacion-cv',
    status: 'active',
    appliedDate: '2026-02-25',
    expectedSalary: '$7.000.000 - $8.500.000 COP',
    availability: '2 semanas',
    yearsExperience: 3,
    experience: [
      {
        company: 'Truora',
        position: 'Product Designer',
        duration: 'Jun 2022 - Presente',
        description: 'Diseño de productos de verificación de identidad. UX para procesos complejos.'
      },
      {
        company: 'Aplyca',
        position: 'UX/UI Designer',
        duration: 'Ene 2021 - May 2022',
        description: 'Diseño para clientes de diversos sectores.'
      }
    ],
    education: [
      {
        institution: 'Universidad Icesi',
        degree: 'Diseño de Medios Interactivos',
        year: '2020'
      }
    ],
    skills: {
      technical: ['Figma', 'User Research', 'Prototyping', 'Usability Testing'],
      soft: ['Empatía', 'Problem solving', 'Colaboración']
    },
    portfolio: {
      url: 'https://isabellamoreno.co',
      projects: [
        {
          name: 'Truora ID Verification',
          description: 'Flujo de verificación de identidad simplificado',
          impact: 'Tiempo de verificación -60%'
        }
      ]
    },
    scores: {
      cvScore: 78
    },
    notes: [
      'Experiencia en procesos complejos',
      'Buen enfoque en simplificación'
    ]
  },
  {
    id: 'cand-021',
    name: 'Santiago Vargas Luna',
    email: 'santiago.vargas@email.com',
    phone: '+57 314 222 3344',
    age: 29,
    location: 'Medellín, Colombia',
    avatar: 'SV',
    currentStage: 'evaluacion-cv',
    status: 'active',
    appliedDate: '2026-02-26',
    expectedSalary: '$8.000.000 - $9.500.000 COP',
    availability: '3 semanas',
    yearsExperience: 5,
    experience: [
      {
        company: 'Tul',
        position: 'Product Designer',
        duration: 'Mar 2021 - Presente',
        description: 'Diseño para plataforma de salud digital. Telemedicina y gestión de citas.'
      },
      {
        company: 'Lean Solutions Group',
        position: 'UX Designer',
        duration: 'Jul 2019 - Feb 2021',
        description: 'Diseño de soluciones digitales para sector salud.'
      }
    ],
    education: [
      {
        institution: 'Universidad de Antioquia',
        degree: 'Diseño Visual',
        year: '2018'
      }
    ],
    skills: {
      technical: ['Figma', 'Sketch', 'InVision', 'User Research', 'Journey Mapping'],
      soft: ['Empatía', 'Comunicación', 'Trabajo remoto']
    },
    portfolio: {
      url: 'https://santiagovargas.design',
      projects: [
        {
          name: 'Tul Telemedicina',
          description: 'Plataforma de consultas médicas virtuales',
          impact: '100K+ consultas realizadas'
        }
      ]
    },
    scores: {
      cvScore: 80
    },
    notes: [
      'Experiencia en healthtech',
      'Portfolio con impacto social'
    ]
  }
];