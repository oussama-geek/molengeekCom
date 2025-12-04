import PresentationNavbar from "@/components/PresentationNavbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SitesMapSection from "@/components/SitesMapSection";
import Link from "next/link";
import {
  Users,
  Globe,
  FileStack,
  TrendingUp,
  MapPin,
  Building2,
  ArrowRight,
  ArrowUp,
  Calendar,
  Brain,
  Shield,
  Code2,
  Cloud,
  Bot,
  Award,
  Network,
  Tag,
  BarChart3,
  CheckCircle,
  Play,
  Mail,
  Phone,
  Settings,
  Rocket,
} from "lucide-react";
import {
  getServerLocale,
  getTranslationFunction,
} from "@/lib/server/getLocale";

// Import images
import heroImage from "../../public/assets/images/herosection_image.jpg";
import trainingsBg from "../../public/assets/images/trainings_bg2.jpg";
import trainingsBg3 from "../../public/assets/images/bg_tranings3.png";
import impactBg from "../../public/assets/images/impact_bg2.png";
import logoImage from "../../public/assets/images/molengeek_logo.png";
import sponsorAdobe from "../../public/assets/sponsors/adobe.png";
import sponsorAws from "../../public/assets/sponsors/aws.png";
import sponsorBnp from "../../public/assets/sponsors/bnp.png";
import sponsorCisco from "../../public/assets/sponsors/cisco.png";
import sponsorGoogle from "../../public/assets/sponsors/Google.png";
import sponsorMeta from "../../public/assets/sponsors/meta.png";
import sponsorMicrosoft from "../../public/assets/sponsors/microsoft.png";
import sponsorPwc from "../../public/assets/sponsors/pwc.png";

export const dynamic = "force-dynamic";

export default async function Home() {
  const locale = await getServerLocale();
  const t = getTranslationFunction(locale);
  return (
    <div className="min-h-screen bg-background">
      <PresentationNavbar />

      {/* Hero Section with Overlay Statistics */}
      <section className="relative w-full min-h-[800px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${heroImage.src}')`,
            filter: "brightness(0.7) saturate(0.8)",
          }}
        />
        {/* Overlay for text readability - lighter overlay to show background */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center pt-16 pb-48 md:pb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            {t("presentation.home.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            {t("presentation.home.hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-8">
            <Button
              size="lg"
              className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white text-base px-8 py-6 rounded-lg"
              asChild
            >
              <Link href="/sites">{t("presentation.home.hero.ctaSpaces")}</Link>
            </Button>
            <Button
              size="lg"
              className="bg-[#811abd] hover:bg-[#811abd]/90 text-white text-base px-8 py-6 rounded-lg"
              asChild
            >
              <Link href="/membership">
                {t("presentation.home.hero.ctaMembership")}
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistics Card Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 pb-4 md:pb-8">
            <Card className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-0">
              <CardContent className="p-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  <div className="text-center">
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-[#811abd] mx-auto mb-3" />
                    <div className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      7600+
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground font-medium">
                      {t("presentation.home.hero.stats.trained")}
                    </div>
                  </div>
                  <div className="text-center">
                    <FileStack className="w-8 h-8 md:w-10 md:h-10 text-[#811abd] mx-auto mb-3" />
                    <div className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      1000+
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground font-medium">
                      {t("presentation.home.hero.stats.places")}
                    </div>
                  </div>
                  <div className="text-center">
                    <Globe className="w-8 h-8 md:w-10 md:h-10 text-[#811abd] mx-auto mb-3" />
                    <div className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      8
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground font-medium">
                      {t("presentation.home.hero.stats.sites")}
                    </div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-[#811abd] mx-auto mb-3" />
                    <div className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      230+
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground font-medium">
                      {t("presentation.home.hero.stats.startups")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="pt-6 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-center">
              <div className="w-full max-w-6xl pl-6">
                <h2 className="text-xl opacity-70 mb-4 text-left">
                  {t("presentation.home.partners.title")} :
                </h2>
              </div>
            </div>
            {/* <p className="text-center text-muted-foreground mb-8">
              {t("presentation.home.partners.subtitle")}
            </p> */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 overflow-x-auto pb-4 w-full max-w-6xl">
            {[
              { img: sponsorGoogle, alt: "Google" },
              { img: sponsorMicrosoft, alt: "Microsoft" },
              { img: sponsorMeta, alt: "Meta" },
              { img: sponsorPwc, alt: "PwC" },
              { img: sponsorBnp, alt: "BNP" },
              { img: sponsorAws, alt: "AWS" },
              { img: sponsorAdobe, alt: "Adobe" },
              { img: sponsorCisco, alt: "Cisco" },
            ].map((sponsor, i) => {
              // Make Adobe (index 4), Cisco (index 6), and PwC (index 7) smaller
              const isSmaller = i === 3 || i === 6 || i === 7;
              return (
                <div
                  key={i}
                  className="flex items-center justify-center h-24 md:h-32 flex-shrink-0"
                >
                  <img
                    src={sponsor.img.src}
                    alt={sponsor.alt}
                    className={`max-h-full object-contain opacity-100 md:opacity-70 md:hover:opacity-100 transition-opacity ${
                      isSmaller 
                        ? "max-w-[50px] md:max-w-[70px]" 
                        : "max-w-[180px] md:max-w-[220px]"
                    }`}
                  />
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Passport Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#811abd] mb-4">
              {t("presentation.home.passport.title")}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {t("presentation.home.passport.subtitle")}
            </p>
          </div>

          {/* Three Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto relative">
            {/* Dotted connecting line - passes through center of circles */}
            <div className="hidden md:block absolute top-12 left-32 right-32 h-px border-t-2 border-dotted border-[#811abd]/50 z-0" />

            {/* Benefit 1: LES ESPACES - Network/Community Icon */}
            <div className="relative flex flex-col items-center text-center z-10">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-[#811abd] flex items-center justify-center relative z-20 shadow-sm">
                  <div className="relative w-14 h-14">
                    {/* Central figure */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Users className="w-7 h-7 text-[#811abd]" />
                    </div>
                    {/* Small connected figures around in a circle */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                      <Users className="w-3.5 h-3.5 text-[#811abd]/70" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
                      <Users className="w-3.5 h-3.5 text-[#811abd]/70" />
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
                      <Users className="w-3.5 h-3.5 text-[#811abd]/70" />
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                      <Users className="w-3.5 h-3.5 text-[#811abd]/70" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Users className="w-3 h-3 text-[#811abd]/60" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#811abd] mb-3">
                {t("presentation.home.passport.benefit1.title")}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {t("presentation.home.passport.benefit1.description")}
              </p>
            </div>

            {/* Benefit 2: LES COMPÉTENCES - Brain with Gear and Arrow */}
            <div className="relative flex flex-col items-center text-center z-10">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-[#811abd] flex items-center justify-center relative z-20 shadow-sm">
                  <div className="relative w-14 h-14">
                    {/* Brain on the left */}
                    <Brain className="w-7 h-7 text-[#811abd] absolute left-0 top-1/2 transform -translate-y-1/2" />
                    {/* Gear below brain */}
                    <Settings className="w-4 h-4 text-[#811abd]/80 absolute left-1 bottom-2" />
                    {/* Upward arrow on the right */}
                    <ArrowUp className="w-6 h-6 text-[#811abd] absolute right-0 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#811abd] mb-3">
                {t("presentation.home.passport.benefit2.title")}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {t("presentation.home.passport.benefit2.description")}
              </p>
            </div>

            {/* Benefit 3: LE POTENTIEL - Globe with Rocket and Chart */}
            <div className="relative flex flex-col items-center text-center z-10">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-[#811abd] flex items-center justify-center relative z-20 shadow-sm">
                  <div className="relative w-14 h-14">
                    {/* Globe on the left */}
                    <Globe className="w-7 h-7 text-[#811abd] absolute left-0 top-1/2 transform -translate-y-1/2" />
                    {/* Rocket launching upward from behind globe */}
                    <Rocket className="w-6 h-6 text-[#811abd] absolute right-1 top-2 transform -rotate-12" />
                    {/* Bar chart below with increasing bars */}
                    <BarChart3 className="w-5 h-5 text-[#811abd]/80 absolute bottom-1 left-1/2 transform -translate-x-1/2" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#811abd] mb-3">
                {t("presentation.home.passport.benefit3.title")}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {t("presentation.home.passport.benefit3.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Cards */}
      <section className="py-10 pt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t("presentation.home.membership.title")}
          </h2>
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
                  <div className="w-full rounded bg-[#811abd]/20 border border-[#811abd] text-xs font-semibold py-2.5 text-center shadow-md">
                    🎟️ {t("presentation.home.membership.gold.bonus")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/membership">
                {t("presentation.home.membership.cta")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Training Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${trainingsBg3.src}')`,
            filter: "brightness(0.7) saturate(1.1)",
          }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Title Section */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("presentation.home.trainingSection.title")}
            </h2>
            <p className="text-2xl md:text-3xl text-white/90 font-medium">
              {t("presentation.home.trainingSection.subtitle")}
            </p>
          </div>

          {/* Two Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            {/* Card 1: IA Productivity Boost - Purple Neon Border */}
            <Card className="relative flex flex-col bg-white/5 backdrop-blur-xl border-2 border-[#811abd] shadow-[0_0_30px_rgba(129,26,189,0.5)] hover:shadow-[0_0_40px_rgba(129,26,189,0.7)] transition-all rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#811abd]/10 to-transparent pointer-events-none" />
              <CardHeader className="text-center pb-4 pt-8 relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#811abd] to-[#9d3dd1] flex items-center justify-center shadow-lg shadow-[#811abd]/50">
                    <Bot className="w-14 h-14 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center gap-4 text-white pb-8 relative z-10">
                <CardTitle className="text-2xl md:text-3xl mb-2 font-bold">
                  {t("presentation.home.trainingSection.card1.title")}
                </CardTitle>
                <CardDescription className="text-white/80 px-4 text-base">
                  {t(
                    "presentation.home.trainingsHome.aiDataScience.description"
                  )}
                </CardDescription>
                <Button
                  className="w-full bg-gradient-to-r from-[#811abd] to-[#9d3dd1] hover:from-[#811abd]/90 hover:to-[#9d3dd1]/90 text-white border-0 shadow-lg mt-4"
                  asChild
                >
                  <Link href="/trainings">
                    {t("presentation.home.trainingsHome.aiDataScience.button")}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Card 2: Data & Cyber Awareness - Cyan Neon Border */}
            <Card className="relative flex flex-col bg-white/5 backdrop-blur-xl border-2 border-[#0EA5E9] shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:shadow-[0_0_40px_rgba(14,165,233,0.7)] transition-all rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent pointer-events-none" />
              <CardHeader className="text-center pb-4 pt-8 relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-[#0EA5E9]/50">
                    <Shield className="w-14 h-14 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center gap-4 text-white pb-8 relative z-10">
                <CardTitle className="text-2xl md:text-3xl mb-2 font-bold">
                  {t("presentation.home.trainingSection.card2.title")}
                </CardTitle>
                <CardDescription className="text-white/80 px-4 text-base">
                  {t(
                    "presentation.home.trainingsHome.cybersecurityCloud.description"
                  )}
                </CardDescription>
                <Button
                  className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#06b6d4] hover:from-[#0EA5E9]/90 hover:to-[#06b6d4]/90 text-white border-0 shadow-lg mt-4"
                  asChild
                >
                  <Link href="/trainings">
                    {t(
                      "presentation.home.trainingsHome.cybersecurityCloud.button"
                    )}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* GOLD Membership Discount Separator */}
      <section className="py-6 bg-[#811abd] border-y-2 border-[#9d3dd1]/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-white">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">{t("presentation.home.trainingSection.goldDiscount.member")}</span>
            </div>
            <span className="text-sm md:text-base">
              {t("presentation.home.trainingSection.goldDiscount.benefit")}
            </span>
            <Link
              href="/membership"
              className="text-sm md:text-base underline hover:text-yellow-200 transition-colors font-medium"
            >
              {t("presentation.home.trainingSection.goldDiscount.link")}
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Wall Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${impactBg.src}')`,
            filter: "brightness(0.4) saturate(1.2)",
          }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-white">
            {t("presentation.home.impactWall.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Stat 1: Talents Formés */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="relative">
                  <Brain className="w-16 h-16 text-[#811abd] drop-shadow-[0_0_10px_rgba(129,26,189,0.8)]" />
                  <ArrowRight className="w-6 h-6 text-[#0EA5E9] absolute -top-1 -right-2 drop-shadow-[0_0_8px_rgba(14,165,233,0.8)] -rotate-90" />
                </div>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                7,600
              </div>
              <div className="text-xl font-bold text-white mb-2">
                {t("presentation.home.impactWall.stat1.title")}
              </div>
              <div className="text-sm text-white/80">
                {t("presentation.home.impactWall.stat1.subtitle")}
              </div>
            </div>

            {/* Stat 2: Participants */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <Users className="w-16 h-16 text-[#811abd] drop-shadow-[0_0_10px_rgba(129,26,189,0.8)]" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                16,929
              </div>
              <div className="text-xl font-bold text-white mb-2">
                {t("presentation.home.impactWall.stat2.title")}
              </div>
              <div className="text-sm text-white/80">
                {t("presentation.home.impactWall.stat2.subtitle")}
              </div>
            </div>

            {/* Stat 3: Événements */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="relative">
                  <Calendar className="w-16 h-16 text-[#811abd] drop-shadow-[0_0_10px_rgba(129,26,189,0.8)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#0EA5E9] drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                  </div>
                </div>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                240
              </div>
              <div className="text-xl font-bold text-white mb-2">
                {t("presentation.home.impactWall.stat3.title")}
              </div>
              <div className="text-sm text-white/80">
                {t("presentation.home.impactWall.stat3.subtitle")}
              </div>
            </div>

            {/* Stat 4: Sorties Positives */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="relative">
                  <BarChart3 className="w-16 h-16 text-[#811abd] drop-shadow-[0_0_10px_rgba(129,26,189,0.8)]" />
                  <CheckCircle className="w-6 h-6 text-[#0EA5E9] absolute -bottom-1 -right-2 drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                </div>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                85%
              </div>
              <div className="text-xl font-bold text-white mb-2">
                {t("presentation.home.impactWall.stat4.title")}
              </div>
              <div className="text-sm text-white/80">
                {t("presentation.home.impactWall.stat4.subtitle")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sites Map Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            {t("presentation.home.locations.title")}
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            {t("presentation.home.locations.subtitle")}
          </p>
          <SitesMapSection />
          <div className="text-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-[#811abd] hover:bg-[#811abd]/90 text-white"
            >
              <Link href="/sites">{t("presentation.home.locations.cta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Section */}
      {/* <section className="py-16 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("presentation.home.community.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t("presentation.home.community.subtitle")}
          </p>
          <Button
            size="lg"
            className="bg-[#811abd] hover:bg-[#811abd]/90 text-white"
            asChild
          >
            <a
              href="https://sidegeek.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("presentation.home.community.cta")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2 md:mb-0">
              <img
                src={logoImage.src}
                alt="Molengeek Logo"
                className="h-8 w-auto"
              />
            </div>
            <div className="flex flex-wrap justify-center md:justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                {t("presentation.nav.home")}
              </Link>
              <Link
                href="/membership"
                className="hover:text-foreground transition-colors"
              >
                {t("presentation.nav.membership")}
              </Link>
              <Link
                href="/trainings"
                className="hover:text-foreground transition-colors"
              >
                {t("presentation.nav.trainings")}
              </Link>
              <Link
                href="/sites"
                className="hover:text-foreground transition-colors"
              >
                {t("presentation.nav.sites")}
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                {t("presentation.nav.contact")}
              </Link>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 text-sm text-muted-foreground md:flex-row md:justify-center">
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
          <div className="mt-4 text-center text-xs md:text-sm text-muted-foreground">
            {t("presentation.home.footer.copyright", "", {
              year: String(new Date().getFullYear()),
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
