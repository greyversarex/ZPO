import { motion } from "framer-motion";
import { FileCheck, FileText, ListChecks, Download } from "lucide-react";
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

const documents = [
  {
    id: 1,
    titleTj: "Қонун дар бораи ҳифзи иҷтимоии маъюбон",
    titleRu: "Закон о социальной защите инвалидов",
    titleEn: "Law on Social Protection of Disabled Persons",
    file: "/attached_assets/ДАР БОРАИ ҲИФЗИ ИҶТИМОИИ МАЪЮБОН 2010_1764186405965.pdf"
  },
  {
    id: 2,
    titleTj: "Қоидаҳои бо воситаҳои техникии тавонбахшӣ таъмин намудани маъюбон (Қарори 604)",
    titleRu: "Правила обеспечения инвалидов техническими средствами реабилитации (Постановление 604)",
    titleEn: "Rules for Providing Disabled Persons with Technical Rehabilitation Means (Resolution 604)",
    file: "/attached_assets/замима_1764186405966.pdf"
  },
  {
    id: 3,
    titleTj: "Қоидаҳои таъмин намудани маъюбон ба табобати санаторию курортӣ",
    titleRu: "Правила обеспечения инвалидов санаторно-курортным лечением",
    titleEn: "Rules for Providing Disabled Persons with Sanatorium Treatment",
    file: "/attached_assets/курорти_1764186405964.pdf"
  },
  {
    id: 4,
    titleTj: "Тартиб ва ҳаҷми пешниҳод намудани хизматрасониҳои ройгони иҷтимоӣ",
    titleRu: "Порядок и объемы предоставления бесплатного социального обслуживания",
    titleEn: "Procedure and Scope of Free Social Services",
    file: "/attached_assets/тартиби хизматрасонихои ройгони ичтимои_1764186420403.pdf"
  },
  {
    id: 5,
    titleTj: "Қарори Ҳукумати ҶТ № 448",
    titleRu: "Постановление Правительства РТ № 448",
    titleEn: "Government Resolution No. 448",
    file: "/attached_assets/448_1764186440463.pdf"
  },
  {
    id: 6,
    titleTj: "Қонун дар бораи ҳифзи саломатии аҳолӣ",
    titleRu: "Закон об охране здоровья населения",
    titleEn: "Law on Public Health Protection",
    file: "/attached_assets/КЧТ Дар бораи хиязи саломатии ахоли_1764186411155.pdf"
  }
];

export default function Patients() {
  const { language, t } = useLanguage();

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

      {/* Documents Download Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center" data-testid="text-documents-title">
              {language === 'tj' ? 'Ҳуҷҷатҳои меъёрӣ' : language === 'ru' ? 'Нормативные документы' : 'Regulatory Documents'}
            </h2>
            <div className="grid gap-4">
              {documents.map((doc) => {
                const title = language === 'tj' ? doc.titleTj : language === 'ru' ? doc.titleRu : doc.titleEn;
                return (
                  <Card key={doc.id} className="p-4 hover-elevate">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-foreground font-medium truncate" data-testid={`text-doc-title-${doc.id}`}>
                          {title}
                        </span>
                      </div>
                      <a href={doc.file} download target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="flex items-center gap-2" data-testid={`button-download-${doc.id}`}>
                          <Download className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            {language === 'tj' ? 'Боргирӣ' : language === 'ru' ? 'Скачать' : 'Download'}
                          </span>
                        </Button>
                      </a>
                    </div>
                  </Card>
                );
              })}
            </div>
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
