import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useContent, usePageSeo } from "@/lib/useContent";
import { Reveal, Tag } from "@/components/site/Reveal";

const HERO_IMG = "/images/hero-portrait.webp";

const VERBS = [
  { n: "01", verb: "Build", text: "AI systems, software, data pipelines, and websites designed to solve real world problems.", to: "/projects", cta: "See what I build" },
  { n: "02", verb: "Research", text: "Exploring artificial intelligence, machine learning, and data through research and experimentation on real world problems.", to: "/research", cta: "View research" },
  { n: "03", verb: "Teach", text: "Technology education in classrooms, workshops, and training programs, making technical concepts understandable.", to: "/training", cta: "Explore training" },
  { n: "04", verb: "Learn", text: "Continuous growth through research, experimentation, and hands-on work with AI and emerging technologies.", to: "/about", cta: "My story" },
];

const MaskedWord = ({ children, delay, className = "" }) => (
  <span className="block overflow-hidden">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "105%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Home() {
  usePageSeo("home", "Lalit Awasthi — AI Researcher & Engineer", "Lalit Awasthi — AI researcher, engineer, and educator. Machine learning research, software development, and technology training.");
  const content = useContent();
  if (!content) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center" data-testid="content-loader">
        <p className="font-serif text-3xl text-ink animate-pulse">Lalit Awasthi</p>
      </div>
    );
  }
  const projects = (content.projects || []);
  const featured = projects.filter((p) => p.featured);
  const shown = (featured.length ? featured : projects).slice(0, 3);
  const publications = (content.publications || []).slice(0, 2);
  const journey = content.experience || [];

  return (
    <div>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium"
          >
            Lalit Awasthi — AI Researcher · Engineer · Educator
          </motion.p>
          <h1 className="mt-6 font-serif font-medium tracking-tighter leading-[0.95] text-ink text-[15vw] sm:text-7xl lg:text-[5.5rem]">
            <MaskedWord delay={0.1}>Build</MaskedWord>
            <MaskedWord delay={0.22}>Research</MaskedWord>
            <MaskedWord delay={0.34} className="text-forest">Teach</MaskedWord>
            <MaskedWord delay={0.46} className="text-muted">Learn</MaskedWord>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-8 text-base sm:text-lg leading-relaxed text-muted max-w-xl"
            data-testid="hero-statement"
          >
            I work across artificial intelligence, software development, and education, building machine learning systems, teaching technology, and researching how machines learn from imperfect data. From classrooms in Nepal to research labs in Nanjing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/projects" data-testid="hero-cta-work" className="bg-forest text-paper rounded-full px-7 py-3.5 text-sm font-medium hover:bg-forest/90 transition-colors duration-300">
              Explore My Work
            </Link>
            <a href="/documents/Lalit-Awasthi-CV.pdf" target="_blank" rel="noopener noreferrer" data-testid="hero-cta-cv" className="border border-line text-ink rounded-full px-7 py-3.5 text-sm font-medium hover:bg-surface2 transition-colors duration-300">
              Download CV
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="lg:col-span-5"
        >
          <div className="overflow-hidden border border-line">
            <img src={HERO_IMG} alt="Portrait of Lalit Awasthi" className="w-full aspect-[4/5] object-cover object-top" />
          </div>
          <p className="mt-3 text-xs font-mono text-muted">{content.profile?.location} — {new Date().getFullYear()}</p>
        </motion.div>
      </section>

      {(content.notices || []).length > 0 && (
        <div className="border-y border-line bg-surface no-print" data-testid="notices-strip">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center gap-6 overflow-x-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-forest shrink-0">Notice</span>
            {(content.notices || []).slice(0, 2).map((n) => (
              <p key={n.id} className="text-xs font-mono text-muted whitespace-nowrap">
                {n.title}{n.date ? ` — ${n.date}` : ""}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* WHAT I DO */}
      <section className="border-t border-line bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <Reveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">What I Do</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl tracking-tight text-ink max-w-2xl">One practice, four movements.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERBS.map((v, i) => (
              <Reveal key={v.verb} delay={i * 0.08}>
                <Link to={v.to} data-testid={`verb-card-${v.verb.toLowerCase()}`} className="group block bg-paper border border-line p-8 h-full hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-xs font-mono text-muted">{v.n}</p>
                  <h3 className="mt-4 font-serif text-3xl font-medium text-ink">{v.verb}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{v.text}</p>
                  <p className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.12em] text-forest">
                    {v.cta}
                    <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Selected Work</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl tracking-tight text-ink">Evidence, not claims.</h2>
            </div>
            <Link to="/projects" data-testid="home-all-projects" className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.12em] text-forest link-line">
              View All Projects <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {shown.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Link to={`/projects/${p.id}`} data-testid={`home-project-${i}`} className="group block bg-surface border border-line h-full">
                  {p.image && (
                    <div className="overflow-hidden border-b border-line">
                      <img src={p.image} alt={p.title} loading="lazy" className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-7">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-mono uppercase tracking-wider text-muted">{p.category}</p>
                      <p className="text-xs font-mono text-muted">{p.year}</p>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl font-medium text-ink leading-snug">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">{p.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHING + RESEARCH SPLIT */}
      <section className="border-t border-line bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="bg-paper border border-line p-10 h-full flex flex-col">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Educator & Trainer</p>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl tracking-tight text-ink">Technology only matters when people can use it.</h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted flex-1">
                I co-founded GreenQbit, a computer training institute, taught science with Teach for Nepal, and ran IT operations for a school. Today I design and deliver AI, programming, and technology training for students, teachers, and institutions.
              </p>
              <Link to="/training" data-testid="home-training-cta" className="mt-8 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.12em] text-forest link-line self-start">
                Explore Training <span>→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-paper border border-line p-10 h-full flex flex-col">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Research</p>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl tracking-tight text-ink">Teaching machines to learn from imperfect data.</h2>
              <div className="mt-6 space-y-4 flex-1">
                {publications.map((pub) => (
                  <div key={pub.id} className="border-l-2 border-forest/30 pl-4">
                    <p className="font-serif text-lg text-ink leading-snug">{pub.title}</p>
                    <p className="mt-1 text-xs font-mono text-muted">{pub.venue} · {pub.year}</p>
                  </div>
                ))}
              </div>
              <Link to="/research" data-testid="home-research-cta" className="mt-8 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.12em] text-forest link-line self-start">
                View Research <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Professional Journey</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl tracking-tight text-ink">From classroom to lab.</h2>
            </div>
            <Link to="/experience" data-testid="home-experience-cta" className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.12em] text-forest link-line">
              View Full Experience <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
          <div className="mt-12">
            {journey.map((job, i) => (
              <Reveal key={job.id} delay={i * 0.05}>
                <div className="border-t border-line py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline" data-testid={`journey-item-${i}`}>
                  <p className="md:col-span-3 text-xs font-mono text-muted">{job.period}</p>
                  <p className="md:col-span-5 font-serif text-xl sm:text-2xl text-ink">{job.role}</p>
                  <p className="md:col-span-4 text-sm text-muted">{job.org}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND CTA */}
      <section className="border-t border-line bg-forest text-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight max-w-4xl">
              Let's build, learn, and explore technology <span className="italic">together</span>.
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/services" data-testid="home-cta-services" className="bg-paper text-forest rounded-full px-7 py-3.5 text-sm font-medium hover:bg-surface2 transition-colors duration-300">
                Work With Me
              </Link>
              <Link to="/contact" data-testid="home-cta-contact" className="border border-paper/30 text-paper rounded-full px-7 py-3.5 text-sm font-medium hover:bg-paper/10 transition-colors duration-300">
                Connect With Me
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
