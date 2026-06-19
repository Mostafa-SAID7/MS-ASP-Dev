import { memo } from "react";
import { ProjectCard } from "./ProjectCard";
import { Project } from "./types";

interface ProjectGridProps {
  items: Project[];
}

export const ProjectGrid = memo(function ProjectGrid({ items }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <ProjectCard
          key={p.slug}
          slug={p.slug}
          category={p.category}
          name={p.name}
          summary={p.summary}
          year={p.year}
          imageUrl={p.imageUrl}
          tags={p.tags}
          delay={i * 0.07}
        />
      ))}
    </div>
  );
});
