/**
 * Experience, education, skills and achievements.
 * Used by /experience, /about and /resume.
 */

export type TimelineItem = {
  role: string;
  org: string;
  period: string;
  /** "work" or "leadership" controls the small label on the timeline. */
  kind: "work" | "leadership";
  bullets: string[];
};

export const experience: TimelineItem[] = [
  {
    role: "LLM Post-Training Intern",
    org: "Ethara AI",
    period: "Feb 2026 – Present",
    kind: "work",
    bullets: [
      "Score LLM responses against quality rubrics and run side-by-side (SxS) comparisons.",
      "Check model outputs for factual accuracy, instruction following and reasoning; flag hallucinations.",
      "Annotate and clean datasets for SFT and RLHF training pipelines.",
      "Work with the AI team on response quality and safety guidelines.",
    ],
  },
  {
    role: "Data & Finance Coordinator",
    org: "Avishkar, GD Goenka University",
    period: "Oct 2024 – Jun 2025",
    kind: "leadership",
    bullets: [
      "Kept financial records organised and ran basic analysis for planning and reports.",
      "Supported budgeting and documented all expenses.",
      "Helped organise sessions with industry and investment professionals.",
    ],
  },
];

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  detail?: string;
};

export const education: EducationItem[] = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "GD Goenka University",
    period: "2022 – 2026",
    detail: "CGPA 8.1/10",
  },
  {
    degree: "Class 12, CBSE",
    school: "RPS School, Mahendragarh",
    period: "2022",
  },
  {
    degree: "Class 10, CBSE",
    school: "Kendriya Vidyalaya, Mathura",
    period: "2020",
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Python", "Java", "JavaScript", "C", "SQL", "HTML", "CSS"] },
  { label: "Web", items: ["React.js", "Node.js", "Express.js", "Bootstrap"] },
  {
    label: "AI / LLM",
    items: [
      "LLM Evaluation",
      "RLHF",
      "SFT",
      "Data Annotation",
      "Hallucination Detection",
      "Prompt Engineering",
      "NLP",
      "Botpress",
    ],
  },
  { label: "Tools", items: ["Git", "Docker", "Firebase", "VS Code"] },
];

export const achievements: string[] = [
  "2nd Prize, Smart India Hackathon (SIH) Internal Round",
];
