import { motion } from "framer-motion";
import { FileCheck, FileText, ListChecks, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Patients() {
  const { t } = useLanguage();

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
              {t.patientGuide.title}
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-page-subtitle">
              {t.patientGuide.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Patient Guide Accordion */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4" defaultValue="eligibility">
              {/* Eligibility Tab */}
              <AccordionItem value="eligibility" className="border rounded-md">
                <AccordionTrigger 
                  className="px-6 py-4 hover-elevate data-[state=open]:bg-muted/50"
                  data-testid="accordion-eligibility"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg">
                      {t.patientGuide.tabs[0].title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 border-t">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-eligibility-content">
                    {t.patientGuide.tabs[0].content}
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Documents Tab */}
              <AccordionItem value="documents" className="border rounded-md">
                <AccordionTrigger 
                  className="px-6 py-4 hover-elevate data-[state=open]:bg-muted/50"
                  data-testid="accordion-documents"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg">
                      {t.patientGuide.tabs[1].title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 border-t">
                  <ol className="space-y-3" data-testid="list-documents">
                    {t.patientGuide.tabs[1].items?.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>

              {/* Process Tab */}
              <AccordionItem value="process" className="border rounded-md">
                <AccordionTrigger 
                  className="px-6 py-4 hover-elevate data-[state=open]:bg-muted/50"
                  data-testid="accordion-process"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      <ListChecks className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg">
                      {t.patientGuide.tabs[2].title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 border-t">
                  <div className="space-y-6" data-testid="list-process-steps">
                    {t.patientGuide.tabs[2].steps?.map((stepItem, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                          {stepItem.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{stepItem.title}</h4>
                          <p className="text-muted-foreground text-sm">{stepItem.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Legal Base Section */}
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
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="text-legal-title">
                    {t.about.subtitle}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.about.mission}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-cta-title">
              {t.contact.form.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-subtitle">
              {t.contact.subtitle}
            </p>
            <Link href="/contacts">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent border-accent-border"
                data-testid="button-contact-cta"
              >
                {t.header.ctaButton}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
