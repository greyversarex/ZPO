import { Card, CardContent } from "@/components/ui/card";

interface PresidentCardProps {
  title: string;
  image: string;
  description: string;
  website?: string;
}

export function PresidentCard({ title, image, description, website }: PresidentCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate h-full flex flex-col" data-testid="president-card">
      <div className="relative flex-shrink-0">
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary/30 to-transparent h-16 z-10" />
        <div className="aspect-square w-full overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-xl mb-3 text-foreground" data-testid="president-title">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {description}
        </p>
        {website && (
          <div className="mt-4 pt-4 border-t">
            <a 
              href={`https://${website}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary font-semibold hover:underline"
              data-testid="president-website"
            >
              {website}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
