import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-white overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Branding */}
          <div className="space-y-4" data-testid="footer-branding">
            <h3 className="text-base font-bold text-white flex items-center gap-2" data-testid="text-footer-title">
              <div className="w-1 h-5 bg-accent rounded-full" />
              {t.header.shortTitle}
            </h3>
          </div>

          {/* Contact Info */}
          <div className="space-y-4" data-testid="footer-contact">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <div className="w-1 h-5 bg-accent rounded-full" />
              {t.contact.title}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-white/80 group">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 border border-white/15 shrink-0 group-hover:bg-white/15 transition-colors">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span data-testid="text-footer-address" className="pt-1">{t.footer.address}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/80 group">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 border border-white/15 shrink-0 group-hover:bg-white/15 transition-colors">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div className="flex flex-col pt-1">
                  {t.footer.phones.map((phone, index) => (
                    <a 
                      key={index}
                      href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                      className="hover:text-white transition-colors"
                      data-testid={`link-footer-phone-${index}`}
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80 group">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 border border-white/15 shrink-0 group-hover:bg-white/15 transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <a 
                  href={`mailto:${t.footer.email}`}
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-email"
                >
                  {t.footer.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20">
          <p className="text-sm text-center text-white/70" data-testid="text-copyright">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
