import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/lib/LanguageContext";

export default function Contacts() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: t.contact.form.successMessage,
        description: t.contact.subtitle,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: t.contact.form.errorMessage,
        description: error?.message || t.contact.form.errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitMutation.mutate(data);
  };

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
              {t.contact.title}
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-page-subtitle">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="p-6 hover-elevate group" data-testid="card-address">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2" data-testid="text-address-title">
                      {t.contact.address.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid="text-address-content">
                      {t.contact.address.full}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-elevate group" data-testid="card-phone">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2" data-testid="text-phone-title">
                      {t.contact.phone.title}
                    </h3>
                    <div className="space-y-1.5">
                      {t.contact.phone.numbers.map((number, index) => (
                        <a
                          key={index}
                          href={`tel:${number.replace(/[^+\d]/g, '')}`}
                          className="block text-muted-foreground hover:text-amber-600 font-medium transition-colors"
                          data-testid={`link-phone-${index}`}
                        >
                          {number}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-elevate group" data-testid="card-email">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2" data-testid="text-email-title">
                      {t.contact.email.title}
                    </h3>
                    <a
                      href={`mailto:${t.contact.email.address}`}
                      className="text-muted-foreground hover:text-emerald-600 font-medium transition-colors"
                      data-testid="link-email"
                    >
                      {t.contact.email.address}
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-elevate group" data-testid="card-hours">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2" data-testid="text-hours-title">
                      {t.contact.hours.title}
                    </h3>
                    <p className="text-muted-foreground mb-1 font-medium" data-testid="text-hours-schedule">
                      {t.contact.hours.schedule}
                    </p>
                    <p className="text-muted-foreground text-sm" data-testid="text-hours-weekend">
                      {t.contact.hours.weekend}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Google Map */}
              <Card className="p-0 overflow-hidden" data-testid="card-map">
                <iframe
                  src={t.about.branches[0].mapUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t.about.branches[0].name}
                  data-testid="iframe-map"
                />
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-500/25 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground" data-testid="text-form-title">
                    {t.contact.form.title}
                  </h2>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.namePlaceholder}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t.contact.form.namePlaceholder}
                              data-testid="input-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.phonePlaceholder}</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+992 XX XXX XXXX"
                              data-testid="input-phone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.emailPlaceholder}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t.contact.form.emailPlaceholder}
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.messagePlaceholder}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t.contact.form.messagePlaceholder}
                              rows={6}
                              data-testid="input-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent border-accent-border"
                      size="lg"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit-form"
                    >
                      {submitMutation.isPending ? t.contact.form.sending : t.contact.form.submitButton}
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
