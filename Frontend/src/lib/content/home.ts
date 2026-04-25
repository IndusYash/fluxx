import type { Feature, Testimonial, Partner, ShowcaseTab } from "@/types/types"

export const hero = {
  eyebrow: "Student Developers’ Society",
  title: "Flux",
  subtitle:
    "Tools, teams, and ideas in motion — a community building with intention.",
  primaryCta: { label: "Join Flux", href: "/team" },
  secondaryCta: { label: "Explore Projects", href: "/about" },
}

export const features: Feature[] = [
  {
    title: "Hands-on projects",
    description: "Real builds, real reviews, real growth across web, systems, and AI.",
  },
  {
    title: "Peer mentorship",
    description: "Learn in squads, ship in sprints, and present with confidence.",
  },
  {
    title: "Tech talks & demos",
    description: "Monthly deep-dives and lightning demos from students and faculty.",
  },
  {
    title: "Open-source first",
    description: "Contribute upstream and make your portfolio unmissable.",
  },
]

export const showcase: ShowcaseTab[] = [
  {
    key: "web",
    label: "Web",
    image: "/assets/images/showcase-web.png",
    caption: "Beautiful UIs with React, Tailwind, and shadcn.",
  },
  {
    key: "cli",
    label: "CLI",
    code: `# flux-cli quickstart
npx flux new my-app
cd my-app
pnpm dev`,
    caption: "Command-line tooling for rapid starters.",
  },
]

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Gupta",
    role: "Core Member",
    quote:
      "Flux pushed me to ship. The feedback loops are fast, honest, and kind.",
    avatar: "/assets/images/avatars/aarav.png",
  },
  {
    name: "Prof. Sharma",
    role: "Faculty Advisor",
    quote:
      "A student-led space where rigor meets creativity — exemplary initiative.",
    avatar: "/assets/images/avatars/sharma.png",
  },
]

export const partners: Partner[] = [
  { name: "GitHub", logo: "/assets/logos/github.svg", href: "#" },
  { name: "Vercel", logo: "/assets/logos/vercel.svg", href: "#" },
  { name: "Cloudflare", logo: "/assets/logos/cloudflare.svg", href: "#" },
  { name: "FOSS United", logo: "/assets/logos/foss.svg", href: "#" },
]
