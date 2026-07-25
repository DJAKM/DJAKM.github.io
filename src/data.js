export const NAV = [
  ["about", "About"],
  ["services", "What I do"],
  ["experience", "Experience"],
  ["work", "Work"],
  ["contact", "Contact"],
]

export const TYPED_WORDS = [
  "responsive UIs.",
  "study-abroad platforms.",
  "realtime experiences.",
  "pixel-perfect components.",
  "fast web apps.",
]

export const MARQUEE = [
  "React.js", "Next.js", "TypeScript", "JavaScript ES6+", "Tailwind CSS", "shadcn/ui",
  "Redux", "Node.js", "Express.js", "MongoDB", "Firebase", "Socket.io", "REST APIs", "Git", "Chakra UI",
]

export const STATS = [
  { to: 18, suffix: "+", label: "Months at Makunai Global" },
  { to: 1000, suffix: "+", label: "Partners on UniversityLane" },
  { to: 400, suffix: "+", label: "DSA problems solved" },
  { to: 1613, suffix: "", label: "Peak LeetCode rating" },
]

export const SERVICES = [
  { title: "Frontend Engineering", body: "Production React & Next.js applications — component architecture, routing, rendering strategy, and performance-minded code that ships." },
  { title: "UI Implementation & Design", body: "From blank Figma frame to polished screen. I designed UniversityLane's entire interface myself — layout, hierarchy, motion, and responsive behavior." },
  { title: "API Integration & State", body: "REST API integration with clean Redux state flows, realtime features over Socket.io, and data layers backed by MongoDB and Firebase." },
]

export const JOBS = [
  {
    when: "July 2025 — Present",
    title: "Frontend Developer",
    badge: "CURRENT",
    org: "Makunai Global · Noida, On-site",
    link: ["https://universitylane.io", "universitylane.io ↗"],
    points: [
      "Designed and developed UniversityLane.io end-to-end — the company's flagship study-abroad platform serving 1,000+ certified partners and 5,000+ processed applications",
      "Owned complete UI/UX from concept to production: destinations navigation for 20+ countries, university & program discovery, carousels, and partner onboarding flows",
      "Built a multi-step budget calculator covering tuition, accommodation, travel, and visa costs",
      "Implemented fully responsive layouts with Tailwind CSS + shadcn/ui and Redux-backed REST API integration",
    ],
  },
  {
    when: "January 2025 — June 2025",
    title: "Frontend Intern",
    badge: "PROMOTED IN 6 MONTHS",
    org: "Makunai Global · Remote",
    points: [
      "Developed UI components for UNILANE using Next.js and modern React patterns",
      "Integrated REST APIs for dynamic student and university data with Redux state management",
      "Collaborated with cross-functional teams to deliver features within tight deadlines",
    ],
  },
]

export const FEATURED = {
  name: "UniversityLane.io",
  url: "https://universitylane.io",
  role: "Sole UI/UX designer & frontend developer",
  problem:
    "Makunai needed a B2B platform where study-abroad partners could discover universities, check student eligibility, and manage applications across 20+ countries — starting from a blank canvas, with no existing product to build on.",
  approach:
    "I owned the interface end-to-end: information architecture, visual design, and the full React/Next.js implementation. The hardest pieces were a destinations system spanning 20+ countries without overwhelming the user, and a multi-step budget calculator that turns tuition, accommodation, travel, and visa costs into a single clear number.",
  impact:
    "The platform now serves 1,000+ certified partners and has processed 5,000+ applications — the company's flagship product and primary partner-facing surface.",
  blurb: "A full study-abroad & MBBS-abroad platform I designed from the very first screen to production — every layout, interaction, and responsive breakpoint.",
  metrics: [
    ["1,000+", "certified partners"],
    ["5,000+", "applications processed"],
    ["20+", "study destinations"],
    ["300+", "universities listed"],
  ],
  features: [
    "University & program discovery cards with rankings and fees",
    "Multi-step budget calculator (tuition → visa costs)",
    "Destinations mega-menu spanning 20+ countries",
    "Partner onboarding, registration & enquiry flows",
    "Testimonial and program carousels",
    "Fully responsive, mobile-first layouts",
  ],
  tags: ["Next.js", "React", "Redux", "Tailwind CSS", "shadcn/ui", "REST APIs"],
}

export const PROJECTS = [
  {
    name: "Instagram Clone", year: "2024",
    body: "A fully responsive social app with Firebase Auth, real-time photo uploads, instant likes and comments, and Firestore-powered live data sync across devices.",
    tags: ["React", "Chakra UI", "Firebase", "Firestore"],
  },
  {
    name: "Realtime Chat App", year: "2024",
    body: "Individual and group messaging with instant delivery over Socket.io, REST-based auth, and MongoDB-backed chat history — responsive across all devices.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
  },
]

export const AI_PROJECTS = [
  {
    name: "Paathya", year: "2026",
    body: "Multi-tenant SaaS school management platform — student & teacher management, attendance, fees, exams, timetables, messaging, and a parent portal, with strict per-school data isolation.",
    tags: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Django REST"],
  },
  {
    name: "pylearn", year: "2026",
    body: "An interactive learning platform — 230+ practice exercises that run Python in the browser via Pyodide, with hints, solutions, and a note-taking system.",
    tags: ["Next.js", "Pyodide", "WebAssembly", "SQLite", "shadcn/ui"],
  },
]

export const DSA_STATS = [
  { to: 400, suffix: "+", label: "Problems solved" },
  { to: 1613, suffix: "", label: "Peak LeetCode rating" },
  { text: "3", label: "Platforms practiced on" },
  { text: "C++", label: "Primary DSA language" },
]

export const EDUCATION = [
  {
    when: "2021 — 2025",
    school: "Indian Institute of Information Technology, Bhagalpur",
    degree: "B.Tech — Electronics & Communication Engineering",
    score: "CGPA 8.00",
  },
  {
    when: "2020",
    school: "Heritage International Public School, Kushinagar",
    degree: "Intermediate (CBSE)",
    score: "93.0%",
  },
]

export const LINKS = {
  email: "adityakmishradeos@gmail.com",
  github: "https://github.com/DJAKM",
  linkedin: "https://www.linkedin.com/in/aditya-mishra-5067b6237/",
  leetcode: "https://leetcode.com/",
  resume: "/resume.pdf", // drop the compiled PDF into public/resume.pdf
}
