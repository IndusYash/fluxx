import type { KnowledgeItem, QuickChip, QueryCategory } from './types';

export const QUICK_CHIPS: QuickChip[] = [
  {
    id: 'events',
    label: 'Upcoming events',
    iconName: 'calendar',
    prompt: 'What are the upcoming events and hackathons organized by FLUX?',
  },
  {
    id: 'faculty',
    label: 'Meet the faculty',
    iconName: 'compass',
    prompt: 'Who are the faculty mentors and patrons guiding FLUX?',
  },
  {
    id: 'join',
    label: 'How to join',
    iconName: 'search',
    prompt: 'How can I join the FLUX society and what are the student wings?',
  },
  {
    id: 'about',
    label: 'About FLUX',
    iconName: 'info',
    prompt: 'Tell me about FLUX, its mission, and its core pillars.',
  },
];

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'about',
    keywords: [
      'about',
      'flux',
      'what is flux',
      'overview',
      'motto',
      'mission',
      'vision',
      'pillars',
      'principles',
      'core pillars',
      'interact',
      'innovate',
      'impact',
      'future leaders',
      'unbound xperiments',
    ],
    title: 'About FLUX Society',
    answer: `**FLUX** (*Future Leaders of Unbound Xperiments*) is the premier research, development, and innovation society at **Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur**, affiliated with the Department of Computer Science and Engineering.

### Motto
**Interact. Impact. Innovate.**

### Core Pillars
- Innovate: Building production-grade software architectures, open-source tools, and research prototypes that solve real-world challenges.
- Interact: Connecting curious minds, experienced faculty, industry leaders, and alumni through conferences, workshops, and peer learning.
- Impact: Translating student research into registered patents, peer-reviewed publications, and hackathon victories.

### Focus Domains
- Artificial Intelligence & Machine Learning (Deep learning, NLP, computer vision, mechanistic interpretability)
- Full-Stack Software Engineering (Distributed web systems, cloud architecture)
- Cyber-Physical & IoT Systems (Automated campus devices, sensor systems)
- Algorithmic Problem Solving (Data structures & competitive programming)`
  },
  {
    id: 'bytebrawl',
    keywords: [
      'bytebrawl',
      'byte brawl',
      'hacktoberfest',
      'coding showdown',
      'resilience',
      'production-grading',
      'hacktober',
      'brawl',
    ],
    title: 'ByteBrawl — Hacktoberfest Edition',
    answer: `### ByteBrawl — Hacktoberfest Edition ⚔️
**ByteBrawl** is FLUX's high-intensity competitive coding showdown where architectural resilience meets rapid implementation under strict production-grading constraints.

Organized by **FLUX**, Department of Computer Science & Engineering, **MMMUT Gorakhpur**, ByteBrawl is engineered for developers who take pride in shipping robust, production-ready software.

### Core Highlights:
- Architectural Resilience: Systems are pushed to edge limits, testing reliability, concurrency boundaries, and graceful degradation.
- Production-Grading Constraints: Automated test suites, clean API contract validation, and rigorous performance metrics.
- Rapid Implementation: Turning concepts into functional, hardened prototypes in hours.
- CSE Ecosystem Mentorship: Mentored and evaluated by senior builders and faculty from CSED, MMMUT.

*Check the website menu or registration popups for live ByteBrawl schedules and participation details!*`
  },
  {
    id: 'ideathon',
    keywords: [
      'ideathon',
      'ideation',
      'prototype competition',
      'flagship event',
      'cash prize',
      'team size',
      'female member',
      'rules',
    ],
    title: 'FLUX Ideathon Guidelines',
    answer: `### FLUX Ideathon Flagship 💡
The **FLUX Ideathon** is MMMUT's signature annual innovation competition where student cohorts conceive, architect, and prototype solutions for acute societal and technological challenges.

### Rules & Guidelines:
- Team Size: 3 to 4 undergraduate engineering students.
- Diversity Mandate: To foster inclusive innovation, every team must include at least one female team member.
- Format: Hybrid / Offline rounds held on the MMMUT Gorakhpur campus.
- Focus Areas: AI, IoT, sustainability, healthcare, and campus automation.
- Evaluation Criteria: Originality & novelty, technical feasibility & architecture, societal impact, and clarity of final pitch demonstration.
- Rewards: Cash prizes, certificates of excellence, technical goodies, and incubation support for patent filing.`
  },
  {
    id: 'events',
    keywords: [
      'events',
      'event',
      'upcoming events',
      'hackathon',
      'hackathons',
      'bootcamp',
      'bootcamps',
      'workshop',
      'workshops',
      'atal',
      'fdp',
      'expert talk',
      'talk series',
      'shivesh',
    ],
    title: 'FLUX Events & Hackathons',
    answer: `FLUX organizes high-impact technical events, national hackathons, and expert masterclasses throughout the academic calendar:

1. **ByteBrawl (Hacktoberfest Edition)**
   - High-intensity competitive coding showdown testing architectural resilience and production-grade engineering.

2. **FLUX Ideathon (Annual Flagship)**
   - Multi-stage ideation and prototype competition engaging 500+ participants across multidisciplinary domains (AI, IoT, HealthTech, Sustainability) with cash prizes and incubation support.

3. **ATAL Faculty Development Programme (FDP)**
   - Advanced technical deep dive into *Mechanistic Interpretability*, transformer internals, and circuit analysis with over 300 faculty & researchers.

4. **Expert Talk Series**
   - Interactive sessions with global engineering leaders, such as Er. Shivesh Sinha (*Senior Technical Program Manager at Intel, USA*), on modern neural architectures and cloud deployment.

5. **Hands-on Technical Bootcamps**
   - Regular masterclasses in full-stack web development, Git/GitHub workflows, AI model training, and competitive programming.`
  },
  {
    id: 'join',
    keywords: [
      'join',
      'how to join',
      'how can i join',
      'induction',
      'inductions',
      'recruit',
      'recruitment',
      'apply',
      'eligibility',
      'first year',
      '1st year',
      'mca',
      'branches',
      'membership',
      'selection',
      'drive',
    ],
    title: 'How to Join FLUX',
    answer: `### Annual Induction Process 🤝
FLUX conducts its open induction drive for students of MMMUT Gorakhpur at the beginning of each academic session:

### Eligibility
- Open to undergraduate students across **all engineering branches** (CSE, IT, ECE, EE, ME, CE, Chemical) as well as **MCA** students. Passion for building and problem-solving is the primary qualification!

### Selection Stages
1. **Online Application:** Submit your portfolio, GitHub profile, or domain interests.
2. **Technical / Creative Task:** Practical problem statement based on your chosen wing (coding, design prompt, or research question).
3. **Personal Interaction:** Conversation with senior members and faculty coordinators to assess passion, curiosity, and teamwork.

### 6 Student Wings You Can Join:
1. **AI & Machine Learning Wing**
2. **Software Development Wing** (Full-Stack & Cloud)
3. **Algorithms & Competitive Programming Wing**
4. **Design & UI/UX Wing**
5. **Content & Media Wing**
6. **Executive Leadership & Operations**`
  },
  {
    id: 'wings',
    keywords: [
      'wing',
      'wings',
      'student wings',
      'domains',
      'sub-teams',
      'ai wing',
      'ml wing',
      'software wing',
      'dev wing',
      'web wing',
      'cp wing',
      'competitive programming',
      'design wing',
      'ui/ux',
      'media wing',
      'content wing',
      'operations wing',
      'leadership wing',
    ],
    title: 'FLUX Student Wings',
    answer: `### FLUX Student Wings 🏛️
FLUX operates through 6 specialized student wings working synergistically under faculty guidance:

1. **AI & Machine Learning Wing:**
   - Spearheads research in deep learning, NLP, computer vision, and mechanistic interpretability. Conducts reading groups and builds intelligent AI applications.

2. **Software Development Wing:**
   - Develops and maintains web platforms, mobile utilities, and internal systems using modern technologies (React, Node.js, TypeScript, cloud infrastructure).

3. **Algorithms & Competitive Programming Wing:**
   - Conducts algorithmic training, problem-solving workshops, and prepares student cohorts for national coding contests and ICPC.

4. **Design & UI/UX Wing:**
   - Crafts design systems, user interfaces, 3D graphics, and visual identity for digital products and events.

5. **Content & Media Wing:**
   - Documents technical activities, publishes research digests, manages social outreach, and coordinates photography and video production.

6. **Executive Leadership & Operations Wing:**
   - Oversees strategic planning, event logistics, inter-departmental collaboration, and external industry partnerships.`
  },
  {
    id: 'faculty',
    keywords: [
      'faculty',
      'mentor',
      'mentors',
      'patron',
      'patrons',
      'anupama',
      'sharma',
      'vice chancellor',
      'vc',
      'advisory',
      'advisors',
      'professors',
      'teachers',
      'csed faculty',
      'guidance',
    ],
    title: 'Faculty Mentors & Leadership',
    answer: `### Faculty Mentors & Academic Guidance 🎓
FLUX operates under the visionary guidance of distinguished faculty members and university executive leadership at MMMUT Gorakhpur:

- Chief Patron: Prof. Anupama Kaushik Sharma, Hon'ble Vice Chancellor of MMMUT Gorakhpur.
  - Vision: Fostering an interdisciplinary culture of research excellence, patent development, and technological entrepreneurship.

- Faculty Advisors & Mentors:
  - Senior professors and faculty from the Department of Computer Science and Engineering (CSED) mentor FLUX wings in research methodology, algorithmic optimization, distributed systems, and patent documentation.
  - Faculty regularly collaborate with student teams on funded research grants, ATAL FDPs, and paper reading circles.`
  },
  {
    id: 'she-leads',
    keywords: [
      'she leads',
      'sheleads',
      'women',
      'girls',
      'diversity',
      'female',
      'women in tech',
      'empowerment',
    ],
    title: 'She Leads — Women in Technology',
    answer: `### She Leads — Women in Technology 👩‍💻
She Leads is a premier FLUX empowerment initiative dedicated to elevating, mentoring, and championing women students in engineering, research, and technical leadership.

### Key Objectives & Programs:
- Breaking Barriers: Eliminating gender disparity in technical leadership, open-source contribution, and competitive programming.
- Visionary Keynotes & AMAs: Sessions with distinguished female tech industry leaders and accomplished alumni.
- Hands-on Technical Masterclasses: Practical workshops spanning AI/ML, web dev, and UI/UX design.
- 1-on-1 Mentorship Circles: Pairing junior women students with experienced senior mentors for academic and career guidance.
- Hackathon Incubation: Sponsorship and dedicated mentorship for female-led hackathon teams.`
  },
  {
    id: 'projects',
    keywords: [
      'project',
      'projects',
      'research',
      'work',
      'patent',
      'patents',
      'publication',
      'publications',
      'mechanistic interpretability',
      'smart campus',
      'iot',
    ],
    title: 'FLUX Projects & Research',
    answer: `### FLUX Projects & Research 🔬
FLUX members work on cutting-edge research, open-source utilities, and production systems:

- Mechanistic Interpretability: Circuit exploration and attention head probing in transformer architectures.
- Smart Campus Automation: IoT-based resource monitoring and automated attendance infrastructure at MMMUT.
- HealthTech Diagnostic Tools: Deep learning-based early screening prototypes using computer vision.
- Production Web Platforms: High-concurrency platforms, real-time judge scoring systems, and modern digital platforms for MMMUT.`
  },
  {
    id: 'contact',
    keywords: [
      'contact',
      'email',
      'location',
      'address',
      'where',
      'social',
      'instagram',
      'linkedin',
      'phone',
      'reach',
      'room',
      'department room',
      'office',
    ],
    title: 'Contact Information & Location',
    answer: `### Contact FLUX 📬
- Official Email: \`flux@mmmut.ac.in\`
- Campus Location: Department of Computer Science & Engineering (CSED), Madan Mohan Malaviya University of Technology (MMMUT), Deoria Road, Gorakhpur, UP - 273010.
- Official Website: [flux.org.in](https://flux.org.in)
- LinkedIn: [FLUX MMMUT](https://www.linkedin.com/company/flux-mmm/)
- Instagram: [@flux.mmmut](https://www.instagram.com/flux.mmmut)`
  },
];

// ============================================================================
// Topic Classification & Strict Guardrail Engine
// ============================================================================

const GREETING_PATTERNS = [
  /^(hi|hello|hey|hola|namaste|yo|sup|greetings)\b/i,
  /^good\s+(morning|afternoon|evening|day)\b/i,
  /^hey\s+there\b/i,
  /^hi\s+there\b/i,
  /^hello\s+there\b/i,
];

const CLOSING_PATTERNS = [
  /^(thanks|thank\s+you|thx|ty|bye|goodbye|see\s+you|cya)\b/i,
  /^(ok\s+thanks|okay\s+thanks|thanks\s+a\s+lot|thank\s+you\s+so\s+much)\b/i,
];

const IDENTITY_PATTERNS = [
  /who\s+are\s+you\b/i,
  /what\s+are\s+you\b/i,
  /what\s+is\s+your\s+name\b/i,
  /what\s+can\s+you\s+do\b/i,
  /how\s+can\s+you\s+help\b/i,
  /who\s+made\s+you\b/i,
  /who\s+created\s+you\b/i,
  /^help$/i,
  /^help\s+me$/i,
];

const FLUX_EXPLICIT_SIGNALS = [
  /\bflux\b/i,
  /\bmmmut\b/i,
  /\bcsed\b/i,
  /\bideathon\b/i,
  /\bbytebrawl\b/i,
  /\bbyte\s*brawl\b/i,
  /\bhacktoberfest\b/i,
  /\batal\s*(fdp)?\b/i,
  /\bshe\s*leads\b/i,
  /\banupama\s*(kaushik)?\s*(sharma)?\b/i,
  /\bshivesh\s*(sinha)?\b/i,
  /\bfuture\s+leaders\s+of\s+unbound\s+xperiments\b/i,
  /\binteract[\s,.]+impact[\s,.]+innovate\b/i,
];

const CLUB_CONTEXT_PATTERNS = [
  /\b(upcoming\s+)?events\b/i,
  /\bhackathon(s)?\b/i,
  /\bbootcamp(s)?\b/i,
  /\bworkshop(s)?\b/i,
  /\bideation\b/i,
  /\bhow\s+(can\s+i|to)\s+join\b/i,
  /\binduction(s)?\b/i,
  /\brecruitment\b/i,
  /\beligibility\b/i,
  /\bhow\s+to\s+apply\b/i,
  /\bwho\s+can\s+join\b/i,
  /\bcan\s+.*join\b/i,
  /\bjoin\s+(the\s+)?(club|society|team|flux)\b/i,
  /\bstudent\s+wing(s)?\b/i,
  /\bwings?\b/i,
  /\bfaculty(\s+mentor(s)?)?\b/i,
  /\bmentor(s)?\b/i,
  /\bpatron(s)?\b/i,
  /\bvice\s+chancellor\b/i,
  /\bvc\s*(ma'?am|mam|sir)?\b/i,
  /\babout\s+(the\s+)?(club|society)\b/i,
  /\bmotto\b/i,
  /\bcore\s+pillars\b/i,
  /\bpillars\b/i,
  /\bmission\b/i,
  /\bvision\b/i,
  /\bcontact(\s+(info|us|details))?\b/i,
  /\bofficial\s+email\b/i,
  /\bclub\s+email\b/i,
  /\bsociety\s+email\b/i,
  /\bclub\s+location\b/i,
  /\bsociety\s+room\b/i,
  /\bdepartment\s+room\b/i,
  /\bprojects\b/i,
  /\bmechanistic\s+interpretability\b/i,
];

const UNRELATED_TOPIC_PATTERNS = [
  /\b(weather|forecast|temperature)\b/i,
  /\b(cricket|football|soccer|fifa|ipl|world\s*cup|match|score)\b/i,
  /\b(recipe|cook|cooking|cake|pizza|burger|pasta|food)\b/i,
  /\b(movie|film|actor|actress|cinema|bollywood|hollywood)\b/i,
  /\b(song|music|singer|lyrics)\b/i,
  /\b(joke|riddle|funny|meme)\b/i,
  /\b(poem|poetry|story|essay|love\s*letter)\b/i,
  /\b(president\s+of|prime\s+minister\s+of|capital\s+of|currency\s+of)\b/i,
  /\b(who\s+won|who\s+is\s+the\s+richest|net\s*worth)\b/i,
  /\b(write\s+(a\s+)?(code|script|program|function|component))\b/i,
  /\b(solve|calculate|equation|integral|derivative|math\s+problem)\b/i,
  /\b(elon\s*musk|trump|modi|biden|putin|gates|jobs|zuckerberg)\b/i,
  /\b(google|microsoft|amazon|apple|facebook|netflix|tesla|openai|chatgpt)\b/i,
  /\b(iit|nit|bits\s*pilani|harvard|stanford|mit|oxford|cambridge)\b/i,
  /\b(homework|exam|test\s+paper)\b/i,
];

/**
 * Classifies a user's query into conversational or topic category.
 * Strictly flags any query not related to FLUX as OFF_TOPIC.
 */
export function classifyQuery(query: string): QueryCategory {
  const q = query.trim();
  const lower = q.toLowerCase();

  if (!lower) return 'IDENTITY';

  if (CLOSING_PATTERNS.some((p) => p.test(lower))) return 'CLOSING';
  if (GREETING_PATTERNS.some((p) => p.test(lower))) return 'GREETING';
  if (IDENTITY_PATTERNS.some((p) => p.test(lower))) return 'IDENTITY';

  const hasFluxExplicit = FLUX_EXPLICIT_SIGNALS.some((p) => p.test(lower));
  const hasUnrelated = UNRELATED_TOPIC_PATTERNS.some((p) => p.test(lower));

  // If query explicitly contains unrelated keywords and no explicit FLUX mention, reject immediately
  if (hasUnrelated && !hasFluxExplicit) {
    return 'OFF_TOPIC';
  }

  // Explicit FLUX mention is always valid
  if (hasFluxExplicit) {
    return 'FLUX_TOPIC';
  }

  // Contextual club question asked within website
  const hasClubContext = CLUB_CONTEXT_PATTERNS.some((p) => p.test(lower));
  if (hasClubContext) {
    return 'FLUX_TOPIC';
  }

  // Any other query is considered OFF_TOPIC
  return 'OFF_TOPIC';
}

export function isFluxRelated(query: string): boolean {
  const cat = classifyQuery(query);
  return cat !== 'OFF_TOPIC';
}

export const OFF_TOPIC_RESPONSE = `I am FLUX AI, the official virtual assistant dedicated exclusively to FLUX (*Future Leaders of Unbound Xperiments*) at MMMUT Gorakhpur.

I am not programmed to answer queries about other subjects, general programming assignments, or outside topics. Please feel free to ask me anything about FLUX:

- About FLUX: Mission, core pillars (*Interact, Impact, Innovate*), and domains.
- Events & Hackathons: FLUX Ideathon, ByteBrawl (Hacktoberfest Edition), ATAL FDP, and technical bootcamps.
- Student Wings & Inductions: How to join, eligibility across all engineering branches/MCA, and our 6 wings (AI/ML, Dev, CP, Design, Media, Operations).
- Faculty Leadership: Chief Patron Prof. Anupama Kaushik Sharma (Hon'ble Vice Chancellor) and CSED faculty advisors.
- Key Initiatives: She Leads (women in tech) and student research/patent projects.
- Contact: Official email (\`flux@mmmut.ac.in\`), campus location, and social channels.

You can also click any of the suggestion chips below to explore!`;

export const GREETING_RESPONSE = `Hello! 👋 I'm FLUX AI, your dedicated assistant for FLUX (*Future Leaders of Unbound Xperiments*) at MMMUT Gorakhpur.

I can assist you exclusively with all queries regarding FLUX society:
- Events & Hackathons: FLUX Ideathon, ByteBrawl, and ATAL FDP
- Student Wings & Inductions: How to join, eligibility across branches, and student wings
- Faculty Mentors: Leadership under Prof. Anupama Kaushik Sharma and CSED faculty
- Initiatives: She Leads (women in tech) and student research projects

How can I help you explore FLUX today?`;

export const IDENTITY_RESPONSE = `I am **FLUX AI**, the virtual assistant for **FLUX** (*Future Leaders of Unbound Xperiments*), the departmental society of Computer Science & Engineering at **MMMUT Gorakhpur**.

My purpose is strictly dedicated to answering inquiries about **FLUX**:
- Answering questions about our hackathons (Ideathon, ByteBrawl) and technical bootcamps.
- Explaining how to join FLUX during annual inductions and detailing our 6 student wings.
- Providing information about our faculty leadership and mentors.
- Guiding you through our She Leads initiative and student research projects.

*Note: I do not respond to questions outside the scope of FLUX.*

What would you like to know about FLUX?`;

export const CLOSING_RESPONSE = `You're very welcome! If you ever have more questions about FLUX events, student wings, or inductions, feel free to ask anytime.

Keep innovating with **FLUX**! 🚀`;

/**
 * Resolves a user query against the FLUX knowledge base.
 * Strictly denies off-topic questions.
 */
export function findKnowledgeAnswer(query: string): string {
  const normalized = query.toLowerCase().trim();
  if (!normalized) {
    return GREETING_RESPONSE;
  }

  const category = classifyQuery(normalized);

  switch (category) {
    case 'CLOSING':
      return CLOSING_RESPONSE;
    case 'GREETING':
      return GREETING_RESPONSE;
    case 'IDENTITY':
      return IDENTITY_RESPONSE;
    case 'OFF_TOPIC':
      return OFF_TOPIC_RESPONSE;
    case 'FLUX_TOPIC':
    default:
      break;
  }

  // Find best knowledge item match
  let bestItem: KnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      const kwLower = kw.toLowerCase();
      if (normalized.includes(kwLower)) {
        // Longer matching keywords have higher specificity weight
        score += kwLower.length * 2;
        // Exact match bonus
        if (normalized === kwLower) {
          score += 20;
        }
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestItem = item;
    }
  }

  if (bestItem && highestScore > 0) {
    return bestItem.answer;
  }

  // Fallback if classified as FLUX topic but query was generic (e.g., "tell me about flux")
  const defaultAbout = KNOWLEDGE_BASE.find((k) => k.id === 'about');
  return defaultAbout ? defaultAbout.answer : OFF_TOPIC_RESPONSE;
}
