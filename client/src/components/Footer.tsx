import { Heart } from "lucide-react";
import { siteContent } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4" data-testid="footer-branding">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground" data-testid="icon-footer-heart">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-foreground" data-testid="text-footer-title">
                {siteContent.header.title}
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md" data-testid="text-footer-description">
              {siteContent.hero.subheadline}
            </p>
          </div>

          <div className="space-y-4" data-testid="footer-legal">
            <h3 className="text-sm font-semibold text-foreground" data-testid="text-ministry-title">
              {siteContent.footer.ministry}
            </h3>
            <div className="space-y-2">
              {siteContent.legal.documents.map((doc, index) => (
                <p key={index} className="text-sm text-muted-foreground" data-testid={`text-legal-document-${index}`}>
                  {doc}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t">
          <p className="text-sm text-center text-muted-foreground" data-testid="text-copyright">
            {siteContent.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
