import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface PresidentCardProps {
  title: string;
  image: string;
  description: string;
  website?: string;
}

export function PresidentCard({ title, image, description, website }: PresidentCardProps) {
  return (
    <Card className="overflow-hidden w-full max-w-xs">
      <CardContent className="p-0">
        <div className="border-b-4 border-cyan-400 pb-3 px-4 pt-4">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </div>
        
        <div className="aspect-square w-full overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="bg-cyan-100 dark:bg-cyan-900/30 p-4">
          <p className="text-sm text-foreground leading-relaxed">
            {description}
          </p>
        </div>
        
        {website && (
          <div className="p-4 border-t flex items-center gap-2 text-xs hover-elevate">
            <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 hover:underline break-all"
            >
              {website}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
