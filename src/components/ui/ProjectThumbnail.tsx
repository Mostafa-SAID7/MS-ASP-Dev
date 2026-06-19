import { memo, useState } from "react";

/**
 * ProjectThumbnail — shows a real image when available, gracefully falls
 * back to a generated category-gradient SVG if the image URL is missing
 * or fails to load (404, network error, etc.).
 * Wrapped in React.memo — props are stable strings so parent filter/sort
 * re-renders produce no work here.
 */

type Props = {
  name: string;
  category: string;
  slug: string;
  imageUrl?: string;
  className?: string;
};

type Config = {
  g1: string;
  g2: string;
  textColor: string;
  pattern: "grid" | "lines" | "dots" | "diagonal";
};

const CONFIGS: Record<string, Config> = {
  MVC:          { g1: "#c97c4a", g2: "#4e2610", textColor: "rgba(255,238,215,0.9)", pattern: "grid" },
  "REST API":   { g1: "#3d6fa8", g2: "#112a50", textColor: "rgba(215,235,255,0.9)", pattern: "lines" },
  Microservices:{ g1: "#2e9469", g2: "#0c3a25", textColor: "rgba(205,245,228,0.9)", pattern: "dots" },
  "Full Stack": { g1: "#7c52c2", g2: "#2a1065", textColor: "rgba(232,215,255,0.9)", pattern: "diagonal" },
};

const FALLBACK: Config = {
  g1: "#5a5a58", g2: "#1c1c1a", textColor: "rgba(240,240,235,0.9)", pattern: "dots",
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function PatternDef({ kind, id }: { kind: Config["pattern"]; id: string }) {
  if (kind === "grid") {
    return (
      <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" />
      </pattern>
    );
  }
  if (kind === "lines") {
    return (
      <pattern id={id} width="48" height="10" patternUnits="userSpaceOnUse">
        <line x1="0" y1="5" x2="48" y2="5" stroke="rgba(255,255,255,0.09)" strokeWidth="0.7" />
      </pattern>
    );
  }
  if (kind === "dots") {
    return (
      <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
        <circle cx="9" cy="9" r="1.2" fill="rgba(255,255,255,0.13)" />
      </pattern>
    );
  }
  return (
    <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse">
      <line x1="0" y1="14" x2="14" y2="0" stroke="rgba(255,255,255,0.08)" strokeWidth="0.9" />
    </pattern>
  );
}

function GradientSVG({ name, category, slug }: { name: string; category: string; slug: string }) {
  const cfg = CONFIGS[category] ?? FALLBACK;
  const initials = getInitials(name);
  const gradId = `pt-grad-${slug}`;
  const patId  = `pt-pat-${slug}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={cfg.g1} />
          <stop offset="100%" stopColor={cfg.g2} />
        </linearGradient>
        <PatternDef kind={cfg.pattern} id={patId} />
      </defs>
      <rect width="400" height="260" fill={`url(#${gradId})`} />
      <rect width="400" height="260" fill={`url(#${patId})`} />
      <text
        x="200" y="148"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="88"
        fontWeight="300"
        letterSpacing="-2"
        fill={cfg.textColor}
        style={{ fontFamily: "Georgia, serif" }}
      >
        {initials}
      </text>
      <text
        x="20" y="240"
        fontSize="11"
        fontWeight="500"
        letterSpacing="2"
        fill="rgba(255,255,255,0.4)"
        style={{ fontFamily: "system-ui, sans-serif", textTransform: "uppercase" }}
      >
        {category.toUpperCase()}
      </text>
    </svg>
  );
}

export const ProjectThumbnail = memo(function ProjectThumbnail({
  name,
  category,
  slug,
  imageUrl,
  className = "",
}: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {imageUrl && !imgError ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
        />
      ) : (
        <GradientSVG name={name} category={category} slug={slug} />
      )}
    </div>
  );
});
