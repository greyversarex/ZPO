import { motion } from "framer-motion";
import { MapPin, Building2, Users, Award, Phone, Mail, User, Calendar, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import teamPhoto from "@assets/IMG-20250925-WA0032_1764182104707.jpg";

export default function About() {
  const { t } = useLanguage();
  const [selectedBranch, setSelectedBranch] = useState(0);
  
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
              {t.about.title}
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-page-subtitle">
              {t.about.subtitle}
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
            <Card className="overflow-hidden">
              <div className="aspect-[16/9] md:aspect-[21/9] w-full">
                <img 
                  src={teamPhoto} 
                  alt="Команда предприятия" 
                  className="w-full h-full object-cover"
                  data-testid="img-team-photo"
                />
              </div>
              <div className="p-8 md:p-12">
                <p className="text-lg text-foreground leading-relaxed" data-testid="text-mission-content">
                  {t.about.mission}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-leadership-title">
              {t.about.leadershipTitle}
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {t.about.leaders.map((leader, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-8 hover-elevate h-full" data-testid={`leader-card-${index}`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <User className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground mb-2" data-testid={`leader-name-${index}`}>
                      {leader.name}
                    </h3>
                    <Badge variant="secondary" className="mb-4" data-testid={`leader-position-${index}`}>
                      {leader.position}
                    </Badge>
                    <p className="text-muted-foreground" data-testid={`leader-desc-${index}`}>
                      {leader.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Departments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground" data-testid="text-departments-title">
                  {t.about.departments.title}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {t.about.departments.list.map((dept, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-md bg-muted/50 text-center"
                    data-testid={`dept-${index}`}
                  >
                    <span className="text-sm font-medium text-foreground">{dept}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-branches-title">
              {t.about.branchesTitle}
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
          >
            {t.about.branches.map((branch, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 hover-elevate h-full" data-testid={`branch-detail-${index}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {index === 0 ? (
                        <Building2 className="w-6 h-6 text-primary" />
                      ) : (
                        <MapPin className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg text-foreground" data-testid={`branch-name-${index}`}>
                          {branch.name}
                        </h3>
                        {branch.established && (
                          <Badge variant="outline" className="text-xs shrink-0">
                            <Calendar className="w-3 h-3 mr-1" />
                            {t.common.established} {branch.established}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-primary font-semibold mb-3" data-testid={`branch-city-${index}`}>
                        {branch.city}
                      </p>

                      {branch.director && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <User className="w-4 h-4 text-primary" />
                          <span><strong>{t.common.director}:</strong> {branch.director}</span>
                        </div>
                      )}

                      {branch.address && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{branch.address}</span>
                        </div>
                      )}

                      {branch.phones.length > 0 && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                          <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <div className="flex flex-col">
                            {branch.phones.map((phone, phoneIndex) => (
                              <a
                                key={phoneIndex}
                                href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                                className="hover:text-primary transition-colors"
                                data-testid={`branch-phone-${index}-${phoneIndex}`}
                              >
                                {phone}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {branch.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Mail className="w-4 h-4 text-primary" />
                          <a
                            href={`mailto:${branch.email}`}
                            className="hover:text-primary transition-colors"
                            data-testid={`branch-email-${index}`}
                          >
                            {branch.email}
                          </a>
                        </div>
                      )}

                      {branch.note && (
                        <div className="mt-4 p-3 rounded-md bg-accent/10 border border-accent/20">
                          <p className="text-sm text-foreground" data-testid={`branch-note-${index}`}>
                            <strong>{t.common.note}:</strong> {branch.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <Card className="p-6">
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {t.about.branches.map((branch, index) => (
                  <Button
                    key={index}
                    variant={selectedBranch === index ? "default" : "outline"}
                    onClick={() => setSelectedBranch(index)}
                    data-testid={`button-select-branch-${index}`}
                    className="text-sm"
                  >
                    {branch.city}
                  </Button>
                ))}
              </div>

              <div className="relative w-full h-96 rounded-md overflow-hidden bg-muted/30">
                <iframe
                  src={t.about.branches[selectedBranch].mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${t.about.branches[selectedBranch].city}`}
                  data-testid="iframe-branch-map"
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-muted-foreground text-sm" data-testid="text-selected-branch-info">
                  <strong>{t.about.branches[selectedBranch].name}:</strong> {t.about.branches[selectedBranch].city}
                  {t.about.branches[selectedBranch].address && ` - ${t.about.branches[selectedBranch].address}`}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 text-center hover-elevate" data-testid="card-feature-0">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                    <Users className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3" data-testid="text-feature-title-0">
                  {t.hero.stats[1].label}
                </h3>
                <p className="text-muted-foreground" data-testid="text-feature-desc-0">
                  {t.hero.stats[1].number}
                </p>
              </Card>

              <Card className="p-8 text-center hover-elevate" data-testid="card-feature-1">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                    <Award className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3" data-testid="text-feature-title-1">
                  {t.hero.stats[2].label}
                </h3>
                <p className="text-muted-foreground" data-testid="text-feature-desc-1">
                  {t.hero.stats[2].number}
                </p>
              </Card>

              <Card className="p-8 text-center hover-elevate" data-testid="card-feature-2">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                    <Building2 className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3" data-testid="text-feature-title-2">
                  {t.hero.stats[0].label}
                </h3>
                <p className="text-muted-foreground" data-testid="text-feature-desc-2">
                  {t.hero.stats[0].number}
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
