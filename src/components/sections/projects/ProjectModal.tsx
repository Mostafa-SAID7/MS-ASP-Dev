import { useEffect, useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { FONTS, COLORS, COMPONENTS, BORDERS } from "@/styles/theme";
import { ProjectTable } from "./ProjectTable";
import { ProjectFilter } from "./ProjectFilter";
import { Project } from "./types";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  allItems: Project[];
  filterPills: string[];
  allLabel: string;
}

export function ProjectModal({
  isOpen,
  onClose,
  allItems,
  filterPills,
  allLabel,
}: ProjectModalProps) {
  const [search, setSearch] = useState("");
  const [modalFilter, setModalFilter] = useState(allLabel);

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase();
    return allItems.filter((p) => {
      const catMatch = modalFilter === allLabel || p.category === modalFilter;
      const textMatch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [allItems, search, modalFilter, allLabel]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className={`relative z-10 flex w-full max-w-5xl flex-col ${BORDERS.rounded2xl} border border-border bg-background shadow-2xl max-h-[90dvh]`}>

        {/* ── Sticky header ── */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-4 sm:px-6 py-4 sm:py-5">
          <div>
            <h2 className={FONTS.displaySm}>All Projects</h2>
            <p className={`mt-0.5 ${FONTS.labelXs} ${COLORS.textMuted}`}>
              {allItems.length} total · {filteredItems.length} shown
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={COMPONENTS.toggleButton}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* ── Sticky search + filter ── */}
        <div className="flex flex-shrink-0 flex-col gap-3 border-b border-border px-4 sm:px-6 py-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, category, or description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full ${BORDERS.roundedLg} border border-border bg-card/50 ps-9 pe-4 py-2.5 ${FONTS.bodySm} outline-none transition focus:border-foreground`}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <ProjectFilter
              pills={filterPills}
              active={modalFilter}
              onChange={setModalFilter}
            />
          </div>
        </div>

        {/* ── Scrollable table ── */}
        <div className="scrollbar-slim flex-1 overflow-y-auto overflow-x-auto">
          <ProjectTable items={filteredItems} onRowClick={onClose} />
        </div>

        {/* ── Sticky footer ── */}
        <div className="flex flex-shrink-0 items-center justify-between border-t border-border px-4 sm:px-6 py-3">
          <span className={`${FONTS.labelXs} ${COLORS.textMuted}`}>
            {filteredItems.length} of {allItems.length} project
            {allItems.length !== 1 ? "s" : ""}
          </span>
          {(search || modalFilter !== allLabel) && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setModalFilter(allLabel);
              }}
              className={`${FONTS.labelXs} ${COLORS.textMuted} underline underline-offset-2 transition hover:text-foreground`}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
