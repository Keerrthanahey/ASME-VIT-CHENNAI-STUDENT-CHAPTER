"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Share2,
  Link2,
  Send,
  ChevronDown,
} from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_CONFIG, FAQ_DATA } from "@/lib/constants";
import { TEAM_MEMBERS } from "@/lib/data";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  const facultyContacts = TEAM_MEMBERS.filter((m) =>
    ["faculty-coordinator", "faculty-advisor"].includes(m.team)
  );

  return (
    <>
      <PageHero
        badge="Contact"
        title="Get In Touch"
        subtitle="Have questions? We'd love to hear from you."
      />

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-asme-cyan" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{SITE_CONFIG.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-asme-cyan" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-asme-cyan hover:underline">
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-asme-cyan">
                      <Share2 className="h-4 w-4" /> Instagram
                    </a>
                    <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-asme-cyan">
                      <Link2 className="h-4 w-4" /> LinkedIn
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Faculty Contacts</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {facultyContacts.map((contact) => (
                    <div key={contact.id}>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-asme-cyan">{contact.role}</p>
                      <a href={`mailto:${contact.email}`} className="text-xs text-muted-foreground hover:text-asme-cyan">
                        {contact.email}
                      </a>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="overflow-hidden rounded-2xl">
                <iframe
                  title="VIT Chennai Location"
                  src={`https://maps.google.com/maps?q=${SITE_CONFIG.coordinates.lat},${SITE_CONFIG.coordinates.lng}&z=15&output=embed`}
                  className="h-64 w-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register("name")} className="mt-1.5" />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} className="mt-1.5" />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" {...register("subject")} className="mt-1.5" />
                    {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={5}
                      className="mt-1.5 flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asme-blue/50"
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" variant="glow" className="w-full" loading={isSubmitting}>
                    <Send className="h-4 w-4" />
                    {submitted ? "Message Sent!" : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl space-y-3">
              {FAQ_DATA.map((faq) => (
                <div key={faq.id} className="glass rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="border-t border-white/10 px-5 pb-5"
                    >
                      <p className="pt-4 text-sm text-muted-foreground">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
