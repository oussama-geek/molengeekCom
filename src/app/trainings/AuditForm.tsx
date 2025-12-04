"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useI18n } from "@/providers/I18nProvider";

export default function AuditForm() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast({
        title: t("presentation.trainings.audit.auditForm.success.title"),
        description: t("presentation.trainings.audit.auditForm.success.description"),
        variant: "default",
      });

      setFormData({ name: "", email: "", phone: "", description: "" });
    } catch (error) {
      toast({
        title: t("presentation.trainings.audit.auditForm.error.title"),
        description: error instanceof Error ? error.message : t("presentation.trainings.audit.auditForm.error.description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 border-[#811abd]">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{t("presentation.trainings.audit.auditForm.name")}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder={t("presentation.trainings.audit.auditForm.namePlaceholder")}
            />
          </div>
          <div>
            <Label htmlFor="email">{t("presentation.trainings.audit.auditForm.email")}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder={t("presentation.trainings.audit.auditForm.emailPlaceholder")}
            />
          </div>
          <div>
            <Label htmlFor="phone">{t("presentation.trainings.audit.auditForm.phone")}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder={t("presentation.trainings.audit.auditForm.phonePlaceholder")}
            />
          </div>
          <div>
            <Label htmlFor="description">{t("presentation.trainings.audit.auditForm.description")}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder={t("presentation.trainings.audit.auditForm.descriptionPlaceholder")}
              rows={6}
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
                {t("presentation.trainings.audit.auditForm.submitting")}
              </>
            ) : (
              <>
                <Send className="mr-2 w-4 h-4" />
                {t("presentation.trainings.audit.auditForm.submit")}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

