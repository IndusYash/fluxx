/**
 * ByteBrawl x Hacktoberfest Configuration File
 * All event facts are centralized here.
 * Where a value is unknown, "To be announced" is rendered.
 * Marked with TODO comments for unannounced facts.
 */

export interface PrizeItem {
  place: string;
  amount: string;
  description: string;
}

export interface CoordinatorItem {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const BYTEBRAWL_CONFIG = {
  name: "ByteBrawl x Hacktoberfest",
  shortName: "ByteBrawl '26",
  slug: "bytebrawl-hacktoberfest",
  tagline: "Architectural resilience meets rapid implementation under strict production constraints.",
  organizer: "FLUX, Department of Computer Science & Engineering, MMMUT Gorakhpur",

  // ── Event Logistics ──────────────────────────────────────────
  date: "26 - 29 October, 2026",
  // TODO: Announce official reporting and hackathon hours
  time: "To be announced",
  venue: "Alan Turing Hall",
  // TODO: Update official registration deadline timestamp
  registrationDeadline: "2026-10-31T23:59:59+05:30",
  // TODO: Set venue seating capacity (number of registrations)
  capacity: 100,

  // ── Contact & Faculty / Student Leads ─────────────────────────
  // TODO: Replace with official email if a dedicated event inbox is used
  contactEmail: "flux@mmmut.ac.in",
  whatsappGroupLink: "https://chat.whatsapp.com/CEQxUE7IS485dCgckzTNjm",
  instagramLink: "https://www.instagram.com/flux.mmmut?srtk=cWNvcmV4ZDcxdXZq",
  coordinators: [
    {
      name: "To be announced", // TODO: Student Lead Coordinator Name
      role: "Lead Event Coordinator",
      phone: "To be announced", // TODO: Coordinator Phone
      email: "flux@mmmut.ac.in",
    },
    {
      name: "To be announced", // TODO: Technical Operations Lead Name
      role: "Technical Coordinator",
      phone: "To be announced", // TODO: Coordinator Phone
      email: "flux@mmmut.ac.in",
    },
  ] as CoordinatorItem[],

  // ── Prizes & Rewards ─────────────────────────────────────────
  // TODO: Announce official cash prizes, sponsor bounties, and awards
  prizesTBA: true,
  prizes: [
    {
      place: "Winner (1st Place)",
      amount: "To be announced", // TODO: 1st place cash prize / hardware perk
      description: "Trophy, official FLUX & Hacktoberfest winner certificate, and premium hardware / swag kit.",
    },
    {
      place: "Runner Up (2nd Place)",
      amount: "To be announced", // TODO: 2nd place prize
      description: "Runner-up trophy, merit certificate, and sponsor merchandise bundle.",
    },
    {
      place: "2nd Runner Up (3rd Place)",
      amount: "To be announced", // TODO: 3rd place prize
      description: "Third place trophy, merit certificate, and tech gear.",
    },
    {
      place: "Best Open-Weight AI Agent",
      amount: "To be announced", // TODO: Track prize
      description: "Special citation for the best integration of open-weight models under the 2026 Hacktoberfest theme.",
    },
  ] as PrizeItem[],

  // ── Eligibility & Format ─────────────────────────────────────
  // TODO: Confirm branch/year restrictions if any
  eligibility: "Open to all enrolled students across all branches and years at MMMUT Gorakhpur.",
  teamSizeText: "Team of 2, or Individual",
  format: "High-intensity competitive coding showdown with live architectural evaluation and automated test suites.",
  platform: "In-person at MMMUT Gorakhpur campus with live leaderboard updates.",

  // ── Validation Patterns ──────────────────────────────────────
  // Default 6-14 alphanumeric roll number pattern; TODO: calibrate with MMMUT university roll number system (e.g. 2024021...)
  rollNumberPattern: /^[A-Za-z0-9]{6,14}$/,
  rollNumberPatternError: "Roll number must be between 6 and 14 alphanumeric characters",

  // ── Rules & Regulations ──────────────────────────────────────
  rules: [
    {
      category: "Code Integrity & Originality",
      items: [
        "All code developed during ByteBrawl must be authored during the hackathon period.",
        "Plagiarism, copying existing closed-source solutions, or passing off pre-built apps will result in immediate disqualification.",
        "Open-source libraries, open-weight models, and permissive packages are allowed and encouraged.",
      ],
    },
    {
      category: "Production Constraints",
      items: [
        "Submissions are evaluated not just on features, but on architectural resilience, latency under load, and comprehensive test coverage.",
        "Teams must provide setup instructions, documentation, and automated tests for their repositories.",
      ],
    },
    {
      category: "Hacktoberfest 2026 Guidelines",
      items: [
        "Theme: 'AI belongs to everyone' — build with open-source AI, open-weight models, autonomous agents, and AI tooling.",
        "Pull requests no longer count toward rewards in 2026. Participants earn digital badges and physical sticker packs through MLH and DEV.",
        "Teams must publish their project under an OSI-approved open-source license on GitHub.",
      ],
    },
    {
      category: "Registration & Team Guidelines",
      items: [
        "A team consists of exactly 2 members, or 1 member for Individual registration.",
        "Each participant (by roll number and email) may only register once.",
        "Both members of a team must be verified MMMUT students with valid university roll numbers.",
        "Registrations are processed on a first-come, first-served basis up to venue capacity.",
      ],
    },
  ],

  // ── FAQs ──────────────────────────────────────────────────────
  faqs: [
    {
      question: "Can I participate if I don't have a teammate?",
      answer: "Yes! You can choose 'Individual Registration (1 Member)'. You will compete as a solo developer, or you may be paired with another solo participant during the opening networking session.",
    },
    {
      question: "Do GitHub pull requests count towards Hacktoberfest rewards this year?",
      answer: "No. Under the official 2026 Hacktoberfest format organized by MLH and DEV with DigitalOcean, pull requests no longer count towards rewards. Instead, participants earn virtual badges that convert into real sticker packs by mail by registering on hacktoberfest.com and adding their mailing address to their MyMLH account.",
    },
    {
      question: "What is the 2026 Hacktoberfest theme?",
      answer: "The 2026 theme is 'AI belongs to everyone' — focusing on learning, experimenting, and building with open-source AI and open-weight models, AI tooling, agents, and reusable skill systems.",
    },
    {
      question: "Is there any registration fee for ByteBrawl?",
      answer: "No! Registration for ByteBrawl x Hacktoberfest is completely free for all MMMUT students, proudly hosted by FLUX and the Department of Computer Science & Engineering.",
    },
    {
      question: "How will I know my registration is confirmed?",
      answer: "Upon submitting the form, you will receive a unique Registration ID (formatted as BBH26-XXXXXX) displayed on the screen and sent to your registered email address.",
    },
  ] as FAQItem[],
};

