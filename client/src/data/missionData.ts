export interface MissionStage {
  id: string;
  code: string;
  shortLabel: string;
  fullLabel: string;
  altitudeKm: string;
}

export interface PayloadMetric {
  label: string;
  value: string;
}

export interface PayloadFeature {
  title: string;
  desc: string;
}

export interface PayloadSystem {
  id: string;
  code: string;
  orbitTag: string;
  title: string;
  subtitle: string;
  category: string;
  featured: boolean;
  isPrivate?: boolean;
  valueProp: string;
  highlight: string;
  description: string;
  coordinates: string;
  status: 'NOMINAL // LIVE' | 'DEPLOYED // LIVE' | 'INTERNAL // SECURE';
  caseStudy: {
    problem: string;
    solution: string;
    impact: string;
  };
  metrics: PayloadMetric[];
  keyFeatures: PayloadFeature[];
  techStack: string[];
  image: string;
  githubLink: string;
  liveLink: string;
  liveDomain: string;
}

export interface FlightLogEntry {
  id: string;
  missionCode: string;
  period: string;
  status: 'ACTIVE ORBIT' | 'COMPLETED';
  role: string;
  organization: string;
  location: string;
  summary: string;
  telemetryBullets: string[];
  tags: string[];
}

export interface HonorRecord {
  id: string;
  code: string;
  title: string;
  issuer: string;
  badge: string;
  summary: string;
  image?: string;
  link?: string;
}

export interface CapabilityBay {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  telemetrySpec: string;
  description: string;
  modules: string[];
  stack: string[];
}

export const MISSION_STAGES: MissionStage[] = [
  { id: 'stage-01', code: '01', shortLabel: 'HELLO', fullLabel: 'STAGE 01 // HELLO', altitudeKm: '408 KM LEO' },
  { id: 'stage-02', code: '02', shortLabel: 'PAYLOADS', fullLabel: 'STAGE 02 // PAYLOADS', altitudeKm: '1,240 KM MEO' },
  { id: 'stage-03', code: '03', shortLabel: 'FLIGHT LOG', fullLabel: 'STAGE 03 // FLIGHT LOG', altitudeKm: '8,600 KM' },
  { id: 'stage-04', code: '04', shortLabel: 'HONORS', fullLabel: 'STAGE 04 // HONORS', altitudeKm: '20,200 KM' },
  { id: 'stage-05', code: '05', shortLabel: 'CAPABILITIES', fullLabel: 'STAGE 05 // CAPABILITIES', altitudeKm: '35,786 KM GEO' },
  { id: 'stage-06', code: '06', shortLabel: 'COMMS', fullLabel: 'STAGE 06 // COMMS', altitudeKm: 'DEEP SPACE' },
];

export const PAYLOAD_SYSTEMS: PayloadSystem[] = [
  {
    id: 'evalo',
    code: 'PLD-01',
    orbitTag: 'ORBIT 01 // AI EDTECH & VISION',
    title: 'Evalo',
    subtitle: 'AI Assessment & Anti-Cheat Proctoring Platform with OpenCV OMR',
    category: 'AI EDTECH',
    featured: true,
    valueProp: 'AI-powered exam platform with 3-strike anti-cheat proctoring and automated OpenCV OMR bubble-sheet grading.',
    highlight: 'Automated OMR & 3-Strike Lock',
    description:
      'An end-to-end digital assessment platform combining strict 3-strike fullscreen proctoring, flexible GenAI or manual exam authoring, student study pointers, and automated OpenCV OMR bubble-sheet grading.',
    coordinates: 'RA 14h 29m · DEC +62° 40′',
    status: 'NOMINAL // LIVE',
    caseStudy: {
      problem:
        'Educators struggled with widespread online exam tab-switching, time-consuming manual quiz authoring, and slow paper bubble-sheet grading.',
      solution:
        'Engineered a full-stack Next.js 14 + Python FastAPI platform enforcing 3-strike fullscreen proctoring, GenAI/manual exam generation, and OpenCV perspective-corrected OMR sheet scanning.',
      impact:
        'Automated quiz authoring and physical bubble-sheet grading while enforcing strict 3-strike anti-cheat integrity across live classroom assessments.',
    },
    metrics: [
      { label: 'OMR ENGINE', value: 'OpenCV Vision' },
      { label: 'PROCTORING', value: '3-Strike Lock' },
      { label: 'AUTHORING', value: 'GenAI + Manual' },
      { label: 'RANDOMIZATION', value: 'Per-Session Seed' },
    ],
    keyFeatures: [
      {
        title: 'Dual-Mode Exam Authoring (GenAI + Manual)',
        desc: 'Construct assessments automatically with LLM-generated subject questions and verified keys, or author custom item banks manually.',
      },
      {
        title: '3-Strike Anti-Cheat Telemetry',
        desc: 'Enforces fullscreen lock on launch, intercepting Alt+Tab, Esc, and window blur events with instant warnings and auto-submission on strike 3.',
      },
      {
        title: 'OpenCV OMR Bubble-Sheet Scanner',
        desc: 'Applies perspective warp correction to camera/scanned paper sheets, decoding 6-digit Student IDs and grading bubbles with anomaly flags.',
      },
    ],
    techStack: ['Next.js 14', 'Python FastAPI', 'OpenCV OMR', 'PostgreSQL', 'GenAI / LLMs'],
    image: '/evalo-actual-ui.png',
    githubLink: 'https://github.com/YtterStick/Long-Quiz',
    liveLink: 'https://evalo-edu.vercel.app/',
    liveDomain: 'evalo-edu.vercel.app',
  },
  {
    id: 'tactiq',
    code: 'PLD-02',
    orbitTag: 'ORBIT 02 // MULTI-TENANT SAAS OS',
    title: 'Tactiq',
    subtitle: 'Unified Multi-Tenant Business OS for Client Portals, CRM & Invoicing',
    category: 'MULTI-TENANT SAAS',
    featured: true,
    valueProp: 'Multi-tenant Next.js business OS unifying client portals, CRM, invoicing, and project delivery.',
    highlight: 'Unified CRM, Invoicing & Portals',
    description:
      'A multi-workspace business operating system uniting customer relationships, invoicing, isolated client portals, and project delivery inside one connected command deck.',
    coordinates: 'RA 18h 36m · DEC +38° 47′',
    status: 'NOMINAL // LIVE',
    caseStudy: {
      problem:
        'Service teams and agencies lose billable hours and operational visibility switching between disconnected CRM, invoicing, and client status tools.',
      solution:
        'Architected a multi-tenant Next.js + TypeScript SaaS platform with workspace isolation, dedicated client portals, full action audit logs, and Asia/Manila PHP localization.',
      impact:
        'Consolidated client portals, CRM pipelines, invoicing, and milestone delivery into one cohesive multi-tenant workspace.',
    },
    metrics: [
      { label: 'ARCHITECTURE', value: 'Multi-Tenant OS' },
      { label: 'CLIENT ACCESS', value: 'Isolated Portals' },
      { label: 'GOVERNANCE', value: 'Full Audit Trail' },
      { label: 'LOCALIZATION', value: 'Asia/Manila · PHP' },
    ],
    keyFeatures: [
      {
        title: 'Isolated Multi-Workspace Tenancy',
        desc: 'Manage distinct agency brands, departments, or client units under single sign-on with strict tenant data boundaries.',
      },
      {
        title: 'Dedicated Client Portals',
        desc: 'Expose real-time deliverables, milestones, and invoices to external clients while keeping internal team workflows private.',
      },
      {
        title: 'Immutable Operational Audit Trail',
        desc: 'Logs every CRM update, invoice mutation, and task state transition with actor attribution and UTC+8 timestamps.',
      },
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Multi-Tenant SaaS'],
    image: '/images/tactiq.png',
    githubLink: '#',
    liveLink: 'https://tactiq-web.onrender.com/',
    liveDomain: 'tactiq-web.onrender.com',
  },
  {
    id: 'aniverse',
    code: 'PLD-03',
    orbitTag: 'ORBIT 03 // EDGE STREAMING NETWORK',
    title: 'AniVerse',
    subtitle: 'Edge-Deployed Dark-Mode Anime Discovery, Watchlist & Streaming App',
    category: 'EDGE WEB APP',
    featured: true,
    valueProp: 'Edge-deployed dark-mode anime discovery and streaming web app on Cloudflare Pages with instant search and watchlist sync.',
    highlight: 'Sub-Second Edge Delivery',
    description:
      'A low-latency dark-mode anime discovery and streaming interface deployed globally on Cloudflare Pages, featuring instant catalog search, trending telemetry, and persistent watchlist/history sync.',
    coordinates: 'RA 05h 35m · DEC -05° 23′',
    status: 'NOMINAL // LIVE',
    caseStudy: {
      problem:
        'Conventional anime streaming sites suffer from heavy ad-clutter, sluggish search, and lost episode progress on mobile devices.',
      solution:
        'Built an edge-deployed React Vite + Tailwind CSS streaming app on Cloudflare Pages with debounced instant search, curated discovery rails, and persistent watchlist state.',
      impact:
        'Achieved sub-second global page loads on Cloudflare’s edge with distraction-free playback and seamless episode tracking.',
    },
    metrics: [
      { label: 'EDGE NETWORK', value: 'Cloudflare Pages' },
      { label: 'SEARCH LATENCY', value: 'Instant Filter' },
      { label: 'SYNC ENGINE', value: 'Watchlist + History' },
      { label: 'INTERFACE', value: 'Mobile-First Dark' },
    ],
    keyFeatures: [
      {
        title: 'Instant Catalog Discovery & Filtering',
        desc: 'Real-time search and genre/season discovery across trending and seasonal anime catalogs.',
      },
      {
        title: 'Persistent Watchlist & Episode Sync',
        desc: 'Tracks episode playback progress and personal watchlists seamlessly across browsing sessions.',
      },
      {
        title: 'Global Edge Deployment',
        desc: 'Served from Cloudflare Pages edge nodes for crisp mobile responsiveness and rapid asset delivery.',
      },
    ],
    techStack: ['React Vite', 'Tailwind CSS', 'Cloudflare Pages', 'REST APIs'],
    image: '/images/aniverse.png',
    githubLink: '#',
    liveLink: 'https://anime-verse-ytter.pages.dev/',
    liveDomain: 'anime-verse-ytter.pages.dev',
  },
  {
    id: 'starwashph',
    code: 'PLD-04',
    orbitTag: 'DOCKED MODULE // ENTERPRISE LOGISTICS',
    title: 'StarWashPH',
    subtitle: 'Multi-Branch Laundry Logistics & Customer Order Tracking Platform',
    category: 'ENTERPRISE LOGISTICS',
    featured: false,
    valueProp: 'Full-stack Spring Boot & React operations platform unifying multi-branch laundry logistics and customer order tracking.',
    highlight: '40% Less Admin Friction',
    description:
      'A full-stack Spring Boot, MongoDB, and React platform unifying multi-branch laundry dispatch, self-service customer order tracking, and executive revenue telemetry.',
    coordinates: 'RA 20h 41m · DEC +45° 16′',
    status: 'DEPLOYED // LIVE',
    caseStudy: {
      problem:
        'Multi-branch laundry operations relied on manual spreadsheets and fragmented messaging, creating dispatch bottlenecks and status blindspots.',
      solution:
        'Engineered a Spring Boot + MongoDB backend paired with a React portal for automated branch routing, RBAC staff dashboards, and live order tracking.',
      impact:
        'Cut manual administrative friction by 40% while unifying customer order tracking across branches.',
    },
    metrics: [
      { label: 'ADMIN FRICTION', value: '-40% Overhead' },
      { label: 'OPERATIONS', value: 'Multi-Branch Sync' },
      { label: 'BACKEND', value: 'Java Spring Boot' },
      { label: 'DATA STORE', value: 'MongoDB' },
    ],
    keyFeatures: [
      {
        title: 'Multi-Branch Lifecycle Dispatch',
        desc: 'Tracks garment batches end-to-end across branches with automated stage transitions.',
      },
      {
        title: 'Self-Service Customer Tracking',
        desc: 'Enables pickup scheduling and real-time order status lookups from any device.',
      },
    ],
    techStack: ['Spring Boot', 'Java', 'React', 'Tailwind CSS', 'MongoDB'],
    image: '/starwash.jpg',
    githubLink: 'https://github.com/YtterStick/thesis',
    liveLink: 'https://www.starwashph.com/',
    liveDomain: 'starwashph.com',
  },
  {
    id: 'hr-tna-payroll',
    code: 'PLD-05',
    orbitTag: 'DOCKED MODULE // ENTERPRISE PAYROLL',
    title: 'HR TNA Payroll',
    subtitle: 'Centralized HR, Time-Attendance & Automated Payroll Engine',
    category: 'HR & PAYROLL',
    featured: false,
    isPrivate: true,
    valueProp: 'Centralized HR & time-attendance payroll system automating tax, benefits, overtime deductions, and audit logs.',
    highlight: 'Automated Tax, Overtime & Audits',
    description:
      'A centralized human resources and time-and-attendance (TNA) payroll engine automating government deductions, overtime computation, salary grades, and compliance audit logs.',
    coordinates: 'RA 12h 26m · DEC -63° 05′',
    status: 'INTERNAL // SECURE',
    caseStudy: {
      problem:
        'Spreadsheet attendance reconciliation caused payout delays, manual tax/overtime calculation errors, and compliance audit gaps.',
      solution:
        'Built a relational MySQL + PHP payroll engine linking biometric/clock-in attendance logs directly to automated tax, benefit, and overtime rules.',
      impact:
        'Eliminated manual spreadsheet reconciliation and enforced role-based audit trails across every payroll cycle.',
    },
    metrics: [
      { label: 'PAYROLL RUNS', value: 'Automated Engine' },
      { label: 'DEDUCTIONS', value: 'Tax · Benefits · OT' },
      { label: 'GOVERNANCE', value: 'Role Audit Logs' },
      { label: 'STACK', value: 'PHP · MySQL · JS' },
    ],
    keyFeatures: [
      {
        title: 'Attendance-to-Payroll Sync',
        desc: 'Transforms raw clock-in/out shifts, leave balances, and overtime hours directly into net pay runs.',
      },
      {
        title: 'Role-Based Compliance Auditing',
        desc: 'Records salary grade adjustments, tax tables, and disbursement approvals with full traceability.',
      },
    ],
    techStack: ['PHP', 'MySQL', 'JavaScript', 'Relational SQL', 'RBAC Audits'],
    image: '/payroll.jpg',
    githubLink: '#',
    liveLink: '#',
    liveDomain: 'Internal Deployment',
  },
];

export const FLIGHT_LOG: FlightLogEntry[] = [
  {
    id: 'sti-faculty',
    missionCode: 'FLT-03 // CURRENT MISSION',
    period: 'Aug 2025 – Present',
    status: 'ACTIVE ORBIT',
    role: 'IT Faculty Teacher',
    organization: 'STI College Fairview',
    location: 'Quezon City, Philippines',
    summary:
      'Leading collegiate instruction and hands-on laboratory engineering for Advanced Database Systems and Network Technology 2.',
    telemetryBullets: [
      'Designed production-grade SQL query optimization, indexing, transaction isolation, and relational schema labs for BSIT cohorts.',
      'Mentored student engineering teams through enterprise architecture, network routing/switching topologies, and capstone system builds.',
      'Built internal digital assessment workflows (Evalo) integrating OpenCV OMR scanning and proctored testing.',
    ],
    tags: ['Advanced Database', 'Network Technology 2', 'SQL Indexing', 'Systems Mentoring'],
  },
  {
    id: '3am-digital',
    missionCode: 'FLT-02 // COMMERCIAL DEPLOYMENT',
    period: 'Jan – May 2026',
    status: 'COMPLETED',
    role: 'Software Developer',
    organization: '3 AM Digital Media / NLP Services',
    location: 'Metro Manila, Philippines',
    summary:
      'Engineered full-stack client web applications, workflow automations, and scalable SaaS interfaces for commercial operations.',
    telemetryBullets: [
      'Shipped responsive full-stack web platforms and internal operational dashboards tailored to client business workflows.',
      'Integrated REST APIs, structured relational databases, and automated operational pipelines reducing manual turnaround time.',
    ],
    tags: ['Full-Stack Web', 'TypeScript / React', 'API Integration', 'Workflow Automation'],
  },
  {
    id: 'sti-mis',
    missionCode: 'FLT-01 // INFRASTRUCTURE OPS',
    period: 'Jan – Dec 2024',
    status: 'COMPLETED',
    role: 'MIS Student Assistant',
    organization: 'STI College Fairview',
    location: 'Quezon City, Philippines',
    summary:
      'Supported campus-wide IT infrastructure, laboratory workstations, network troubleshooting, and academic systems administration.',
    telemetryBullets: [
      'Maintained campus laboratory hardware, LAN connectivity, software deployments, and technical support operations.',
      'Assisted MIS engineers with system diagnostics, account provisioning, and rapid classroom readiness across departments.',
    ],
    tags: ['Campus Infrastructure', 'Network Diagnostics', 'Systems Support', 'MIS Ops'],
  },
];

export const HONOR_RECORDS: HonorRecord[] = [
  {
    id: 'cluster-champ',
    code: 'HNR-01',
    title: 'Codefest Cluster Champion',
    issuer: 'STI Tagisan ng Talino',
    badge: '1ST PLACE REGIONAL',
    summary: 'Captured 1st Place Regional Cluster Championship in competitive timed software engineering and algorithmic system building.',
    image: '/codefest-champ.jpg',
    link: 'https://www.facebook.com/photo/?fbid=1129894329173285&set=pcb.1129900962505955',
  },
  {
    id: 'national-finalist',
    code: 'HNR-02',
    title: 'National Finalist Stage',
    issuer: 'STI Education Services Group',
    badge: '32-HOUR APP CHALLENGE',
    summary: 'Represented the cluster on the National Finalist stage, architecting and pitching a full working application under a 32-hour marathon.',
    image: '/codefest-national-award.jpg',
    link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881',
  },
  {
    id: 'national-delegation',
    code: 'HNR-03',
    title: 'National Entrant Delegation',
    issuer: 'STI College Fairview Championship Team',
    badge: 'NATIONAL DELEGATE',
    summary: 'Selected as lead builder in STI College Fairview’s official championship delegation competing against top campuses nationwide.',
    image: '/codefest-champion-again.jpg',
    link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881',
  },
  {
    id: 'coding-champ-feature',
    code: 'HNR-04',
    title: 'Campus Coding Champ Feature',
    issuer: 'STI College Fairview BSIT Spotlight',
    badge: 'CAMPUS RECOGNITION',
    summary: 'Featured officially by STI College Fairview for competitive software engineering excellence and technical leadership in BSIT.',
    image: '/recognition-andrei.jpg',
    link: 'https://www.facebook.com/fairview.sti.edu/posts/-meet-%F0%9D%90%80%F0%9D%90%A7%F0%9D%90%9D%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%A2-%F0%9D%90%83%F0%9D%90%A2%F0%9D%90%A5%F0%9D%90%9A%F0%9D%90%A0-our-coding-champ-and-2nd-year-bs-in-information-technology-st/892945256201528/',
  },
  {
    id: 'sap-s4hana',
    code: 'HNR-05',
    title: 'SAP S/4HANA Certification',
    issuer: 'Enterprise ERP & Database Systems',
    badge: 'CERTIFIED CREDENTIAL',
    summary: 'Validated proficiency in enterprise resource planning workflows, core business processes, and SAP S/4HANA data architecture.',
  },
];

export const CAPABILITY_BAYS: CapabilityBay[] = [
  {
    id: 'web-saas',
    code: '01',
    title: '01 Web & SaaS',
    subtitle: 'Multi-Tenant Platforms & Edge Interfaces',
    telemetrySpec: 'NEXT.JS // REACT // TYPESCRIPT // EDGE',
    description:
      'Architecting responsive, production-hardened web applications and multi-tenant SaaS workspaces with clean RBAC boundaries, audit trails, and sub-second edge delivery.',
    modules: [
      'Multi-tenant workspace & client portal architecture',
      'App Router SSR, REST APIs, and state synchronization',
      'High-craft responsive UI with Tailwind CSS & Framer Motion',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cloudflare Pages'],
  },
  {
    id: 'ai-vision',
    code: '02',
    title: '02 AI & Vision',
    subtitle: 'Computer Vision OMR & LLM Automation',
    telemetrySpec: 'FASTAPI // OPENCV // GENAI PIPELINES',
    description:
      'Combining Python FastAPI backends, OpenCV perspective-corrected optical mark recognition, and structured LLM generation for high-integrity educational and business tools.',
    modules: [
      'OpenCV OMR sheet warp correction & bubble decoding',
      'Structured GenAI assessment authoring & study assistants',
      'Real-time anti-cheat telemetry & proctoring guardrails',
    ],
    stack: ['Python FastAPI', 'OpenCV', 'GenAI / LLMs', 'Prompt Pipelines', 'Automated Grading'],
  },
  {
    id: 'systems',
    code: '03',
    title: '03 Systems',
    subtitle: 'Advanced Databases, Enterprise Backends & Networks',
    telemetrySpec: 'POSTGRESQL // SPRING BOOT // NETWORKING',
    description:
      'Designing normalized schemas, high-throughput SQL indexes, Java Spring Boot / PHP backends, and resilient network architectures grounded in collegiate teaching and production ops.',
    modules: [
      'Relational schema design, indexing & query optimization',
      'Enterprise logistics, HR/TNA payroll & SAP S/4HANA flows',
      'Network Technology 2 routing, switching & lab systems',
    ],
    stack: ['PostgreSQL', 'MySQL', 'MongoDB', 'Java Spring Boot', 'PHP', 'SAP S/4HANA', 'Networking'],
  },
];
