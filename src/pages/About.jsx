import { Link } from "react-router-dom";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { useContent, usePageSeo } from "@/lib/useContent";

const FALLBACK_SECTIONS = [
  {
    heading: "From Nepal to Nanjing",
    body: "My relationship with technology started as practice, not theory. I co-founded GreenQbit, a computer training institute in Nepal, where I taught fundamental computing and ran operations across multiple training batches. Later, as a science teacher with Teach for Nepal, I spent two years in classrooms learning how people actually learn — and how rarely technology is designed with them in mind.\n\nAs an IT Officer at Reliance Co-Ed. School, I managed the systems, networks, and digital tools a whole institution depended on. That combination — teaching, building, and keeping infrastructure alive — is what eventually pulled me toward artificial intelligence.",
  },
  {
    heading: "Where I am now",
    body: "I completed my Master's in Artificial Intelligence research at Nanjing University of Information Science and Technology, and worked as an AI Research Intern at Guodian Nanjing Automation, developing machine learning solutions for intelligent power equipment — predictive maintenance, fault detection, and automated analysis of large-scale power system data.\n\nMy research focuses on a question I find genuinely important: how do machines learn reliably when data is incomplete or mislabeled? Today I run IT operations at Ankuram Academy in Chitwan, Nepal.",
  },
  {
    heading: "Where I'm going",
    body: "Deeper into AI research and its practical deployment — and further into education, because the gap between what technology can do and what people are enabled to do with it is the problem I care about most.",
  },
];

const FALLBACK_PRINCIPLES = [
  { verb: "Learn", text: "Every skill I teach or apply started as something I had to figure out myself. I treat learning as a permanent state, not a phase." },
  { verb: "Build", text: "Understanding becomes real when you build with it. I build AI systems, data pipelines, websites, and software — things that have to work, not just compile." },
  { verb: "Teach", text: "If I can't explain it clearly, I don't understand it well enough. Teaching is how I give technology back — to students, teachers, and institutions." },
  { verb: "Research", text: "Research is disciplined curiosity: asking questions the manuals don't answer, and being honest about what the evidence says." },
];

const PICTURES = [
  { src: "/images/life-nepal.webp", alt: "Lalit Awasthi representing Nepal at a cultural fair", caption: "Representing Nepal — cultural fair, Nanjing" },
  { src: "/images/life-award.webp", alt: "Lalit Awasthi holding a first-place certificate at the NUIST soft hockey tournament", caption: "First place — NUIST soft hockey tournament, 2025" },
  { src: "/images/life-park.webp", alt: "Lalit Awasthi in a park in Nanjing", caption: "Off duty — Nanjing" },
  { src: "/images/life-lounge.webp", alt: "Lalit Awasthi relaxing in a lounge", caption: "Between builds" },
];

export default function About() {
  usePageSeo("about", "About — Lalit Awasthi", "The story of Lalit Awasthi — AI researcher, engineer, and educator. From classrooms in Nepal to AI research in Nanjing.");
  const content = useContent();
  const p = content?.profile || {};
  const sections = p.about_sections?.length ? p.about_sections : FALLBACK_SECTIONS;
  const principles = p.about_principles?.length ? p.about_principles : FALLBACK_PRINCIPLES;
  const facts = p.about_facts?.length ? p.about_facts : [
    { label: "Based in", value: p.location || "Bharatpur, Nepal" },
    { label: "Currently", value: "IT In-Charge, Ankuram Academy" },
    { label: "Focus", value: "Applied ML · AI education" },
    { label: "Background", value: "AI Research · Teaching · IT Operations" },
    { label: "Email", value: p.email || "lawasthi12@gmail.com" },
  ];

  return (
    <div>
      <PageHero
        overline="About Me"
        title="The person behind the work."
        lede="AI researcher, engineer, and educator — a career built on both sides of technology: creating it, and making it understandable."
      />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-10">
          {sections.map((sec, i) => (
            <Reveal key={sec.heading || i} delay={i * 0.05}>
              <div>
                <h2 className="font-serif text-3xl font-medium text-ink">{sec.heading}</h2>
                {(sec.body || "").split(/\n\s*\n/).filter(Boolean).map((para, j) => (
                  <p key={j} className="mt-5 text-base leading-relaxed text-muted">{para}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-24">
            <div className="bg-surface border border-line p-8">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">At a glance</p>
              <dl className="mt-6 space-y-5">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col gap-1 border-b border-line pb-4 last:border-0">
                    <dt className="text-xs font-mono uppercase tracking-wider text-muted">{f.label}</dt>
                    <dd className="text-sm text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Link to="/cv" data-testid="about-cv-link" className="mt-6 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.12em] text-forest link-line">
                View full CV →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <Reveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">In Pictures</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-ink">Life between the work.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PICTURES.map((img, i) => (
              <Reveal key={img.src} delay={i * 0.08}>
                <figure>
                  <div className="overflow-hidden border border-line">
                    <img src={img.src} alt={img.alt} loading="lazy" className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <figcaption className="mt-3 text-xs font-mono text-muted">{img.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <Reveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">How I Work</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-ink">Four principles.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((pr, i) => (
              <Reveal key={pr.verb || i} delay={i * 0.06}>
                <div className="bg-paper border border-line p-8">
                  <h3 className="font-serif text-2xl font-medium text-ink">{pr.verb}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{pr.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
