import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import type { Language } from "@/lib/translations";
import logoIcon from "@assets/generated_images/gold_3d_accessibility_figure_transparent.png";

const languageLabels: Record<Language, string> = {
  tj: "TJ",
  ru: "RU",
  en: "EN"
};

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  const navItems = [
    { path: "/", label: t.header.nav.home },
    { path: "/about", label: t.header.nav.about },
    { path: "/products", label: t.header.nav.products },
    { path: "/patients", label: t.header.nav.patients },
    { path: "/contacts", label: t.header.nav.contacts },
  ];

  const languages: Language[] = ['tj', 'ru', 'en'];

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary via-primary/95 to-primary/90 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-18 py-3 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 px-2 py-1 rounded-md group" data-testid="link-nav-logo">
            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-md overflow-hidden" data-testid="icon-logo">
              <img src={logoIcon} alt="Logo" className="w-9 h-9 object-contain" />
            </div>
            <span className="hidden sm:block text-sm md:text-base font-bold text-white max-w-xs lg:max-w-md line-clamp-2 drop-shadow-sm" data-testid="text-site-title">
              {t.header.shortTitle}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white ${
                    location === item.path ? "bg-white/20 font-semibold" : ""
                  }`}
                  data-testid={`link-nav-${item.path.replace('/', '') || 'home'}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center gap-0.5 bg-white/15 backdrop-blur-sm rounded-lg p-0.5 border border-white/20" data-testid="language-switcher">
              <Globe className="w-4 h-4 text-white/80 mx-1.5 hidden sm:block" />
              {languages.map((lang) => (
                <Button
                  key={lang}
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-2.5 text-xs font-semibold toggle-elevate ${
                    language === lang 
                      ? "toggle-elevated bg-white text-primary shadow-sm" 
                      : "text-white"
                  }`}
                  onClick={() => setLanguage(lang)}
                  data-testid={`button-lang-${lang}`}
                >
                  {languageLabels[lang]}
                </Button>
              ))}
            </div>

            <Link href="/contacts">
              <Button
                variant="default"
                size="sm"
                className="bg-accent text-accent-foreground font-semibold shadow-md border-accent-border hidden sm:flex"
                data-testid="button-cta-apply"
              >
                {t.header.ctaButton}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-white/20"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-white ${
                        location === item.path ? "bg-white/20 font-semibold" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-nav-${item.path.replace('/', '') || 'home'}`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <Link href="/contacts">
                  <Button
                    variant="default"
                    className="w-full mt-2 bg-accent text-accent-foreground font-semibold shadow-md border-accent-border"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="button-mobile-cta"
                  >
                    {t.header.ctaButton}
                  </Button>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
