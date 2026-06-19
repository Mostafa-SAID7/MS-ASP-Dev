/**
 * Main Dictionaries - Central import point
 * Imports from split sections to avoid duplication
 */

import { allProjectsEN, allProjectsAR } from "./projects";
import { uiEN, uiAR } from "./ui";
import { heroEN, heroAR } from "./sections/hero";
import { aboutEN, aboutAR } from "./sections/about";
import { skillsEN, skillsAR } from "./sections/skills";
import { experienceEN, experienceAR } from "./sections/experience";
import { educationEN, educationAR } from "./sections/education";
import { contactEN, contactAR } from "./sections/contact";
import { projectEN, projectAR } from "./sections/project";
import { pricingEN, pricingAR } from "./sections/pricing";

export const en = {
  ...uiEN,
  hero: heroEN,
  about: aboutEN,
  skills: skillsEN,
  projects: {
    eyebrow: "Selected systems",
    title: "Things I built and still maintain.",
    all: "All",
    view: "View case",
    items: allProjectsEN as typeof allProjectsEN,
  },
  experience: experienceEN,
  education: educationEN,
  contact: contactEN,
  project: projectEN,
  pricing: pricingEN,
};

export const ar = {
  ...uiAR,
  hero: heroAR,
  about: aboutAR,
  skills: skillsAR,
  projects: {
    eyebrow: "أنظمة مختارة",
    title: "أنظمة بنيتها ولا أزال أُشرف عليها.",
    all: "الكل",
    view: "تفاصيل المشروع",
    items: allProjectsAR as typeof allProjectsAR,
  },
  experience: experienceAR,
  education: educationAR,
  contact: contactAR,
  project: projectAR,
  pricing: pricingAR,
};

export type Dictionary = typeof en;

export const dictionaries = { en, ar };
