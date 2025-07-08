import type { MultiSelectOption, JobBoard } from "@/types";

export const TECH_STACKS: MultiSelectOption[] = [
  // Frontend
  { value: "react", label: "React", category: "Frontend" },
  { value: "vue", label: "Vue.js", category: "Frontend" },
  { value: "angular", label: "Angular", category: "Frontend" },
  { value: "svelte", label: "Svelte", category: "Frontend" },
  { value: "nextjs", label: "Next.js", category: "Frontend" },
  { value: "typescript", label: "TypeScript", category: "Frontend" },
  { value: "javascript", label: "JavaScript", category: "Frontend" },

  // Backend
  { value: "nodejs", label: "Node.js", category: "Backend" },
  { value: "python", label: "Python", category: "Backend" },
  { value: "java", label: "Java", category: "Backend" },
  { value: "csharp", label: "C#", category: "Backend" },
  { value: "php", label: "PHP", category: "Backend" },
  { value: "ruby", label: "Ruby", category: "Backend" },
  { value: "go", label: "Go", category: "Backend" },
  { value: "rust", label: "Rust", category: "Backend" },

  // Database
  { value: "postgresql", label: "PostgreSQL", category: "Database" },
  { value: "mysql", label: "MySQL", category: "Database" },
  { value: "mongodb", label: "MongoDB", category: "Database" },
  { value: "redis", label: "Redis", category: "Database" },

  // Cloud & DevOps
  { value: "aws", label: "AWS", category: "Cloud" },
  { value: "azure", label: "Azure", category: "Cloud" },
  { value: "gcp", label: "Google Cloud", category: "Cloud" },
  { value: "docker", label: "Docker", category: "DevOps" },
  { value: "kubernetes", label: "Kubernetes", category: "DevOps" },
];

export const SOFT_SKILLS: MultiSelectOption[] = [
  { value: "communication", label: "Communication", category: "Interpersonal" },
  { value: "leadership", label: "Leadership", category: "Management" },
  {
    value: "problem-solving",
    label: "Problem Solving",
    category: "Analytical",
  },
  {
    value: "team-collaboration",
    label: "Team Collaboration",
    category: "Interpersonal",
  },
  {
    value: "time-management",
    label: "Time Management",
    category: "Organizational",
  },
  {
    value: "critical-thinking",
    label: "Critical Thinking",
    category: "Analytical",
  },
  { value: "adaptability", label: "Adaptability", category: "Personal" },
  { value: "creativity", label: "Creativity", category: "Personal" },
  {
    value: "attention-to-detail",
    label: "Attention to Detail",
    category: "Personal",
  },
  {
    value: "project-management",
    label: "Project Management",
    category: "Management",
  },
  {
    value: "conflict-resolution",
    label: "Conflict Resolution",
    category: "Interpersonal",
  },
  {
    value: "public-speaking",
    label: "Public Speaking",
    category: "Communication",
  },
  { value: "mentoring", label: "Mentoring", category: "Management" },
  {
    value: "strategic-planning",
    label: "Strategic Planning",
    category: "Management",
  },
  {
    value: "customer-service",
    label: "Customer Service",
    category: "Interpersonal",
  },
  {
    value: "emotional-intelligence",
    label: "Emotional Intelligence",
    category: "Personal",
  },
  { value: "negotiation", label: "Negotiation", category: "Communication" },
  {
    value: "decision-making",
    label: "Decision Making",
    category: "Analytical",
  },
  { value: "organization", label: "Organization", category: "Organizational" },
  { value: "multitasking", label: "Multitasking", category: "Organizational" },
];

export const QUALIFICATIONS: MultiSelectOption[] = [
  { value: "high-school", label: "High School Diploma" },
  { value: "associate", label: "Associate Degree" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "phd", label: "PhD" },
  { value: "bootcamp", label: "Coding Bootcamp" },
  { value: "aws-cert", label: "AWS Certification" },
  { value: "azure-cert", label: "Azure Certification" },
  { value: "gcp-cert", label: "Google Cloud Certification" },
  { value: "pmp", label: "PMP Certification" },
  { value: "scrum-master", label: "Scrum Master Certification" },
];

export const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "CAD", label: "CAD (C$)" },
] as const;

export const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "remote", label: "Remote" },
] as const;

export const DEFAULT_JOB_BOARDS: JobBoard[] = [
  {
    id: "1",
    name: "LinkedIn",
    url: "https://linkedin.com/jobs",
    isActive: true,
  },
  {
    id: "2",
    name: "Indeed",
    url: "https://indeed.com",
    isActive: true,
  },
  {
    id: "3",
    name: "Glassdoor",
    url: "https://glassdoor.com",
    isActive: true,
  },
  {
    id: "4",
    name: "AngelList",
    url: "https://angel.co",
    isActive: false,
  },
  {
    id: "5",
    name: "Stack Overflow Jobs",
    url: "https://stackoverflow.com/jobs",
    isActive: false,
  },
];

export const POPULAR_JOB_BOARDS = [
  { name: "LinkedIn", url: "https://linkedin.com/jobs" },
  { name: "Indeed", url: "https://indeed.com" },
  { name: "Glassdoor", url: "https://glassdoor.com" },
  { name: "AngelList", url: "https://angel.co" },
  { name: "Stack Overflow Jobs", url: "https://stackoverflow.com/jobs" },
  { name: "GitHub Jobs", url: "https://jobs.github.com" },
  { name: "Dice", url: "https://dice.com" },
  { name: "Monster", url: "https://monster.com" },
  { name: "CareerBuilder", url: "https://careerbuilder.com" },
  { name: "ZipRecruiter", url: "https://ziprecruiter.com" },
];
