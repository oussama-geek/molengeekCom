import PresentationNavbar from "@/components/PresentationNavbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bot, Monitor, Shield, TrendingUp, Sparkles, Download, FileText, Mail, Phone } from "lucide-react";
import { getServerLocale, getTranslationFunction } from "@/lib/server/getLocale";
import TrainingsPageClient from "./TrainingsPageClient";
import AuditForm from "./AuditForm";

// Import images
import logoImage from "../../../public/assets/images/molengeek_logo.png";
import sponsorElia from "../../../public/assets/sponsors/elia_group.png";
import sponsorMolenbeek1080 from "../../../public/assets/sponsors/Molenbeek_1080.png";
import sponsorProximus from "../../../public/assets/sponsors/proximus.png";
import sponsorStib from "../../../public/assets/sponsors/Stib-mivb.png";
import sponsorPwc from "../../../public/assets/sponsors/pwc.png";

export const dynamic = "force-dynamic";

export default async function TrainingsPage() {
  const locale = await getServerLocale();
  const t = getTranslationFunction(locale);

  return (
    <div className="min-h-screen bg-background">
      <PresentationNavbar />
      {/* Header Section with Circuit Board Background */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-white">
        {/* Circuit board pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(129, 26, 189, 0.1) 0%, transparent 50%),
              linear-gradient(0deg, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(129, 26, 189, 0.03) 10px, rgba(129, 26, 189, 0.03) 20px)
            `
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#811abd]">
              {t("presentation.trainings.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-[#811abd] max-w-3xl mx-auto">
              {t("presentation.trainings.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>
      {/* Programs Section */}
      <section className="pb-10 md:pb-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 text-[#811abd]">
            {t("presentation.trainings.programs.title")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: IA Productivity Pack */}
            <Card className="relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-xl transition-all">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#811abd] via-purple-400 to-[#0EA5E9]"></div>
              <CardHeader className="text-center pb-4 pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#811abd] to-[#0EA5E9] flex items-center justify-center shadow-lg">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold mb-2">{t("presentation.trainings.programs.iaProductivity.title")}</CardTitle>
                <p className="text-sm text-muted-foreground mb-3">
                  ({t("presentation.trainings.programs.iaProductivity.subtitle")})
                </p>
                <p className="text-sm text-foreground">
                  {t("presentation.trainings.programs.iaProductivity.description")}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-[#811abd] text-[#811abd] hover:bg-[#811abd] hover:text-white rounded-full"
                  asChild
                >
                  <Link href="https://sidegeek.com" target="_blank" rel="noopener noreferrer">
                    {t("presentation.trainings.programs.iaProductivity.button")}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Card 2: Tech Onboarding */}
            <Card className="relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-xl transition-all">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#811abd] via-purple-400 to-[#0EA5E9]"></div>
              <CardHeader className="text-center pb-4 pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#811abd] to-[#0EA5E9] flex items-center justify-center shadow-lg relative">
                    <Monitor className="w-10 h-10 text-white" />
                    <div className="absolute bottom-2 right-2 bg-white/90 rounded px-1.5 py-0.5 text-[#811abd] text-xs font-bold">&lt;/&gt;</div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold mb-2">{t("presentation.trainings.programs.techOnboarding.title")}</CardTitle>
                <p className="text-sm text-muted-foreground mb-3">
                  ({t("presentation.trainings.programs.techOnboarding.subtitle")})
                </p>
                <p className="text-sm text-foreground">
                  {t("presentation.trainings.programs.techOnboarding.description")}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-[#811abd] text-[#811abd] hover:bg-[#811abd] hover:text-white rounded-full"
                  asChild
                >
                  <Link href="https://sidegeek.com" target="_blank" rel="noopener noreferrer">
                    {t("presentation.trainings.programs.techOnboarding.button")}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Card 3: IA for Leaders */}
            <Card className="relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-xl transition-all">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#811abd] via-purple-400 to-[#0EA5E9]"></div>
              <CardHeader className="text-center pb-4 pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#811abd] to-[#0EA5E9] flex items-center justify-center shadow-lg relative">
                    <Shield className="w-10 h-10 text-white" />
                    <TrendingUp className="w-6 h-6 text-white absolute bottom-1 right-1" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold mb-2">{t("presentation.trainings.programs.iaForLeaders.title")}</CardTitle>
                <p className="text-sm text-muted-foreground mb-3">
                  ({t("presentation.trainings.programs.iaForLeaders.subtitle")})
                </p>
                <p className="text-sm text-foreground">
                  {t("presentation.trainings.programs.iaForLeaders.description")}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-[#811abd] text-[#811abd] hover:bg-[#811abd] hover:text-white rounded-full"
                  asChild
                >
                  <Link href="https://sidegeek.com" target="_blank" rel="noopener noreferrer">
                    {t("presentation.trainings.programs.iaForLeaders.button")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Gold Member Banner */}
      <section className="bg-[#811abd] text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm md:text-base">
            <Sparkles className="w-4 h-4" />
            <span>
              {t("presentation.trainings.banner.text")}{" "}
              <Link href="/membership" className="underline hover:no-underline hover:text-white/80">
                {t("presentation.trainings.banner.link")}
              </Link>
            </span>
          </div>
        </div>
      </section>

      {/* Client/Partner Section */}
      <section className="py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t("presentation.trainings.clients.title")}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 overflow-x-auto pb-4">
            {[
              { img: sponsorElia, alt: "Elia Group" },
              { img: sponsorMolenbeek1080, alt: "Molenbeek 1080" },
              { img: sponsorProximus, alt: "Proximus" },
              { img: sponsorStib, alt: "STIB-MIVB" },
              { img: sponsorPwc, alt: "PwC" },
            ].map((sponsor, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 md:h-32 flex-shrink-0"
              >
                <img
                  src={sponsor.img.src}
                  alt={sponsor.alt}
                  className="max-h-full max-w-[160px] md:max-w-[180px] object-contain opacity-100 md:opacity-70 md:hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
          
          {/* Testimonial */}
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg p-6 flex items-start gap-4">
            <Sparkles className="w-5 h-5 text-[#0EA5E9] flex-shrink-0 mt-1" />
            <div>
              <p className="text-foreground italic mb-2">
                "{t("presentation.trainings.clients.testimonial.quote")}"
              </p>
              <p className="text-sm text-muted-foreground">
                {t("presentation.trainings.clients.testimonial.author")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Gen Tools Section */}
      <section className="py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10">
            {t("presentation.trainings.leadGen.title")}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Audit Flash Box */}
            <Card className="border-2 border-[#811abd] overflow-hidden">
              <CardContent className="overflow-hidden pt-6">
                <TrainingsPageClient />
              </CardContent>
            </Card>

            {/* Catalog Download Box */}
            <Card className="border-2 border-[#811abd] bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-[#811abd]">
                  {t("presentation.trainings.catalog.title")}
                </CardTitle>
                <CardDescription>
                  {t("presentation.trainings.catalog.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-[#811abd] hover:bg-[#811abd]/90 text-white shadow-md hover:shadow-lg transition-shadow"
                  size="lg"
                  asChild
                >
                  <a href="/assets/documents/CATALOGUE_B2B _ FORMATION_NUMÉRIQUE.pdf" download="CATALOGUE_B2B_FORMATION_NUMÉRIQUE.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="w-5 h-5 mr-2" />
                    {t("presentation.trainings.catalog.button")}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Audit Form Section */}
      <section id="audit-form" className="py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#811abd] mb-4">
                {t("presentation.trainings.audit.auditForm.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("presentation.trainings.audit.auditForm.subtitle")}
              </p>
            </div>
            <AuditForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img 
                src={logoImage.src} 
                alt="Molengeek Logo" 
                className="h-8 w-auto"
              />
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
            {t("presentation.home.footer.copyright", "", { year: String(new Date().getFullYear()) })}
          </div>
        </div>
      </footer>
    </div>
  );
}
