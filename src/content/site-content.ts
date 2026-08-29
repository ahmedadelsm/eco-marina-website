export const site = {
  name: "Eco Marina",
  tagline: "Environmental Consultancy",
  domain: "eco-marina.com",
  email: "info@eco-marina.com",
  phone: "+31 684 942 020",
  office: "Utrecht, Netherlands",
  linkedIn: "https://www.linkedin.com/in/adelregal",
  operatingRegions: ["Netherlands", "Egypt", "Malta", "Sweden", "Japan"],
  since: 1997,
  /** Verified from archived homepage counters (2024) */
  stats: {
    projects: 75,
    countries: 6,
  },
} as const;

export const hero = {
  eyebrow: "Environmental Consultancy · Utrecht, Netherlands",
  headline: "Eco Marina Environmental Consultancy",
  subheadline:
    "Environmental and social impact assessment studies, environmental monitoring programs, and sustainability training — for governments, industry, and coastal development.",
  cta: "Book a Consultation",
  ctaSecondary: "View Case Studies",
  image: "/images/projects/oil-berth.jpg",
  imageAlt: "Coastal environmental consulting project — ecosystem-conscious infrastructure planning",
};

/** Primary focus areas requested + mapped to original site offerings */
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
    image: "/images/services/consultancy.png",
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
    image: "/images/services/industry.jpg",
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
    image: "/images/services/tourism-marine.jpg",
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

/** Original four service categories from eco-marina.com (2021–2024) */
export const legacyServices = [
  {
    slug: "consultancy-studies",
    title: "Consultancy Services & Studies",
    description:
      "Apply environmental impact assessment studies and environmental services for all industrial, marine, touristic, and infrastructure activities.",
    image: "/images/services/consultancy.png",
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
    image: "/images/services/waste-management.png",
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

/** Verified case studies from archived eco-marina.com homepage */
export const projects = [
  {
    slug: "shipping-agency-regulations",
    title: "Implementing environmental regulations within a shipping agency",
    category: "Marine & Shipping",
    summary: "Integrated environmental regulations into shipping agency operations.",
    image: "/images/projects/shipping-agency.png",
  },
  {
    slug: "cement-factory-approval",
    title: "Environmental approval of the construction of a Cement Factory",
    category: "Industrial EIA",
    summary: "Environmental assessment and approval support for major industrial construction.",
    image: "/images/projects/cement-factory.png",
  },
  {
    slug: "seaweed-wastewater-treatment",
    title: "Developing and implementing industrial wastewater treatment using seaweed",
    category: "Nature-based Treatment",
    summary: "Designed and implemented industrial wastewater treatment using seaweed filtration technology.",
    image: "/images/projects/seaweed-wastewater.png",
  },
  {
    slug: "oil-berth-construction",
    title: "Implementation of ecosystem-conscious Oil Berth construction plans",
    category: "Coastal Infrastructure",
    summary: "Ecosystem-conscious construction planning for oil berth infrastructure in sensitive coastal areas.",
    image: "/images/projects/oil-berth.jpg",
  },
] as const;

/** Verified and sourced information about Adel Regal */
export const adelRegal = {
  name: "Adel Regal",
  title: "Environmental Consultant",
  tagline: "Bridging academic research and practical environmental implementation",
  /** Original homepage copy, archived May 2024 */
  bioShort:
    "I help organisations solve water, energy, and ecosystem challenges through expertise backed by decades of scientific and organisational experience.",
  bioLong: [
    "I solve energy, water, and environmental challenges. As an accredited researcher, a member of various international committees, and a seasoned consultant, I've bridged the gap between academic research and the world for over two decades.",
    "I've practiced internationally across Egypt, Malta, Sweden, Japan, and the Netherlands — working on environmental assessments for factories, shipping companies, and chemical installations, always focused on whether the environment suffers damage and how that can be prevented.",
    "In Egypt I spent fifteen years as professor and consultant at a major research institute, working on large-scale environmental assessments. Eco Marina brings that experience to clients in the Netherlands and internationally.",
  ],
  languages: ["Arabic (native)", "English", "Dutch (learning)", "Japanese (basic)", "Turkish (basic)"],
  countries: ["Egypt", "Japan", "Malta", "Sweden", "Netherlands"],
  focus: [
    "Environmental impact assessments for industry and coastal development",
    "Environmental monitoring and pollution control",
    "Regulatory compliance and permitting support",
    "Environmental training for professionals and communities",
  ],
  timeline: [
    { period: "1997–", label: "Environmental consulting practice begins" },
    { period: "15 years", label: "Professor & consultant at major research institute, Egypt" },
    { period: "International", label: "Projects and research in Egypt, Japan, Malta, Sweden" },
    { period: "2019–", label: "Relocated to the Netherlands; founded Eco Marina consultancy" },
    { period: "Present", label: "Based in Utrecht; serving clients across Europe and beyond" },
  ],
  quote: "If you want to run a business here, you need to know the language and the culture — the same applies to environmental work: local context matters.",
  quoteSource: "Power by Peers interview, 2021",
};

export const founder = adelRegal;

export const mission = {
  mission:
    "To make professional environmental assessment, monitoring, and training accessible to governments, industry, and communities — grounded in science and focused on practical results.",
  approach:
    "Eco Marina combines international environmental science with local implementation, delivering services from initial assessment through compliance and ongoing monitoring.",
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

export const partners = [
  { name: "PT. EgyTronic International Trading", location: "Indonesia" },
  { name: "R.E.D.S — Renewable Energy Desalination Systems", location: "" },
] as const;

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Impact Assessment", href: "/services/impact-assessment" },
      { label: "Monitoring Programs", href: "/services/monitoring" },
      { label: "All Services", href: "/services" },
    ],
  },
  { label: "Cases", href: "/projects" },
  { label: "Training", href: "/training" },
  { label: "About Adel", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  { label: "Impact Assessment", href: "/services/impact-assessment" },
  { label: "Monitoring Programs", href: "/services/monitoring" },
  { label: "Training", href: "/training" },
  { label: "Case Studies", href: "/projects" },
  { label: "About Adel Regal", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

// Legacy exports for pages still referencing these
export const pillars = whyUs.map((w, i) => ({
  title: w.title,
  description: w.description,
  icon: (["science", "globe", "chart", "regulation"] as const)[i],
}));
export const testimonials: readonly { quote: string; author: string; location: string; service: string }[] = [];
export const impact = { highlights: [] as { metric: string; label: string; detail: string }[], recognition: [] as string[] };
export const processSteps = [
  { step: "01", title: "Initial consultation", description: "Understand your project, location, and regulatory requirements." },
  { step: "02", title: "Assessment & planning", description: "Field work, baseline data, or program design tailored to your site." },
  { step: "03", title: "Delivery", description: "Reports, monitoring systems, or training with full documentation." },
  { step: "04", title: "Follow-up", description: "Permit support, compliance reporting, and ongoing advisory." },
] as const;
export const supportingServices = legacyServices.map((s) => ({
  slug: s.slug,
  title: s.title,
  description: s.description,
}));
