import { motion } from "framer-motion";
import { Building2, MapPin, Accessibility, Footprints, Armchair, HeartHandshake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/lib/LanguageContext";

const workshopIcons = {
  Accessibility,
  Footprints,
  Armchair,
  HeartHandshake
};

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
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
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

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight" data-testid="text-hero-headline">
              {t.hero.headline}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-hero-subheadline">
              {t.hero.subheadline}
            </p>

            {/* Stats Badges */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12"
            >
              {t.hero.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  data-testid={`stat-badge-${index}`}
                >
                  <Card className="bg-white/95 backdrop-blur p-6 text-center hover-elevate border-white/20">
                    <div className="text-3xl sm:text-4xl font-bold text-primary mb-2" data-testid={`stat-number-${index}`}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium" data-testid={`stat-label-${index}`}>
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/patients">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent border-accent-border backdrop-blur"
                  data-testid="button-hero-learn-more"
                >
                  {t.common.learnMore}
                </Button>
              </Link>
              <Link href="/contacts">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 backdrop-blur hover:bg-white/20"
                  data-testid="button-hero-contact"
                >
                  {t.header.ctaButton}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-about-title">
              {t.about.title}
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-about-subtitle">
              {t.about.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.about.branches.map((branch, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 text-center hover-elevate h-full" data-testid={`branch-card-${index}`}>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2" data-testid={`branch-name-${index}`}>{branch.name}</h3>
                  <p className="text-sm text-primary font-medium mb-1" data-testid={`branch-city-${index}`}>{branch.city}</p>
                  {branch.address && (
                    <p className="text-sm text-muted-foreground" data-testid={`branch-addr-${index}`}>{branch.address}</p>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/about">
              <Button variant="outline" size="lg" data-testid="button-about-learn-more">
                {t.common.learnMore}
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
