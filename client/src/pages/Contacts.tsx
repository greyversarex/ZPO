import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contacts() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Паёми шумо қабул шуд",
      description: "Мо дар наздиктарин вақт бо шумо тамос мегирем",
    });
    setFormData({ name: "", email: "", message: "" });
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

              {/* Map Placeholder */}
              <Card className="p-6 overflow-hidden">
                <div className="aspect-video bg-muted/50 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">Харитаи макон</p>
                  </div>
                </div>
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {siteContent.contact.form.namePlaceholder}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={siteContent.contact.form.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="input-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {siteContent.contact.form.emailPlaceholder}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={siteContent.contact.form.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      {siteContent.contact.form.messagePlaceholder}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={siteContent.contact.form.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      data-testid="input-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent border-accent-border"
                    size="lg"
                    data-testid="button-submit-form"
                  >
                    {siteContent.contact.form.submitButton}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
