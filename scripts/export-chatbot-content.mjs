/**
 * Export clean markdown content from the website's source code and data
 * for ingestion into the AI Website Assistant chatbot knowledge base.
 *
 * Runs standalone with Node.js (no external dependencies).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'chatbot-content');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to write a clean markdown file
function writeContent(filename, title, urlPath, content) {
  const filePath = path.join(outDir, filename);
  const fileContent = `# ${title}

**URL Path:** ${urlPath}

${content.trim()}
`;
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`Generated: ${filename}`);
}

// 1. Home / Overview
writeContent(
  'home.md',
  'FLUX - Future Leaders of Unbound Xperiments',
  '/',
  `
FLUX (Future Leaders of Unbound Xperiments) is the premier research, development, and innovation society at Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur.

### Motto
**Interact. Impact. Innovate.**

### Mission
FLUX is dedicated to bridging the gap between theoretical computer science and impactful real-world engineering. The society fosters an ecosystem of research excellence, hands-on software development, machine learning innovation, and competitive algorithmic problem-solving.

### Core Pillars
- **Innovate:** Building production-grade software architectures, open-source tools, and research-backed prototypes that solve acute technological and societal challenges.
- **Interact:** Connecting curious minds, experienced faculty researchers, alumni industry leaders, and global technology communities through conferences, workshops, and peer learning.
- **Impact:** Translating student research into registered patents, peer-reviewed publications, hackathon victories, and deployable systems.

### Focus Domains
- **Artificial Intelligence & Machine Learning:** Deep learning, NLP, computer vision, mechanistic interpretability, and generative models.
- **Full-Stack Software Engineering:** Scalable distributed web systems, cloud infrastructure, and modern frontend design.
- **System & Safety Engineering:** IoT-enabled sensor systems, smart agriculture, automated campus systems, and early-warning safety devices.
- **Algorithmic Problem Solving:** Data structures, advanced algorithms, and competitive programming excellence.
`
);

// 2. About Page
writeContent(
  'about.md',
  'About FLUX Society',
  '/about',
  `
### Overview
FLUX is a student-driven research and innovation society affiliated with the Department of Computer Science and Engineering at MMMUT Gorakhpur. We turn ideas into products, research publications, and real-world impact through hands-on development, hackathons, and industry mentorship.

### Patron & Leadership Vision
- **Patron:** Prof. Anupama Kaushik Sharma, Hon'ble Vice Chancellor, MMMUT Gorakhpur.
- **Vision:** "FLUX represents our commitment to fostering innovation and research excellence, creating leaders who will drive technological advancement and meaningful societal impact."

### Core Values
1. **Innovation:** We build what others only imagine — from early-stage prototypes to production-ready scalable systems.
2. **Collaboration:** Great work happens at intersections. We connect students, faculty, and industry leaders to tackle complex problems together.
3. **Excellence:** We ship clean code, publish rigorous research papers, and hold ourselves to production-grade engineering standards.
4. **Impact:** Technology is a vehicle for change. We measure success by the tangible problems our solutions solve in society.

### Impact Areas
- **For Students:** Authentic experience before graduation through research publications, live technical projects, hackathon mentorship, and leadership roles.
- **For Faculty:** Amplifying academic research through dedicated student engineering teams, collaborative research grants, and industry tie-ups.
- **For Industry:** Access to vetted technical talent, sponsored R&D experiments, and collaborative technological solutions.
`
);

// 3. Faculty & Mentorship
writeContent(
  'faculty.md',
  'Faculty Mentors and Academic Guidance',
  '/faculty',
  `
### Academic Mentorship & Leadership
FLUX operates under the guidance of distinguished faculty members from the Department of Computer Science and Engineering and university leadership at MMMUT Gorakhpur.

### Key Mentors & Leadership
- **Prof. Anupama Kaushik Sharma**
  - **Role:** Hon'ble Vice Chancellor & Chief Patron, MMMUT Gorakhpur.
  - **Affiliation:** Executive Leadership.
  - **Vision:** Driving university-wide research culture, innovation incubation, and societal impact.

- **Faculty Advisors & Mentors:**
  - Faculty members from the Department of Computer Science and Engineering guide FLUX student wings on research methodology, patent filing, algorithm design, and system architecture.
  - Regular academic sessions, research paper reading groups, and ATAL Faculty Development Programmes (FDP) connect students directly with professors and global technical experts.

### Research Collaboration Areas
- Mechanistic Interpretability & AI Explainability.
- Natural Language Processing & Automated Information Synthesis.
- Computer Vision for Health Screening & Agriculture.
- Distributed Systems, Cloud Architecture, and Cyber-Physical Systems.
`
);

// 4. Events & Workshops
writeContent(
  'events.md',
  'Events, Hackathons, and Technical Workshops',
  '/events',
  `
### Major Events & Initiatives

1. **ATAL Faculty Development Programme (FDP):**
   - **Theme:** Advanced Deep Dive into the Hidden Mathematical Science of Mechanistic Interpretability.
   - **Audience:** Over 300 faculty members, researchers, and advanced students.
   - **Scope:** Organized by MMMUT Gorakhpur in collaboration with leading experts in AI, exploring transformer internals, circuit analysis, and model interpretability.

2. **FLUX Ideathon:**
   - **Annual Innovation Flagship:** A multi-stage ideation and prototyping competition engaging 500+ participants.
   - **Focus:** Solving acute multidisciplinary problems across AI, IoT, sustainability, health tech, and campus automation.

3. **Expert Talk Series - AI Evolution & Future:**
   - **Speaker:** Er. Shivesh Sinha (Senior Technical Program Manager at Intel, USA).
   - **Focus:** Deep insights into evolving AI hardware architectures, modern neural systems, industry deployment patterns, and future career horizons.

4. **Technical Orientations & Hands-on Bootcamps:**
   - Regular hands-on masterclasses in full-stack development, Git/GitHub workflows, AI model training, and competitive programming.
`
);

// 5. Ideathon Details
writeContent(
  'ideathon.md',
  'FLUX Ideathon Guidelines and Details',
  '/ideathon',
  `
### About FLUX Ideathon
The FLUX Ideathon is an intensive innovation challenge encouraging undergraduate students to formulate viable solutions to real-world technological challenges.

### Rules & Eligibility Guidelines
- **Eligibility:** Open to undergraduate engineering students. Every team must include at least one female team member to foster diverse perspectives.
- **Team Size:** 3 to 4 members per team.
- **Format / Mode:** Hybrid / Offline rounds conducted at the MMMUT campus.
- **Submission Requirements:** 
  1. Detailed problem statement selection and rationale.
  2. Proposed technical architecture and system flowchart.
  3. Technology stack selection, feasibility analysis, and potential patent/research scope.
  4. Final presentation pitch and prototype demonstration before an expert evaluation panel.

### Evaluation Criteria
- **Innovation & Originality:** Novelty of the proposed approach.
- **Technical Feasibility:** Soundness of system architecture and implementation viability.
- **Societal & Industrial Impact:** Practical value and market/community relevance.
- **Presentation & Defense:** Clarity during panel Q&A and prototype validation.

### Rewards & Recognition
- Cash prizes, technical goodies, certificates of excellence, and incubation mentorship for patent filing and research publication.
`
);

// 6. She Leads Initiative
writeContent(
  'she-leads.md',
  'She Leads - Women in Technology Initiative',
  '/she-leads',
  `
### Overview
**She Leads** is a flagship FLUX empowerment initiative designed to elevate, mentor, and inspire women students in technology, engineering, and research.

### Mission & Core Objectives
- Providing dedicated platforms for female engineering students to build, lead, and publish.
- Eliminating gender gaps in technical leadership, open-source contribution, and competitive programming.
- Fostering long-term mentorship relationships between women students, faculty, and accomplished women in tech industry alumni.

### Key Pillars
1. **Visionary Keynotes:** Interactive sessions with women tech leaders and alumni sharing career journeys, navigation strategies, and technical mastery.
2. **Hands-on Technical Workshops:** Practical masterclasses spanning full-stack web development, AI/ML fundamentals, UI/UX design, and Git collaboration.
3. **1-on-1 Mentorship:** Direct pairing of junior students with experienced senior mentors for academic, competitive, and career guidance.
4. **Project Incubation:** Support for female-led hackathon teams, research projects, and technical community organizing.

### Eligible Branches & Communities
Students across Computer Science & Engineering (CSE), Information Technology (IT), Electronics & Communication (ECE), Electrical (EE), Mechanical (ME), Civil (CE), Chemical (CHE), and MCA.
`
);

// 7. Projects & Problem Statements
// Load problems from Frontend/src/projects.json if available
let projectContent = `
### Overview
FLUX curates high-impact problem statements spanning AI, IoT, healthcare, agriculture, and campus automation. Students and research teams develop functional prototypes and publication-ready solutions around these challenges.

### Curated Problem Statements:
`;

try {
  const projectsPath = path.join(rootDir, 'Frontend', 'src', 'projects.json');
  if (fs.existsSync(projectsPath)) {
    const rawData = fs.readFileSync(projectsPath, 'utf-8');
    const projects = JSON.parse(rawData);
    projects.forEach((p, idx) => {
      projectContent += `
#### ${idx + 1}. ${p.name}
- **Domain:** ${p.domain || 'Technology & Innovation'}
- **Problem Statement:** ${p.problemStatement || 'N/A'}
- **Expected Solution:** ${p.expectedSolution || 'N/A'}
`;
    });
  }
} catch (err) {
  console.warn('Could not parse projects.json, falling back to core project list:', err.message);
}

writeContent('projects.md', 'FLUX Projects and Innovation Problem Statements', '/projects', projectContent);

// 8. Team Structure
writeContent(
  'team.md',
  'FLUX Team and Wing Structure',
  '/team',
  `
### Organization & Student Wings
FLUX operates through specialized student wings working synergistically under faculty guidance:

1. **Executive Leadership & Administration:**
   - Oversees strategic planning, event execution, inter-departmental collaboration, and external partnerships.
2. **AI & Machine Learning Wing:**
   - Spearheads research in deep learning, NLP, computer vision, and mechanistic interpretability. Conducts reading groups and builds intelligent AI applications.
3. **Software Development Wing:**
   - Develops and maintains web platforms, mobile utilities, and internal systems using modern technologies (React, Node.js, TypeScript, cloud services).
4. **Algorithms & Competitive Programming Wing:**
   - Conducts algorithmic training, problem-solving workshops, and prepares student cohorts for national and global coding contests.
5. **Design & UI/UX Wing:**
   - Crafts design systems, user interfaces, branding, and motion graphics for digital products and events.
6. **Content & Media Wing:**
   - Documents technical activities, publishes articles, manages social media outreach, and coordinates photography and video production.
`
);

// 9. Contact Information
writeContent(
  'contact.md',
  'Contact FLUX',
  '/contact',
  `
### Contact Information & Location

- **Official Email:** flux@mmmut.ac.in
- **Location:** Department of Computer Science & Engineering, Madan Mohan Malaviya University of Technology (MMMUT), Deoria Road, Gorakhpur, Uttar Pradesh, India - 273010.
- **Website:** https://flux.org.in / https://www.flux.org.in

### Community & Social Media Channels
- **LinkedIn:** https://www.linkedin.com/company/flux-mmm/
- **Instagram:** https://www.instagram.com/flux.mmmut
- **WhatsApp Community:** FLUX Community Channel
`
);

console.log('Successfully exported all chatbot knowledge base markdown files!');
