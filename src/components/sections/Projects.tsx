import { useMemo, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { SPACING, COMPONENTS } from "@/styles/theme";
import {
  ProjectGrid,
  ProjectFilter,
  ProjectModal,
  type Project,
} from "./projects/index";

export function Projects() {
  const t = useT();
  const items: Project[] = t.projects.items;
  const allCategoryLabel = t.projects.all;

  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(allCategoryLabel);

  const uniqueCategories = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const p of items) {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        out.push(p.category);
      }
    }
    return out;
  }, [items]);

  const filterPills = [allCategoryLabel, ...uniqueCategories];

  const sectionItems = useMemo(() => {
    const base =
      active === allCategoryLabel ? items : items.filter((p) => p.category === active);
    return base.slice(0, 3);
  }, [items, active, allCategoryLabel]);

  return (
    <>
      {/* ─── Section ─────────────────────────────────────────── */}
      <section id="projects" className={`mx-auto max-w-7xl ${SPACING.section}`}>
        <SectionLabel eyebrow={t.projects.eyebrow} title={t.projects.title} />

        {/* Filter pills */}
        <div className="mb-8">
          <ProjectFilter
            pills={filterPills}
            active={active}
            onChange={setActive}
          />
        </div>

        {/* Project grid */}
        <ProjectGrid items={sectionItems} />

        {/* See All button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className={COMPONENTS.buttonSecondary}
          >
            <LayoutGrid className="size-4" />
            All {items.length} projects
          </button>
        </div>
      </section>

      {/* ─── Modal ───────────────────────────────────────────── */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        allItems={items}
        filterPills={filterPills}
        allLabel={allCategoryLabel}
      />
    </>
  );
}
