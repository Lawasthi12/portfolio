import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-44" data-testid="not-found-page">
      <Reveal>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">404</p>
        <h1 className="mt-4 font-serif text-5xl sm:text-7xl tracking-tighter text-ink">This page drifted off the network.</h1>
        <p className="mt-6 text-base text-muted max-w-md">The page you're looking for doesn't exist or was moved. Everything important is one click away:</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/" data-testid="notfound-home" className="bg-forest text-paper rounded-full px-7 py-3.5 text-sm font-medium hover:bg-forest/90 transition-colors duration-300">Back to Home</Link>
          <Link to="/contact" data-testid="notfound-contact" className="border border-line text-ink rounded-full px-7 py-3.5 text-sm font-medium hover:bg-surface2 transition-colors duration-300">Contact Me</Link>
        </div>
      </Reveal>
    </div>
  );
}
