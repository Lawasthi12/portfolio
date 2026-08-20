import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";
import { PageHero, Reveal } from "@/components/site/Reveal";
import api, { formatApiError } from "@/lib/api";
import { usePageSeo } from "@/lib/useContent";
import SocialLinks from "@/components/site/SocialLinks";

const PURPOSES = [
  { key: "work", label: "Work With Me", subject: "Project / work inquiry", text: "AI, development, or technical consultation." },
  { key: "training", label: "Invite Me for Training", subject: "Training invitation", text: "Workshops, courses, or institutional programs." },
  { key: "research", label: "Research Collaboration", subject: "Research collaboration", text: "Publications, projects, or supervision conversations." },
  { key: "general", label: "General Contact", subject: "Hello", text: "Networking, questions, or anything else." },
];

const inputCls =
  "w-full bg-transparent border-b border-line text-ink py-3.5 outline-none focus:border-forest transition-colors duration-300 placeholder:text-muted/60";

export default function Contact() {
  usePageSeo("contact", "Contact — Lalit Awasthi", "Contact Lalit Awasthi — projects, training invitations, research collaboration, or professional networking.");
  const [params] = useSearchParams();
  const topic = params.get("topic");
  const initial = PURPOSES.find((x) => x.key === topic || x.label === topic || x.subject === topic);
  const [purpose, setPurpose] = useState(initial?.key || "general");
  const [form, setForm] = useState({ name: "", email: "", subject: initial?.subject || "", message: "", website: "" });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const pick = (p) => {
    setPurpose(p.key);
    setForm((f) => ({ ...f, subject: p.subject }));
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", msg: "" });
    try {
      await api.post("/contact", form);
      setStatus({ state: "sent", msg: "Message received. I'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err) {
      setStatus({ state: "error", msg: "The form could not send right now. Please email me directly at lawasthi12@gmail.com or message me on WhatsApp." });
    }
  };

  return (
    <div>
      <PageHero
        overline="Contact"
        title="Start the conversation."
        lede="Whether it's a project, a training invitation, a research idea, or a simple hello — this is the right place."
      />
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="overflow-hidden border border-line mb-10 max-w-xs">
              <img src="/images/life-lounge.webp" alt="Lalit Awasthi" loading="lazy" className="w-full aspect-square object-cover" />
            </div>
            <div className="space-y-3" data-testid="contact-purposes">
              {PURPOSES.map((p) => (
                <button
                  key={p.key}
                  data-testid={`purpose-${p.key}`}
                  onClick={() => pick(p)}
                  className={`w-full text-left border p-6 transition-colors duration-300 ${
                    purpose === p.key ? "border-forest bg-surface" : "border-line bg-surface hover:border-ink/30"
                  }`}
                >
                  <p className={`font-serif text-xl font-medium ${purpose === p.key ? "text-forest" : "text-ink"}`}>{p.label}</p>
                  <p className="mt-1 text-sm text-muted">{p.text}</p>
                </button>
              ))}
            </div>
            <div className="mt-10 space-y-3">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted">Direct</p>
              <a href="mailto:lawasthi12@gmail.com" data-testid="contact-email" className="block text-sm text-ink link-line self-start">lawasthi12@gmail.com</a>
              <a href="https://www.linkedin.com/in/lawasthi12" target="_blank" rel="noopener noreferrer" data-testid="contact-linkedin" className="block text-sm text-muted hover:text-ink transition-colors duration-300">LinkedIn — /in/lawasthi12</a>
              <a href="https://github.com/Lawasthi12" target="_blank" rel="noopener noreferrer" data-testid="contact-github" className="block text-sm text-muted hover:text-ink transition-colors duration-300">GitHub — @Lawasthi12</a>
              <a href="tel:+9779848976488" data-testid="contact-phone" className="block text-sm text-muted hover:text-ink transition-colors duration-300">+977 9848976488</a>
            </div>
            <SocialLinks className="mt-6" />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            {status.state === "sent" ? (
              <div className="bg-surface border border-line p-12 text-center" data-testid="contact-success">
                <Check size={28} className="mx-auto text-forest" />
                <p className="mt-6 font-serif text-3xl text-ink">Message sent.</p>
                <p className="mt-2 text-sm text-muted">{status.msg}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-surface border border-line p-8 md:p-12 space-y-8" data-testid="contact-form">
                <input type="text" name="website" value={form.website} onChange={set("website")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="c-name" className="text-xs font-mono uppercase tracking-[0.15em] text-muted">Name</label>
                    <input id="c-name" data-testid="contact-name" required minLength={2} value={form.name} onChange={set("name")} className={inputCls} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="text-xs font-mono uppercase tracking-[0.15em] text-muted">Email</label>
                    <input id="c-email" data-testid="contact-email-input" required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-subject" className="text-xs font-mono uppercase tracking-[0.15em] text-muted">Subject</label>
                  <input id="c-subject" data-testid="contact-subject" required value={form.subject} onChange={set("subject")} className={inputCls} placeholder="What is this about?" />
                </div>
                <div>
                  <label htmlFor="c-message" className="text-xs font-mono uppercase tracking-[0.15em] text-muted">Message</label>
                  <textarea id="c-message" data-testid="contact-message" required minLength={5} rows={6} value={form.message} onChange={set("message")} className={`${inputCls} resize-none`} placeholder="Tell me about it — context, timelines, and goals help." />
                </div>
                {status.state === "error" && (
                  <p className="text-sm text-terra" data-testid="contact-error">{status.msg}</p>
                )}
                <button
                  type="submit"
                  data-testid="contact-submit"
                  disabled={status.state === "sending"}
                  className="bg-forest text-paper rounded-full px-8 py-3.5 text-sm font-medium hover:bg-forest/90 transition-colors duration-300 disabled:opacity-50"
                >
                  {status.state === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
