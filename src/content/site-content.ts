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

export const hero = {
  eyebrow: "Environmental Consultancy · Utrecht, Netherlands",
  headline: "Eco Marina Environmental Consultancy",
  subheadline:
    "Environmental and social impact assessment studies, environmental monitoring programs, and sustainability training — for governments, industry, and coastal development across Europe, Africa, and Asia.",
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
      "Apply environmental impact assessment studies and environmental services for all industrial, marine, touristic, and infrastructure activities — from scoping and baseline surveys through mitigation plans and regulatory submission.",
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
      "Design and run environmental monitoring programs for industrial, coastal, and marine settings — studying and assessing qualitative and quantitative contamination with solid, gaseous, and liquid parameters.",
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
    title: "Environmental & Sustainability Training Courses",
    shortTitle: "Training",
    tagline: "Professional workshops and community programs that turn knowledge into action",
    description:
      "Expert-led training for professionals, government officers, entrepreneurs, and community leaders — covering EIA methodology, environmental monitoring, regulatory compliance, and practical sustainability practices.",
    href: "/training",
    icon: "training" as const,
    image: "/images/services/training.jpg",
    deliverables: [
      "EIA and environmental assessment workshops",
      "Environmental monitoring technician training",
      "Regulatory compliance and permitting guidance",
      "Community environmental awareness programs",
      "Custom in-house courses for organisations",
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
      "Apply environmental impact assessment studies and environmental services for all industrial, marine, touristic, and infrastructure activities.",
    image: "/images/services/consultancy.jpg",
    href: "/services/impact-assessment",
  },
  {
    slug: "industry-services",
    title: "Industry Services",
    description:
      "Control, monitor, and adapt environmental industrial activities. Study and assess qualitative and quantitative contaminations with solid, gaseous, and liquid parameters.",
    image: "/images/services/industry.jpg",
    href: "/services/monitoring",
  },
  {
    slug: "tourism-marine",
    title: "Tourism & Marine Services",
    description:
      "Adapt monitoring, protection, and planning for coastal, fresh, and marine ecosystems.",
    image: "/images/services/tourism-marine.jpg",
    href: "/services/monitoring",
  },
  {
    slug: "waste-management",
    title: "Waste Management Services",
    description:
      "Propose and control low-cost and multi-tech waste management for solid, gaseous, and liquid wastes.",
    image: "/images/services/waste-management.jpg",
    href: "/services",
  },
] as const;

export const whyUs = [
  {
    title: "International Experience",
    description:
      "International academic and professional experience, working with different international environmental organizations and institutes. Strong links with multidisciplinary communities allow bringing the international context locally.",
  },
  {
    title: "Work Capabilities",
    description:
      "Experience with governments, local and regional authorities, international organizations, civil and non-governmental bodies, multinational corporations, and the business/private sector.",
  },
  {
    title: "Competitive Rates",
    description:
      "Environmental-friendliness should be democratized and not be an unreachable organizational process. Time efficiency brings cost reductions — higher quality service at better rates.",
  },
  {
    title: "Highly Qualified Experts",
    description:
      "A network of highly qualified experts assigned to projects as needed, working together toward a better environment.",
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
    title: "Environmental approval of the construction of a Cement Factory",
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
    title: "Implementation of ecosystem-conscious Oil Berth construction plans",
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
    "A thriving ocean where biodiversity flourishes, coastal communities are resilient, and sustainable innovation leads global change.",
  approach:
    "Eco Marina combines international environmental science with local implementation, delivering services from initial assessment through compliance and ongoing monitoring. Environmental-friendliness should be democratized — not an unreachable organizational process.",
};

export const trainingCourses = [
  {
    id: "eia-workshop",
    title: "Environmental Impact Assessment (EIA) Workshop",
    duration: "2–3 days",
    format: "In-person or hybrid",
    description:
      "Core methodology for conducting environmental impact assessments — from screening and scoping through baseline studies, impact prediction, and report preparation.",
    topics: ["Legal frameworks", "Scoping & baselines", "Impact assessment methods", "Mitigation planning", "Report writing"],
    audience: "Environmental consultants, project managers, government officers",
  },
  {
    id: "monitoring-course",
    title: "Environmental Monitoring & Sampling",
    duration: "3–5 days",
    format: "In-person",
    description:
      "Practical training in designing monitoring programs, field sampling techniques, and quality assurance for water, air, and soil parameters.",
    topics: ["Monitoring design", "Sampling protocols", "QA/QC procedures", "Data recording", "Compliance reporting"],
    audience: "Field technicians, environmental officers, lab staff",
  },
  {
    id: "compliance-seminar",
    title: "Regulatory Compliance & Permitting",
    duration: "1–2 days",
    format: "In-person or online",
    description:
      "Navigating environmental permitting processes — understanding requirements, preparing applications, and managing compliance obligations.",
    topics: ["Permit types", "Application preparation", "Stakeholder consultation", "Compliance monitoring", "Cross-border regulations"],
    audience: "Developers, project managers, legal and compliance teams",
  },
  {
    id: "community-program",
    title: "Community Environmental Awareness",
    duration: "Half-day to 1 day",
    format: "In-person",
    description:
      "Accessible seminars for newcomers and community groups on practical environmental practices in the Netherlands — waste separation, pollution prevention, and local ecosystem care.",
    topics: ["Local environmental rules", "Waste & recycling", "Water and energy saving", "Community action"],
    audience: "Municipalities, NGOs, community leaders, educators",
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
        a: "Government officers, environmental consultants, industry professionals, NGOs, educators, and community groups. We also offer accessible programs for newcomers on practical environmental practices.",
      },
      {
        q: "Can courses be tailored to our organisation?",
        a: "Yes. We design custom workshops and in-house programs based on your sector, regulatory context, and team needs.",
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
        heading: "Case insight: Red Sea region",
        body: "In Egypt's Red Sea region, a resort reduced water usage by 28% without affecting guest satisfaction. The intervention included landscaping redesign, fixture upgrades, and operational changes — followed by green certification. Sustainable operations and guest experience are not mutually exclusive.",
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
        heading: "Democratising environmental compliance",
        body: "Environmental-friendliness should not be an unreachable organisational process reserved for large corporations. Time-efficient, well-scoped consultancy delivers higher quality outcomes at proportionate cost — whether for a marina operator, an industrial facility, or a coastal developer.",
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
        description: "Identify sensitive zones, ecosystem overlaps, and regulatory flags before breaking ground.",
      },
      {
        title: "Coastal Risk Evaluation Template",
        description: "Quick-fill worksheet for infrastructure and waterfront planning in sensitive areas.",
      },
    ],
  },
  {
    category: "Tourism Sector",
    items: [
      {
        title: "Green Operations Guide for Hotels & Resorts",
        description: "Water-saving, energy reduction, and biodiversity-respect practices for coastal hospitality.",
      },
      {
        title: "Eco-Awareness Training Module (Staff Edition)",
        description: "Slide-ready content for internal sustainability workshops and staff onboarding.",
      },
    ],
  },
  {
    category: "Education & Community",
    items: [
      {
        title: "Marine Protection Primer",
        description: "Accessible overview of marine ecosystems, threats, and protective actions for educators and community groups.",
      },
      {
        title: "Environmental Law Explained",
        description: "Plain-language guide to permitting processes and how business decisions affect ecosystems.",
      },
      {
        title: "Coastal Living & Eco-Awareness Toolkit",
        description: "Practical guidance on waste, water, and biodiversity for households and tourism operators.",
      },
    ],
  },
  {
    category: "Policy & Certification",
    items: [
      {
        title: "Environmental Permit Roadmap",
        description: "Step-by-step overview for navigating approval processes across project types.",
      },
      {
        title: "EU Ecolabel Prep Checklist",
        description: "Criteria breakdown and project readiness tasks for tourism and coastal operators.",
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
