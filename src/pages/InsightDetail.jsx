import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Reveal, Tag } from "@/components/site/Reveal";
import api from "@/lib/api";
import { CONTENT } from "@/data/content";

export default function InsightDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setPost(null);
    setMissing(false);
    const local = CONTENT.posts?.find((p) => p.slug === slug);
    if (local) {
      setPost(local);
      document.title = `${local.title} — Lalit Awasthi`;
      return;
    }
    api.get(`/posts/${slug}`).then((r) => { setPost(r.data); document.title = `${r.data.title} — Lalit Awasthi`; }).catch(() => setMissing(true));
  }, [slug]);

  if (missing) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32">
        <p className="font-serif text-3xl text-ink">Article not found.</p>
        <Link to="/blog" className="mt-4 inline-block text-sm font-mono uppercase tracking-[0.12em] text-forest link-line">← Blog</Link>
      </div>
    );
  }
  if (!post) return <div className="min-h-[60vh]" />;

  return (
    <article className="max-w-3xl mx-auto px-6 pt-20 md:pt-28 pb-24">
      <Reveal>
        <Link to="/blog" data-testid="back-to-insights" className="text-xs font-mono uppercase tracking-[0.12em] text-muted hover:text-ink transition-colors duration-300">← Blog</Link>
        <p className="mt-8 text-xs font-mono text-muted">{post.date}</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl tracking-tighter leading-tight text-ink">{post.title}</h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {(post.tags || []).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        {post.source_url && (
          <p className="mt-5 text-xs font-mono text-muted">
            Originally published on{" "}
            <a href={post.source_url} target="_blank" rel="noopener noreferrer" data-testid="post-source-link" className="text-teal link-line">
              e-OASIS (Blogger)
            </a>
          </p>
        )}
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 space-y-6">
          {(post.content || "").split(/\n\s*\n/).filter(Boolean).map((para, i) => (
            <p key={i} className="text-base sm:text-lg leading-relaxed text-muted first:text-ink">{para}</p>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="mt-16 border-t border-line pt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">Written by <span className="text-ink font-medium">Lalit Awasthi</span></p>
          <Link to="/contact" data-testid="insight-contact-cta" className="text-sm font-mono uppercase tracking-[0.12em] text-forest link-line">
            Discuss this →
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
