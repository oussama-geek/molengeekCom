import PresentationNavbar from "@/components/PresentationNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, X, Mail, Phone } from "lucide-react";
import { getServerLocale, getTranslationFunction } from "@/lib/server/getLocale";

// Import images
import logoImage from "../../../public/assets/images/molengeek_shortlogo.png";

export const dynamic = "force-dynamic";

type FeatureValue = string | { type: "included" | "excluded" | "discount"; value?: string };

interface Tier {
  name: string;
  monthlyPrice: string;
  joiningFee: string;
  features: Record<string, FeatureValue>;
}

export default async function MembershipPage() {
  const locale = await getServerLocale();
  const t = getTranslationFunction(locale);

  const tiers: Tier[] = [
    {
      name: t("presentation.home.membership.bronze.name"),
      monthlyPrice: t("presentation.home.membership.bronze.price"),
      joiningFee: "150€*",
      features: {
        [t("presentation.membership.features.monthlyPrice")]: t("presentation.home.membership.bronze.price"),
        [t("presentation.membership.features.joiningFee")]: "150€*",
        [t("presentation.membership.features.monthlyAccess")]: t("presentation.membership.values.fiveDays"),
        [t("presentation.membership.features.meetingRoomHours")]: { type: "excluded" },
        [t("presentation.membership.features.trainingDiscount")]: { type: "excluded" },
        [t("presentation.membership.features.servicesDiscount")]: { type: "excluded" },
        [t("presentation.membership.features.freeWorkshops")]: { type: "excluded" },
        [t("presentation.membership.features.multiSiteAccess")]: { type: "excluded" },
        [t("presentation.membership.features.companyDomiciliation")]: { type: "excluded" },
        [t("presentation.membership.features.freeEvents")]: { type: "excluded" },
      },
    },
    {
      name: t("presentation.home.membership.silver.name"),
      monthlyPrice: t("presentation.home.membership.silver.price"),
      joiningFee: "0€",
      features: {
        [t("presentation.membership.features.monthlyPrice")]: t("presentation.home.membership.silver.price"),
        [t("presentation.membership.features.joiningFee")]: "0€",
        [t("presentation.membership.features.monthlyAccess")]: t("presentation.membership.values.unlimited"),
        [t("presentation.membership.features.meetingRoomHours")]: t("presentation.membership.values.threeHours"),
        [t("presentation.membership.features.trainingDiscount")]: { type: "discount", value: "10%" },
        [t("presentation.membership.features.servicesDiscount")]: { type: "discount", value: "15%" },
        [t("presentation.membership.features.freeWorkshops")]: { type: "included" },
        [t("presentation.membership.features.multiSiteAccess")]: { type: "excluded" },
        [t("presentation.membership.features.companyDomiciliation")]: { type: "excluded" },
        [t("presentation.membership.features.freeEvents")]: { type: "excluded" },
      },
    },
    {
      name: t("presentation.home.membership.gold.name"),
      monthlyPrice: t("presentation.home.membership.gold.price"),
      joiningFee: "0€",
      features: {
        [t("presentation.membership.features.monthlyPrice")]: t("presentation.home.membership.gold.price"),
        [t("presentation.membership.features.joiningFee")]: "0€",
        [t("presentation.membership.features.monthlyAccess")]: t("presentation.membership.values.unlimited"),
        [t("presentation.membership.features.meetingRoomHours")]: t("presentation.membership.values.tenHours"),
        [t("presentation.membership.features.trainingDiscount")]: { type: "discount", value: "25%" },
        [t("presentation.membership.features.servicesDiscount")]: { type: "discount", value: "35%" },
        [t("presentation.membership.features.freeWorkshops")]: { type: "included" },
        [t("presentation.membership.features.multiSiteAccess")]: { type: "included" },
        [t("presentation.membership.features.companyDomiciliation")]: { type: "included" },
        [t("presentation.membership.features.freeEvents")]: { type: "included" },
      },
    },
  ];

  const featureLabels = [
    t("presentation.membership.features.monthlyPrice"),
    t("presentation.membership.features.joiningFee"),
    t("presentation.membership.features.monthlyAccess"),
    t("presentation.membership.features.meetingRoomHours"),
    t("presentation.membership.features.trainingDiscount"),
    t("presentation.membership.features.servicesDiscount"),
    t("presentation.membership.features.freeWorkshops"),
    t("presentation.membership.features.multiSiteAccess"),
    t("presentation.membership.features.companyDomiciliation"),
    t("presentation.membership.features.freeEvents"),
  ];

  const renderFeatureValue = (value: FeatureValue) => {
    if (typeof value === "string") {
      return <span>{value}</span>;
    }
    
    if (value.type === "included") {
      return <Check className="w-5 h-5 text-green-600 mx-auto" />;
    }
    
    if (value.type === "excluded") {
      return <X className="w-5 h-5 text-muted-foreground mx-auto" />;
    }
    
    if (value.type === "discount") {
      return <span className="text-green-600 font-medium">✓-{value.value}</span>;
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <PresentationNavbar />

      {/* Hero Section */}
      <section className="pt-16 pb-8 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#811abd] to-purple-400 bg-clip-text text-transparent">
              {t("presentation.membership.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("presentation.membership.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Pricing Comparison Table */}
      <section className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-border">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left p-5 font-semibold text-base text-foreground">{t("presentation.membership.featuresLabel")}</th>
                    {tiers.map((tier) => (
                      <th key={tier.name} className="text-center p-5 font-semibold">
                        <div className="font-bold text-xl text-foreground mb-1">{tier.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureLabels.map((featureLabel, idx) => (
                    <tr 
                      key={featureLabel} 
                      className={`border-b border-border/50 transition-colors ${
                        idx % 2 === 0 ? "bg-background" : "bg-muted/30"
                      }`}
                    >
                      <td className="p-5 font-medium text-sm text-foreground">{featureLabel}</td>
                      {tiers.map((tier) => (
                        <td key={tier.name} className="p-5 text-center">
                          <div className="flex items-center justify-center">
                            {renderFeatureValue(tier.features[featureLabel])}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 text-center">
              <Button
                size="lg"
                className="bg-[#811abd] hover:bg-[#811abd]/90 text-white px-8 py-6 text-base"
                asChild
              >
                <a href="https://sidegeek.com" target="_blank" rel="noopener noreferrer">
                  {t("presentation.membership.cta")}
                </a>
              </Button>
            </div>
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
            {t("presentation.home.footer.copyright", "", { year: String(new Date().getFullYear()) })}
          </div>
        </div>
      </footer>
    </div>
  );
}

