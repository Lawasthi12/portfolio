import { Link } from "react-router-dom";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { useContent, usePageSeo } from "@/lib/useContent";

export default function Experience() {
  usePageSeo("experience", "Experience — Lalit Awasthi", "Professional experience of Lalit Awasthi — AI research, IT operations, science teaching, and technology training.");
  const content = useContent();
  const jobs = content?.experience || [];
  return (
    <div>
      <PageHero
        overline="Experience"
        title="The full timeline."
        lede="Research labs, classrooms, training institutes, and server rooms — every role added a layer to how I work with technology and people."
      />
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="border-l-2 border-line ml-2 md:ml-4">
          {jobs.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.05}>
              <article className="relative pl-8 md:pl-12 pb-14 last:pb-0" data-testid={`experience-item-${i}`}>
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-paper border-2 border-forest" aria-hidden="true" />
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-forest font-medium">{job.period}</p>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-ink">{job.role}</h2>
                <p className="mt-1 font-serif italic text-xl text-muted">
                  {job.org}{job.location ? ` — ${job.location}` : ""}
                </p>
                <ul className="mt-6 space-y-3 max-w-3xl">
                  {(job.points || []).map((pt, j) => (
                    <li key={j} className="text-sm sm:text-base leading-relaxed text-muted flex gap-3">
                      <span className="text-teal select-none">—</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16">
          <Link to="/cv" data-testid="experience-cv-cta" className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.12em] text-forest link-line">
            See the complete CV <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
