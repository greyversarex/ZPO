import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import type { Language } from "@/lib/translations";

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 hover-elevate active-elevate-2 px-2 py-1 rounded-md" data-testid="link-nav-logo">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground" data-testid="icon-logo-heart">
              <Heart className="w-6 h-6" />
            </div>
            <span className="hidden sm:block text-sm md:text-base font-semibold text-foreground max-w-xs lg:max-w-md line-clamp-2" data-testid="text-site-title">
              {t.header.shortTitle}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  size="sm"
                  data-testid={`link-nav-${item.path.replace('/', '') || 'home'}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center gap-0.5 bg-muted rounded-md p-0.5" data-testid="language-switcher">
              <Globe className="w-4 h-4 text-muted-foreground mx-1 hidden sm:block" />
              {languages.map((lang) => (
                <Button
                  key={lang}
                  variant={language === lang ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2 text-xs font-medium"
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
                className="bg-accent text-accent-foreground hover:bg-accent border-accent-border hidden sm:flex"
                data-testid="button-cta-apply"
              >
                {t.header.ctaButton}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
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
              className="lg:hidden overflow-hidden border-t"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={location === item.path ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-nav-${item.path.replace('/', '') || 'home'}`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <Link href="/contacts">
                  <Button
                    className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent border-accent-border"
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
