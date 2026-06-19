/**
 * Project type definitions
 * Ensures consistent typing across all project-related components
 */

export interface Project {
  slug: string;
  category: string;
  name: string;
  summary: string;
  year: string;
  role: string;
  body: string;
  tags?: string[];
  imageUrl?: string;
  liveUrl?: string;
}

export type { Project as ProjectType };
