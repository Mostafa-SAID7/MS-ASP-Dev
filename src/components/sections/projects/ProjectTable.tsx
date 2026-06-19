import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { COLORS, FONTS, COMPONENTS, BORDERS } from "@/styles/theme";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";
import { Project } from "./types";

interface ProjectTableProps {
  items: Project[];
  onRowClick?: () => void;
}

export function ProjectTable({ items, onRowClick }: ProjectTableProps) {
  return (
    <table className="w-full">
      <thead className="sticky top-0 z-10 border-b border-border bg-background">
        <tr>
          <th className={`${COMPONENTS.tableHeader} w-14 ps-4`}>
            {/* thumbnail column */}
          </th>
          <th className={COMPONENTS.tableHeader}>Project</th>
          <th className={`${COMPONENTS.tableHeader} hidden md:table-cell w-36`}>
            Category
          </th>
          <th className={`${COMPONENTS.tableHeader} hidden md:table-cell w-20`}>
            Year
          </th>
          <th className={`${COMPONENTS.tableHeader} w-20`}>View</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/40">
        {items.map((p) => (
          <tr key={p.slug} className="transition hover:bg-card/30">
            {/* Thumbnail cell */}
            <td className="ps-4 py-3">
              <ProjectThumbnail
                name={p.name}
                category={p.category}
                slug={`modal-${p.slug}`}
                imageUrl={p.imageUrl}
                className={`size-10 ${BORDERS.roundedLg} flex-shrink-0`}
              />
            </td>

            {/* Name + summary */}
            <td className="px-4 py-3">
              <div className={`${FONTS.displayXs} leading-snug`}>{p.name}</div>
              {p.tags && p.tags.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className={COMPONENTS.tagChipSm}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div
                className={`mt-0.5 ${FONTS.bodyXs} ${COLORS.textMuted} line-clamp-1 md:hidden`}
              >
                {p.category} · {p.year}
              </div>
              <div
                className={`mt-0.5 ${FONTS.bodyXs} ${COLORS.textMuted} line-clamp-1 hidden md:block`}
              >
                {p.summary}
              </div>
            </td>

            {/* Category badge */}
            <td className="hidden px-4 py-3 md:table-cell">
              <span className={COMPONENTS.categoryPillLg}>
                {p.category}
              </span>
            </td>

            {/* Year */}
            <td
              className={`hidden px-4 py-3 ${FONTS.labelXs} ${COLORS.textMuted} md:table-cell`}
            >
              {p.year}
            </td>

            {/* Open link */}
            <td className="px-4 py-3">
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                onClick={onRowClick}
                className={`inline-flex items-center gap-1 ${FONTS.labelXs} ${COLORS.textMuted} transition hover:text-foreground`}
              >
                Open <ArrowUpRight className="size-3" />
              </Link>
            </td>
          </tr>
        ))}

        {items.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className={`px-6 py-16 text-center ${FONTS.bodySm} ${COLORS.textMuted}`}
            >
              No projects match your search.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
