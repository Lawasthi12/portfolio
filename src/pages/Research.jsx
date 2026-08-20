import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Reveal, Tag } from "@/components/site/Reveal";
import { useContent, usePageSeo } from "@/lib/useContent";

export default function Research() {
  usePageSeo("research", "Research & Publications — Lalit Awasthi", "Research by Lalit Awasthi: positive-unlabeled learning, label noise, and fault detection in power systems. Publications with DOI and PDFs.");
  const content = useContent();
  const interests = content?.profile?.research_interests || [];
  const publications = content?.publications || [];

  return (
    <div>
      <PageHero
        overline="Research & Publications"
        title="Questions I investigate."
        lede="My research asks how machines can learn reliably when data is incomplete, noisy, or time-critical — with applications in power systems and intelligent infrastructure."
      />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <Reveal>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Research Interests</h2>
          <div className="mt-5 flex flex-wrap gap-2" data-testid="research-interests">
            {interests.map((r) => (
              <Tag key={r}>{r}</Tag>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <Reveal>
          <div className="bg-surface border border-line p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8" data-testid="thesis-card">
            <div className="flex-1">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Thesis</h2>
              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-ink leading-snug">
                {content?.profile?.thesis_title || "Master's Thesis — Artificial Intelligence, NUIST (2024–2026)"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted max-w-2xl">
                {content?.profile?.thesis_note || "Thesis research in progress as part of the Master's in Artificial Intelligence at Nanjing University of Information Science and Technology."}
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                to="/thesis"
                data-testid="thesis-page-link"
                className="inline-flex items-center gap-2 bg-forest text-paper rounded-full px-6 py-3 text-sm font-medium hover:bg-forest/90 transition-colors duration-300"
              >
                Explore the Thesis →
              </Link>
              <a
                href="/documents/master-thesis.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="thesis-download"
                className="inline-flex items-center gap-2 border border-line text-ink rounded-full px-6 py-3 text-sm font-medium hover:bg-surface2 transition-colors duration-300"
              >
                Download PDF
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <Reveal>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Publications</h2>
        </Reveal>
        <div className="mt-6">
          {publications.map((pub, i) => (
            <Reveal key={pub.id} delay={i * 0.05}>
              <article className="border-t border-line py-10 grid grid-cols-1 lg:grid-cols-12 gap-6" data-testid={`publication-${i}`}>
                <div className="lg:col-span-2">
                  <p className="text-sm font-mono text-muted">{pub.year}</p>
                </div>
                <div className="lg:col-span-7">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-snug">{pub.title}</h3>
                  <p className="mt-2 text-sm text-muted">{pub.authors} · <span className="italic">{pub.venue}</span></p>
                  {pub.area && <p className="mt-2 text-xs font-mono uppercase tracking-wider text-muted">{pub.area}</p>}
                  {pub.abstract && (
                    <p className="mt-4 text-sm leading-relaxed text-muted">{pub.abstract}</p>
                  )}
                </div>
                <div className="lg:col-span-3 flex lg:justify-end items-start gap-3">
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`publication-doi-${i}`}
                      className="group inline-flex items-center gap-2 border border-forest text-forest rounded-full px-5 py-2.5 text-xs font-mono uppercase tracking-[0.12em] hover:bg-forest hover:text-paper transition-colors duration-300"
                    >
                      DOI <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  {pub.file_id && (
                    <a
                      href={`${process.env.REACT_APP_BACKEND_URL}/api/files/${pub.file_id}`}
                      data-testid={`publication-pdf-${i}`}
                      className="inline-flex items-center gap-2 border border-line text-ink rounded-full px-5 py-2.5 text-xs font-mono uppercase tracking-[0.12em] hover:bg-surface2 transition-colors duration-300"
                    >
                      PDF
                    </a>
                  )}
                  {!pub.doi && !pub.file_id && (
                    <span className="text-xs font-mono uppercase tracking-[0.12em] text-teal border border-teal/30 rounded-full px-5 py-2.5">Accepted</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="bg-surface border border-line p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-ink">Research collaboration</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted max-w-xl">
                I welcome conversations with universities, supervisors, and fellow researchers — on positive-unlabeled learning, fault detection, and applied machine learning more broadly.
              </p>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <Link to="/contact?topic=research" data-testid="research-collab-cta" className="bg-forest text-paper rounded-full px-7 py-3.5 text-sm font-medium hover:bg-forest/90 transition-colors duration-300">
                Start a Conversation
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
