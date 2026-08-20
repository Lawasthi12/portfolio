import { Link } from "react-router-dom";
import { PageHero, Reveal, Tag } from "@/components/site/Reveal";
import { useContent, usePageSeo } from "@/lib/useContent";

const EXTRA_CATEGORIES = [
  {
    category: "Development",
    items: ["Website Development", "Web Applications", "Mobile App Development", "Software Development", "APIs & Integration"],
  },
  {
    category: "Research",
    items: ["Research Methodology", "Experiment Design", "Academic Writing", "Peer-Reviewed Publication", "Technical Documentation"],
  },
];

export default function Expertise() {
  usePageSeo("expertise", "Skills & Expertise — Lalit Awasthi", "Expertise of Lalit Awasthi across AI, machine learning, data science, development, IT infrastructure, education, and research.");
  const content = useContent();
  const skills = [...(content?.profile?.skills || []), ...EXTRA_CATEGORIES];
  return (
    <div>
      <PageHero
        overline="Skills & Expertise"
        title="What I work with."
        lede="Six areas, one practice: artificial intelligence, data, development, education, IT infrastructure, and research — connected by the same habit of learning, building, and teaching."
      />
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="expertise-grid">
          {skills.map((cat, i) => (
            <Reveal key={cat.category} delay={(i % 3) * 0.07}>
              <div className="bg-surface border border-line p-8 h-full hover:-translate-y-1 transition-transform duration-300">
                <p className="text-xs font-mono text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-serif text-2xl font-medium text-ink">{cat.category}</h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cat.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16">
          <div className="bg-forest text-paper p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight max-w-xl">Need this expertise on your team or project?</h2>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" data-testid="expertise-services-cta" className="bg-paper text-forest rounded-full px-7 py-3.5 text-sm font-medium hover:bg-surface2 transition-colors duration-300">View Services</Link>
              <Link to="/contact" data-testid="expertise-contact-cta" className="border border-paper/30 text-paper rounded-full px-7 py-3.5 text-sm font-medium hover:bg-paper/10 transition-colors duration-300">Get in Touch</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
