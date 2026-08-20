import { Reveal, Tag } from "@/components/site/Reveal";
import { useContent, usePageSeo } from "@/lib/useContent";
import { Download } from "lucide-react";

const Section = ({ title, children }) => (
  <section className="mt-12">
    <h2 className="font-serif text-2xl font-medium text-ink border-b border-ink/20 pb-2">{title}</h2>
    <div className="mt-5">{children}</div>
  </section>
);

export default function CV() {
  usePageSeo("cv", "CV — Lalit Awasthi", "Curriculum vitae of Lalit Awasthi — AI researcher, engineer, educator. Experience, education, publications, certifications.");
  const content = useContent();
  if (!content) return <div className="min-h-[60vh]" />;
  const p = content.profile || {};

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-24">
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-6">
            <img src="/images/portrait-cv.webp" alt="Portrait of Lalit Awasthi" className="w-20 h-24 sm:w-24 sm:h-28 object-cover border border-line no-print-hidden" />
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Curriculum Vitae</p>
              <h1 className="mt-4 font-serif text-5xl sm:text-6xl tracking-tighter text-ink">{p.name}</h1>
              <p className="mt-2 font-serif italic text-xl text-muted">{p.headline}</p>
              <p className="mt-4 text-sm font-mono text-muted">
                {p.email} · {p.location}{p.phone ? ` · ${p.phone}` : ""}
              </p>
              <p className="mt-1 text-sm font-mono text-muted">
                linkedin.com/in/lawasthi12 · github.com/Lawasthi12
              </p>
            </div>
          </div>
          <a
            href="/documents/Lalit-Awasthi-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cv-download-button"
            className="no-print inline-flex items-center gap-2 bg-forest text-paper rounded-full px-6 py-3 text-sm font-medium hover:bg-forest/90 transition-colors duration-300"
          >
            <Download size={15} /> Download PDF
          </a>
        </div>
        <p className="mt-8 text-base leading-relaxed text-muted max-w-3xl">{p.positioning}</p>
      </Reveal>

      <Section title="Experience">
        {(content.experience || []).map((job) => (
          <div key={job.id} className="mb-7 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-xl font-medium text-ink">{job.role} — <span className="italic text-muted">{job.org}</span></h3>
              <p className="text-xs font-mono text-muted">{job.period}</p>
            </div>
            <ul className="mt-2 space-y-1.5">
              {(job.points || []).map((pt, i) => (
                <li key={i} className="text-sm leading-relaxed text-muted flex gap-3">
                  <span className="text-teal select-none">—</span><span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Education">
        {(content.education || []).map((ed) => (
          <div key={ed.id} className="mb-5 last:mb-0 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="font-serif text-xl font-medium text-ink">{ed.degree}</h3>
              <p className="text-sm text-muted">{ed.institution}{ed.location ? ` — ${ed.location}` : ""}</p>
              {ed.note && <p className="mt-1 text-sm text-muted italic">{ed.note}</p>}
            </div>
            <p className="text-xs font-mono text-muted">{ed.period}</p>
          </div>
        ))}
      </Section>

      <Section title="Publications">
        {(content.publications || []).map((pub) => (
          <div key={pub.id} className="mb-5 last:mb-0">
            <h3 className="font-serif text-lg font-medium text-ink leading-snug">{pub.title}</h3>
            <p className="mt-1 text-sm text-muted">{pub.authors} · <span className="italic">{pub.venue}</span> · {pub.year}{pub.doi ? ` · DOI: ${pub.doi}` : ""}</p>
          </div>
        ))}
      </Section>

      {(content.certifications || []).length > 0 && (
        <Section title="Certifications">
          {(content.certifications || []).map((cert) => (
            <div key={cert.id} className="mb-4 last:mb-0 flex flex-wrap items-baseline justify-between gap-2" data-testid={`cv-cert-${cert.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}>
              <div>
                <h3 className="font-serif text-lg font-medium text-ink">{cert.title}</h3>
                <p className="text-sm text-muted">{cert.issuer}{cert.credential_id ? ` · ${cert.credential_id}` : ""}</p>
              </div>
              <p className="text-xs font-mono text-muted">{cert.date}</p>
            </div>
          ))}
        </Section>
      )}

      <Section title="Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(p.skills || []).map((cat) => (
            <div key={cat.category}>
              <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-forest font-medium">{cat.category}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{cat.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Section>

      {(content.achievements || []).length > 0 && (
        <Section title="Achievements">
          {(content.achievements || []).map((a) => (
            <div key={a.id} className="mb-4 last:mb-0 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-serif text-lg font-medium text-ink">{a.title}</h3>
                <p className="text-sm text-muted">{a.organization}{a.description ? ` — ${a.description}` : ""}</p>
              </div>
              <p className="text-xs font-mono text-muted">{a.date}</p>
            </div>
          ))}
        </Section>
      )}

      <Section title="Selected Projects">
        {(content.projects || []).map((proj) => (
          <div key={proj.id} className="mb-4 last:mb-0 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg font-medium text-ink">{proj.title}</h3>
              <p className="text-sm text-muted">{proj.outcome || proj.description}</p>
            </div>
            <p className="text-xs font-mono text-muted">{proj.year}</p>
          </div>
        ))}
      </Section>

      <Reveal className="no-print mt-14">
        <div className="bg-surface2 border border-line p-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">This page is printer-friendly — use your browser's print function for a clean copy.</p>
          <Tag>PDF available above</Tag>
        </div>
      </Reveal>
    </div>
  );
}
