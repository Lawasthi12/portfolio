import { Link } from "react-router-dom";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { useContent, usePageSeo } from "@/lib/useContent";

export default function Services() {
  usePageSeo("services", "Services — Lalit Awasthi", "Work with Lalit Awasthi: AI & machine learning, web development, technology training, IT consultation, and research support.");
  const content = useContent();
  const services = content?.services || [];
  return (
    <div>
      <PageHero
        overline="Services"
        title="How we can work together."
        lede="Every service below is grounded in work I've actually done — AI research and engineering, development, training delivery, and IT operations. No inflated promises."
      />
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="services-grid">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 0.07}>
              <div className="bg-surface border border-line p-10 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <p className="text-xs font-mono text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-serif text-3xl font-medium text-ink">{s.title}</h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {(s.items || []).map((item) => (
                    <li key={item} className="text-sm text-ink flex gap-3">
                      <span className="text-teal select-none">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/contact?topic=${encodeURIComponent(s.title)}`}
                  data-testid={`service-cta-${i}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.12em] text-forest link-line self-start"
                >
                  Discuss this →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
