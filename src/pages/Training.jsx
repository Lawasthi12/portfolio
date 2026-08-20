import { Link } from "react-router-dom";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { useContent, usePageSeo } from "@/lib/useContent";

const FORMATS = [
  { title: "Workshops", text: "Focused half-day to multi-day sessions with hands-on exercises in small groups." },
  { title: "Courses", text: "Structured multi-week programs with progression, projects, and assessment." },
  { title: "Institutional Programs", text: "Technology literacy and training programs designed for schools and organizations." },
];

const TRACK_RECORD = [
  { org: "GreenQbit", detail: "Co-founded a computer training institute; designed curriculum and taught IT and digital literacy programs across multiple batches." },
  { org: "Teach for Nepal", detail: "Two years teaching science to secondary students, integrating technology into lessons and leading community education initiatives." },
  { org: "Reliance Co-Ed. School", detail: "As IT Officer, deployed digital tools for academic and administrative work and supported staff adoption." },
];

export default function Training() {
  usePageSeo("training", "Education & Training — Lalit Awasthi", "AI, programming, and technology training programs by Lalit Awasthi — workshops, courses, and institutional programs.");
  const content = useContent();
  const trainings = content?.trainings || [];

  return (
    <div>
      <PageHero
        overline="Education & Training"
        title="Technology, taught properly."
        lede="I have spent years on the teaching side of technology, in classrooms, training institutes, and institutions. I design training that leaves people able to do things, not just aware of them."
      />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-ink">Teaching philosophy</h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted max-w-3xl">
            Concepts before tools, practice before long slides, and honesty about what is hard. The goal of every session is a learner who can independently do something they could not do before, whether that is writing their first Python function or understanding how a neural network actually learns.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <Reveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Training Programs</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="training-programs">
            {trainings.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.07}>
                <div className="bg-paper border border-line p-8 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-serif text-2xl font-medium text-ink">{t.title}</h3>
                  <div className="mt-4 space-y-1.5">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted">Audience — {t.audience}</p>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted">Format — {t.format}</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted flex-1">{t.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Reveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Formats</h2>
            <div className="mt-6 space-y-6">
              {FORMATS.map((f) => (
                <div key={f.title} className="border-t border-line pt-5">
                  <h3 className="font-serif text-xl font-medium text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Track Record</h2>
            <div className="mt-6 space-y-6">
              {TRACK_RECORD.map((t) => (
                <div key={t.org} className="border-t border-line pt-5">
                  <h3 className="font-serif text-xl font-medium text-ink">{t.org}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-forest text-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight max-w-xl">Bring this training to your institution.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/contact?topic=training" data-testid="training-invite-cta" className="inline-block bg-paper text-forest rounded-full px-8 py-4 text-sm font-medium hover:bg-surface2 transition-colors duration-300">
              Invite Me for Training
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
