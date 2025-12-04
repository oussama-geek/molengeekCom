"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Quote, Building2, Flame, Flag } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Import images from site folders
// Frame images
import frameImage1 from "../../../public/assets/images/sites/Frame/SAU-MSI-Frame-20241220-1_converted.webp";
import frameImage2 from "../../../public/assets/images/sites/Frame/SAU-MSI-Frame-20250403-34_converted_converted.webp";
import frameImage3 from "../../../public/assets/images/sites/Frame/Photos_MG.webp";
import frameImage4 from "../../../public/assets/images/sites/Frame/MolenGeek_Team_Mashallah.webp";
import frameImage5 from "../../../public/assets/images/sites/Frame/Baukunst_Bruther.webp";
import frameImage6 from "../../../public/assets/images/sites/Frame/frame_image6.webp";
// Molenbeek images
import molenbeekImage1 from "../../../public/assets/images/sites/Molenbeek/Molengeek.webp";
import molenbeekImage2 from "../../../public/assets/images/sites/Molenbeek/Molengeek_1.webp";
import molenbeekImage3 from "../../../public/assets/images/sites/Molenbeek/Molengeek_image.webp";
import molenbeekImage4 from "../../../public/assets/images/sites/Molenbeek/Molengeek_image_1.webp";
import molenbeekImage5 from "../../../public/assets/images/sites/Molenbeek/Molengeek6.webp";
import molenbeekImage6 from "../../../public/assets/images/sites/Molenbeek/Coding_11.webp";
// Roubaix images
import roubaixImage1 from "../../../public/assets/images/sites/Roubaix/MolengeekRoubaixSept2025.webp";
import roubaixImage2 from "../../../public/assets/images/sites/Roubaix/MolengeekRoubaix1.jpeg";
import roubaixImage3 from "../../../public/assets/images/sites/Roubaix/MolengeekRoubaix.jpeg";
import roubaixImage4 from "../../../public/assets/images/sites/Roubaix/InaugurationMolenGeekRoubaix.jpg";
import roubaixImage5 from "../../../public/assets/images/sites/Roubaix/MolenGeekTeamMashallah.jpg";
// Luxembourg images
import luxembourgImage1 from "../../../public/assets/images/sites/Luxembourg/20250709_140235_converted_converted.webp";
import luxembourgImage2 from "../../../public/assets/images/sites/Luxembourg/MolengeekParc.webp";
import luxembourgImage3 from "../../../public/assets/images/sites/Luxembourg/Jour3PXL.webp";
import luxembourgImage4 from "../../../public/assets/images/sites/Luxembourg/Jour2PXL.webp";
import luxembourgImage5 from "../../../public/assets/images/sites/Luxembourg/Jour2PXLconverted.webp";
import luxembourgImage6 from "../../../public/assets/images/sites/Luxembourg/20250709_135938_converted_converted.webp";

// Anvers (Antwerp) images - using for Maroc placeholder or adding as separate site
import antwerpImage1 from "../../../public/assets/images/sites/Anvers/MolengeekAnversDéc2024.webp";
import antwerpImage2 from "../../../public/assets/images/sites/Anvers/anvers1.webp";
import antwerpImage3 from "../../../public/assets/images/sites/Anvers/Molengeek_Antwerpen_1.jpg";
import antwerpImage4 from "../../../public/assets/images/sites/Anvers/CoworkingBorgerhub.jpg";
import antwerpImage5 from "../../../public/assets/images/sites/Anvers/DSC07535.jpg";
import antwerpImage6 from "../../../public/assets/images/sites/Anvers/DSC07539.jpg";
interface Site {
  id: string;
  name: string;
  descriptor: string;
  subtitle: string;
  address: string;
  amenities: string[];
  images: any[];
  previewImage: any;
  icon: "building" | "flame" | "flag";
  quote?: string;
}

const sites: Site[] = [
  {
    id: "frame",
    name: "Frame",
    descriptor: "Média/Prestige",
    subtitle: "Le Hub Média & Corporate",
    address: "Blvd Auguste Reyers 84, 1030 Schaerbeek, Belgique",
    amenities: ["Studio TV", "Lounge Client", "Parking", "Espace événementiel"],
    images: [frameImage1, frameImage2, frameImage3, frameImage4, frameImage5, frameImage6],
    previewImage: frameImage1,
    icon: "building",
    quote: "Un espace moderne et élégant conçu pour les professionnels des médias et les entreprises prestigieuses.",
  },
  {
    id: "molenbeek",
    name: "Molenbeek",
    descriptor: "Tech/Roots",
    subtitle: "Le Hub Tech & Innovation",
    address: "Pl. de la Minoterie 10, 1080 Molenbeek-Saint-Jean, Belgique",
    amenities: ["High-Speed Wi-Fi", "Coffee Bar", "Meeting Rooms", "24/7 Access", "Espace événementiel"],
    images: [molenbeekImage1, molenbeekImage2, molenbeekImage3, molenbeekImage4, molenbeekImage5, molenbeekImage6],
    previewImage: molenbeekImage1,
    icon: "flame",
    quote: "L'innovation technologique au cœur de Bruxelles, où les startups rencontrent l'excellence.",
  },
  {
    id: "roubaix",
    name: "Roubaix",
    descriptor: "French Tech",
    subtitle: "Le Hub French Tech",
    address: "78, Boulevard Leclerc, 59100 Roubaix, France",
    amenities: ["High-Speed Wi-Fi", "Coffee Bar", "Event Space", "Parking", "Meeting Rooms"],
    images: [roubaixImage1, roubaixImage2, roubaixImage3, roubaixImage4, roubaixImage5],
    previewImage: roubaixImage1,
    icon: "flag",
    quote: "L'écosystème tech français à votre portée, dans un espace inspirant et collaboratif.",
  },
  {
    id: "luxembourg",
    name: "Luxembourg",
    descriptor: "Soft Landing",
    subtitle: "Le Hub International",
    address: "Rue Camille Joset 1, 6730 Tintigny, Belgique",
    amenities: ["High-Speed Wi-Fi", "Meeting Rooms", "Business Services", "Parking", "Espace événementiel"],
    images: [luxembourgImage1, luxembourgImage2, luxembourgImage3, luxembourgImage4, luxembourgImage5, luxembourgImage6],
    previewImage: luxembourgImage1,
    icon: "flag",
    quote: "Votre point d'entrée en Europe, un espace professionnel pour votre expansion internationale.",
  },
  {
    id: "antwerp",
    name: "Anvers",
    descriptor: "Hub Talents",
    subtitle: "Le Hub des Talents",
    address: "Turnhoutsebaan 92, 2140 Antwerpen, Belgique",
    amenities: ["High-Speed Wi-Fi", "Training Rooms", "Event Space", "Parking", "Coffee Bar"],
    images: [antwerpImage1, antwerpImage2, antwerpImage3, antwerpImage4, antwerpImage5, antwerpImage6],
    previewImage: antwerpImage1,
    icon: "flag",
    quote: "Connectez-vous avec les talents d'Anvers dans un environnement dynamique et créatif.",
  },
];

interface SitesPageClientProps {
}

const getIcon = (iconType: "building" | "flame" | "flag") => {
  switch (iconType) {
    case "building":
      return <Building2 className="w-4 h-4 text-gray-500" />;
    case "flame":
      return <Flame className="w-4 h-4 text-orange-500" />;
    case "flag":
      return <Flag className="w-4 h-4 text-blue-500" />;
    default:
      return <Building2 className="w-4 h-4 text-gray-500" />;
  }
};

export default function SitesPageClient({ }: SitesPageClientProps) {
  const [selectedSite, setSelectedSite] = useState<Site>(sites[0]);

  return (
    <div>
      {/* Location Cards */}
      <div className="w-full mb-16 relative">
        <div 
          className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible gap-4 pl-6 pr-4 md:px-0 justify-start md:justify-center scrollbar-hide md:scrollbar-default snap-x snap-mandatory md:snap-none"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`relative flex-shrink-0 w-[200px] h-[280px] rounded-lg overflow-hidden border-2 transition-all snap-start ${
                selectedSite.id === site.id
                  ? "border-[#811abd] shadow-lg scale-105" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
            <div className="h-[180px] w-full overflow-hidden">
              <img
                src={site.previewImage.src}
                alt={site.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{site.name}</h3>
                {getIcon(site.icon)}
              </div>
              <p className="text-sm text-muted-foreground">({site.descriptor})</p>
            </div>
          </button>
        ))}
        </div>
        {/* Gradient indicator for scrollable content */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:hidden pointer-events-none bg-gradient-to-l from-black/30 to-transparent z-10"></div>
      </div>

      {/* Detailed Location Information */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
        {/* Image Carousel */}
        <div className="relative">
          <Carousel key={selectedSite.id} className="w-full">
            <CarouselContent>
              {selectedSite.images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <div 
                    className="h-[600px] md:h-[700px] rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${img.src}')`,
                    }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Location Details */}
        <div className="flex flex-col justify-center">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <p className="text-sm text-muted-foreground mb-2">Fiche Lieu</p>
              <h2 className="text-3xl font-bold mb-2">{selectedSite.subtitle}</h2>
              
              {/* Features List */}
              <div className="mb-6">
                {selectedSite.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <Check className="w-5 h-5 text-[#811abd]" />
                    <span className="text-base">{amenity}</span>
                  </div>
                ))}
              </div>

              {/* Quote Section */}
              {selectedSite.quote && (
                <div className="bg-gray-100 rounded-lg p-4 relative">
                  <Quote className="w-6 h-6 text-gray-400 absolute top-3 left-3" />
                  <p className="text-sm text-gray-700 pl-8 italic">{selectedSite.quote}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
