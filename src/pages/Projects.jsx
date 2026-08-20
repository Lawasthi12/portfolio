import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHero, Reveal, Tag } from "@/components/site/Reveal";
import { useContent, usePageSeo } from "@/lib/useContent";

export default function Projects() {
  usePageSeo("projects", "Projects — Lalit Awasthi", "AI, machine learning, data science, software, and education-technology projects by Lalit Awasthi.");
  const content = useContent();
  const [filter, setFilter] = useState("All");
  const projects = content?.projects || [];
  const cats = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <PageHero
        overline="Projects"
        title="Things I've built."
        lede="Each project is evidence: a problem, an approach, and an outcome. Click any project for the full case study."
      />
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <Reveal className="flex flex-wrap gap-3 mb-12">
          {cats.map((c) => (
            <button
              key={c}
              data-testid={`filter-${c.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
              onClick={() => setFilter(c)}
              className={`text-xs font-mono uppercase tracking-[0.12em] rounded-full px-4 py-2 border transition-colors duration-300 ${
                filter === c ? "bg-forest text-paper border-forest" : "border-line text-muted hover:text-ink hover:border-ink/30"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.07}>
              <Link to={`/projects/${p.id}`} data-testid={`project-card-${i}`} className="group block bg-surface border border-line h-full hover:-translate-y-1 transition-transform duration-300">
                {p.image && (
                  <div className="overflow-hidden border-b border-line">
                    <img src={p.image} alt={p.title} loading="lazy" className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted">{p.category}</p>
                    <p className="text-xs font-mono text-muted">{p.year}</p>
                  </div>
                  <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-ink leading-snug">{p.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(p.tech || []).slice(0, 4).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="text-sm font-mono text-muted py-16">No projects in this category yet.</p>
        )}
      </section>
    </div>
  );
}
