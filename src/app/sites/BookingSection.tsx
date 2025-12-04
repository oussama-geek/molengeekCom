"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface BookingSectionProps {
  title: string;
  formTitle: string;
  formSubtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  preferredSiteLabel: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitButton: string;
  successMessage: string;
}

export default function BookingSection({ 
  title,
  formTitle,
  formSubtitle,
  nameLabel, 
  namePlaceholder, 
  emailLabel, 
  emailPlaceholder,
  phoneLabel,
  phonePlaceholder,
  preferredSiteLabel,
  messageLabel = "Message (Optional)",
  messagePlaceholder = "Tell us more about your needs...",
  submitButton,
  successMessage
}: BookingSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredSite: "frame",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sites = [
    { id: "frame", name: "Frame" },
    { id: "molenbeek", name: "Molenbeek" },
    { id: "roubaix", name: "Roubaix" },
    { id: "luxembourg", name: "Luxembourg" },
    { id: "laeken", name: "Laeken" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send booking request");
      }

      toast({
        title: "Success",
        description: successMessage,
        variant: "default",
      });

      setFormData({ name: "", email: "", phone: "", preferredSite: "frame", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {title}
        </h2>
        
        {/* Booking Form */}
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{formTitle}</CardTitle>
                <CardDescription>
                  {formSubtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{nameLabel}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder={namePlaceholder}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{emailLabel}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder={emailPlaceholder}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{phoneLabel}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder={phonePlaceholder}
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredSite">{preferredSiteLabel}</Label>
                    <select
                      id="preferredSite"
                      value={formData.preferredSite}
                      onChange={(e) => setFormData({ ...formData, preferredSite: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {sites.map((site) => (
                        <option key={site.id} value={site.id}>
                          {site.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message">{messageLabel}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={messagePlaceholder}
                      rows={4}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#811abd] hover:bg-[#811abd]/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      submitButton
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

