import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useLanguage } from "@/lib/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import type { News } from "@shared/schema";
import { format } from "date-fns";
import { CroppedImage } from "@/components/CroppedImage";
import { motion } from "framer-motion";

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { language } = useLanguage();

  const { data: news = [], isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"]
  });

  const article = news.find(item => String(item.id) === id);

  const getLocalizedText = (item: News, field: 'title' | 'content' | 'excerpt') => {
    const fieldMap = {
      title: { tj: item.titleTj, ru: item.titleRu, en: item.titleEn },
      content: { tj: item.contentTj, ru: item.contentRu, en: item.contentEn },
      excerpt: { tj: item.excerptTj, ru: item.excerptRu, en: item.excerptEn }
    };
    return fieldMap[field][language] || fieldMap[field].tj || "";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-pulse text-muted-foreground">
          {language === 'tj' ? 'Боргирӣ...' : language === 'ru' ? 'Загрузка...' : 'Loading...'}
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'tj' ? 'Мақола ёфт нашуд' : language === 'ru' ? 'Статья не найдена' : 'Article not found'}
          </h1>
          <Button onClick={() => setLocation("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {language === 'tj' ? 'Ба қафо' : language === 'ru' ? 'Назад' : 'Back'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <Button 
        onClick={() => setLocation("/")}
        variant="ghost"
        className="mb-8 gap-2"
        data-testid="button-back-to-news"
      >
        <ArrowLeft className="w-4 h-4" />
        {language === 'tj' ? 'Ба қафо' : language === 'ru' ? 'Назад' : 'Back'}
      </Button>

      <Card className="overflow-hidden">
        <div className="aspect-video bg-muted relative overflow-hidden">
          {article.imageUrl ? (
            <CroppedImage
              src={article.imageUrl}
              alt={getLocalizedText(article, 'title')}
              cropX={article.cropX}
              cropY={article.cropY}
              cropZoom={article.cropZoom}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-primary/40 text-center">
                {language === 'tj' ? 'Тасвир' : language === 'ru' ? 'Изображение' : 'Image'}
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Calendar className="w-4 h-4" />
            {format(new Date(article.publishedAt), "dd.MM.yyyy")}
          </div>

          <h1 className="text-4xl font-bold mb-6 text-foreground">
            {getLocalizedText(article, 'title')}
          </h1>

          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {getLocalizedText(article, 'content')}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
