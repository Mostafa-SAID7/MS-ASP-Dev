import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

// Below-fold sections are lazy-loaded so they don't block the initial bundle.
// Each section only needs to be ready by the time the user scrolls to it.
const About      = lazy(() => import("@/components/sections/About").then(m => ({ default: m.About })));
const Skills     = lazy(() => import("@/components/sections/Skills").then(m => ({ default: m.Skills })));
const Projects   = lazy(() => import("@/components/sections/Projects").then(m => ({ default: m.Projects })));
const Experience = lazy(() => import("@/components/sections/Experience").then(m => ({ default: m.Experience })));
const Education  = lazy(() => import("@/components/sections/Education").then(m => ({ default: m.Education })));
const Pricing    = lazy(() => import("@/components/sections/Pricing").then(m => ({ default: m.Pricing })));
const Contact    = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })));

/**
 * VITE_SITE_URL — set this env variable to the deployed origin, e.g.
 *   VITE_SITE_URL=https://mostafa-samir.replit.app
 * When unset the canonical falls back to a relative "/" (still valid, just
 * not as helpful for multi-domain deduplication).
 */
const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) ?? "";

const TITLE = "Mostafa Samir — Full-Stack .NET & Angular Developer";
const DESCRIPTION =
  "Full-Stack Software Developer with 4+ years building secure, scalable .NET 8 and Angular/TypeScript applications. Based in Tanta, Egypt — working globally.";
const CANONICAL = `${SITE_URL}/`;
const OG_IMAGE = `${SITE_URL}/MS.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "Mostafa Samir, Full-Stack Developer, .NET 8, ASP.NET Core, C#, Angular, TypeScript, SQL Server, Microservices, Egypt, مطور ويب مصري, مطور Angular, مطور ASP.NET Core, مطوّر برمجيات مصر, برمجة مواقع مصر, تطوير تطبيقات ويب, مطور .NET مصر, توظيف مطور ويب, مطور Full Stack مصري, مطور طنطا" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: "Mostafa Samir — Full-Stack Developer" },
      { property: "og:image:width", content: "800" },
      { property: "og:image:height", content: "1000" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mostafa Samir",
          jobTitle: "Full-Stack Software Developer",
          description: DESCRIPTION,
          url: CANONICAL,
          email: "m.ssaid356@gmail.com",
          telephone: "+201067358073",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tanta",
            addressCountry: "EG",
          },
          knowsAbout: [".NET 8", "ASP.NET Core", "C#", "Angular", "TypeScript", "SQL Server", "Microservices", "Clean Architecture", "EF Core"],
          sameAs: [
            "https://github.com/Mostafa-SAID7",
            "https://www.linkedin.com/in/mostafasamirsaid",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <Hero />
      {/* Single Suspense boundary — sections stream in as their chunks arrive */}
      <Suspense fallback={null}>
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Pricing />
        <Contact />
      </Suspense>
      <Footer />
    </>
  );
}
