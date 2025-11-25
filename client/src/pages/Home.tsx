import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import { Building2, MapPin, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
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
              {siteContent.hero.headline}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-hero-subheadline">
              {siteContent.hero.subheadline}
            </p>

            {/* Stats Badges */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12"
            >
              {siteContent.hero.stats.map((stat, index) => (
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
                  Маълумоти бештар
                </Button>
              </Link>
              <Link href="/contacts">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 backdrop-blur hover:bg-white/20"
                  data-testid="button-hero-contact"
                >
                  Тамос гиред
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
              {siteContent.about.title}
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-about-subtitle">
              {siteContent.about.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {siteContent.about.branches.map((branch, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 text-center hover-elevate h-full" data-testid={`branch-card-${index}`}>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2" data-testid={`branch-name-${index}`}>{branch.name}</h3>
                  <p className="text-sm text-primary font-medium mb-1" data-testid={`branch-city-${index}`}>{branch.city}</p>
                  <p className="text-sm text-muted-foreground" data-testid={`branch-desc-${index}`}>{branch.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/about">
              <Button variant="outline" size="lg" data-testid="button-about-learn-more">
                Бештар донистан
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-products-title">
              {siteContent.products.title}
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-products-subtitle">
              {siteContent.products.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {siteContent.products.services.slice(0, 4).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 hover-elevate h-full" data-testid={`service-preview-${index}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      {index === 0 && <Building2 className="w-6 h-6" />}
                      {index === 1 && <Award className="w-6 h-6" />}
                      {index === 2 && <Building2 className="w-6 h-6" />}
                      {index === 3 && <Building2 className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-2" data-testid={`service-title-${index}`}>{service.title}</h3>
                      <p className="text-muted-foreground" data-testid={`service-desc-${index}`}>{service.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="default" size="lg" data-testid="button-products-view-all">
                Ҳамаи маҳсулот
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
