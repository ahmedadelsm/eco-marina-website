export const site = {
  name: "Eco Marina",
  tagline: "Milieudienstverlening",
  motto: "Het evenwicht onder het oppervlak herstellen",
  domain: "eco-marina.com",
  email: "info@eco-marina.com",
  phone: "+31 684 942 020",
  office: "Utrecht, Nederland",
  linkedIn: "https://www.linkedin.com/in/adelregal",
  operatingRegions: ["Nederland", "Egypte", "Malta", "Zweden", "Japan"],
  since: 1997,
  stats: {
    projects: 75,
    countries: 5,
  },
  values: [
    "Duurzaamheid boven kortetermijnwinst",
    "Wetenschap als leidraad",
    "Transparantie in impact en proces",
    "Samenwerking met gemeenschappen en experts",
  ],
} as const;

export const ui = {
  contact: "Contact",
  skipToContent: "Ga naar inhoud",
  openMenu: "Menu openen",
  closeMenu: "Menu sluiten",
  pages: "Pagina's",
  connect: "Verbinden",
  footerSince: "Milieudienstverlening sinds",
  footerServices: "effectbeoordeling, monitoring en training",
  footerRegions: "en verder.",
  projects: "Projecten",
  countries: "Landen",
  since: "Sinds",
  bookConsultation: "Plan uw adviesgesprek",
  contactUs: "Neem contact op",
  viewAll: "Alles bekijken",
  allInsights: "Alle inzichten",
  fullBiography: "Volledige biografie",
  internationalExperience: "Internationale ervaring",
  projectsAndResearch: "Projecten en onderzoek in",
  challenge: "Uitdaging",
  approach: "Aanpak",
  outcomes: "Resultaten",
  projectDetails: "Projectdetails",
  location: "Locatie",
  client: "Opdrachtgever",
  category: "Categorie",
  servicesDelivered: "Geleverde diensten",
  discussSimilar: "Bespreek een vergelijkbaar project",
  moreCaseStudies: "Meer casestudies",
  writtenBy: "Geschreven door",
  requestResources: "Materialen aanvragen",
  getInTouch: "Neem contact op",
  topics: "Onderwerpen",
  audience: "Doelgroep",
  groundedIn: "Gebaseerd op",
  pricing: "Prijzen",
  schedule: "Planning",
  onRequest: "Op aanvraag — offerte op basis van groepsgrootte en vorm",
  byArrangement: "In overleg; in-company of online mogelijk",
  trainingCta:
    "Wilt u een maatwerk in-company programma of een offerte voor uw team? Vertel ons uw sector, groepsgrootte en locatie — wij stellen het juiste format voor.",
  requestTraining: "Trainingsinformatie aanvragen",
  deliverables: "Opleveringen",
  sectors: "Sectoren",
  details: "Details",
  detailsLink: "Meer info",
  loading: "Laden…",
  partners: "Partners",
  language: "Taal",
  contactPage: {
    eyebrow: "Contact",
    title: "Laten we samenwerken",
    intro: "Eerste adviesgesprekken zijn gratis. Vertel ons over uw behoeften op het gebied van assessment, monitoring of training.",
    getInTouch: "Neem contact op",
    responseTime: "Wij reageren doorgaans binnen 1–2 werkdagen.",
    email: "E-mail",
    phone: "Telefoon",
    office: "Kantoor",
  },
  form: {
    firstName: "Voornaam",
    lastName: "Achternaam",
    email: "E-mail",
    organization: "Organisatie",
    serviceInterest: "Interesse in dienst",
    selectService: "Selecteer een dienst",
    message: "Bericht",
    messagePlaceholder: "Vertel ons over uw project, planning en locatie…",
    send: "Bericht versturen",
    sending: "Versturen…",
    captcha: "Vul de captcha in.",
    error: "Uw bericht kon niet worden verzonden. Stuur een e-mail naar {email}.",
    thankYou: "Bedankt",
    received: "Uw bericht is ontvangen. Wij reageren binnen 1–2 werkdagen.",
    services: {
      impact: "Milieu- en sociale effectbeoordeling",
      monitoring: "Milieumonitoringsprogramma",
      training: "Training & workshops",
      other: "Overig / algemene vraag",
    },
  },
} as const;

export const homePage = {
  services: {
    eyebrow: "Diensten",
    title: "Wat wij doen",
    description:
      "Effectbeoordeling, milieumonitoring en professionele training — de drie pijlers van onze dienstverlening.",
  },
  mission: {
    eyebrow: "Missie",
    title: "Wetenschappelijk onderbouwd, lokaal toegepast",
    valuesTitle: "Onze waarden",
  },
  whyUs: {
    eyebrow: "Waarom Eco Marina",
    title: "Waarom met ons werken",
  },
  cases: {
    eyebrow: "Cases",
    title: "Geselecteerde casestudies",
    description:
      "Representatieve projecten in scheepvaart, industrie, kustinfrastructuur en natuurlijke behandeling.",
    viewAll: "Alle cases bekijken →",
    viewCase: "Casestudy bekijken →",
  },
  founder: {
    eyebrow: "Oprichter",
    biography: "Volledige biografie →",
    experienceTitle: "Internationale ervaring",
    experienceIntro: "Projecten en onderzoek in",
  },
  insights: {
    eyebrow: "Inzichten",
    title: "Perspectieven uit de praktijk",
    description: "Praktische handreikingen over duurzaam toerisme, compliance en kustontwikkeling.",
    viewAll: "Alle inzichten →",
    readArticle: "Artikel lezen →",
  },
  legacy: {
    eyebrow: "Volledig dienstenaanbod",
    title: "Advies, industrie, maritiem & afval",
    description: "Adviesstudies, industriële diensten, toerisme en maritiem werk, en afvalbeheer.",
  },
  process: {
    eyebrow: "Werkwijze",
    title: "Hoe wij werken",
  },
} as const;

export const hero = {
  eyebrow: "Milieudienstverlening · Utrecht, Nederland",
  headline: "Milieudienstverlening voor kust, industrie en gemeenschappen",
  subheadline:
    "Effectbeoordeling, milieumonitoring en professionele training — gevestigd in Utrecht en actief voor opdrachtgevers in Europa, Afrika en Azië.",
  cta: "Plan een adviesgesprek",
  ctaSecondary: "Bekijk casestudies",
  image: "/images/hero-coastal.jpg",
  imageAlt: "Kustwateren — milieudienstverlening voor maritieme en kustontwikkeling",
};

/** Core consultancy services */
export const coreServices = [
  {
    slug: "impact-assessment",
    title: "Milieu- en sociale effectbeoordelingsstudies",
    shortTitle: "Effectbeoordeling",
    tagline: "EIA en milieustudies voor industriële, maritieme, toeristische en infrastructuurprojecten",
    description:
      "Wij voeren milieu- en sociale effectbeoordelingen uit — van eerste screening tot basisonderzoek, effectvoorspelling, mitigatieplanning en indiening bij de overheid — voor fabrieken, havens, kustontwikkelingen en infrastructuur.",
    href: "/services/impact-assessment",
    icon: "assessment" as const,
    image: "/images/services/consultancy.jpg",
    deliverables: [
      "Milieu-effectbeoordelingsstudies (EIA)",
      "Scoping, screening en basismilieustudies",
      "Effectvoorspelling en mitigatieplanning",
      "Milieubeheerplannen (EMP)",
      "Indiening bij overheid en vergunningsondersteuning",
    ],
    sectors: ["Industriële installaties", "Maritiem & scheepvaart", "Toerisme & kust", "Infrastructuur", "Chemische installaties"],
  },
  {
    slug: "monitoring",
    title: "Milieumonitoringsprogramma's",
    shortTitle: "Monitoring",
    tagline: "Beheers, monitor en pas milieuactiviteiten aan in lucht, water en ecosystemen",
    description:
      "Wij ontwerpen en voeren monitoringsprogramma's uit voor industrieterreinen, kustlijnen en maritieme omgevingen — meting van verontreiniging in water, lucht, bodem en effluenten, en vertaling van resultaten naar heldere compliance-rapportages.",
    href: "/services/monitoring",
    icon: "monitoring" as const,
    image: "/images/services/monitoring.jpg",
    deliverables: [
      "Ontwerp van monitoringsprogramma's en protocollen",
      "Waterkwaliteit en mariene verontreinigingsmetingen",
      "Industriële emissies en verontreinigingsbeoordeling",
      "Kust- en ecosysteemtoezicht",
      "Compliance-rapportage",
    ],
    sectors: ["Industriële fabrieken", "Jachthavens & waterfronts", "Bouwplaatsen", "Scheepvaart & havens", "Beschermde gebieden"],
  },
  {
    slug: "training",
    title: "Milieutraining & workshops",
    shortTitle: "Training",
    tagline: "Workshops en cursussen gebaseerd op echte projectervaring",
    description:
      "Cursussen voor professionals, overheidsmedewerkers, industrieteams en gemeenschapsorganisaties — over EIA-praktijk, mariene en kustmonitoring, haven- en scheepvaartcompliance, industriële verontreinigingsbeheersing en praktisch milieubewustzijn.",
    href: "/training",
    icon: "training" as const,
    image: "/images/training/eia-workshop.jpg",
    deliverables: [
      "EIA- en milieubeoordelingsworkshops",
      "Training mariene en kustmonitoring",
      "Seminars haven-, scheepvaart- en industriële compliance",
      "Milieubewustzijnssessies voor gemeenschappen",
      "Maatwerk in-company programma's",
    ],
    sectors: ["Overheidsinstanties", "Industrie & ontwikkelaars", "NGO's", "Onderwijs & nieuwkomers", "Adviesbureaus"],
  },
] as const;

/** Additional service categories */
export const legacyServices = [
  {
    slug: "consultancy-studies",
    title: "Adviesdiensten & studies",
    description:
      "Milieu-effectbeoordeling en studies voor industriële, maritieme, toeristische en infrastructuurprojecten.",
    image: "/images/services/consultancy.jpg",
    href: "/services/impact-assessment",
  },
  {
    slug: "industry-services",
    title: "Industriediensten",
    description:
      "Monitoring en beoordeling van industriële emissies, effluenten en verontreiniging — vaste, vloeibare en gasvormige parameters.",
    image: "/images/services/industry.jpg",
    href: "/services/monitoring",
  },
  {
    slug: "tourism-marine",
    title: "Toerisme & maritieme diensten",
    description:
      "Monitoring, bescherming en planning voor kust-, zoetwater- en mariene ecosystemen.",
    image: "/images/services/tourism-marine.jpg",
    href: "/services/monitoring",
  },
  {
    slug: "waste-management",
    title: "Afvalbeheerdiensten",
    description:
      "Praktische afvalbeheerbenaderingen voor vaste, vloeibare en gasvormige afvalstromen op industrieel en gemeenschapsniveau.",
    image: "/images/services/waste-management.jpg",
    href: "/services",
  },
] as const;

export const whyUs = [
  {
    title: "Internationale ervaring, lokale uitvoering",
    description:
      "Drie decennia werk in Egypte, Japan, Malta, Zweden en Nederland — een combinatie van academisch onderzoek, overheidsadvies en hands-on projectuitvoering. Wereldwijde standaarden toegepast in uw lokale regelgevingskader.",
  },
  {
    title: "Opdrachtgevers in diverse sectoren",
    description:
      "Overheden, havenautoriteiten, industriële ontwikkelaars, scheepvaartagenten, NGO's en private exploitanten. Wij begrijpen zowel de milieuwetenschap als de operationele realiteit ter plaatse.",
  },
  {
    title: "Heldere scope, eerlijke prijzen",
    description:
      "Milieuw werk hoort transparant te zijn, niet over-engineered. Wij scopen opdrachten strak af, leggen vereisten uit in begrijpelijke taal en richten ons op deliverables die u in de praktijk kunt gebruiken.",
  },
  {
    title: "Specialisten wanneer nodig",
    description:
      "Grotere of sterk technische projecten putten uit een betrouwbaar netwerk van mariene wetenschappers, ingenieurs en regelgevingsdeskundigen — ingehuurd voor het werk, niet om het team op te blazen.",
  },
] as const;

/** Selected case studies */
export const projects = [
  {
    slug: "shipping-agency-regulations",
    title: "Implementatie van milieuregelgeving binnen een scheepvaartagent",
    category: "Maritiem & scheepvaart",
    summary:
      "Milieuregelgeving geïntegreerd in de operatie van een scheepvaartagent — havenlogistiek, scheepsafhandeling en compliance afgestemd op nationale en internationale maritieme normen.",
    image: "/images/projects/shipping-agency.jpg",
    location: "Mediterrane regio",
    client: "Scheepvaartagent",
    challenge:
      "Een scheepvaartagent moest dagelijkse havenoperaties — scheepsafhandeling, cargologistiek en agentschapsdiensten — afstemmen op veranderende milieuregelgeving zonder commerciële doorvoer te verstoren.",
    approach: [
      "Toepasselijke nationale en internationale maritieme milieuvereisten in kaart gebracht en gekoppeld aan werkprocessen",
      "Compliance-hiaten geïdentificeerd bij scheepsontvangst, afvalverwerking en documentatie",
      "Operationele procedures en personeelsrichtlijnen voor milieucompliance ontwikkeld",
      "Monitorings- en rapportageprotocollen voor voortdurende naleving van regelgeving opgezet",
    ],
    outcomes: [
      "Milieuregelgeving geïntegreerd in standaard agentschapsoperaties",
      "Duidelijke compliance-procedures voor havenpersoneel en management",
      "Verminderd regelgevingsrisico bij scheepsbezoeken en cargo-afhandeling",
    ],
    services: ["Regelgevingscompliance", "Milieudadvies", "Operationele begeleiding"],
  },
  {
    slug: "cement-factory-approval",
    title: "Milieuvergunning voor een cementfabriek",
    category: "Industriële EIA",
    summary:
      "Volledige milieubeoordeling en vergunningsondersteuning voor grote industriële bouw — screening, basisonderzoek, effectvoorspelling en mitigatieplanning voor emissies en effluenten.",
    image: "/images/projects/cement-factory.jpg",
    location: "Industrieterrein",
    client: "Industriële ontwikkelaar",
    challenge:
      "De bouw van een grote cementfabriek vereiste volledige milieuvergunning, inclusief beoordeling van luchtemissies, effluentlozing en impact op omliggend land en gemeenschappen.",
    approach: [
      "Screening en scoping uitgevoerd onder het toepasselijke EIA-kader",
      "Basisonderzoek naar luchtkwaliteit, waterbronnen en landgebruik in het projectgebied",
      "Effectvoorspelling voor schoorsteenemissies, stof, geluid en vloeibare effluenten",
      "Mitigatiemaatregelen en milieubeheerplan voor bouw- en exploitatiefase",
      "Documentatie opgesteld en ondersteuning bij het vergunningsproces",
    ],
    outcomes: [
      "Milieuvergunningstraject afgerond met volledige EIA-documentatie",
      "Vastgestelde mitigatiemaatregelen voor emissie- en effluentbeheer",
      "Operationele monitoringvereisten vastgelegd voor de levenscyclus van de installatie",
    ],
    services: ["Milieu-effectbeoordeling", "Basisonderzoek", "Vergunningsondersteuning"],
  },
  {
    slug: "seaweed-wastewater-treatment",
    title: "Ontwikkeling en implementatie van industriële afwaterzuivering met zeewier",
    category: "Natuurgebaseerde zuivering",
    summary:
      "Industriële afwaterzuivering ontworpen en geïmplementeerd met zeewierfiltratietechnologie — een natuurgebaseerde aanpak om verontreiniging op industrieterreinen te verminderen.",
    image: "/images/projects/seaweed-wastewater.jpg",
    location: "Kustindustrieterrein",
    client: "Industriële installatie",
    challenge:
      "Een industrieterrein had effectieve afwaterzuivering nodig die de verontreinigingslast kon verlagen en tegelijk een goedkopere, natuurgebaseerde alternatief bood voor conventionele zuiveringssystemen.",
    approach: [
      "Samenstelling en lozingsvolumes van effluenten op het industrieterrein beoordeeld",
      "Zeewierfiltratiesysteem ontworpen dat past bij lokale wateromstandigheden",
      "Zuiveringstechnologie gepilot en geïmplementeerd met kwaliteitsmonitoring",
      "Zuiveringsprestaties en operationele vereisten voor de opdrachtgever gedocumenteerd",
    ],
    outcomes: [
      "Operationeel natuurgebaseerd afwaterzuiveringssysteem in gebruik",
      "Meetbare vermindering van verontreinigingslast uit industrieel effluent",
      "Gedocumenteerd protocol voor onderhoud en monitoring van het systeem",
    ],
    services: ["Ontwerp natuurgebaseerde zuivering", "Waterkwaliteitsmonitoring", "Industrieel advies"],
  },
  {
    slug: "oil-berth-construction",
    title: "Bouw van een olielaagsteiger in gevoelige kustwateren",
    category: "Kustinfrastructuur",
    summary:
      "Ecosysteembewuste bouwplanning voor olielaagsteigerinfrastructuur in gevoelige kustgebieden — industriële behoeften in balans met bescherming van mariene habitats.",
    image: "/images/projects/oil-berth.jpg",
    location: "Gevoelige kustwateren",
    client: "Haven- en energie-infrastructuurontwikkelaar",
    challenge:
      "De bouw van olielaagsteigerinfrastructuur in ecologisch gevoelige kustwateren vereiste zorgvuldige planning om verstoring van mariene habitats te minimaliseren en tegelijk aan industriële operationele eisen te voldoen.",
    approach: [
      "Ecologisch basisonderzoek van laagsteigerlocatie en omliggend marien gebied",
      "Effectevaluatie voor bouwfases — baggeren, heien en operationele lozing",
      "Ecosysteembewuste bouwvolgorde en habitatbeschermingsmaatregelen",
      "Compliance-kader afgestemd op kust- en mariene milieuregelgeving",
    ],
    outcomes: [
      "Bouwplannen aangepast om ecologische verstoring te verminderen",
      "Vastgestelde habitatbeschermingsmaatregelen voor gevoelige kustzones",
      "Regelgevingsconform kader voor bouw en exploitatie van laagsteiger",
    ],
    services: ["Kust-EIA", "Ecologische beoordeling", "Infrastructuurplanning"],
  },
] as const;

export type Project = (typeof projects)[number];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const adelRegal = {
  name: "Adel Regal",
  title: "Marien chemicus & milieuconsultant",
  tagline: "De brug tussen academisch onderzoek en praktische milieu-implementatie",
  image: "/images/team/adel-regal.jpg",
  imageAlt: "Adel Regal — oprichter van Eco Marina Milieudienstverlening",
  bioShort:
    "Marien chemicus en milieuconsultant met drie decennia ervaring in de Rode Zee, de Middellandse Zee en de Golf van Suez, met effectbeoordelingen, monitoringsprogramma's en regelgevingsadvies voor industrie en kustontwikkeling.",
  bioLong: [
    "Adel Regal begon zijn carrière aan de kust van Egypte, waar werk in mariene beschermde gebieden en vroege betrokkenheid bij de Egyptische milieuwet (1997) een basis legde in toegepaste milieuwetenschap en regelgevingscompliance.",
    "Gedurende drie decennia combineerde hij academisch onderzoek met consultancy — milieubeoordelingen voor industriële installaties, scheepvaartoperaties en chemische installaties in Egypte, Japan, Malta, Zweden en Nederland.",
    "Als oprichter van Eco Marina brengt hij deze internationale ervaring naar opdrachtgevers in Nederland en daarbuiten, met focus op rigoureuze wetenschap, praktische mitigatie en langdurig milieubeheer.",
  ],
  credentials: [
    "PhD in mariene chemie & milieu",
    "Hoogleraar aan NIOF (National Institute of Oceanography & Fisheries)",
    "Postdoctoraal onderzoek aan Mie University, Japan",
    "Consultant voor EEAA-, DANIDA- en IOI-projecten",
    "Trainer in EIA, verontreinigingsbeheersing en ocean governance",
  ],
  countries: ["Egypte", "Japan", "Malta", "Zweden", "Nederland"],
  focus: [
    "Milieu-effectbeoordelingen voor industrie en kustontwikkeling",
    "Milieumonitoring en verontreinigingsbeheersing",
    "Regelgevingscompliance en vergunningsondersteuning",
    "Milieutraining voor professionals en gemeenschappen",
  ],
  timeline: [
    { period: "Vroege carrière", label: "Mariene wetenschap en milieuconsultancy, kust Egypte" },
    { period: "1997–", label: "Milieudienstverlening; regelgevingsadvies onder Egyptische milieuwet" },
    { period: "15 jaar", label: "Professor en consultant bij NIOF — grootschalige milieubeoordelingen" },
    { period: "Internationaal", label: "Postdoctoraal onderzoek in Japan; projecten in Malta, Zweden en Egypte" },
    { period: "2019–", label: "Verhuisd naar Nederland; Eco Marina consultancy opgericht" },
    { period: "Heden", label: "Gevestigd in Utrecht; opdrachtgevers in Europa en internationaal" },
  ],
  quote: "Wetenschap moet de zee dienen — niet alleen bestuderen.",
  quoteSource: "Adel Regal",
};

export const mission = {
  mission:
    "Professionele milieubeoordeling, monitoring en training toegankelijk maken voor overheden, industrie en gemeenschappen — geworteld in wetenschap en gericht op praktische resultaten.",
  vision:
    "Kust- en mariene omgevingen waar ontwikkeling en industrie verantwoord opereren, gemeenschappen hun impact begrijpen en ecosystemen op lange termijn beschermd zijn.",
  approach:
    "Wij werken van eerste beoordeling tot compliance en doorlopende monitoring — en leggen uit wat de wetenschap betekent, wat toezichthouders verwachten en wat uw team vervolgens moet doen. Geen onnodige complexiteit.",
};

export const trainingIntro = {
  title: "Training & workshops",
  description:
    "Praktische cursussen onder leiding van Adel Regal, opgebouwd uit decennia EIA-uitvoering, mariene monitoring, industriële compliance en gemeenschapseducatie in Nederland en internationaal.",
} as const;

export const trainingCourses = [
  {
    id: "eia-practitioners",
    title: "Milieu-effectbeoordeling (EIA) voor professionals",
    duration: "2 dagen",
    format: "Op locatie of online",
    description:
      "Een praktische doorloop van het EIA-proces — van bepalen of een beoordeling nodig is tot scoping, basisonderzoek, effectvoorspelling en mitigatie. Geschikt voor wie EIA's moet laten uitvoeren, beoordelen of zelf uitvoert.",
    topics: [
      "Wanneer een EIA verplicht is",
      "Scoping en onderzoeksgrenzen",
      "Basisonderzoek (lucht, water, land, gemeenschappen)",
      "Effectvoorspelling en significantie",
      "Mitigatie en milieubeheerplannen",
      "Documentatie voorbereiden voor toezichthouders",
    ],
    audience: "Milieudeskundigen, projectmanagers, overheidsbeoordelaars, ontwikkelaars",
    experience:
      "Gebaseerd op EIA-werk voor cementfabrieken, olielaagsteigerinfrastructuur, kustontwikkelingen en industriële installaties in Egypte en Europa.",
    pricing: "Op aanvraag — offerte op basis van groepsgrootte en vorm",
    schedule: "In overleg gepland; op locatie of online",
    image: "/images/training/eia-workshop.jpg",
    imageAlt: "Workshop milieu-effectbeoordeling",
  },
  {
    id: "marine-coastal-monitoring",
    title: "Mariene & kustmonitoring",
    duration: "3 dagen",
    format: "Op locatie (inclusief velddemonstratie)",
    description:
      "Hoe u monitoringsprogramma's ontwerpt en uitvoert voor havens, jachthavens, industriële kustlijnen en ondiepe wateren — van monsternemingsontwerp via kwaliteitsborging tot compliance-rapportage.",
    topics: [
      "Locatiespecifieke monitoringsplannen ontwerpen",
      "Waterkwaliteit en sedimentmonsters",
      "Effluent- en lozingsmonitoring",
      "Kwaliteitsborging van data (QA/QC)",
      "Resultaten interpreteren ten opzichte van normen en standaarden",
      "Rapportage voor toezichthouders en management",
    ],
    audience: "Milieudeskundigen, havenexploitanten, jachthavenmanagers, veldtechnici",
    experience:
      "Gebaseerd op mariene chemiepraktijk en langdurige monitoring langs kustlocaties in de Middellandse Zee en de Rode Zee.",
    pricing: "Op aanvraag — inclusief velddemonstratie waar van toepassing",
    schedule: "Doorgaans 3 opeenvolgende dagen; data in overleg",
    image: "/images/training/marine-monitoring.jpg",
    imageAlt: "Mariene milieumonitoring in het veld",
  },
  {
    id: "port-shipping-compliance",
    title: "Mariene milieuregelgeving voor havens & scheepvaart",
    duration: "1 dag",
    format: "Op locatie of online",
    description:
      "Een praktische oriëntatie op milieuvereisten voor scheepvaartagenten, havenexploitanten en scheepsontvangstfaciliteiten — regelgeving gekoppeld aan dagelijkse operaties.",
    topics: [
      "Nationale en internationale maritieme milieuverplichtingen",
      "Afvalontvangst, ballastwater en emissies",
      "Compliance integreren in agentschaps- en havenprocessen",
      "Documentatie, inspecties en administratie",
      "Samenwerking met autoriteiten en vlagstaatvereisten",
    ],
    audience: "Personeel scheepvaartagenten, havenexploitanten, maritieme logistiek managers",
    experience:
      "Ontwikkeld uit implementatie van milieuregelgeving binnen een scheepvaartagent in de Middellandse Zee.",
    pricing: "Op aanvraag — eendaags of gecombineerd met monitoringtraining",
    schedule: "Sessies van 1 dag; op locatie bij havenfaciliteiten mogelijk",
    image: "/images/training/port-shipping.jpg",
    imageAlt: "Milieuregelgeving voor haven en scheepvaart",
  },
  {
    id: "industrial-pollution-control",
    title: "Industriële verontreinigingsbeheersing & afwaterbeheer",
    duration: "2 dagen",
    format: "Op locatie of hybride",
    description:
      "Beheer van vaste, vloeibare en gasvormige emissies op industrieterreinen — inzicht in verontreinigingsroutes, zuiveringsopties (inclusief natuurgebaseerde aanpak) en doorlopende compliance.",
    topics: [
      "Karakterisering van industrieel effluent en emissies",
      "Conventionele en natuurgebaseerde zuiveringsopties",
      "Monitoring van verontreiniging in bodem, water en lucht",
      "Vergunningsvoorwaarden en operationele compliance",
      "Praktische reductiemaatregelen voor uitbreidende installaties",
    ],
    audience: "Fabrieksmanagers, EHS-leads, industriële ontwikkelaars, facilitair coördinatoren",
    experience:
      "Inclusief lessen uit zeewier-gebaseerde afwaterzuiveringspiloten en grootschalige milieuvergunningen voor fabrieken.",
    pricing: "Op aanvraag — afgestemd op installatietype en teamgrootte",
    schedule: "Format van 2 dagen; hybride opties beschikbaar",
    image: "/images/training/industrial-pollution.jpg",
    imageAlt: "Industriële verontreinigingsbeheersing en afwaterbeheer",
  },
  {
    id: "netherlands-community-awareness",
    title: "Milieubewustzijn voor nieuwkomers in Nederland",
    duration: "Halve dag",
    format: "Op locatie",
    description:
      "Begrijpelijke sessies voor bewoners en gemeenschapsorganisaties — over Nederlands afval scheiden, water- en energieverbruik, verontreinigingspreventie en lokale milieucontacten.",
    topics: [
      "Nederlands huishoudelijk afval en recyclingsystemen",
      "Water- en energieverbruik thuis verminderen",
      "Verontreiniging voorkomen in wijken en waterwegen",
      "Wie te contacteren bij lokale milieuzorgen",
    ],
    audience: "Gemeentelijke programma's, NGO's, buurthuizen, scholen, nieuwkomersorganisaties",
    experience:
      "Uitgevoerd als toegankelijke voorlichting in lijn met Eco Marina's gemeenschapseducatie in Utrecht en Nederland.",
    pricing: "Op aanvraag — vaak gefinancierd via gemeentelijke of NGO-programma's",
    schedule: "Sessies van halve dag; ochtend- of middagblokken",
    image: "/images/training/community-awareness.jpg",
    imageAlt: "Milieubewustzijnssessie voor gemeenschappen in Nederland",
    summaryNl:
      "Begrijpelijke sessies voor bewoners en gemeenschapsorganisaties — over Nederlands afval scheiden, water- en energieverbruik, verontreinigingspreventie en lokale milieucontacten.",
  },
] as const;

export const impactAssessmentDetail = {
  overview:
    "Milieu-effectbeoordeling is de basis van verantwoorde ontwikkeling. Eco Marina voert EIA-studies uit die voldoen aan regelgeving en tegelijk echte milieuriscico's en praktische mitigatiemaatregelen identificeren.",
  steps: [
    "Screening — bepalen of een EIA verplicht is en het regelgevingskader vaststellen",
    "Scoping — kernkwesties, onderzoeksgrenzen en belanghebbenden identificeren",
    "Basisonderzoek — veldonderzoek naar milieu- en sociale omstandigheden",
    "Effectbeoordeling — potentiële effecten voorspellen en evalueren",
    "Mitigatie & beheer — maatregelen en milieubeheerplannen ontwerpen",
    "Rapportage — documenten voorbereiden voor regelgevingsbeoordeling en publieke consultatie",
  ],
};

export const monitoringDetail = {
  overview:
    "Of het nu gaat om een operationele industriële installatie, een kusttoerismeproject of een bouwplaats — gestructureerde monitoring levert de data om compliance aan te tonen en ecosystemen te beschermen.",
  areas: [
    { name: "Water & maritiem", items: ["Waterkwaliteit", "Mariene verontreiniging", "Sedimentanalyse", "Effluentmonitoring"] },
    { name: "Lucht & emissies", items: ["Schoorsteenemissies", "Luchtkwaliteit", "Geur", "Stof en fijnstof"] },
    { name: "Industrieel", items: ["Vaste afvalstromen", "Vloeibare effluenten", "Gasvormige emissies", "Verontreinigingsbeoordeling"] },
    { name: "Ecologisch", items: ["Kusthabitatonderzoek", "Biodiversiteitsmonitoring", "Toezicht beschermde gebieden"] },
  ],
};

export const faq = [
  {
    category: "Effectbeoordeling",
    questions: [
      {
        q: "Welke projecten vereisen een milieu-effectbeoordeling?",
        a: "Doorgaans industriële installaties, kust- en toerismeontwikkelingen, infrastructuurprojecten, chemische installaties en activiteiten in of nabij gevoelige ecosystemen. Vereisten hangen af van land en projectschaal.",
      },
      {
        q: "Welke sectoren beoordeelt u?",
        a: "Industriële, maritieme, toeristische en infrastructuuractiviteiten — waaronder fabrieken, scheepvaartagenten, chemische fabrieken en kustontwikkelingen.",
      },
    ],
  },
  {
    category: "Monitoring",
    questions: [
      {
        q: "Wat omvatten uw monitoringsprogramma's?",
        a: "Vaste, gasvormige en vloeibare parameters — waaronder waterkwaliteit, luchtemissies, industriële verontreiniging en gezondheid van kustecosystemen.",
      },
      {
        q: "Biedt u doorlopende monitoringcontracten?",
        a: "Ja. Wij ontwerpen zowel eenmalige basisonderzoeken als doorlopende operationele monitoringsprogramma's met regelmatige rapportage.",
      },
    ],
  },
  {
    category: "Training",
    questions: [
      {
        q: "Voor wie zijn uw trainingen bedoeld?",
        a: "Milieudeskundigen, overheidsbeoordelaars, haven- en scheepvaartpersoneel, industriële EHS-teams, NGO's en gemeenschapsorganisaties. Cursussen variëren van technische EIA- en monitoringworkshops tot begrijpelijke bewustzijnssessies voor nieuwkomers in Nederland.",
      },
      {
        q: "Kunnen cursussen worden afgestemd op onze organisatie?",
        a: "Ja. Wij passen regelmatig inhoud, duur en voorbeelden aan uw sector aan — bijvoorbeeld een haventeam, een industriële fabriek of een gemeentelijk nieuwkomersprogramma. Neem contact op met uw teamgrootte, locatie en doelen.",
      },
      {
        q: "Worden certificaten uitgereikt?",
        a: "Deelnemers ontvangen een samenvatting van cursusvoltooiing. Dit zijn professionele ontwikkelingsworkshops, geen geaccrediteerde opleidingen — de focus ligt op praktische vaardigheden die u direct kunt toepassen.",
      },
    ],
  },
  {
    category: "Algemeen",
    questions: [
      {
        q: "Waar bent u gevestigd en waar werkt u?",
        a: "Kantoor in Utrecht, Nederland. Internationale ervaring in Egypte, Japan, Malta, Zweden en Nederland.",
      },
      {
        q: "Hoe begin ik?",
        a: "Neem per e-mail of telefoon contact op voor een eerste adviesgesprek. Wij bespreken uw projectscope en stellen een aanpak voor.",
      },
      {
        q: "Kunt u helpen met milieuvergunningen?",
        a: "Ja. Effectbeoordelingen, monitoringsprogramma's en regelgevingsadvies zijn kerndiensten.",
      },
    ],
  },
] as const;

export const serviceCategories = [
  {
    title: "Toerisme & kustontwikkeling",
    description: "Eco-design voor hotels, resorts en jachthavens — effectbeoordelingen, biodiversiteitsgevoelige planning en personeelstraining.",
    items: [
      "Eco-design aanbevelingen voor kustinfrastructuur",
      "Effectbeoordelingen en biodiversiteitsgevoelige planning",
      "Personeelstraining en duurzame bedrijfsvoering",
    ],
    image: "/images/services/tourism-marine.jpg",
  },
  {
    title: "Industriële & stedelijke projecten",
    description: "Verontreinigingsrisicoanalyse, milieuvergunningen en adaptieve duurzaamheidsstrategieën voor groeiende bedrijven.",
    items: [
      "Verontreinigingsrisicoanalyse en mitigatieplannen",
      "Milieuvergunningen en regelgevingscompliance",
      "Adaptieve duurzaamheidsstrategieën voor industriële uitbreiding",
    ],
    image: "/images/services/industry.jpg",
  },
  {
    title: "Wetenschappelijke & onderzoekssamenwerking",
    description: "Veldgegevensverzameling, beleidsadvies en technische input voor academisch en regelgevingswerk.",
    items: [
      "Veldgegevensverzameling en milieurapportage",
      "Beleidsadvies voor milieu- en mariene bescherming",
      "Technische input voor academische en beleidspublicaties",
    ],
    image: "/images/services/monitoring.jpg",
  },
  {
    title: "Juridische & monitoringondersteuning",
    description: "Afstemming op milieuwetgeving, compliance-rapportage en coördinatie met belanghebbenden.",
    items: [
      "Afstemming op nationale en internationale milieuwetgeving",
      "Implementatiemonitoring en compliance-rapportage",
      "Coördinatie met belanghebbenden en toezichthouders",
    ],
    image: "/images/services/consultancy.jpg",
  },
] as const;

export const insights = [
  {
    slug: "sustainable-tourism-new-standard",
    title: "Waarom duurzaam toerisme de nieuwe standaard is",
    excerpt:
      "Luxe toerisme verschuift van overdaad naar verantwoordelijkheid. Kustontwikkelaars die ecologisch ontwerp en operationele duurzaamheid integreren, realiseren langdurige waarde en soepelere vergunningen.",
    category: "Toerisme & kust",
    readTime: "4 min lezen",
    date: "juli 2025",
    datePublished: "2025-07-01",
    image: "/images/insights/sustainable-tourism.jpg",
    sections: [
      {
        heading: "Van weelde naar verantwoordelijkheid",
        body: "Reizigers en investeerders verwachten vandaag ervaringen die ecosystemen respecteren. Privacy die habitats behoudt, comfort ontworpen met resource-efficiëntie en authenticiteit geworteld in lokale ecologie worden de maatstaf voor kustontwikkeling — geen optionele extra's.",
      },
      {
        heading: "Casusinzicht: kusthospitality",
        body: "In de Rode Zee-regio zien resorts die vroeg investeren in waterefficiëntie, beplanting afgestemd op lokale omstandigheden en personeelstraining vaak soepelere vergunningsprocessen en lagere operationele kosten. Het gaat niet om perfectie op dag één — het gaat om milieuprestaties inbedden in hoe het pand draait, niet er later aan vastplakken.",
      },
      {
        heading: "Waarom het ertoe doet voor ontwikkelaars",
        body: "Geïnformeerde reizigers betrekken duurzaamheid bij boekingsbeslissingen. Investeerders zien langdurige waarde in ecologische compliance en certificering. Overheden geven steeds vaker de voorkeur aan laag-impactprojecten met soepelere vergunningstrajecten.",
      },
      {
        heading: "Hoe Eco Marina toerismeprojecten ondersteunt",
        body: "Wij helpen exploitanten locatiegevoeligheid en ecologische risico's te beoordelen, duurzaam ontwerp en bedrijfsvoering te integreren en te werken naar erkende certificeringen zoals Green Globe of EU Ecolabel. Neem contact op om uw kust- of toerismeproject te bespreken.",
      },
    ],
  },
  {
    slug: "environmental-compliance-accessible",
    title: "Milieudienstverlening hoort geen luxe te zijn",
    excerpt:
      "Professionele milieubeoordeling moet toegankelijk zijn voor bedrijven van elke omvang. Transparante scoping, tijdsefficiënte levering en praktische mitigatie houden kosten in verhouding tot projectschaal.",
    category: "Consultancy",
    readTime: "3 min lezen",
    date: "juli 2025",
    datePublished: "2025-07-15",
    image: "/images/insights/environmental-compliance.jpg",
    sections: [
      {
        heading: "Consultancy in verhouding houden",
        body: "Milieuw werk hoeft geen open-ended studies met onduidelijke eindpunten te betekenen. Een goed afgebakende opdracht — wat regelgeving vereist, wat locatieomstandigheden vragen, welke deliverables u echt nodig heeft — houdt kosten eerlijk of u nu een jachthaven, fabriek of kustontwikkeling runt.",
      },
      {
        heading: "Transparante voorstellen",
        body: "Elke opdracht begint met heldere scoping: wat regelgeving vereist, wat locatieomstandigheden vragen en welke deliverables de opdrachtgever nodig heeft. Voorstellen zijn gestructureerd voor implementatie in de praktijk — geen open-ended studies met onduidelijke eindpunten.",
      },
      {
        heading: "Internationale context, lokale toepassing",
        body: "Eco Marina brengt ervaring uit Egypte, Japan, Malta, Zweden en Nederland in elk project. Internationale standaarden worden toegepast met lokale regelgevingskennis — de combinatie die vergunningen oplevert die in de praktijk standhouden.",
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
    category: "Tools voor ontwikkelaars",
    items: [
      {
        title: "Checklist duurzame locatiebeoordeling",
        description: "Identificeer gevoelige zones, ecosysteemoverlappingen en regelgevingsflags vóór aanvang. Op aanvraag beschikbaar.",
      },
      {
        title: "Sjabloon kustrisicobeoordeling",
        description: "Werkblad voor infrastructuur- en waterfrontplanning in gevoelige gebieden. Op aanvraag beschikbaar.",
      },
    ],
  },
  {
    category: "Toerismesector",
    items: [
      {
        title: "Gids duurzame bedrijfsvoering voor hotels & resorts",
        description: "Waterbesparing, energiereductie en biodiversiteitsrespect voor kusthospitality. Op aanvraag beschikbaar.",
      },
      {
        title: "Eco-bewustzijnstraining (personeelseditie)",
        description: "Presentatieklare content voor interne duurzaamheidsworkshops en personeelsintroductie. Op aanvraag beschikbaar.",
      },
    ],
  },
  {
    category: "Onderwijs & gemeenschap",
    items: [
      {
        title: "Primer mariene bescherming",
        description: "Toegankelijk overzicht van mariene ecosystemen, bedreigingen en beschermingsacties voor docenten en gemeenschapsorganisaties. Op aanvraag beschikbaar.",
      },
      {
        title: "Milieuwetgeving uitgelegd",
        description: "Begrijpelijke gids over vergunningsprocessen en hoe bedrijfsbeslissingen ecosystemen beïnvloeden. Op aanvraag beschikbaar.",
      },
      {
        title: "Toolkit kustleven & eco-bewustzijn",
        description: "Praktische richtlijnen over afval, water en biodiversiteit voor huishoudens en toerisme-exploitanten. Op aanvraag beschikbaar.",
      },
    ],
  },
  {
    category: "Beleid & certificering",
    items: [
      {
        title: "Routekaart milieuvergunning",
        description: "Stapsgewijs overzicht voor het doorlopen van vergunningsprocessen per projecttype. Op aanvraag beschikbaar.",
      },
      {
        title: "EU Ecolabel voorbereidingschecklist",
        description: "Criteria-overzicht en gereedheidstaken voor toerisme- en kustexploitanten. Op aanvraag beschikbaar.",
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
    location: "Indonesië",
    logo: "/images/partners/egytronic.png",
    enabledByDefault: true,
  },
  {
    id: "reds",
    name: "R.E.D.S — Renewable Energy Desalination Systems",
    location: "Egypte",
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
    title: "Over Adel Regal",
    description:
      "Adel Regal — marien chemicus, milieuconsultant en oprichter van Eco Marina. Internationale ervaring in Egypte, Japan, Malta, Zweden en Nederland.",
    eyebrow: "Over",
    founderOf: "Oprichter van",
    credentials: "Kwalificaties",
    careerTimeline: "Loopbaan",
    areasOfWork: "Werkgebieden",
    countries: "Landen van ervaring",
    ourValues: "Onze waarden",
    linkedIn: "LinkedIn-profiel →",
  },
  faq: {
    title: "Veelgestelde vragen",
    description:
      "Veelgestelde vragen over de diensten, werkwijze en milieucompliance van Eco Marina.",
    eyebrow: "FAQ",
    heading: "Veelgestelde vragen",
  },
  services: {
    title: "Diensten",
    description: "Milieu- en sociale effectbeoordeling, monitoringprogramma's, training en volledige adviesdiensten.",
    eyebrow: "Diensten",
    heading: "Onze diensten",
    intro:
      "Milieu- en sociale effectbeoordeling, monitoringprogramma's en duurzaamheidstraining voor overheden, industrie en kustontwikkeling.",
    coreTitle: "Kerndiensten",
    specialistTitle: "Gespecialiseerde adviesgebieden",
    specialistIntro:
      "Maatwerkondersteuning in toerisme, industrie, onderzoekssamenwerking en regelgevingscompliance.",
    legacyTitle: "Advies, industrie, maritiem & afval",
    legacyIntro: "Brede adviesgebieden die wij naast onze kerndiensten ondersteunen.",
    cta: "Offerte aanvragen",
  },
  projects: {
    title: "Casestudies",
    description:
      "Casestudies van Eco Marina — scheepvaart, industrie, afvalwater en kustprojecten.",
    eyebrow: "Cases",
    heading: "Casestudies",
    intro:
      "Milieuprojecten in scheepvaart, industrie, afvalwaterbehandeling en kustinfrastructuur.",
    imageAlt: "Implementatie van milieuregelgeving bij een scheepvaartagentschap",
    cta: "Bespreek een vergelijkbaar project",
  },
  insights: {
    title: "Inzichten",
    description:
      "Inzichten van Eco Marina — duurzaam toerisme, compliance en kustontwikkeling.",
    eyebrow: "Inzichten",
    heading: "Veldnotities & perspectieven",
    intro:
      "Praktische inzichten over milieuconsultancy, kustontwikkeling en duurzame bedrijfsvoering — uit decennia internationaal projectwerk.",
    writtenBy: "Geschreven door",
    founderNote: ", oprichter van Eco Marina.",
    discuss: "Bespreek uw project",
  },
  resources: {
    title: "Materialen",
    description:
      "Milieugidsen, checklists en sjablonen van Eco Marina — voor ontwikkelaars, toerismebedrijven en gemeenschappen.",
    eyebrow: "Materialen",
    heading: "Praktische tools voor duurzame impact",
    intro:
      "Gidsen, checklists en sjablonen ter ondersteuning van milieubewuste beslissingen — op aanvraag via ons adviesteam.",
    requestTitle: "Materialen aanvragen",
    requestIntro:
      "Deze materialen worden verstrekt aan klanten en projectpartners. Neem contact op voor toegang of maatwerkversies voor uw organisatie.",
  },
  contact: {
    title: "Contact",
    description:
      "Neem contact op met Eco Marina voor effectbeoordeling, monitoring of training. Eerste adviesgesprek gratis.",
  },
  training: {
    title: "Training & workshops",
  },
  impactAssessment: {
    title: "Milieu-effectbeoordeling (MER)",
    description: "MER-studies voor industriële, maritieme, toeristische en infrastructuurprojecten.",
    serviceEyebrow: "Dienst",
    cta: "Bespreek uw MER-project",
  },
  monitoring: {
    title: "Milieumonitoring",
    description: "Ontwerp van monitoringprogramma's en compliancerapportage voor industriële en kustlocaties.",
    serviceEyebrow: "Dienst",
    cta: "Ontwerp een monitoringprogramma",
  },
  impact: {
    title: "Casestudies",
    description: "Casestudies van Eco Marina.",
    heading: "Casestudies",
    body: "Deze pagina is verplaatst. Onze projectimpact wordt gepresenteerd via gedetailleerde casestudies.",
    cta: "Alle casestudies bekijken →",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Diensten",
    href: "/services",
    children: [
      { label: "Effectbeoordeling", href: "/services/impact-assessment" },
      { label: "Monitoringsprogramma's", href: "/services/monitoring" },
      { label: "Training", href: "/training" },
      { label: "Alle diensten", href: "/services" },
    ],
  },
  { label: "Cases", href: "/projects" },
  { label: "Inzichten", href: "/insights" },
  { label: "Materialen", href: "/resources" },
  { label: "Over Adel", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  { label: "Effectbeoordeling", href: "/services/impact-assessment" },
  { label: "Monitoringsprogramma's", href: "/services/monitoring" },
  { label: "Training", href: "/training" },
  { label: "Casestudies", href: "/projects" },
  { label: "Inzichten", href: "/insights" },
  { label: "Materialen", href: "/resources" },
  { label: "Over Adel Regal", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const processSteps = [
  { step: "01", title: "Eerste adviesgesprek", description: "Uw project, locatie en regelgevingsvereisten in kaart brengen." },
  { step: "02", title: "Beoordeling & planning", description: "Veldwerk, basisdata of programma-ontwerp afgestemd op uw locatie." },
  { step: "03", title: "Levering", description: "Rapporten, monitoringsystemen of training met volledige documentatie." },
  { step: "04", title: "Nazorg", description: "Vergunningsondersteuning, compliance-rapportage en doorlopend advies." },
] as const;
