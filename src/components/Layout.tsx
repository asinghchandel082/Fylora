import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "All Tools" },
  { to: "/about", label: "About" },
  { to: "/privacy", label: "Privacy" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-body selection:bg-primary/20">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-lg shadow-sm"
          : "border-transparent bg-transparent"
          }`}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo & Tagline (Left) */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <Logo className="h-8 w-8 transition-transform group-hover:scale-105 drop-shadow-sm" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary leading-none mt-0.5">
                  FYLORA
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
                  Private PDF tools
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation (Center) */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative py-1 text-sm font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="header-active-link"
                      className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle (Right) */}
          <div className="flex-1 flex justify-end items-center gap-4 shrink-0">
            <Button asChild className="hidden md:inline-flex rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 shadow-none">
              <Link to="/tools">Use Tools</Link>
            </Button>
            <button
              className="md:hidden p-2 -mr-2 rounded-md text-muted-foreground hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <nav className="container py-4 flex flex-col gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${location.pathname === link.to
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 relative">
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
          className="w-full h-full min-h-full"
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-white/10 bg-card">
        <div className="container py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

            {/* BRANDING */}
            <div className="lg:col-span-2 flex flex-col items-start">
              <Link to="/" className="flex items-center gap-3 group mb-4">
                <Logo className="h-8 w-8 transition-transform group-hover:scale-105 drop-shadow-sm" />
                <span className="font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  FYLORA
                </span>
              </Link>
              <h3 className="font-display font-medium text-foreground text-lg mb-4">Files You Love, Organized Right Away</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-sm">
                A modern, privacy-first PDF toolkit designed for everyday work. Built to be fast, secure, and thoughtfully simple.
              </p>
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-600 dark:text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Files are processed securely and deleted automatically.
              </div>
            </div>

            {/* PRODUCT */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-semibold text-foreground tracking-wide">Product</h4>
              <nav className="flex flex-col gap-3">
                <Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors">All Tools</Link>
                <Link to="/tool/merge" className="text-muted-foreground hover:text-primary transition-colors">Merge PDF</Link>
                <Link to="/tool/compress" className="text-muted-foreground hover:text-primary transition-colors">Compress PDF</Link>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">OCR Extract</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Redact PDF</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">PDF to Markdown</a>
              </nav>
            </div>

            {/* COMPANY */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-semibold text-foreground tracking-wide">Company</h4>
              <nav className="flex flex-col gap-3">
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Fylora</Link>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link>
                <Link to="/roadmap" className="text-muted-foreground hover:text-primary transition-colors">Roadmap</Link>
                <a href="mailto:fyloratech@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
                <Link to="/press" className="text-muted-foreground hover:text-primary transition-colors">Press</Link>
              </nav>
            </div>

            {/* RESOURCES */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-semibold text-foreground tracking-wide">Resources</h4>
              <nav className="flex flex-col gap-3">
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/security" className="text-muted-foreground hover:text-primary transition-colors">Security</Link>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">Help / FAQ</Link>
                <Link to="/request-feature" className="text-muted-foreground hover:text-primary transition-colors">Request a Feature</Link>
              </nav>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground md:flex-1">
              &copy; 2026 Fylora. Built with care for privacy and performance.
            </p>

            <div className="flex items-center gap-5 md:flex-1 md:justify-center">
              <a href="https://x.com/fyloratech" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all hover:scale-110" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/fyloratech" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#E1306C] transition-all hover:scale-110" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849C2.382 3.86 3.901 2.314 7.151 2.166 8.417 2.108 8.796 2.096 12 2.096zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0A66C2] transition-all hover:scale-110" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-6 md:flex-1 md:justify-end">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
