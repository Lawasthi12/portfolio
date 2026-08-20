import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Tag } from "@/components/site/Reveal";
import { useContent } from "@/lib/useContent";

export default function ProjectDetail() {
  const { id } = useParams();
  const content = useContent();
  useEffect(() => {
    const proj = (content?.projects || []).find((x) => x.id === id);
    if (proj) document.title = `${proj.title} — Lalit Awasthi`;
  }, [content, id]);
  if (!content) return <div className="min-h-[60vh]" />;
  const project = (content.projects || []).find((p) => p.id === id);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
        <p className="font-serif text-3xl text-ink">Project not found.</p>
        <Link to="/projects" className="mt-4 inline-block text-sm font-mono uppercase tracking-[0.12em] text-forest link-line">← All projects</Link>
      </div>
    );
  }

  return (
    <article>
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-28">
        <Reveal>
          <Link to="/projects" data-testid="back-to-projects" className="text-xs font-mono uppercase tracking-[0.12em] text-muted hover:text-ink transition-colors duration-300">← All Projects</Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Tag>{project.category}</Tag>
            <span className="text-xs font-mono text-muted">{project.year}</span>
          </div>
          <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-none text-ink max-w-4xl">{project.title}</h1>
        </Reveal>
      </div>

      {project.image && (
        <Reveal className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
          <div className="overflow-hidden border border-line">
            <img src={project.image} alt={project.title} className="w-full aspect-[21/9] object-cover" />
          </div>
        </Reveal>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <Reveal>
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Overview</h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">{project.description}</p>
            </div>
          </Reveal>
          {project.outcome && (
            <Reveal>
              <div>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Outcome</h2>
                <p className="mt-4 text-base leading-relaxed text-ink">{project.outcome}</p>
              </div>
            </Reveal>
          )}
          {project.link && (
            <Reveal>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="project-external-link"
                className="group inline-flex items-center gap-2 bg-forest text-paper rounded-full px-6 py-3 text-sm font-medium hover:bg-forest/90 transition-colors duration-300"
              >
                View Source / Publication
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          )}
        </div>
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-24">
            <dl className="bg-surface border border-line p-8 space-y-5">
              <div>
                <dt className="text-xs font-mono uppercase tracking-wider text-muted">My Role</dt>
                <dd className="mt-1 text-sm text-ink">{project.role}</dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-wider text-muted">Category</dt>
                <dd className="mt-1 text-sm text-ink">{project.category}</dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-wider text-muted">Year</dt>
                <dd className="mt-1 text-sm text-ink">{project.year}</dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-wider text-muted">Technologies</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {(project.tech || []).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
