/** Verified against the supplied CV and GitHub profile on 25 November 2026.
 * Keep personal links here; omitted URLs never render as placeholder links.
 */
export const profile = {
  name: "Aditya Jaiswal",
  initials: "aj",
  email: "adityajaiswal9818@gmail.com",
  github: "https://github.com/adityajaiswal1724",
  linkedin: "https://www.linkedin.com/in/adityajaiswal-sde",
  cvUrl: "/Aditya-Jaiswal-CV.pdf",
  role: "Full-Stack Developer & AI Automation Engineer",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/adityajaiswal1724",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/adityajaiswal-sde",
      icon: "linkedin",
    },
  ],
};

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  category: "Applications" | "Web experiences";
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  liveUrl: string;
  repository?: string;
  featured?: boolean;
  color: string;
  overview: string;
  engineering: string[];
  scope: string;
};

export const projects: Project[] = [
  {
    id: "finance",
    name: "Finance, without the friction.",
    subtitle: "Demo Company · Finance Workspace",
    category: "Applications",
    featured: true,
    color: "sage",
    description:
      "A complete finance operations workspace. Multi-currency invoicing, precise accounting, and reporting—brought together in one thoughtful interface.",
    image: "/projects/finance.webp",
    imageAlt:
      "Demo Company finance workspace showing financial summaries, navigation, and accounting operations",
    tags: ["React 19", "TypeScript", "Decimal.js", "Vitest"],
    liveUrl: "https://digitalmediamarketingfinancedashboa.vercel.app/",
    repository:
      "https://github.com/adityajaiswal1724/digitalmediamarketing_finance_dashboard",
    overview:
      "An interactive, multi-role finance administration SPA built around deterministic accounting workflows. It brings invoices, credit notes, payments, and reporting into a consistent typed domain.",
    engineering: [
      "Decimal.js arithmetic for financial calculations and multi-currency records.",
      "GST rules, credit allocation, invoice workflows, and PDF/CSV exports.",
      "Deterministic sample data and tests around accounting invariants.",
    ],
    scope:
      "Frontend demonstration with sample data and browser-local state. Role switching is a UI simulation, not server-side authentication.",
  },
  {
    id: "crustal",
    name: "An identity for intelligent work.",
    subtitle: "Crustal AI · Automation Studio",
    category: "Web experiences",
    color: "violet",
    description:
      "A cinematic AI-services website with reusable service pages, purposeful motion, and a carefully structured contact experience.",
    image: "/projects/crustal.webp",
    imageAlt:
      "Crustal AI automation studio website with a dark futuristic interface",
    tags: ["Next.js", "TypeScript", "Zod", "Nodemailer"],
    liveUrl: "https://crustalai.vercel.app/",
    overview:
      "A web platform presenting AI automation services through a cohesive visual language, structured service architecture, and clear paths to get in touch.",
    engineering: [
      "Reusable Next.js and TypeScript service architecture.",
      "Code-native motion and structured SEO.",
      "Validated contact pipeline using Zod and Nodemailer.",
    ],
    scope:
      "Deployed services website. A public source repository is not linked in the supplied profile.",
  },
  {
    id: "dashboard",
    name: "One workspace. The whole picture.",
    subtitle: "Unified Customer Operations",
    category: "Applications",
    color: "blue",
    description:
      "Commerce, marketing, scheduling, and payments in a unified dashboard, with typed data models and explainable financial metrics.",
    image: "/projects/dashboard.webp",
    imageAlt:
      "Customer operations dashboard with charts, business metrics, and sidebar navigation",
    tags: ["Next.js", "Recharts", "TanStack", "Playwright"],
    liveUrl: "https://demo-admin-dashboard-dun.vercel.app/",
    repository: "https://github.com/adityajaiswal1724/demo-admin-dashboard",
    overview:
      "A customer operations dashboard demonstration that brings customers, bookings, commerce, messaging, and finance into a shared interface.",
    engineering: [
      "Typed domain models and reusable data tables with search and filtering.",
      "Ledger-derived financial metrics and Recharts visualizations.",
      "Playwright coverage for key interaction paths.",
    ],
    scope:
      "Frontend prototype with deterministic fixtures. Integrations, authentication, and payments are simulated; no real transactions are processed.",
  },
  {
    id: "wedding",
    name: "A little interaction. A big occasion.",
    subtitle: "Interactive Wedding E-Card",
    category: "Web experiences",
    color: "rose",
    description:
      "A tactile digital invitation with a scratch-to-reveal moment, live countdown, music controls, maps, and calendar export.",
    image: "/projects/wedding.webp",
    imageAlt:
      "Personalized wedding invitation featuring decorative typography and an interactive reveal",
    tags: ["React", "Canvas API", "Pointer Events", "iCalendar"],
    liveUrl: "https://jatin-weds-neha.vercel.app/",
    repository: "https://github.com/adityajaiswal1724/wedding-e-card",
    overview:
      "An interactive wedding invitation designed around a progressive reveal. Guests can uncover the invitation, view event details, open directions, and save the occasion to a calendar.",
    engineering: [
      "Canvas scratch interaction built with Pointer Events.",
      "Progressive content reveal, countdown, and user-controlled music.",
      "Map links and downloadable iCalendar event files.",
    ],
    scope:
      "Client-side invitation experience. It does not implement an RSVP backend.",
  },
  {
    id: "gym",
    name: "Built to get people moving.",
    subtitle: "Future Fitness Gym",
    category: "Web experiences",
    color: "amber",
    description:
      "A fast, responsive business website that connects visitors with training information and direct WhatsApp enquiries.",
    image: "/projects/gym.webp",
    imageAlt:
      "Future Fitness Gym website showing its fitness-focused hero and navigation",
    tags: ["Next.js", "React", "Tailwind CSS", "Static export"],
    liveUrl: "https://futurefitnessgym-beta.vercel.app/",
    repository: "https://github.com/adityajaiswal1724/static-gym-website",
    overview:
      "A content-driven gym website with reusable sections, responsive layouts, and direct enquiry links. Static delivery keeps the visitor journey lightweight.",
    engineering: [
      "Next.js static export with reusable content and components.",
      "Responsive Tailwind CSS layouts and local media assets.",
      "WhatsApp enquiry journeys and contact information.",
    ],
    scope:
      "Static business website. Membership enquiries use external contact channels; no payment or booking backend is implemented.",
  },
];

export const skillGroups = [
  {
    title: "Full-stack development",
    icon: "code",
    description: "Interfaces with intent. Applications with structure.",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Python",
      "Flask",
      "HTML & CSS",
      "Tailwind CSS",
      "MySQL",
    ],
  },
  {
    title: "AI & machine learning",
    icon: "brain",
    description: "From predictive models to conversational systems.",
    skills: [
      "PyTorch",
      "Scikit-learn",
      "Mistral AI",
      "LLMs",
      "Transformers",
      "CNNs & LSTMs",
      "Pandas",
      "NumPy",
    ],
  },
  {
    title: "Agents & automation",
    icon: "workflow",
    description: "Connecting models, tools, and real business workflows.",
    skills: [
      "n8n",
      "Vapi",
      "Dograh",
      "Zapier",
      "Make",
      "Pipedream",
      "STT / TTS",
      "API & CRM integrations",
    ],
  },
  {
    title: "Data & developer tools",
    icon: "database",
    description: "The tools behind dependable, observable work.",
    skills: [
      "Git & GitHub",
      "Power BI",
      "Tableau",
      "SQL",
      "Playwright",
      "Vitest",
      "Vercel",
      "C++",
      "Java",
    ],
  },
];

export const experience = [
  {
    company: "Crustal Ads",
    role: "Software Development Engineer",
    specialty: "AI Automation & Agent Development",
    period: "Jul 2026 — Present",
    current: true,
    description:
      "Building LLM-based agents, inbound and outbound voice systems, and automated workflows. Connecting speech interfaces, external APIs, CRMs, and communication channels.",
    tags: ["AI agents", "Voice AI", "Workflow orchestration"],
  },
  {
    company: "Springworks",
    role: "Operations Intern",
    specialty: "BGV Operations & AI Automation",
    period: "Nov 2025 — May 2026",
    current: false,
    description:
      "Managed background verification and onboarding workflows, supported the SV portal, and streamlined repetitive operational processes through automation.",
    tags: ["Process automation", "Onboarding systems"],
  },
  {
    company: "Order Health",
    role: "Data Analyst Intern",
    specialty: "Analytics & Workflow Automation",
    period: "Feb 2025 — May 2025",
    current: false,
    description:
      "Built Python and SQL data pipelines, Power BI dashboards, and a predictive sales model that reduced overstock by 15%. Automated social customer-support workflows with n8n.",
    tags: ["Python & SQL", "Power BI", "n8n"],
  },
];
