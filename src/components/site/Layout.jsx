import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import SocialLinks from "./SocialLinks";

const NAV = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Research", "/research"],
  ["Thesis", "/thesis"],
  ["Training", "/training"],
  ["Blog", "/blog"],
  ["CV", "/cv"],
  ["Contact", "/contact"],
];

const linkCls = ({ isActive }) =>
  `text-[11px] font-mono uppercase tracking-[0.12em] transition-colors duration-300 ${
    isActive ? "text-forest border-b border-forest pb-0.5" : "text-muted hover:text-ink"
  }`;

export default function Layout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(() => localStorage.getItem("theme") === "light");

  useEffect(() => {
    document.body.classList.toggle("light", light);
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; };
  }, []);

  useEffect(() => {
    setOpen(false);
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
  }, [location.pathname]);

  const ThemeToggle = ({ className = "" }) => (
    <button
      data-testid="theme-toggle"
      onClick={() => setLight(!light)}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className={`p-2 border border-line text-muted hover:text-ink hover:border-ink/30 transition-colors duration-300 ${className}`}
    >
      {light ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-paper/85 border-b border-line no-print">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link to="/" data-testid="nav-logo" className="flex items-center gap-3">
            <img src="/logo.svg" alt="LA monogram logo" className="w-8 h-8" />
            <span className="font-serif text-xl font-semibold tracking-tight text-ink">Lalit Awasthi</span>
          </Link>
          <nav className="hidden xl:flex items-center gap-6" aria-label="Primary">
            {NAV.map(([label, to]) => (
              <NavLink key={to} to={to} data-testid={`nav-${label.toLowerCase()}`} className={linkCls}>
                {label}
              </NavLink>
            ))}
            <ThemeToggle />
            <Link
              to="/services"
              data-testid="nav-work-with-me"
              className="text-[11px] font-mono uppercase tracking-[0.12em] bg-forest text-paper rounded-full px-5 py-2.5 hover:bg-forest/90 transition-colors duration-300"
            >
              Work With Me
            </Link>
          </nav>
          <div className="xl:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              data-testid="nav-mobile-toggle"
              className="p-2 text-ink"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden overflow-hidden border-t border-line bg-paper"
              aria-label="Mobile"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {NAV.map(([label, to]) => (
                  <NavLink key={to} to={to} data-testid={`nav-mobile-${label.toLowerCase()}`} className={linkCls}>
                    {label}
                  </NavLink>
                ))}
                <Link to="/services" data-testid="nav-mobile-services" className="text-[11px] font-mono uppercase tracking-[0.12em] bg-forest text-paper rounded-full px-5 py-3 text-center">
                  Work With Me
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="bg-surface border-t border-line no-print">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="font-serif text-2xl font-semibold text-ink">Lalit Awasthi</p>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-sm">
              AI researcher, engineer, and educator. Building, teaching, and researching technology — from classrooms in Nepal to research labs in Nanjing.
            </p>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted">Explore</p>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {[...NAV, ["Services", "/services"], ["Expertise", "/expertise"], ["Experience", "/experience"]].map(([label, to]) => (
                <Link key={to} to={to} data-testid={`footer-${label.toLowerCase()}`} className="text-sm text-muted hover:text-ink transition-colors duration-300">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted">Connect</p>
            <a href="mailto:lawasthi12@gmail.com" data-testid="footer-email" className="mt-4 block text-sm text-muted hover:text-ink transition-colors duration-300">lawasthi12@gmail.com</a>
            <SocialLinks className="mt-5" />
          </div>
        </div>
        <div className="border-t border-line">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row justify-between gap-2">
            <p className="text-xs font-mono text-muted">© {new Date().getFullYear()} Lalit Awasthi</p>
            <p className="text-xs font-mono text-muted">Build · Teach · Research · Learn</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
