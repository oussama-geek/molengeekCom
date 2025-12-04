import PresentationNavbar from "@/components/PresentationNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { getServerLocale, getTranslationFunction } from "@/lib/server/getLocale";
import ContactForm from "./ContactForm";

// Import images
import logoImage from "../../../public/assets/images/molengeek_shortlogo.png";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const locale = await getServerLocale();
  const t = getTranslationFunction(locale);

  return (
    <div className="min-h-screen bg-background">
      <PresentationNavbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#811abd] to-purple-400 bg-clip-text text-transparent">
              {t("presentation.contact.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("presentation.contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm
              translations={{
                title: t("presentation.contact.form.title"),
                subtitle: t("presentation.contact.form.subtitle"),
                name: t("presentation.contact.form.name"),
                namePlaceholder: t("presentation.contact.form.namePlaceholder"),
                email: t("presentation.contact.form.email"),
                emailPlaceholder: t("presentation.contact.form.emailPlaceholder"),
                subject: t("presentation.contact.form.subject"),
                subjectPlaceholder: t("presentation.contact.form.subjectPlaceholder"),
                message: t("presentation.contact.form.message"),
                messagePlaceholder: t("presentation.contact.form.messagePlaceholder"),
                submit: t("presentation.contact.form.submit"),
                success: t("presentation.contact.form.success"),
              }}
            />

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("presentation.contact.info.title")}</CardTitle>
                  <CardDescription>
                    {t("presentation.contact.info.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#811abd] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t("presentation.contact.info.email")}</h3>
                      <p className="text-muted-foreground">{t("presentation.contact.info.emailValue")}</p>
                      <p className="text-sm text-muted-foreground">{t("presentation.contact.info.emailNote")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#811abd] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t("presentation.contact.info.phone")}</h3>
                      <p className="text-muted-foreground">{t("presentation.contact.info.phoneValue")}</p>
                      <p className="text-sm text-muted-foreground">{t("presentation.contact.info.phoneNote")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle>{t("presentation.contact.info.helpTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t("presentation.contact.info.helpText")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img 
                src={logoImage.src} 
                alt="Molengeek Logo" 
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold">Molengeek</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">{t("presentation.nav.home")}</Link>
              <Link href="/membership" className="hover:text-foreground transition-colors">{t("presentation.nav.membership")}</Link>
              <Link href="/trainings" className="hover:text-foreground transition-colors">{t("presentation.nav.trainings")}</Link>
              <Link href="/sites" className="hover:text-foreground transition-colors">{t("presentation.nav.sites")}</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">{t("presentation.nav.contact")}</Link>
            </div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@molengeek.com" className="hover:text-foreground transition-colors">
                info@molengeek.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+32470675141" className="hover:text-foreground transition-colors">
                +32470675141
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {t("presentation.home.footer.copyright", "© {year} Molengeek. All rights reserved.", { year: new Date().getFullYear().toString() })}
          </div>
        </div>
      </footer>
    </div>
  );
}

