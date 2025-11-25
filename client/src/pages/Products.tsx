import { motion } from "framer-motion";
import { Accessibility, Footprints, Armchair, HeartHandshake, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

const workshopIcons = {
  Accessibility,
  Footprints,
  Armchair,
  HeartHandshake
};

export default function Products() {
  const { t } = useLanguage();

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
              {t.workshops.title}
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-page-subtitle">
              {t.workshops.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {t.workshops.items.map((workshop, index) => {
              const IconComponent = workshopIcons[workshop.icon as keyof typeof workshopIcons] || Building2;
              return (
                <motion.div key={workshop.id} variants={itemVariants}>
                  <Card className="p-8 hover-elevate h-full group" data-testid={`workshop-card-${workshop.id}`}>
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            #{workshop.id}
                          </Badge>
                          <h3 className="font-bold text-xl text-foreground" data-testid={`workshop-title-${workshop.id}`}>
                            {workshop.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed flex-1" data-testid={`workshop-desc-${workshop.id}`}>
                        {workshop.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center" data-testid="text-production-features-title">
                {t.workshops.items[0].shortName} & {t.workshops.items[1].shortName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-md bg-primary/5">
                    <Accessibility className="w-5 h-5 text-primary" />
                    <p className="text-foreground font-medium">
                      {t.workshops.items[0].shortName}
                    </p>
                  </div>
                  <div className="space-y-3 pl-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">
                        Shina Sito, Velinsky
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">
                        Upper & Lower limb prosthetics
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">
                        Fixation devices & collars
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-md bg-primary/5">
                    <Footprints className="w-5 h-5 text-primary" />
                    <p className="text-foreground font-medium">
                      {t.workshops.items[1].shortName}
                    </p>
                  </div>
                  <div className="space-y-3 pl-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">
                        Adult orthopedic shoes
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">
                        Children's orthopedic shoes
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">
                        Leather insoles
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
