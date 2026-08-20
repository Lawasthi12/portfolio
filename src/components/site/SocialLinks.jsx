import { Facebook, Instagram, Linkedin, Github } from "lucide-react";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden="true">
    <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 1 1 8.38 4.63m8.38-18.5A11.82 11.82 0 0 0 2.04 18.03L0 24l6.13-1.61a11.8 11.8 0 0 0 5.63 1.43h.01A11.83 11.83 0 0 0 20.43 3.3" />
  </svg>
);

const ViberIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.9 1.44 5.5 3.7 7.2L5 22l3.9-1.9c.97.26 2 .4 3.1.4 5.52 0 10-4.14 10-9.25S17.52 2 12 2zm3.5 12.9c-.35.9-1.4 1.65-2.6 1.65-2.9 0-6.6-3.6-6.6-6.6 0-1.2.75-2.25 1.65-2.6.45-.2.9-.05 1.1.35l.9 1.7c.15.3.1.65-.15.85l-.6.5c.5 1.1 1.6 2.2 2.7 2.7l.5-.6c.2-.25.55-.3.85-.15l1.7.9c.4.2.55.65.35 1.1z" />
  </svg>
);

const LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/lalit.awasthi.661143", Icon: Facebook, testid: "social-facebook" },
  { label: "Instagram", href: "https://www.instagram.com/lawasthi12/", Icon: Instagram, testid: "social-instagram" },
  { label: "WhatsApp — chat with Lalit", href: "https://wa.me/9779848976488", Icon: WhatsAppIcon, testid: "social-whatsapp" },
  { label: "Viber — message Lalit", href: "viber://chat?number=%2B9779848976488", Icon: ViberIcon, testid: "social-viber" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lawasthi12", Icon: Linkedin, testid: "social-linkedin" },
  { label: "GitHub", href: "https://github.com/Lawasthi12", Icon: Github, testid: "social-github" },
];

export default function SocialLinks({ className = "" }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`} data-testid="social-links">
      {LINKS.map(({ label, href, Icon, testid }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          data-testid={testid}
          className="w-10 h-10 border border-line text-muted hover:text-forest hover:border-forest transition-colors duration-300 flex items-center justify-center p-2.5"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
