import { motion } from "framer-motion";
import { Building2, Accessibility, Footprints, Armchair, HeartHandshake, ChevronLeft, ChevronRight, Calendar, ArrowRight, Newspaper, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/lib/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import type { Banner, News } from "@shared/schema";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const workshopIcons = {
  Accessibility,
  Footprints,
  Armchair,
  HeartHandshake
};

function BannerSlider() {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: banners = [], isLoading } = useQuery<Banner[]>({
    queryKey: ["/api/banners"]
  });

  useEffect(() => {
    if (banners.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const getLocalizedText = (banner: Banner, field: 'title' | 'subtitle' | 'buttonText') => {
    const fieldMap = {
      title: { tj: banner.titleTj, ru: banner.titleRu, en: banner.titleEn },
      subtitle: { tj: banner.subtitleTj, ru: banner.subtitleRu, en: banner.subtitleEn },
      buttonText: { tj: banner.buttonTextTj, ru: banner.buttonTextRu, en: banner.buttonTextEn }
    };
    return fieldMap[field][language] || fieldMap[field].tj;
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  if (isLoading || banners.length === 0) {
    return (
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t.hero.headline}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              {t.hero.subheadline}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
              {t.hero.stats.map((stat, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur p-6 text-center hover-elevate border-white/20">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </Card>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/patients">
                <Button size="lg" className="bg-accent text-accent-foreground border-accent-border backdrop-blur">
                  {t.common.learnMore}
                </Button>
              </Link>
              <Link href="/contacts">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 backdrop-blur">
                  {t.header.ctaButton}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const currentBanner = banners[currentSlide];

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden" data-testid="hero-banner-slider">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0">
            {banner.imageUrl && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${banner.imageUrl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/30 to-primary/20" />
          </div>
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight" data-testid="hero-title">
            {getLocalizedText(currentBanner, 'title')}
          </h1>
          {currentBanner.subtitleTj && (
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto" data-testid="hero-subtitle">
              {getLocalizedText(currentBanner, 'subtitle')}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            {currentBanner.buttonTextTj && currentBanner.buttonLink ? (
              <Link href={currentBanner.buttonLink}>
                <Button size="lg" className="bg-accent text-accent-foreground border-accent-border backdrop-blur" data-testid="hero-cta-primary">
                  {getLocalizedText(currentBanner, 'buttonText')}
                </Button>
              </Link>
            ) : (
              <Link href="/patients">
                <Button size="lg" className="bg-accent text-accent-foreground border-accent-border backdrop-blur" data-testid="hero-cta-primary">
                  {t.common.learnMore}
                </Button>
              </Link>
            )}
            <Link href="/contacts">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 backdrop-blur" data-testid="hero-cta-secondary">
                {t.header.ctaButton}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            data-testid="button-slider-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            data-testid="button-slider-next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/40"
                }`}
                data-testid={`slider-dot-${index}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function NewsFeed() {
  const { language, t } = useLanguage();

  const { data: news = [], isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"]
  });

  const getLocalizedText = (item: News, field: 'title' | 'content' | 'excerpt') => {
    const fieldMap = {
      title: { tj: item.titleTj, ru: item.titleRu, en: item.titleEn },
      content: { tj: item.contentTj, ru: item.contentRu, en: item.contentEn },
      excerpt: { tj: item.excerptTj, ru: item.excerptRu, en: item.excerptEn }
    };
    return fieldMap[field][language] || fieldMap[field].tj || "";
  };

  const newsLabels = {
    tj: { title: "Навигариҳо", subtitle: "Охирин хабарҳо ва эълонҳои корхона", readMore: "Бештар хондан", allNews: "Ҳамаи хабарҳо" },
    ru: { title: "Новости", subtitle: "Последние новости и объявления предприятия", readMore: "Читать далее", allNews: "Все новости" },
    en: { title: "News", subtitle: "Latest news and announcements from the plant", readMore: "Read more", allNews: "All news" }
  };

  const labels = newsLabels[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background" data-testid="news-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{labels.title}</h2>
            <p className="text-lg text-muted-foreground">{labels.subtitle}</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse text-muted-foreground">Боргирӣ...</div>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section className="py-20 bg-background" data-testid="news-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{labels.title}</h2>
            <p className="text-lg text-muted-foreground">{labels.subtitle}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background" data-testid="news-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="news-title">
            {labels.title}
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="news-subtitle">
            {labels.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {news.slice(0, 6).map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="overflow-hidden hover-elevate h-full flex flex-col" data-testid={`news-card-${item.id}`}>
                <div className="aspect-video bg-muted relative">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={getLocalizedText(item, 'title')}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <Newspaper className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(item.publishedAt), "dd.MM.yyyy")}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`news-item-title-${item.id}`}>
                    {getLocalizedText(item, 'title')}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                    {getLocalizedText(item, 'excerpt') || getLocalizedText(item, 'content').substring(0, 150)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      <BannerSlider />
      <NewsFeed />

      {/* Workshops Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-workshops-title">
              {t.workshops.title}
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-workshops-subtitle">
              {t.workshops.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.workshops.items.map((workshop, index) => {
              const IconComponent = workshopIcons[workshop.icon as keyof typeof workshopIcons] || Building2;
              return (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-8 hover-elevate h-full" data-testid={`workshop-preview-${workshop.id}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-2" data-testid={`workshop-title-${workshop.id}`}>
                          {workshop.shortName}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`workshop-desc-${workshop.id}`}>
                          {workshop.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="default" size="lg" data-testid="button-products-view-all">
                {t.common.viewAll}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
