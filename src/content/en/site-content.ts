export const site = {
  name: "Eco Marina",
  tagline: "Environmental Consultancy",
  motto: "Restoring balance beneath the surface",
  domain: "eco-marina.com",
  email: "info@eco-marina.com",
  phone: "+31 684 942 020",
  office: "Utrecht, Netherlands",
  linkedIn: "https://www.linkedin.com/in/adelregal",
  operatingRegions: ["Netherlands", "Egypt", "Malta", "Sweden", "Japan"],
  since: 1997,
  stats: {
    projects: 75,
    countries: 5,
  },
  values: [
    "Sustainability over short-term gain",
    "Science as a guiding force",
    "Transparency in impact and process",
    "Collaboration with communities and experts",
  ],
} as const;

export const ui = {
  contact: "Contact",
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  pages: "Pages",
  connect: "Connect",
  footerSince: "Environmental consultancy since",
  footerServices: "impact assessment, monitoring, and training",
  footerRegions: "and beyond.",
  projects: "Projects",
  countries: "Countries",
  since: "Since",
  bookConsultation: "Book your consultation appointment",
  contactUs: "Contact us",
  viewAll: "View all",
  allInsights: "All insights",
  fullBiography: "Full biography",
  internationalExperience: "International experience",
  projectsAndResearch: "Projects and research across",
  challenge: "Challenge",
  approach: "Approach",
  outcomes: "Outcomes",
  projectDetails: "Project details",
  location: "Location",
  client: "Client",
  category: "Category",
  servicesDelivered: "Services delivered",
  discussSimilar: "Discuss a similar project",
  moreCaseStudies: "More case studies",
  writtenBy: "Written by",
  requestResources: "Request resources",
  getInTouch: "Get in touch",
  topics: "Topics",
  audience: "Audience",
  groundedIn: "Grounded in",
  pricing: "Pricing",
  schedule: "Scheduling",
  onRequest: "On request — quote based on group size and format",
  byArrangement: "By arrangement; in-house or online options available",
  trainingCta:
    "Need a tailored in-house programme or a quote for your team? Tell us your sector, group size, and location — we will suggest the right format.",
  requestTraining: "Request training information",
  deliverables: "Deliverables",
  sectors: "Sectors",
  details: "Details",
  detailsLink: "Details",
  loading: "Loading…",
  partners: "Partners",
  language: "Language",
  contactPage: {
    eyebrow: "Contact",
    title: "Let's work together",
    intro: "Initial consultations are free. Tell us about your assessment, monitoring, or training needs.",
    getInTouch: "Get in touch",
    responseTime: "We typically respond within 1–2 business days.",
    email: "Email",
    phone: "Phone",
    office: "Office",
  },
  form: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    organization: "Organization",
    serviceInterest: "Service interest",
    selectService: "Select a service",
    message: "Message",
    messagePlaceholder: "Tell us about your project, timeline, and location…",
    send: "Send message",
    sending: "Sending…",
    captcha: "Please complete the captcha.",
    error: "Could not send your message. Please email {email} directly.",
    thankYou: "Thank you",
    received: "Your message has been received. We'll respond within 1–2 business days.",
    services: {
      impact: "Environmental & Social Impact Assessment",
      monitoring: "Environmental Monitoring Program",
      training: "Training & Workshops",
      other: "Other / General Inquiry",
    },
  },
} as const;

export const homePage = {
  services: {
    eyebrow: "Services",
    title: "What we do",
    description:
      "Impact assessment, environmental monitoring, and professional training — the three pillars of our consultancy.",
  },
  mission: {
    eyebrow: "Mission",
    title: "Science-backed, locally applied",
    valuesTitle: "Our values",
  },
  whyUs: {
    eyebrow: "Why Eco Marina",
    title: "Why work with us",
  },
  cases: {
    eyebrow: "Cases",
    title: "Selected case studies",
    description:
      "Representative projects across shipping, industry, coastal infrastructure, and nature-based treatment.",
    viewAll: "View all cases →",
    viewCase: "View case study →",
  },
  founder: {
    eyebrow: "Founder",
    biography: "Full biography →",
    experienceTitle: "International experience",
    experienceIntro: "Projects and research across",
  },
  insights: {
    eyebrow: "Insights",
    title: "Perspectives from the field",
    description: "Practical guidance on sustainable tourism, compliance, and coastal development.",
    viewAll: "All insights →",
    readArticle: "Read article →",
  },
  legacy: {
    eyebrow: "Full service range",
    title: "Consultancy, industry, marine & waste",
    description: "Consultancy studies, industry services, tourism and marine work, and waste management.",
  },
  process: {
    eyebrow: "Process",
    title: "How we work",
  },
} as const;

export const hero = {
  eyebrow: "Environmental Consultancy · Utrecht, Netherlands",
  headline: "Environmental consultancy for coasts, industry, and communities",
  subheadline:
    "Impact assessment, environmental monitoring, and professional training — based in Utrecht and working with clients across Europe, Africa, and Asia.",
  cta: "Book a Consultation",
  ctaSecondary: "View Case Studies",
  image: "/images/hero-coastal.jpg",
  imageAlt: "Coastal waters — environmental consultancy for marine and coastal development",
};

/** Core consultancy services */
export const coreServices = [
  {
    slug: "impact-assessment",
    title: "Environmental & Social Impact Assessment Studies",
    shortTitle: "Impact Assessment",
    tagline: "EIA and environmental studies for industrial, marine, tourism, and infrastructure projects",
    description:
      "We carry out environmental and social impact assessments from first screening through baseline surveys, impact prediction, mitigation planning, and regulatory submission — for factories, ports, coastal developments, and infrastructure.",
    href: "/services/impact-assessment",
    icon: "assessment" as const,
    image: "/images/services/consultancy.jpg",
    deliverables: [
      "Environmental impact assessment (EIA) studies",
      "Scoping, screening & baseline environmental surveys",
      "Impact prediction and mitigation planning",
      "Environmental Management Plans (EMP)",
      "Regulatory submission and permit support",
    ],
    sectors: ["Industrial facilities", "Marine & shipping", "Tourism & coastal", "Infrastructure", "Chemical installations"],
  },
  {
    slug: "monitoring",
    title: "Environmental Monitoring Programs",
    shortTitle: "Monitoring",
    tagline: "Control, monitor, and adapt environmental activities across air, water, and ecosystems",
    description:
      "We design and run monitoring programmes for industrial sites, coastlines, and marine settings — measuring contamination in water, air, soil, and effluents, and turning results into clear compliance reports.",
    href: "/services/monitoring",
    icon: "monitoring" as const,
    image: "/images/services/monitoring.jpg",
    deliverables: [
      "Monitoring program design and protocols",
      "Water quality and marine pollution sampling",
      "Industrial emissions and contamination assessment",
      "Coastal and ecosystem surveillance",
      "Compliance reporting",
    ],
    sectors: ["Industrial plants", "Marinas & waterfronts", "Construction sites", "Shipping & ports", "Protected areas"],
  },
  {
    slug: "training",
    title: "Environmental Training & Workshops",
    shortTitle: "Training",
    tagline: "Workshops and courses grounded in real project experience",
    description:
      "Courses for professionals, government staff, industry teams, and community groups — covering EIA practice, marine and coastal monitoring, port and shipping compliance, industrial pollution control, and practical environmental awareness.",
    href: "/training",
    icon: "training" as const,
    image: "/images/training/eia-workshop.jpg",
    deliverables: [
      "EIA and environmental assessment workshops",
      "Marine and coastal monitoring training",
      "Port, shipping, and industrial compliance seminars",
      "Community environmental awareness sessions",
      "Tailored in-house programmes",
    ],
    sectors: ["Government agencies", "Industry & developers", "NGOs", "Educators & newcomers", "Consultancies"],
  },
] as const;

/** Additional service categories */
export const legacyServices = [
  {
    slug: "consultancy-studies",
    title: "Consultancy Services & Studies",
    description:
      "Environmental impact assessment and studies for industrial, marine, tourism, and infrastructure projects.",
    image: "/images/services/consultancy.jpg",
    href: "/services/impact-assessment",
  },
  {
    slug: "industry-services",
    title: "Industry Services",
    description:
      "Monitoring and assessment of industrial emissions, effluents, and contamination — solid, liquid, and gaseous parameters.",
    image: "/images/services/industry.jpg",
    href: "/services/monitoring",
  },
  {
    slug: "tourism-marine",
    title: "Tourism & Marine Services",
    description:
      "Monitoring, protection, and planning for coastal, freshwater, and marine ecosystems.",
    image: "/images/services/tourism-marine.jpg",
    href: "/services/monitoring",
  },
  {
    slug: "waste-management",
    title: "Waste Management Services",
    description:
      "Practical waste management approaches for solid, liquid, and gaseous wastes at industrial and community scale.",
    image: "/images/services/waste-management.jpg",
    href: "/services",
  },
] as const;

export const whyUs = [
  {
    title: "International experience, local delivery",
    description:
      "Three decades of work across Egypt, Japan, Malta, Sweden, and the Netherlands — combining academic research, government advisory, and hands-on project delivery. Global standards applied to your local regulatory context.",
  },
  {
    title: "Clients across sectors",
    description:
      "Governments, port authorities, industrial developers, shipping agencies, NGOs, and private operators. We understand both the environmental science and the operational realities on site.",
  },
  {
    title: "Clear scope, fair pricing",
    description:
      "Environmental work should be transparent, not over-engineered. We scope assignments tightly, explain requirements in plain language, and focus on deliverables you can use in practice.",
  },
  {
    title: "Specialists when needed",
    description:
      "Larger or highly technical projects draw on a trusted network of marine scientists, engineers, and regulatory experts — brought in for the work, not to inflate the team.",
  },
] as const;

/** Selected case studies */
export const projects = [
  {
    slug: "shipping-agency-regulations",
    title: "Implementing environmental regulations within a shipping agency",
    category: "Marine & Shipping",
    summary:
      "Integrated environmental regulations into shipping agency operations — aligning port logistics, vessel handling, and compliance with national and international marine standards.",
    image: "/images/projects/shipping-agency.jpg",
    location: "Mediterranean region",
    client: "Shipping agency operator",
    challenge:
      "A shipping agency needed to align daily port operations — vessel handling, cargo logistics, and agency services — with evolving environmental regulations without disrupting commercial throughput.",
    approach: [
      "Mapped applicable national and international marine environmental requirements to agency workflows",
      "Identified compliance gaps across vessel reception, waste handling, and documentation processes",
      "Developed operational procedures and staff guidance for environmental compliance",
      "Established monitoring and reporting protocols for ongoing regulatory adherence",
    ],
    outcomes: [
      "Environmental regulations integrated into standard agency operations",
      "Clear compliance procedures for port-facing staff and management",
      "Reduced regulatory risk during vessel calls and cargo handling",
    ],
    services: ["Regulatory compliance", "Environmental advisory", "Operational guidance"],
  },
  {
    slug: "cement-factory-approval",
    title: "Environmental approval for a cement factory",
    category: "Industrial EIA",
    summary:
      "Full environmental assessment and approval support for major industrial construction — screening, baseline surveys, impact prediction, and mitigation planning for emissions and effluents.",
    image: "/images/projects/cement-factory.jpg",
    location: "Industrial zone",
    client: "Industrial developer",
    challenge:
      "A major cement factory construction required full environmental approval, including assessment of air emissions, effluent discharge, and impacts on surrounding land and communities.",
    approach: [
      "Conducted screening and scoping under the applicable EIA framework",
      "Baseline surveys for air quality, water resources, and land use in the project area",
      "Impact prediction for stack emissions, dust, noise, and liquid effluents",
      "Mitigation measures and Environmental Management Plan for construction and operation phases",
      "Prepared documentation and supported the regulatory approval process",
    ],
    outcomes: [
      "Environmental approval pathway completed with full EIA documentation",
      "Defined mitigation measures for emissions and effluent management",
      "Operational monitoring requirements established for the facility lifecycle",
    ],
    services: ["Environmental impact assessment", "Baseline studies", "Permit support"],
  },
  {
    slug: "seaweed-wastewater-treatment",
    title: "Developing and implementing industrial wastewater treatment using seaweed",
    category: "Nature-based Treatment",
    summary:
      "Designed and implemented industrial wastewater treatment using seaweed filtration technology — a nature-based approach to reducing contamination at industrial sites.",
    image: "/images/projects/seaweed-wastewater.jpg",
    location: "Coastal industrial site",
    client: "Industrial facility",
    challenge:
      "An industrial site required effective wastewater treatment that could reduce contamination load while offering a lower-cost, nature-based alternative to conventional treatment systems.",
    approach: [
      "Assessed effluent composition and discharge volumes at the industrial site",
      "Designed a seaweed-based filtration system suited to local water conditions",
      "Piloted and implemented the treatment technology with quality monitoring",
      "Documented treatment performance and operational requirements for the client",
    ],
    outcomes: [
      "Operational nature-based wastewater treatment system deployed",
      "Measurable reduction in contamination load from industrial effluent",
      "Documented protocol for ongoing system maintenance and monitoring",
    ],
    services: ["Nature-based treatment design", "Water quality monitoring", "Industrial advisory"],
  },
  {
    slug: "oil-berth-construction",
    title: "Oil berth construction in sensitive coastal waters",
    category: "Coastal Infrastructure",
    summary:
      "Ecosystem-conscious construction planning for oil berth infrastructure in sensitive coastal areas — balancing industrial needs with marine habitat protection.",
    image: "/images/projects/oil-berth.jpg",
    location: "Sensitive coastal waters",
    client: "Port and energy infrastructure developer",
    challenge:
      "Construction of oil berth infrastructure in ecologically sensitive coastal waters required careful planning to minimise disturbance to marine habitats while meeting industrial operational requirements.",
    approach: [
      "Ecological baseline assessment of the berth site and surrounding marine area",
      "Impact evaluation for construction phases — dredging, piling, and operational discharge",
      "Ecosystem-conscious construction sequencing and habitat protection measures",
      "Compliance framework aligned with coastal and marine environmental regulations",
    ],
    outcomes: [
      "Construction plans adapted to reduce ecological disturbance",
      "Defined habitat protection measures for sensitive coastal zones",
      "Regulatory-compliant framework for berth construction and operation",
    ],
    services: ["Coastal EIA", "Ecological assessment", "Infrastructure planning"],
  },
] as const;

export type Project = (typeof projects)[number];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const adelRegal = {
  name: "Adel Regal",
  title: "Marine Chemist & Environmental Consultant",
  tagline: "Bridging academic research and practical environmental implementation",
  image: "/images/team/adel-regal.jpg",
  imageAlt: "Adel Regal — founder of Eco Marina Environmental Consultancy",
  bioShort:
    "Marine chemist and environmental consultant with three decades of experience across the Red Sea, Mediterranean, and Gulf of Suez, delivering impact assessments, monitoring programmes, and regulatory advisory for industry and coastal development.",
  bioLong: [
    "Adel Regal began his career in coastal Egypt, where work in marine protected areas and early engagement with Egypt's Environmental Law (1997) established a foundation in applied environmental science and regulatory compliance.",
    "Over three decades, he has combined academic research with consultancy — conducting environmental assessments for industrial facilities, shipping operations, and chemical installations across Egypt, Japan, Malta, Sweden, and the Netherlands.",
    "As founder of Eco Marina, he brings this international experience to clients in the Netherlands and beyond, with a focus on rigorous science, practical mitigation, and long-term environmental stewardship.",
  ],
  credentials: [
    "PhD in Marine Chemistry & Environment",
    "Associate Professor at NIOF (National Institute of Oceanography & Fisheries)",
    "Postdoctoral research at Mie University, Japan",
    "Consultant for EEAA, DANIDA, and IOI projects",
    "Trainer in EIA, pollution control, and ocean governance",
  ],
  countries: ["Egypt", "Japan", "Malta", "Sweden", "Netherlands"],
  focus: [
    "Environmental impact assessments for industry and coastal development",
    "Environmental monitoring and pollution control",
    "Regulatory compliance and permitting support",
    "Environmental training for professionals and communities",
  ],
  timeline: [
    { period: "Early career", label: "Marine science and environmental consultancy, coastal Egypt" },
    { period: "1997–", label: "Environmental consulting practice; regulatory advisory under Egyptian Environmental Law" },
    { period: "15 years", label: "Professor and consultant at NIOF — large-scale environmental assessments" },
    { period: "International", label: "Postdoctoral research in Japan; projects across Malta, Sweden, and Egypt" },
    { period: "2019–", label: "Relocated to the Netherlands; founded Eco Marina consultancy" },
    { period: "Present", label: "Based in Utrecht; serving clients across Europe and internationally" },
  ],
  quote: "Science must serve the sea — not just study it.",
  quoteSource: "Adel Regal",
};

export const mission = {
  mission:
    "To make professional environmental assessment, monitoring, and training accessible to governments, industry, and communities — grounded in science and focused on practical results.",
  vision:
    "Coastal and marine environments where development and industry operate responsibly, communities understand their impact, and ecosystems are protected for the long term.",
  approach:
    "We work from initial assessment through compliance and ongoing monitoring — explaining what the science means, what regulators expect, and what your team needs to do next. No unnecessary complexity.",
};

export const trainingIntro = {
  title: "Training & workshops",
  description:
    "Practical courses led by Adel Regal, built from decades of EIA delivery, marine monitoring, industrial compliance work, and community education in the Netherlands and internationally.",
} as const;

export const trainingCourses = [
  {
    id: "eia-practitioners",
    title: "Environmental Impact Assessment (EIA) for Practitioners",
    duration: "2 days",
    format: "In-person or online",
    description:
      "A hands-on walkthrough of the EIA process — from deciding whether an assessment is needed through scoping, baseline studies, impact prediction, and mitigation. Suitable for people who need to commission, review, or deliver EIAs.",
    topics: [
      "When an EIA is required",
      "Scoping and study boundaries",
      "Baseline surveys (air, water, land, communities)",
      "Impact prediction and significance",
      "Mitigation and Environmental Management Plans",
      "Preparing documentation for regulators",
    ],
    audience: "Environmental consultants, project managers, government reviewers, developers",
    experience:
      "Draws on EIA work for cement plants, oil berth infrastructure, coastal developments, and industrial facilities across Egypt and Europe.",
    pricing: "On request — quote based on group size and format",
    schedule: "Scheduled by arrangement; in-person or online",
    image: "/images/training/eia-workshop.jpg",
    imageAlt: "Environmental impact assessment workshop",
  },
  {
    id: "marine-coastal-monitoring",
    title: "Marine & Coastal Environmental Monitoring",
    duration: "3 days",
    format: "In-person (includes field demonstration)",
    description:
      "How to design and run monitoring programmes for harbours, marinas, industrial coastlines, and nearshore waters — from sampling design through quality assurance to compliance reporting.",
    topics: [
      "Designing site-specific monitoring plans",
      "Water quality and sediment sampling",
      "Effluent and discharge monitoring",
      "Data quality assurance (QA/QC)",
      "Interpreting results against limits and standards",
      "Reporting for regulators and management",
    ],
    audience: "Environmental officers, port operators, marina managers, field technicians",
    experience:
      "Grounded in marine chemistry practice and long-term monitoring across Mediterranean and Red Sea coastal sites.",
    pricing: "On request — includes field demonstration where applicable",
    schedule: "Typically 3 consecutive days; dates by arrangement",
    image: "/images/training/marine-monitoring.jpg",
    imageAlt: "Marine environmental monitoring in the field",
  },
  {
    id: "port-shipping-compliance",
    title: "Marine Environmental Regulations for Ports & Shipping",
    duration: "1 day",
    format: "In-person or online",
    description:
      "A practical orientation to environmental requirements affecting shipping agencies, port operators, and vessel reception facilities — mapping regulations to daily operations.",
    topics: [
      "National and international marine environmental obligations",
      "Waste reception, ballast, and emissions considerations",
      "Integrating compliance into agency and port workflows",
      "Documentation, inspections, and record-keeping",
      "Working with authorities and flag-state requirements",
    ],
    audience: "Shipping agency staff, port operators, maritime logistics managers",
    experience:
      "Developed from implementing environmental regulations within a shipping agency operation in the Mediterranean.",
    pricing: "On request — single-day or combined with monitoring training",
    schedule: "1-day sessions; can be delivered on-site at port facilities",
    image: "/images/training/port-shipping.jpg",
    imageAlt: "Port and shipping environmental compliance",
  },
  {
    id: "industrial-pollution-control",
    title: "Industrial Pollution Control & Wastewater Management",
    duration: "2 days",
    format: "In-person or hybrid",
    description:
      "Managing solid, liquid, and gaseous emissions at industrial sites — understanding contamination pathways, treatment options (including nature-based approaches), and ongoing compliance.",
    topics: [
      "Characterising industrial effluents and emissions",
      "Conventional and nature-based treatment options",
      "Monitoring contamination in soil, water, and air",
      "Permit conditions and operational compliance",
      "Practical reduction measures for expanding facilities",
    ],
    audience: "Plant managers, EHS leads, industrial developers, facility coordinators",
    experience:
      "Includes lessons from seaweed-based wastewater treatment pilots and large-scale factory environmental approvals.",
    pricing: "On request — tailored to facility type and team size",
    schedule: "2-day format; hybrid options available",
    image: "/images/training/industrial-pollution.jpg",
    imageAlt: "Industrial pollution control and wastewater management",
  },
  {
    id: "netherlands-community-awareness",
    title: "Environmental Awareness for Newcomers in the Netherlands",
    duration: "Half day",
    format: "In-person",
    description:
      "Plain-language sessions for residents and community groups — covering Dutch waste separation, water and energy use, pollution prevention, and local environmental contacts.",
    topics: [
      "Dutch household waste and recycling systems",
      "Reducing water and energy use at home",
      "Preventing pollution in neighbourhoods and waterways",
      "Who to contact for local environmental concerns",
    ],
    audience: "Municipal programmes, NGOs, community centres, schools, newcomer organisations",
    experience:
      "Delivered as accessible outreach aligned with Eco Marina's community education work in Utrecht and the Netherlands.",
    pricing: "On request — often funded through municipal or NGO programmes",
    schedule: "Half-day sessions; morning or afternoon slots",
    image: "/images/training/community-awareness.jpg",
    imageAlt: "Community environmental awareness session in the Netherlands",
    summaryNl:
      "Praktische sessies over afval scheiden, water- en energieverbruik, en milieubewustzijn — speciaal voor nieuwkomers en gemeenschapsorganisaties in Nederland.",
  },
] as const;

export const impactAssessmentDetail = {
  overview:
    "Environmental impact assessment is the foundation of responsible development. Eco Marina conducts EIA studies that meet regulatory requirements while genuinely identifying environmental risks and practical mitigation measures.",
  steps: [
    "Screening — determine whether an EIA is required and define the regulatory framework",
    "Scoping — identify key issues, study boundaries, and stakeholder concerns",
    "Baseline studies — field surveys of environmental and social conditions",
    "Impact assessment — predict and evaluate potential effects",
    "Mitigation & management — design measures and Environmental Management Plans",
    "Reporting — prepare documents for regulatory review and public consultation",
  ],
};

export const monitoringDetail = {
  overview:
    "Whether for an operating industrial facility, a coastal tourism project, or a construction site, structured monitoring provides the data needed to demonstrate compliance and protect ecosystems.",
  areas: [
    { name: "Water & Marine", items: ["Water quality", "Marine pollution", "Sediment analysis", "Effluent monitoring"] },
    { name: "Air & Emissions", items: ["Stack emissions", "Air quality", "Odour", "Dust and particulates"] },
    { name: "Industrial", items: ["Solid waste streams", "Liquid effluents", "Gaseous emissions", "Contamination assessment"] },
    { name: "Ecological", items: ["Coastal habitat surveys", "Biodiversity monitoring", "Protected area surveillance"] },
  ],
};

export const faq = [
  {
    category: "Impact Assessment",
    questions: [
      {
        q: "What projects need an environmental impact assessment?",
        a: "Typically industrial facilities, coastal and tourism developments, infrastructure projects, chemical installations, and activities in or near sensitive ecosystems. Requirements depend on the country and project scale.",
      },
      {
        q: "Which sectors do you assess?",
        a: "Industrial, marine, touristic, and infrastructure activities — including factories, shipping agencies, chemical plants, and coastal developments.",
      },
    ],
  },
  {
    category: "Monitoring",
    questions: [
      {
        q: "What do your monitoring programs cover?",
        a: "Solid, gaseous, and liquid parameters — including water quality, air emissions, industrial contamination, and coastal ecosystem health.",
      },
      {
        q: "Do you offer ongoing monitoring contracts?",
        a: "Yes. We design both one-time baseline studies and ongoing operational monitoring programs with regular reporting.",
      },
    ],
  },
  {
    category: "Training",
    questions: [
      {
        q: "Who are your training courses for?",
        a: "Environmental consultants, government reviewers, port and shipping staff, industrial EHS teams, NGOs, and community groups. Courses range from technical EIA and monitoring workshops to plain-language awareness sessions for newcomers in the Netherlands.",
      },
      {
        q: "Can courses be tailored to our organisation?",
        a: "Yes. We regularly adapt content, duration, and examples to your sector — for example, a port authority team, an industrial plant, or a municipal newcomer programme. Contact us with your team size, location, and goals.",
      },
      {
        q: "Are certificates issued?",
        a: "Participants receive a course completion summary. These are professional development workshops, not accredited degree programmes — the focus is practical skills you can apply on the job.",
      },
    ],
  },
  {
    category: "General",
    questions: [
      {
        q: "Where are you based and where do you work?",
        a: "Office in Utrecht, Netherlands. International experience across Egypt, Japan, Malta, Sweden, and the Netherlands.",
      },
      {
        q: "How do I get started?",
        a: "Contact us by email or phone for an initial consultation. We'll discuss your project scope and propose an approach.",
      },
      {
        q: "Can you help with environmental permits?",
        a: "Yes. Impact assessments, monitoring programs, and regulatory advisory are core services.",
      },
    ],
  },
] as const;

export const serviceCategories = [
  {
    title: "Tourism & Coastal Development",
    description: "Eco-design for hotels, resorts, and marinas — impact assessments, biodiversity-sensitive planning, and staff training.",
    items: [
      "Eco-design recommendations for coastal infrastructure",
      "Impact assessments and biodiversity-sensitive planning",
      "Staff training and sustainable operations programmes",
    ],
    image: "/images/services/tourism-marine.jpg",
  },
  {
    title: "Industrial & Urban Projects",
    description: "Pollution risk analysis, environmental permits, and adaptive sustainability strategies for expanding businesses.",
    items: [
      "Pollution risk analysis and mitigation plans",
      "Environmental permits and regulatory compliance",
      "Adaptive sustainability strategies for industrial expansion",
    ],
    image: "/images/services/industry.jpg",
  },
  {
    title: "Scientific & Research Collaboration",
    description: "Field data collection, policy advisory, and technical input for academic and regulatory work.",
    items: [
      "Field data collection and environmental reporting",
      "Policy advisory for environmental and marine protection",
      "Technical input for academic and policy publications",
    ],
    image: "/images/services/monitoring.jpg",
  },
  {
    title: "Legal & Monitoring Support",
    description: "Alignment with environmental legislation, compliance reporting, and stakeholder mediation.",
    items: [
      "National and international environmental legislation alignment",
      "Implementation monitoring and compliance reporting",
      "Stakeholder and regulatory body coordination",
    ],
    image: "/images/services/consultancy.jpg",
  },
] as const;

export const insights = [
  {
    slug: "sustainable-tourism-new-standard",
    title: "Why sustainable tourism is the new standard",
    excerpt:
      "Luxury tourism is shifting from excess to responsibility. Coastal developers who integrate ecological design and operational sustainability gain long-term value and smoother approvals.",
    category: "Tourism & Coastal",
    readTime: "4 min read",
    date: "July 2025",
    datePublished: "2025-07-01",
    image: "/images/insights/sustainable-tourism.jpg",
    sections: [
      {
        heading: "From opulence to responsibility",
        body: "Today's travellers and investors expect experiences that respect ecosystems. Privacy that preserves habitats, comfort designed with resource efficiency, and authenticity rooted in local ecology are becoming the benchmark for coastal development — not optional extras.",
      },
      {
        heading: "Case insight: coastal hospitality",
        body: "In the Red Sea region, resorts that invest early in water efficiency, landscaping suited to local conditions, and staff training often see smoother permit processes and lower operating costs. The point is not perfection on day one — it is building environmental performance into how the property runs, not bolting it on later.",
      },
      {
        heading: "Why it matters for developers",
        body: "Informed travellers factor sustainability into booking decisions. Investors see long-term value in ecological compliance and certification. Governments increasingly favour low-impact projects with smoother approval pathways.",
      },
      {
        heading: "How Eco Marina supports tourism projects",
        body: "We help operators assess site sensitivity and ecological risks, integrate sustainable design and operations, and work toward recognised certifications such as Green Globe or EU Ecolabel. Contact us to discuss your coastal or tourism project.",
      },
    ],
  },
  {
    slug: "environmental-compliance-accessible",
    title: "Environmental consultancy should not be a luxury",
    excerpt:
      "Professional environmental assessment must be accessible to businesses of all sizes. Transparent scoping, time-efficient delivery, and practical mitigation keep costs proportionate to project scale.",
    category: "Consulting",
    readTime: "3 min read",
    date: "July 2025",
    datePublished: "2025-07-15",
    image: "/images/insights/environmental-compliance.jpg",
    sections: [
      {
        heading: "Keeping consultancy proportionate",
        body: "Environmental work does not have to mean open-ended studies with unclear endpoints. A well-scoped assignment — what regulation requires, what the site conditions demand, what deliverables you actually need — keeps costs fair whether you run a marina, a factory, or a coastal development.",
      },
      {
        heading: "Transparent proposals",
        body: "Every engagement begins with clear scoping: what is required by regulation, what the site conditions demand, and what deliverables the client needs. Proposals are structured for real-world implementation — not open-ended studies with unclear endpoints.",
      },
      {
        heading: "International context, local application",
        body: "Eco Marina brings experience from Egypt, Japan, Malta, Sweden, and the Netherlands to bear on each project. International standards are applied with local regulatory knowledge — the combination that produces approvals that hold up in practice.",
      },
    ],
  },
] as const;

export type Insight = (typeof insights)[number];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export const resources = [
  {
    category: "Developer Tools",
    items: [
      {
        title: "Sustainable Site Assessment Checklist",
        description: "Identify sensitive zones, ecosystem overlaps, and regulatory flags before breaking ground. Available on request.",
      },
      {
        title: "Coastal Risk Evaluation Template",
        description: "Worksheet for infrastructure and waterfront planning in sensitive areas. Available on request.",
      },
    ],
  },
  {
    category: "Tourism Sector",
    items: [
      {
        title: "Green Operations Guide for Hotels & Resorts",
        description: "Water-saving, energy reduction, and biodiversity-respect practices for coastal hospitality. Available on request.",
      },
      {
        title: "Eco-Awareness Training Module (Staff Edition)",
        description: "Slide-ready content for internal sustainability workshops and staff onboarding. Available on request.",
      },
    ],
  },
  {
    category: "Education & Community",
    items: [
      {
        title: "Marine Protection Primer",
        description: "Accessible overview of marine ecosystems, threats, and protective actions for educators and community groups. Available on request.",
      },
      {
        title: "Environmental Law Explained",
        description: "Plain-language guide to permitting processes and how business decisions affect ecosystems. Available on request.",
      },
      {
        title: "Coastal Living & Eco-Awareness Toolkit",
        description: "Practical guidance on waste, water, and biodiversity for households and tourism operators. Available on request.",
      },
    ],
  },
  {
    category: "Policy & Certification",
    items: [
      {
        title: "Environmental Permit Roadmap",
        description: "Step-by-step overview for navigating approval processes across project types. Available on request.",
      },
      {
        title: "EU Ecolabel Prep Checklist",
        description: "Criteria breakdown and readiness tasks for tourism and coastal operators. Available on request.",
      },
    ],
  },
] as const;

export type Partner = {
  id: string;
  name: string;
  location: string;
  logo?: string;
  enabledByDefault: boolean;
};

export const partners: readonly Partner[] = [
  {
    id: "egytronic",
    name: "PT. EgyTronic International Trading",
    location: "Indonesia",
    logo: "/images/partners/egytronic.png",
    enabledByDefault: true,
  },
  {
    id: "reds",
    name: "R.E.D.S — Renewable Energy Desalination Systems",
    location: "Egypt",
    enabledByDefault: true,
  },
];

const PARTNERS_CONTENT_KEY = "partners.enabled";

/** Resolve which partners are visible, optionally applying admin overrides from /api/content */
export function getVisiblePartners(content?: Record<string, unknown>): Partner[] {
  const override = content?.[PARTNERS_CONTENT_KEY];
  if (Array.isArray(override)) {
    const enabledIds = new Set(override.filter((id): id is string => typeof id === "string"));
    return partners.filter((p) => enabledIds.has(p.id));
  }
  return partners.filter((p) => p.enabledByDefault);
}

export function getDefaultEnabledPartnerIds(): string[] {
  return partners.filter((p) => p.enabledByDefault).map((p) => p.id);
}

export { PARTNERS_CONTENT_KEY };

export const pages = {
  about: {
    title: "About Adel Regal",
    description:
      "Adel Regal — marine chemist, environmental consultant, and founder of Eco Marina. International experience across Egypt, Japan, Malta, Sweden, and the Netherlands.",
    eyebrow: "About",
    founderOf: "Founder of",
    credentials: "Credentials",
    careerTimeline: "Career timeline",
    areasOfWork: "Areas of work",
    countries: "Countries of experience",
    ourValues: "Our values",
    linkedIn: "LinkedIn profile →",
  },
  faq: {
    title: "FAQ",
    description:
      "Frequently asked questions about Eco Marina consulting services, process, and environmental compliance.",
    eyebrow: "FAQ",
    heading: "Frequently asked questions",
  },
  services: {
    title: "Services",
    description: "Environmental impact assessment, monitoring programs, training, and full consultancy services.",
    eyebrow: "Services",
    heading: "Our services",
    intro:
      "Environmental and social impact assessment, monitoring programs, and sustainability training for governments, industry, and coastal development.",
    coreTitle: "Core services",
    specialistTitle: "Specialist consultancy areas",
    specialistIntro:
      "Tailored support across tourism, industry, research collaboration, and regulatory compliance.",
    legacyTitle: "Consultancy, industry, marine & waste",
    legacyIntro: "Broader consultancy areas we support alongside our core services.",
    cta: "Request a proposal",
  },
  projects: {
    title: "Case Studies",
    description:
      "Environmental consulting case studies from Eco Marina — shipping, industrial, wastewater, and coastal projects.",
    eyebrow: "Cases",
    heading: "Case studies",
    intro:
      "Environmental consulting projects across shipping, industry, wastewater treatment, and coastal infrastructure.",
    imageAlt: "Environmental regulations implementation for shipping agency",
    cta: "Discuss a similar project",
  },
  insights: {
    title: "Insights",
    description:
      "Environmental consulting insights from Eco Marina — sustainable tourism, compliance, and coastal development.",
    eyebrow: "Insights",
    heading: "Field notes & perspectives",
    intro:
      "Practical insights on environmental consulting, coastal development, and sustainable operations — drawn from decades of international project work.",
    writtenBy: "Written by",
    founderNote: ", founder of Eco Marina.",
    discuss: "Discuss your project",
  },
  resources: {
    title: "Resources",
    description:
      "Environmental guides, checklists, and templates from Eco Marina — for developers, tourism operators, and communities.",
    eyebrow: "Resources",
    heading: "Practical tools for sustainable impact",
    intro:
      "Guides, checklists, and templates to support eco-conscious decisions — available on request from our consultancy team.",
    requestTitle: "Request resources",
    requestIntro:
      "These materials are provided to clients and project partners. Contact us to request access or discuss tailored versions for your organisation.",
  },
  contact: {
    title: "Contact",
    description: "Contact Eco Marina for impact assessment, monitoring programs, or training. Free initial consultation.",
  },
  training: {
    title: "Training & Workshops",
  },
  impactAssessment: {
    title: "Environmental Impact Assessment",
    description: "EIA studies for industrial, marine, tourism, and infrastructure projects.",
    serviceEyebrow: "Service",
    cta: "Discuss your EIA project",
  },
  monitoring: {
    title: "Environmental Monitoring",
    description: "Monitoring program design and compliance reporting for industrial and coastal sites.",
    serviceEyebrow: "Service",
    cta: "Design a monitoring program",
  },
  impact: {
    title: "Case Studies",
    description: "Environmental consulting case studies from Eco Marina.",
    heading: "Case studies",
    body: "This page has moved. Our project impact is presented through detailed case studies.",
    cta: "View case studies →",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Impact Assessment", href: "/services/impact-assessment" },
      { label: "Monitoring Programs", href: "/services/monitoring" },
      { label: "Training", href: "/training" },
      { label: "All Services", href: "/services" },
    ],
  },
  { label: "Cases", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Resources", href: "/resources" },
  { label: "About Adel", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  { label: "Impact Assessment", href: "/services/impact-assessment" },
  { label: "Monitoring Programs", href: "/services/monitoring" },
  { label: "Training", href: "/training" },
  { label: "Case Studies", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Resources", href: "/resources" },
  { label: "About Adel Regal", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const processSteps = [
  { step: "01", title: "Initial consultation", description: "Understand your project, location, and regulatory requirements." },
  { step: "02", title: "Assessment & planning", description: "Field work, baseline data, or program design tailored to your site." },
  { step: "03", title: "Delivery", description: "Reports, monitoring systems, or training with full documentation." },
  { step: "04", title: "Follow-up", description: "Permit support, compliance reporting, and ongoing advisory." },
] as const;
