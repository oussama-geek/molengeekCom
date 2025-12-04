import PresentationNavbar from "@/components/PresentationNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { getServerLocale, getTranslationFunction } from "@/lib/server/getLocale";
import SitesPageClient from "./SitesPageClient";
import BookingSection from "./BookingSection";

// Import images
import logoImage from "../../../public/assets/images/molengeek_logo.png";

export const dynamic = "force-dynamic";

export default async function SitesPage() {
  const locale = await getServerLocale();
  const t = getTranslationFunction(locale);
  
  return (
    <div className="min-h-screen bg-background">
      <PresentationNavbar />

      {/* Header Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-2 text-center">Espaces & Membership</p>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#811abd]">
            Plus qu'un espace : Votre réseau de croissance international.
          </h1>
          <p className="text-xl text-center text-foreground mb-12">
            Où souhaitez-vous travailler ?
          </p>

          {/* Location Cards and Detailed View */}
          <SitesPageClient />
        </div>
      </section>

      

      {/* Membership Cards */}
      <section className="py-16 pt-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{t("presentation.home.membership.title")}</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("presentation.home.membership.subtitle")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-stretch">
            {/* Left card - light, simple */}
            <Card className="flex flex-col bg-white/60 border border-gray-200 shadow-sm rounded-3xl scale-95">
              <CardHeader className="pb-4 text-center">
                <CardTitle className="text-2xl uppercase">
                  {t("presentation.home.membership.bronze.name")}
                </CardTitle>
                <div className="mt-2 mb-3">
                  <p className="text-sm font-medium text-gray-700 italic">
                    {t("presentation.home.membership.bronze.description")}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-700">
                    {t("presentation.home.membership.bronze.price")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                    {t("presentation.home.membership.bronze.period")}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3 px-4">
                  {t("presentation.home.membership.bronze.descriptionFull")}
                </p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col px-6 pb-8">
                <ul className="space-y-3 text-sm text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]">✓</span>
                    <span>
                      {t("presentation.home.membership.bronze.feature1")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]">✓</span>
                    <span>
                      {t("presentation.home.membership.bronze.feature2")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]">✓</span>
                    <span>
                      {t("presentation.home.membership.bronze.feature3")}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Middle card - POPULAIRE */}
            <Card className="relative flex flex-col bg-white rounded-3xl shadow-2xl border border-[#811abd]/20 scale-105 z-10 overflow-hidden">
              <div
                className="absolute bg-[#811abd] text-white w-64 text-center px-4 py-1 text-xs font-bold uppercase tracking-wide z-30 whitespace-nowrap"
                style={{
                  transform: "rotate(45deg)",
                  transformOrigin: "center",
                  right: "-60px",
                  top: "25px",
                  boxShadow:
                    "0 2px 4px rgba(0,0,0,0.2)",
                  background:
                    "linear-gradient(135deg, #811abd 0%, #9d3dd1 100%)",
                }}
              >
                {t("presentation.home.membership.silver.popular")}
              </div>

              <CardHeader className="pt-8 pb-4 text-center">
                <CardTitle className="text-2xl tracking-wide uppercase">
                  {t("presentation.home.membership.silver.name")}
                </CardTitle>
                <div className="mt-2 mb-3">
                  <p className="text-sm font-medium text-gray-900 italic">
                    {t("presentation.home.membership.silver.description")}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    {t("presentation.home.membership.silver.price")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                    {t("presentation.home.membership.silver.period")}
                  </div>
                </div>
                <p className="text-xs text-gray-700 mt-3 px-4">
                  {t("presentation.home.membership.silver.descriptionFull")}
                </p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col px-6 pb-8">
                <ul className="space-y-3 text-sm mb-4 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]">✓</span>
                    <span>
                      {t("presentation.home.membership.silver.feature1")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]">✓</span>
                    <span>
                      {t("presentation.home.membership.silver.feature2")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]">✓</span>
                    <span>
                      {t("presentation.home.membership.silver.feature3")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-[2px]">🚀</span>
                    <span>
                      {t("presentation.home.membership.silver.feature4")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-[2px]">🎁</span>
                    <span>
                      {t("presentation.home.membership.silver.feature5")}
                    </span>
                  </li>
                </ul>

                <div className="mt-auto space-y-2">
                  <div className="w-full rounded bg-[#811abd]/20 border border-[#811abd] text-xs font-semibold py-2.5 text-center shadow-md">
                    ✨ {t("presentation.home.membership.silver.bonus")}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right card - GOLD best value */}
            <Card className="relative flex flex-col bg-white rounded-3xl border border-yellow-200 shadow-xl scale-100 overflow-hidden">
              <div
                className="absolute bg-[#811abd] text-white px-8 w-64 text-center py-2 text-xs font-bold uppercase tracking-wide z-30 whitespace-nowrap shadow-2xl"
                style={{
                  transform: "rotate(45deg)",
                  transformOrigin: "center",
                  right: "-60px",
                  top: "25px",
                  boxShadow:
                    "0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)",
                  background:
                    "linear-gradient(135deg, #811abd 0%, #9d3dd1 100%)",
                }}
              >
                BEST VALUE
              </div>

              <CardHeader className="pt-8 pb-4 text-center">
                <CardTitle className="text-2xl tracking-wide text-yellow-700 uppercase">
                  {t("presentation.home.membership.gold.name")}
                </CardTitle>
                <div className="mt-2 mb-3">
                  <p className="text-sm font-medium text-gray-900 italic">
                    {t("presentation.home.membership.gold.description")}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    {t("presentation.home.membership.gold.price")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                    {t("presentation.home.membership.gold.period")}
                  </div>
                </div>
                <p className="text-xs text-gray-700 mt-3 px-4">
                  {t("presentation.home.membership.gold.descriptionFull")}
                </p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col px-6 pb-8">
                <ul className="space-y-3 text-sm mb-4 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]">✓</span>
                    <span>
                      {t("presentation.home.membership.gold.feature1")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-[2px]">🌍</span>
                    <span>
                      {t("presentation.home.membership.gold.feature2")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]">✓</span>
                    <span>
                      {t("presentation.home.membership.gold.feature3")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-[2px]">🚀</span>
                    <span>
                      {t("presentation.home.membership.gold.feature4")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-[2px]">🎓</span>
                    <span>
                      {t("presentation.home.membership.gold.feature5")}
                    </span>
                  </li>
                </ul>

                <div className="mt-auto">
                  <div className="w-full rounded bg-[#811abd]/20 border border-[#811abd]  text-xs font-semibold py-2.5 text-center shadow-md">
                    🎟️ {t("presentation.home.membership.gold.bonus")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/membership">{t("presentation.home.membership.cta")}</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Booking Visit Section */}
      <BookingSection 
        title={t("presentation.sites.visitBooking.title")}
        formTitle={t("presentation.sites.booking.title")}
        formSubtitle={t("presentation.sites.booking.subtitle")}
        nameLabel={t("presentation.sites.booking.name")}
        namePlaceholder={t("presentation.sites.booking.namePlaceholder")}
        emailLabel={t("presentation.sites.booking.email")}
        emailPlaceholder={t("presentation.sites.booking.emailPlaceholder")}
        phoneLabel={t("presentation.sites.booking.phone")}
        phonePlaceholder={t("presentation.sites.booking.phonePlaceholder")}
        preferredSiteLabel={t("presentation.sites.booking.preferredSite")}
        messageLabel={t("presentation.sites.booking.message")}
        messagePlaceholder={t("presentation.sites.booking.messagePlaceholder")}
        submitButton={t("presentation.sites.booking.submit")}
        successMessage={t("presentation.sites.booking.success")}
      />

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
