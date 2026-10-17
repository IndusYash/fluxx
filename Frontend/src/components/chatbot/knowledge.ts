import type { KnowledgeItem, QuickChip } from './types';

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
    keywords: ['about', 'flux', 'what is', 'overview', 'motto', 'mission', 'vision', 'pillars', 'principles'],
    title: 'About FLUX Society',
    answer: `**FLUX** (*Future Leaders of Unbound Xperiments*) is the premier research, development, and innovation society at **Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur**, affiliated with the Department of Computer Science and Engineering.

### Motto
**Interact. Impact. Innovate.**

### Core Pillars
- **Innovate:** Building production-grade software architectures, open-source tools, and research prototypes that solve real-world challenges.
- **Interact:** Connecting curious minds, experienced faculty, industry leaders, and alumni through conferences, workshops, and peer learning.
- **Impact:** Translating student research into registered patents, peer-reviewed publications, and hackathon victories.

### Focus Domains
- **Artificial Intelligence & Machine Learning** (Deep learning, NLP, computer vision, mechanistic interpretability)
- **Full-Stack Software Engineering** (Distributed web systems, cloud architecture)
- **Cyber-Physical & IoT Systems** (Automated campus devices, sensor systems)
- **Algorithmic Problem Solving** (Data structures & competitive programming)`
  },
  {
    id: 'events',
    keywords: ['events', 'event', 'upcoming', 'hackathon', 'workshop', 'seminar', 'activities', 'bootcamp'],
    title: 'FLUX Events & Hackathons',
    answer: `FLUX organizes high-impact technical events, national hackathons, and expert masterclasses throughout the academic calendar:

1. **FLUX Ideathon (Annual Flagship)**
   - Multi-stage ideation and prototype competition engaging 500+ participants across multidisciplinary domains (AI, IoT, HealthTech, Sustainability). Cash prizes, technical perks, and incubation support.

2. **ATAL Faculty Development Programme (FDP)**
   - Advanced technical deep dive into the hidden mathematical science of *Mechanistic Interpretability*, transformer internals, and circuit analysis with over 300 faculty & researchers.

3. **Expert Talk Series**
   - Interactive sessions with global engineering leaders, such as Er. Shivesh Sinha (*Senior Technical Program Manager at Intel, USA*), on modern neural architectures and cloud deployment.

4. **Hands-on Technical Bootcamps**
   - Regular masterclasses in full-stack web development, Git/GitHub workflows, AI model training, and competitive programming.`
  },
  {
    id: 'faculty',
    keywords: ['faculty', 'mentor', 'patron', 'vc', 'vice chancellor', 'prof', 'guidance', 'advisor', 'teachers', 'anupama'],
    title: 'Faculty Mentors & Leadership',
    answer: `FLUX operates under the visionary guidance of distinguished faculty members and university executive leadership at MMMUT Gorakhpur:

- **Chief Patron:** **Prof. Anupama Kaushik Sharma**, Hon'ble Vice Chancellor of MMMUT Gorakhpur.
  - *Vision:* Fostering an interdisciplinary culture of research excellence, patent development, and technological entrepreneurship.
- **Faculty Advisors & Mentors:**
  - Senior professors and faculty from the **Department of Computer Science and Engineering (CSED)** mentor FLUX wings in research methodology, algorithmic optimization, distributed systems, and patent documentation.
  - Faculty regularly collaborate with student teams on funded research grants, ATAL FDPs, and paper reading circles.`
  },
  {
    id: 'join',
    keywords: ['join', 'how to join', 'induction', 'apply', 'recruit', 'recruitment', 'wings', 'team', 'membership', 'eligibility'],
    title: 'How to Join FLUX',
    answer: `### Annual Induction Process
FLUX conducts its open induction drive for undergraduate students of MMMUT Gorakhpur at the beginning of each academic session:

### Eligibility
- Open to undergraduate students across **all engineering branches** (CSE, IT, ECE, EE, ME, CE, Chemical) as well as MCA students. Passion for building and problem-solving is the primary qualification!

### Selection Stages
1. **Online Application:** Submit your portfolio, GitHub profile, or domain interests.
2. **Technical / Creative Task:** Practical problem statement based on your chosen wing (coding, design prompt, or research question).
3. **Personal Interaction:** Conversation with senior members and faculty coordinators to assess passion, curiosity, and teamwork.

### Student Wings You Can Join:
1. **AI & Machine Learning Wing**
2. **Software Development Wing** (Full-Stack & Cloud)
3. **Algorithms & Competitive Programming Wing**
4. **Design & UI/UX Wing**
5. **Content & Media Wing**
6. **Executive Leadership & Operations**`
  },
  {
    id: 'ideathon',
    keywords: ['ideathon', 'hackathon', 'competition', 'rules', 'prize', 'guidelines'],
    title: 'FLUX Ideathon Guidelines',
    answer: `### FLUX Ideathon Flagship
The FLUX Ideathon is MMMUT's signature innovation competition where teams conceive, architect, and prototype solutions for acute societal and technological challenges.

- **Team Size:** 3 to 4 undergraduate engineering students.
- **Diversity Mandate:** To foster inclusive innovation, **every team must include at least one female team member**.
- **Mode:** Hybrid / Offline rounds on the MMMUT Gorakhpur campus.
- **Evaluation Criteria:** Originality & novelty, technical feasibility & architecture, societal impact, and clarity of final pitch demonstration.
- **Rewards:** Cash prizes, certificates of merit, technical goodies, and incubation support for patent filing.`
  },
  {
    id: 'she-leads',
    keywords: ['she leads', 'women', 'diversity', 'girls', 'female', 'initiative'],
    title: 'She Leads Initiative',
    answer: `### She Leads - Women in Technology
**She Leads** is a premier FLUX empowerment initiative dedicated to elevating, mentoring, and championing women students in engineering, research, and technical leadership.

- **Objectives:** Eliminating gender disparity in technical leadership, open-source contribution, and competitive programming.
- **Key Programs:**
  - Keynotes and AMA sessions with distinguished female tech industry leaders and alumni.
  - Hands-on technical masterclasses in AI/ML, web dev, and UI/UX design.
  - 1-on-1 peer and alumni mentorship circles.
  - Incubation and travel sponsorship for women-led hackathon teams.`
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'location', 'address', 'where', 'social', 'instagram', 'linkedin', 'phone'],
    title: 'Contact Information & Location',
    answer: `### Get in Touch with FLUX
- **Official Email:** \`flux@mmmut.ac.in\`
- **Campus Location:** Department of Computer Science & Engineering (CSED), Madan Mohan Malaviya University of Technology (MMMUT), Deoria Road, Gorakhpur, UP - 273010.
- **Official Website:** [flux.org.in](https://flux.org.in)
- **LinkedIn:** [FLUX MMMUT](https://www.linkedin.com/company/flux-mmm/)
- **Instagram:** [@flux.mmmut](https://www.instagram.com/flux.mmmut)`
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'research', 'work', 'patent', 'publication'],
    title: 'FLUX Projects & Research',
    answer: `FLUX members work on cutting-edge research and production projects, including:
- **Mechanistic Interpretability:** Circuit exploration and attention head probing in generative transformer models.
- **Smart Campus Automation:** IoT-based resource monitoring and automated attendance infrastructure.
- **HealthTech Diagnostic Tools:** Deep learning-based early screening prototypes using computer vision.
- **Web & Cloud Architectures:** High-concurrency platforms, real-time judge scoring systems, and modern digital platforms for MMMUT.`
  }
];

export function findKnowledgeAnswer(query: string): string {
  const normalized = query.toLowerCase().trim();
  if (!normalized) {
    return "I'm here to help! Ask me about FLUX events, how to join our student wings, faculty mentorship, or our hackathons.";
  }

  // Check direct matches
  let bestItem: KnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (normalized.includes(kw)) {
        score += kw.length;
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

  // Fallback answer
  return `Thank you for asking! FLUX (*Future Leaders of Unbound Xperiments*) is MMMUT Gorakhpur's premier student-led research and development society.

I can help answer questions about:
- **Upcoming Events & Ideathons:** Ask about our hackathons, workshops, or ATAL FDP.
- **How to Join:** Discover our 6 student wings and annual induction timeline.
- **Faculty Leadership:** Learn about Chief Patron Prof. Anupama Kaushik Sharma and CSED mentors.
- **Contact & Community:** Find our official email, campus room, and social channels.

Feel free to pick one of the quick chips below or type a specific topic!`;
}
