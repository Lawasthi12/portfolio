import { Link } from "react-router-dom";
import { PageHero, Reveal, Tag } from "@/components/site/Reveal";
import { useContent, usePageSeo } from "@/lib/useContent";

export default function Insights() {
  usePageSeo("blog", "Blog — Lalit Awasthi", "Notes on AI, machine learning, development, teaching, and research by Lalit Awasthi.");
  const content = useContent();
  const posts = [...(content?.posts || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const [featured, ...rest] = posts;

  return (
    <div>
      <PageHero
        overline="Blog"
        title="Notes on technology."
        lede="Writing on AI, machine learning, development, teaching, and research — the same things I build and teach, explained."
      />
      {content?.profile?.blog_url && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-6 pb-10">
          <Reveal>
            <a
              href={content.profile.blog_url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="blogger-link"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.12em] text-forest link-line"
            >
              Also writing on my Google Blog →
            </a>
          </Reveal>
        </div>
      )}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {posts.length === 0 && (
          <p className="text-sm font-mono text-muted py-16">Articles are on the way.</p>
        )}
        {featured && (
          <Reveal>
            <Link to={`/blog/${featured.slug}`} data-testid="insight-featured" className="group block bg-surface border border-line p-10 md:p-14 mb-6 hover:-translate-y-1 transition-transform duration-300">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-forest font-medium">Latest</p>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-ink max-w-3xl leading-tight">{featured.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted max-w-2xl">{featured.excerpt}</p>
              <p className="mt-6 text-xs font-mono text-muted">{featured.date}</p>
            </Link>
          </Reveal>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={(i % 3) * 0.07}>
              <Link to={`/blog/${post.slug}`} data-testid={`insight-card-${i}`} className="group block bg-surface border border-line p-8 h-full hover:-translate-y-1 transition-transform duration-300">
                <p className="text-xs font-mono text-muted">{post.date}</p>
                <h3 className="mt-3 font-serif text-2xl font-medium text-ink leading-snug">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(post.tags || []).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
