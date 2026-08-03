import type { Metadata } from "next";
import { getAllWork } from "@/lib/content";
import { SectionHead, Shell } from "@/components/section";
import { WorkIndex } from "@/components/work-index";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and case studies.",
};

export default function WorkPage() {
  const work = getAllWork();

  return (
    <Shell>
      <header className="grid grid-cols-1 gap-y-6 pb-16 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-x-16">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-faint lg:pt-4">
          Work
        </p>
        <h1 className="hang-punct font-display text-h1 leading-[0.94] tracking-[-0.02em]">
          What I built, and what it cost to build it.
        </h1>
      </header>

      <section className="pb-16">
        <SectionHead label="Index" count={work.length} />
        <WorkIndex items={work} />
      </section>
    </Shell>
  );
}
