import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut", delay }}
    viewport={{ once: true, margin: "-8% 0px" }}
  >
    {children}
  </motion.div>
);

export const PageHero = ({ overline, title, lede }) => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-12 md:pb-16">
    <Reveal>
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium" data-testid="page-overline">{overline}</p>
      <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-none text-ink max-w-4xl">{title}</h1>
      {lede && <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted max-w-2xl">{lede}</p>}
    </Reveal>
  </div>
);

export const Tag = ({ children }) => (
  <span className="inline-block px-3 py-1 bg-teal/10 text-teal border border-teal/25 text-xs font-mono rounded-full uppercase tracking-wider">{children}</span>
);

export const ArrowLink = ({ to, children, testid }) => (
  <a href={to} data-testid={testid} className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.12em] text-forest link-line">
    {children}
    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
  </a>
);
