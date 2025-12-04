"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import MapboxMap from "./MapboxMap";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import site images - Molenbeek
import molenbeekImage1 from "../../public/assets/images/sites/Molenbeek/Molengeek.webp";
import molenbeekImage2 from "../../public/assets/images/sites/Molenbeek/Molengeek_1.webp";
import molenbeekImage3 from "../../public/assets/images/sites/Molenbeek/Molengeek_image.webp";
import molenbeekImage4 from "../../public/assets/images/sites/Molenbeek/Molengeek_image_1.webp";
import molenbeekImage5 from "../../public/assets/images/sites/Molenbeek/Molengeek6.webp";
import molenbeekImage6 from "../../public/assets/images/sites/Molenbeek/Coding_11.webp";

// Import site images - Laeken
import laekenImage1 from "../../public/assets/images/sites/Laeken_site/img3.webp";
import laekenImage2 from "../../public/assets/images/sites/Laeken_site/img2.webp";
import laekenImage3 from "../../public/assets/images/sites/Laeken_site/img1.webp";
import laekenImage4 from "../../public/assets/images/sites/Laeken_site/img4.webp";
import laekenImage5 from "../../public/assets/images/sites/Laeken_site/img5.webp";
import laekenImage6 from "../../public/assets/images/sites/Laeken_site/IMG_5163_converted.webp";
import laekenImage7 from "../../public/assets/images/sites/Laeken_site/IMG_7612_converted.webp";

// Import site images - Frame
import frameImage1 from "../../public/assets/images/sites/Frame/SAU-MSI-Frame-20241220-1_converted.webp";
import frameImage2 from "../../public/assets/images/sites/Frame/SAU-MSI-Frame-20250403-34_converted_converted.webp";
import frameImage3 from "../../public/assets/images/sites/Frame/Photos_MG.webp";
import frameImage4 from "../../public/assets/images/sites/Frame/MolenGeek_Team_Mashallah.webp";
import frameImage5 from "../../public/assets/images/sites/Frame/Baukunst_Bruther.webp";
import frameImage6 from "../../public/assets/images/sites/Frame/frame_image6.webp";

// Import site images - Antwerp
import antwerpImage1 from "../../public/assets/images/sites/Anvers/MolengeekAnversDéc2024.webp";
import antwerpImage2 from "../../public/assets/images/sites/Anvers/anvers1.webp";
import antwerpImage3 from "../../public/assets/images/sites/Anvers/MolengeekAnversDéc.jpg";
import antwerpImage4 from "../../public/assets/images/sites/Anvers/CoworkingBorgerhub.jpg";
import antwerpImage5 from "../../public/assets/images/sites/Anvers/DSC07535.jpg";
import antwerpImage6 from "../../public/assets/images/sites/Anvers/DSC07539.jpg";

// Import site images - Luxembourg
import luxembourgImage1 from "../../public/assets/images/sites/Luxembourg/20250709_140235_converted_converted.webp";
import luxembourgImage2 from "../../public/assets/images/sites/Luxembourg/MolengeekParc.webp";
import luxembourgImage3 from "../../public/assets/images/sites/Luxembourg/Jour3PXL.webp";
import luxembourgImage4 from "../../public/assets/images/sites/Luxembourg/Jour2PXLconverted.webp";
import luxembourgImage5 from "../../public/assets/images/sites/Luxembourg/Jour2PXL.webp";
import luxembourgImage6 from "../../public/assets/images/sites/Luxembourg/20250709_135938_converted_converted.webp";

interface Site {
  id: string;
  name: string;
  address: string;
  city: string;
  image: any;
  images: any[];
  features: string[];
  coordinates: [number, number];
  googleMapsUrl: string;
}

const sites: Site[] = [
  {
    id: "molenbeek",
    name: "MolenGeek",
    address: "Pl. de la Minoterie 10",
    city: "Molenbeek-Saint-Jean",
    image: molenbeekImage1,
    images: [
      molenbeekImage1,
      molenbeekImage2,
      molenbeekImage3,
      molenbeekImage4,
      molenbeekImage5,
      molenbeekImage6,
    ],
    features: [
      "Abonnement coworking",
      "Poste de travail attribué",
      "Bureau privé",
      "Étage complet",
      "Bar à expresso",
      "Espace événementiel",
      "Espace extérieur",
      "Parking",
    ],
    coordinates: [4.341971018506868, 50.855473925648305],
    googleMapsUrl: "https://maps.app.goo.gl/u8Df3aH4eMjQ37Yk7",
  },
  {
    id: "laeken",
    name: "MolenGeek Laeken",
    address: "Laeken",
    city: "Brussels",
    image: laekenImage1,
    images: [
      laekenImage1,
      laekenImage2,
      laekenImage3,
      laekenImage4,
      laekenImage5,
      laekenImage6,
      laekenImage7,
    ],
    features: [
      "Abonnement coworking",
      "Poste de travail attribué",
      "Bureau privé",
      "Bar à expresso",
      "Espace événementiel",
      "Parking",
    ],
    coordinates: [4.346337238089245, 50.87404715926756],
    googleMapsUrl: "https://maps.app.goo.gl/u8Df3aH4eMjQ37Yk7",
  },
  {
    id: "frame",
    name: "Molengeek Frame",
    address: "Blvd Auguste Reyers 84",
    city: "Schaerbeek",
    image: frameImage1,
    images: [
      frameImage1,
      frameImage2,
      frameImage3,
      frameImage4,
      frameImage5,
      frameImage6,
    ],
    features: [
      "Abonnement coworking",
      "Poste de travail attribué",
      "Bureau privé",
      "Étage complet",
      "Bar à expresso",
      "Espace événementiel",
      "Parking",
    ],
    coordinates: [4.401979293910184, 50.850912584372736],
    googleMapsUrl: "https://maps.app.goo.gl/4tECzArhMCPSk7dj8",
  },
  {
    id: "antwerp",
    name: "MolenGeek Antwerp",
    address: "Turnhoutsebaan 92",
    city: "Antwerpen",
    image: antwerpImage1,
    images: [
      antwerpImage1,
      antwerpImage2,
      antwerpImage3,
      antwerpImage4,
      antwerpImage5,
      antwerpImage6,
    ],
    features: [
      "Abonnement coworking",
      "Poste de travail attribué",
      "Bureau privé",
      "Bar à expresso",
      "Espace événementiel",
      "Parking",
    ],
    coordinates: [4.432586487820369, 51.21558826716],
    googleMapsUrl: "https://maps.app.goo.gl/dAavcqmKWtXKYMgr9",
  },
  {
    id: "luxembourg",
    name: "MolenGeek Luxembourg",
    address: "Rue Camille Joset 1",
    city: "Tintigny",
    image: luxembourgImage1,
    images: [
      luxembourgImage1,
      luxembourgImage2,
      luxembourgImage3,
      luxembourgImage4,
      luxembourgImage5,
      luxembourgImage6,
    ],
    features: [
      "Abonnement coworking",
      "Poste de travail attribué",
      "Bureau privé",
      "Bar à expresso",
      "Espace événementiel",
      "Parking",
    ],
    coordinates: [5.485995971164187, 49.71709253208035],
    googleMapsUrl: "https://maps.app.goo.gl/p1pXLiVN4jWiox6k7",
  },
];

export default function SitesMapSection() {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [carouselOpen, setCarouselOpen] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSiteClick = (siteId: string) => {
    setSelectedSite(siteId);
  };

  const handleImageClick = (e: React.MouseEvent, siteId: string) => {
    e.stopPropagation();
    setCarouselOpen(siteId);
  };

  const closeCarousel = () => {
    setCarouselOpen(null);
  };

  // Scroll to selected card when site is selected from map
  useEffect(() => {
    if (selectedSite) {
      const cardElement = cardRefs.current.get(selectedSite);
      if (cardElement && scrollContainerRef.current) {
        // Use setTimeout to ensure the DOM has updated
        setTimeout(() => {
          cardElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }
    }
  }, [selectedSite]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
      {/* Left Column - Site Listings */}
      <div ref={scrollContainerRef} className="bg-white rounded-lg shadow-lg overflow-y-auto">
        <div className="divide-y">
          {sites.map((site) => (
            <div
              key={site.id}
              ref={(el) => {
                if (el) {
                  cardRefs.current.set(site.id, el);
                } else {
                  cardRefs.current.delete(site.id);
                }
              }}
              className={`p-6 cursor-pointer transition-colors ${
                selectedSite === site.id
                  ? "bg-purple-50 border-l-4 border-[#811abd]"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleSiteClick(site.id)}
            >
              <div className="flex flex-col">
                <div
                  className="w-full h-64 relative rounded-lg overflow-hidden mb-4 cursor-pointer group"
                  onClick={(e) => handleImageClick(e, site.id)}
                >
                  <Image
                    src={site.image}
                    alt={site.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                      Voir toutes les photos
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <div className="text-lg font-semibold text-[#0EA5E9] mb-1">
                      {site.name}
                    </div>
                    <div className="text-sm text-gray-600">{site.address}, {site.city}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 mb-3">
                    {site.features.slice(0, 5).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <a
                    href={site.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-sm text-[#811abd] hover:text-[#9d3dd1] font-medium transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Voir sur Google Maps
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Map */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-full">
          <MapboxMap
            selectedLocationId={selectedSite}
            onLocationClick={(location) => {
              const site = sites.find((s) => s.id === location.id);
              if (site) {
                setSelectedSite(site.id);
              }
            }}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Image Carousel Modal */}
      {carouselOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeCarousel}
        >
          <div
            className="relative w-full max-w-6xl h-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCarousel}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {(() => {
              const site = sites.find((s) => s.id === carouselOpen);
              if (!site) return null;
              return (
                <Carousel className="w-full h-full">
                  <CarouselContent className="h-full -ml-0">
                    {site.images.map((img, idx) => (
                      <CarouselItem key={idx} className="pl-0 basis-full h-full">
                        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center p-4">
                          <img
                            src={img.src || img}
                            alt={`${site.name} - Image ${idx + 1}`}
                            className="max-w-full max-h-full w-auto h-auto object-contain"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-black/60 hover:bg-black/80 text-white border-white/30 w-12 h-12 shadow-lg backdrop-blur-sm" />
                  <CarouselNext className="right-4 bg-black/60 hover:bg-black/80 text-white border-white/30 w-12 h-12 shadow-lg backdrop-blur-sm" />
                </Carousel>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

