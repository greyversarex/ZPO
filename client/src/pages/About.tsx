import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import { MapPin, Building2, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" data-testid="text-page-title">
              {siteContent.about.title}
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-page-subtitle">
              {siteContent.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="text-mission-title">
                    Мақсад ва вазифаҳо
                  </h2>
                  <p className="text-lg text-foreground leading-relaxed" data-testid="text-mission-content">
                    {siteContent.about.mission}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-branches-title">
              {siteContent.about.branchesTitle}
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-branches-subtitle">
              Мо дар 4 шаҳрҳои асосии Тоҷикистон филиал дорем
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {siteContent.about.branches.map((branch, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-8 text-center hover-elevate h-full" data-testid={`branch-detail-${index}`}>
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center">
                      {index === 0 ? (
                        <Building2 className="w-8 h-8 text-primary" />
                      ) : (
                        <MapPin className="w-8 h-8 text-primary" />
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2" data-testid={`branch-name-detail-${index}`}>{branch.name}</h3>
                  <p className="text-base text-primary font-semibold mb-3" data-testid={`branch-city-detail-${index}`}>{branch.city}</p>
                  <p className="text-sm text-muted-foreground" data-testid={`branch-desc-detail-${index}`}>{branch.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-foreground text-center mb-12" data-testid="text-features-title">
              Хусусиятҳои асосӣ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 text-center hover-elevate" data-testid="card-feature-0">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                    <Users className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3" data-testid="text-feature-title-0">
                  Хизматрасонии ройгон
                </h3>
                <p className="text-muted-foreground" data-testid="text-feature-desc-0">
                  Хизматрасонии комилан ройгон барои шахрвандони воҷиди шароит
                </p>
              </Card>

              <Card className="p-8 text-center hover-elevate" data-testid="card-feature-1">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                    <Award className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3" data-testid="text-feature-title-1">
                  Таҷҳизоти муосир
                </h3>
                <p className="text-muted-foreground" data-testid="text-feature-desc-1">
                  Истифодаи технологияҳо ва таҷҳизоти замонавӣ дар истеҳсол
                </p>
              </Card>

              <Card className="p-8 text-center hover-elevate" data-testid="card-feature-2">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                    <Building2 className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3" data-testid="text-feature-title-2">
                  Корхонаи давлатӣ
                </h3>
                <p className="text-muted-foreground" data-testid="text-feature-desc-2">
                  Зери назорати Вазорати тандурустӣ ва ҳифзи иҷтимоӣ
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
