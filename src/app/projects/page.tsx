import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/Section";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI/LLM and web projects by Harsh Kumar Jakhar, including a multilingual museum chatbot and a job scam detector.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Projects"
        title="Things I have built."
        intro="Filter by area. Each project has its own page with the problem, what I built and what I learned."
      />
      <div className="mt-8 mb-20">
        <ProjectGrid projects={projects} />
      </div>
    </Container>
  );
}
