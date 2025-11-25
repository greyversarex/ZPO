import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
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

export default function Contacts() {
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
        title: "Паёми шумо қабул шуд",
        description: "Мо дар наздиктарин вақт бо шумо тамос мегирем",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Хатогӣ рух дод",
        description: error.message || "Лутфан баъдтар кӯшиш кунед",
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
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" data-testid="text-page-title">
              {siteContent.contact.title}
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-page-subtitle">
              {siteContent.contact.subtitle}
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
              <Card className="p-6 hover-elevate" data-testid="card-address">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2" data-testid="text-address-title">
                      {siteContent.contact.address.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid="text-address-content">
                      {siteContent.contact.address.street}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-elevate" data-testid="card-phone">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2" data-testid="text-phone-title">
                      {siteContent.contact.phone.title}
                    </h3>
                    {siteContent.contact.phone.numbers.map((number, index) => (
                      <p key={index} className="text-muted-foreground" data-testid={`text-phone-number-${index}`}>
                        {number}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-elevate" data-testid="card-hours">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2" data-testid="text-hours-title">
                      {siteContent.contact.hours.title}
                    </h3>
                    <p className="text-muted-foreground mb-1" data-testid="text-hours-schedule">
                      {siteContent.contact.hours.schedule}
                    </p>
                    <p className="text-muted-foreground text-sm" data-testid="text-hours-weekend">
                      {siteContent.contact.hours.weekend}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Google Map */}
              <Card className="p-0 overflow-hidden" data-testid="card-map">
                <iframe
                  src="https://www.google.com/maps?q=38.5598,68.7738&hl=en&z=14&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Харитаи корхонаи протезӣ-ортопедӣ дар Дӯшанбе"
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
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground" data-testid="text-form-title">
                    {siteContent.contact.form.title}
                  </h2>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{siteContent.contact.form.namePlaceholder}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={siteContent.contact.form.namePlaceholder}
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{siteContent.contact.form.emailPlaceholder}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={siteContent.contact.form.emailPlaceholder}
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Рақами телефон (ихтиёрӣ)</FormLabel>
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
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{siteContent.contact.form.messagePlaceholder}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={siteContent.contact.form.messagePlaceholder}
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
                      {submitMutation.isPending ? "Фиристода мешавад..." : siteContent.contact.form.submitButton}
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
