import { useT } from "@/i18n/useT";
import {
  HeroHeader,
  HeroPhoto,
  HeroColumn,
  HeroCTA,
  HeroStats,
  HeroDivider,
  HeroHeadline,
  HeroLede,
  HeroStack,
  HeroFooter,
} from "./hero/index";

export function Hero() {
  const t = useT();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-dvh flex-col justify-between overflow-hidden px-6 pt-28 pb-8 md:px-10"
    >
      {/* Header with eyebrow and availability badge */}
      <HeroHeader eyebrow={t.hero.eyebrow} availableText={t.hero.availableText} />

      {/* Main content */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center">
        <div className="grid w-full gap-10 md:grid-cols-12 md:gap-16 lg:gap-20">

          {/* First in DOM = visual LEFT in LTR, visual RIGHT in RTL */}
          {/* EN: Text on the left  |  AR: Text on the right (start of RTL reading) */}
          <HeroColumn side="left" delay={0} colSpan={7} card>
            <HeroHeadline lines={t.hero.title} />
            <HeroLede text={t.hero.lede} />
            <HeroStack techs={t.hero.stack} />
          </HeroColumn>

          {/* Second in DOM = visual RIGHT in LTR, visual LEFT in RTL */}
          {/* EN: Photo on the right  |  AR: Photo on the left */}
          <HeroColumn side="right" delay={0.2} colSpan={5}>
            <HeroPhoto
              photoAlt={t.hero.photoAlt}
              hoverTitle={t.hero.hoverTitle}
              hoverSubtitle={t.hero.hoverSubtitle}
            />
            <HeroCTA
              hireMe={t.hero.hireMe}
              resume={t.hero.resume}
              whatsappUrl={t.hero.whatsappUrl}
            />
            <HeroStats stats={t.hero.stats} />
          </HeroColumn>

        </div>
      </div>

      {/* Footer with location and scroll indicator */}
      <HeroFooter location={t.hero.location} scrollText={t.hero.scrollText} />
    </section>
  );
}
