import { Heart, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div className="space-y-4" data-testid="footer-branding">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground" data-testid="icon-footer-heart">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-foreground" data-testid="text-footer-title">
                {t.header.shortTitle}
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md" data-testid="text-footer-description">
              {t.hero.subheadline}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4" data-testid="footer-contact">
            <h3 className="text-sm font-semibold text-foreground">
              {t.contact.title}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span data-testid="text-footer-address">{t.footer.address}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <div className="flex flex-col">
                  {t.footer.phones.map((phone, index) => (
                    <a 
                      key={index}
                      href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                      className="hover:text-primary transition-colors"
                      data-testid={`link-footer-phone-${index}`}
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <a 
                  href={`mailto:${t.footer.email}`}
                  className="hover:text-primary transition-colors"
                  data-testid="link-footer-email"
                >
                  {t.footer.email}
                </a>
              </div>
            </div>
          </div>

          {/* Ministry */}
          <div className="space-y-4" data-testid="footer-legal">
            <h3 className="text-sm font-semibold text-foreground" data-testid="text-ministry-title">
              {t.footer.ministry}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.about.mission}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t">
          <p className="text-sm text-center text-muted-foreground" data-testid="text-copyright">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
