import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { 
  PiCheckCircleBold, 
  PiFileTextBold, 
  PiListChecksBold, 
  PiWheelchairBold, 
  PiHeartbeatBold, 
  PiUsersBold, 
  PiStethoscopeBold, 
  PiScalesBold,
  PiFilePdfBold
} from "react-icons/pi";
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

const additionalSections = {
  sanatorium: {
    tj: {
      title: "Табобати санаторию курортӣ",
      content: "Маъюбон ба табобати санаторию курортӣ дар асоси барномаи инфиродии тавонбахшӣ ва хулосаи мақомоти тандурустӣ таъмин карда мешаванд.",
      items: [
        "Маъюбони Ҷанги Бузурги Ватанӣ — ҳар сол 1 маротиба ба таври ройгон",
        "Маъюбони гурӯҳи I ва маъюбони амалиёти ҷангӣ — дар 2 сол як маротиба",
        "Маъюбони гурӯҳи I нобино, гурӯҳи II, маъюбон аз овони кӯдакӣ — дар 3 сол як маротиба ройгон ё дар 2 сол бо пардохти 50%",
        "Маъюбони гурӯҳи III (корнакунанда) — дар 2 сол як маротиба бо пардохти 50%",
        "Кӯдакони маъюби то 18-сола — тибқи тартиби Маркази саломатӣ"
      ]
    },
    ru: {
      title: "Санаторно-курортное лечение",
      content: "Инвалиды обеспечиваются санаторно-курортным лечением на основании индивидуальной программы реабилитации и заключения органов здравоохранения.",
      items: [
        "Инвалиды ВОВ — ежегодно 1 раз бесплатно",
        "Инвалиды I группы и инвалиды боевых действий — 1 раз в 2 года",
        "Инвалиды I группы (незрячие), II группы, инвалиды с детства — 1 раз в 3 года бесплатно или 1 раз в 2 года с оплатой 50%",
        "Инвалиды III группы (неработающие) — 1 раз в 2 года с оплатой 50%",
        "Дети-инвалиды до 18 лет — согласно порядку Центра здоровья"
      ]
    },
    en: {
      title: "Sanatorium Treatment",
      content: "Disabled persons are provided with sanatorium treatment based on individual rehabilitation program and health authority recommendations.",
      items: [
        "WWII veterans — once a year free of charge",
        "Group I disabled and combat veterans — once every 2 years",
        "Group I blind, Group II, childhood disabled — once every 3 years free or once every 2 years at 50% cost",
        "Group III disabled (non-working) — once every 2 years at 50% cost",
        "Disabled children under 18 — according to Health Center procedures"
      ]
    }
  },
  techMeans: {
    tj: {
      title: "Воситаҳои техникии тавонбахшӣ",
      content: "Маъюбон бо воситаҳои техникии тавонбахшӣ ба таври ройгон таъмин карда мешаванд. Ҳуҷҷатҳои зарурӣ:",
      items: [
        "Ариза",
        "Нусхаи шиноснома",
        "Барномаи инфиродии тавонбахшии маъюб",
        "Хулосаи Маркази саломатии ҷои истиқомат"
      ],
      note: "Ариза дар муддати 15 рӯз баррасӣ карда мешавад. Воситаҳои техникӣ фурӯхта ва тӯҳфа карда намешаванд."
    },
    ru: {
      title: "Технические средства реабилитации",
      content: "Инвалиды обеспечиваются техническими средствами реабилитации бесплатно. Необходимые документы:",
      items: [
        "Заявление",
        "Копия удостоверения личности",
        "Индивидуальная программа реабилитации инвалида",
        "Заключение Центра здоровья по месту жительства"
      ],
      note: "Заявление рассматривается в течение 15 дней. Технические средства не подлежат продаже и дарению."
    },
    en: {
      title: "Technical Rehabilitation Means",
      content: "Disabled persons are provided with technical rehabilitation means free of charge. Required documents:",
      items: [
        "Application",
        "Copy of ID document",
        "Individual rehabilitation program",
        "Health Center conclusion from place of residence"
      ],
      note: "Application is reviewed within 15 days. Technical means cannot be sold or gifted."
    }
  },
  socialServices: {
    tj: {
      title: "Хизматрасониҳои ройгони иҷтимоӣ",
      content: "Шахсони зерин ҳуқуқи гирифтани хизматрасониҳои ройгони иҷтимоӣ доранд:",
      items: [
        "Маъюбон ва кӯдакони маъюб",
        "Шахсони пиронсол, ки қобилияти худхизматрасониро гум кардаанд",
        "Собиқадорони Ҷанги Бузурги Ватанӣ",
        "Шахсони бесаробон ва бе манбаи даромад",
        "Қурбониёни савдои одамон",
        "Занон ва кӯдакони зарардида аз зӯроварӣ"
      ]
    },
    ru: {
      title: "Бесплатные социальные услуги",
      content: "Право на бесплатные социальные услуги имеют:",
      items: [
        "Инвалиды и дети-инвалиды",
        "Пожилые лица, утратившие способность к самообслуживанию",
        "Ветераны Великой Отечественной войны",
        "Лица без крова и без источника дохода",
        "Жертвы торговли людьми",
        "Женщины и дети, пострадавшие от насилия"
      ]
    },
    en: {
      title: "Free Social Services",
      content: "The following persons have the right to free social services:",
      items: [
        "Disabled persons and disabled children",
        "Elderly persons who have lost self-care ability",
        "WWII veterans",
        "Homeless persons without income",
        "Victims of human trafficking",
        "Women and children affected by violence"
      ]
    }
  },
  serviceTypes: {
    tj: {
      title: "Намудҳои хизматрасонии иҷтимоӣ",
      items: [
        "Хизматрасонии иҷтимоии маишӣ — кӯмак дар фаъолияти ҳаётӣ, таъмини хӯрок, либос",
        "Хизматрасонии иҷтимоии тиббӣ — кӯмаки тиббӣ, доруворӣ, муоинаҳо",
        "Хизматрасонии иҷтимоии равонӣ — дастгирии равонӣ, машварат",
        "Хизматрасонии иҷтимоии педагогӣ — таълим, тарбия, рушди малакаҳо",
        "Хизматрасонии иҷтимоии ҳуқуқӣ — маслиҳати ҳуқуқӣ, ҳифзи ҳуқуқҳо"
      ]
    },
    ru: {
      title: "Виды социальных услуг",
      items: [
        "Социально-бытовые услуги — помощь в жизнедеятельности, обеспечение питанием, одеждой",
        "Социально-медицинские услуги — медицинская помощь, лекарства, обследования",
        "Социально-психологические услуги — психологическая поддержка, консультации",
        "Социально-педагогические услуги — обучение, воспитание, развитие навыков",
        "Социально-правовые услуги — юридические консультации, защита прав"
      ]
    },
    en: {
      title: "Types of Social Services",
      items: [
        "Social-domestic services — life support assistance, food, clothing provision",
        "Social-medical services — medical assistance, medications, examinations",
        "Social-psychological services — psychological support, counseling",
        "Social-pedagogical services — education, upbringing, skill development",
        "Social-legal services — legal consultations, rights protection"
      ]
    }
  },
  rights: {
    tj: {
      title: "Ҳуқуқҳои маъюбон",
      items: [
        "Ҳуқуқ ба ҳифзи иҷтимоӣ ва тавонбахшӣ",
        "Ҳуқуқ ба таҳсили ройгон",
        "Ҳуқуқ ба кор ва шуғл",
        "Ҳуқуқ ба хизматрасонии тиббӣ",
        "Ҳуқуқ ба дастрасии бемонеа ба иншоотҳо",
        "Ҳуқуқ ба иштирок дар ҳаёти ҷамъиятӣ"
      ]
    },
    ru: {
      title: "Права инвалидов",
      items: [
        "Право на социальную защиту и реабилитацию",
        "Право на бесплатное образование",
        "Право на труд и занятость",
        "Право на медицинское обслуживание",
        "Право на беспрепятственный доступ к объектам",
        "Право на участие в общественной жизни"
      ]
    },
    en: {
      title: "Rights of Disabled Persons",
      items: [
        "Right to social protection and rehabilitation",
        "Right to free education",
        "Right to work and employment",
        "Right to medical services",
        "Right to barrier-free access to facilities",
        "Right to participate in public life"
      ]
    }
  }
};

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
      <section className="relative py-20 bg-gradient-to-r from-amber-50 via-amber-100/50 to-orange-50 dark:from-amber-950/30 dark:via-amber-900/20 dark:to-orange-950/30">
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
                    <PiCheckCircleBold className="w-7 h-7 text-teal-600 flex-shrink-0" />
                    <span className="font-bold text-lg">
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
                    <PiFileTextBold className="w-7 h-7 text-teal-600 flex-shrink-0" />
                    <span className="font-bold text-lg">
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
                    <PiListChecksBold className="w-7 h-7 text-teal-600 flex-shrink-0" />
                    <span className="font-bold text-lg">
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

              {/* Technical Rehabilitation Means */}
              <AccordionItem value="techMeans" className="border rounded-md">
                <AccordionTrigger 
                  className="px-6 py-4 hover-elevate data-[state=open]:bg-muted/50"
                  data-testid="accordion-tech-means"
                >
                  <div className="flex items-center gap-4 text-left">
                    <PiWheelchairBold className="w-7 h-7 text-teal-600 flex-shrink-0" />
                    <span className="font-bold text-lg">
                      {additionalSections.techMeans[language].title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 border-t">
                  <p className="text-muted-foreground mb-4">{additionalSections.techMeans[language].content}</p>
                  <ol className="space-y-2 mb-4">
                    {additionalSections.techMeans[language].items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ol>
                  {additionalSections.techMeans[language].note && (
                    <div className="p-3 bg-accent/10 border border-accent/20 rounded-md">
                      <p className="text-sm text-accent-foreground">{additionalSections.techMeans[language].note}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Sanatorium Treatment */}
              <AccordionItem value="sanatorium" className="border rounded-md">
                <AccordionTrigger 
                  className="px-6 py-4 hover-elevate data-[state=open]:bg-muted/50"
                  data-testid="accordion-sanatorium"
                >
                  <div className="flex items-center gap-4 text-left">
                    <PiHeartbeatBold className="w-7 h-7 text-teal-600 flex-shrink-0" />
                    <span className="font-bold text-lg">
                      {additionalSections.sanatorium[language].title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 border-t">
                  <p className="text-muted-foreground mb-4">{additionalSections.sanatorium[language].content}</p>
                  <ul className="space-y-3">
                    {additionalSections.sanatorium[language].items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Free Social Services */}
              <AccordionItem value="socialServices" className="border rounded-md">
                <AccordionTrigger 
                  className="px-6 py-4 hover-elevate data-[state=open]:bg-muted/50"
                  data-testid="accordion-social-services"
                >
                  <div className="flex items-center gap-4 text-left">
                    <PiUsersBold className="w-7 h-7 text-teal-600 flex-shrink-0" />
                    <span className="font-bold text-lg">
                      {additionalSections.socialServices[language].title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 border-t">
                  <p className="text-muted-foreground mb-4">{additionalSections.socialServices[language].content}</p>
                  <ul className="space-y-3">
                    {additionalSections.socialServices[language].items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Types of Social Services */}
              <AccordionItem value="serviceTypes" className="border rounded-md">
                <AccordionTrigger 
                  className="px-6 py-4 hover-elevate data-[state=open]:bg-muted/50"
                  data-testid="accordion-service-types"
                >
                  <div className="flex items-center gap-4 text-left">
                    <PiStethoscopeBold className="w-7 h-7 text-teal-600 flex-shrink-0" />
                    <span className="font-bold text-lg">
                      {additionalSections.serviceTypes[language].title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 border-t">
                  <ul className="space-y-3">
                    {additionalSections.serviceTypes[language].items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Rights of Disabled Persons */}
              <AccordionItem value="rights" className="border rounded-md">
                <AccordionTrigger 
                  className="px-6 py-4 hover-elevate data-[state=open]:bg-muted/50"
                  data-testid="accordion-rights"
                >
                  <div className="flex items-center gap-4 text-left">
                    <PiScalesBold className="w-7 h-7 text-teal-600 flex-shrink-0" />
                    <span className="font-bold text-lg">
                      {additionalSections.rights[language].title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 border-t">
                  <ul className="space-y-3">
                    {additionalSections.rights[language].items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
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
                        <PiFilePdfBold className="w-6 h-6 text-teal-600 flex-shrink-0" />
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
