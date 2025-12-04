"use client";

import { useEffect, useRef, useState } from "react";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaGFtemFvZmsiLCJhIjoiY2x3MnN0cmRrMHJoYTJpb2N2OGQ2eTNnOSJ9.aLy9CQtGLr0A3rlH3x2TRg";

// Import logo
import logoImage from "../../public/assets/images/molengeek_shortlogo.png";

interface Site {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
}

interface SitesMapboxMapProps {
  sites: Site[];
  selectedSiteId?: string;
  onSiteClick?: (siteId: string) => void;
  className?: string;
}

export default function SitesMapboxMap({ 
  sites, 
  selectedSiteId, 
  onSiteClick, 
  className = "" 
}: SitesMapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Dynamically import mapbox-gl only on client
    import("mapbox-gl").then((mapboxgl) => {
      // Import CSS dynamically
      import("mapbox-gl/dist/mapbox-gl.css");
      
      mapboxgl.default.accessToken = MAPBOX_TOKEN;

      // Initialize map centered on Belgium
      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: "mapbox://styles/hamzaofk/cminh90l9014601s691bk3pbl",
        center: [4.5, 50.8], // Center on Belgium
        zoom: 7,
        attributionControl: false,
      });

      map.current.on("load", () => {
        setIsLoaded(true);

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        // Add markers for each site
        sites.forEach((site) => {
          const isSelected = selectedSiteId === site.id;
          
          // Create custom marker element with logo
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.width = isSelected ? "56px" : "48px";
          el.style.height = isSelected ? "56px" : "48px";
          el.style.borderRadius = "50%";
          el.style.backgroundColor = "white";
          el.style.border = `3px solid ${isSelected ? "#811abd" : "#0EA5E9"}`;
          el.style.cursor = "pointer";
          el.style.boxShadow = isSelected ? "0 0 15px rgba(129, 26, 189, 0.8), 0 0 30px rgba(129, 26, 189, 0.4), 0 4px 12px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.3)";
          el.style.transition = "all 0.3s ease";
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.overflow = "hidden";
          el.title = site.name;

          // Create img element with logo
          const img = document.createElement("img");
          img.src = logoImage.src;
          img.alt = "Molengeek";
          img.style.width = "80%";
          img.style.height = "80%";
          img.style.objectFit = "contain";
          el.appendChild(img);

          // Create marker
          const marker = new mapboxgl.default.Marker(el)
            .setLngLat(site.coordinates)
            .setPopup(
              new mapboxgl.default.Popup({ offset: 25, closeButton: false })
                .setHTML(`<div style="padding: 8px;"><strong style="color: #0EA5E9; font-size: 16px;">${site.name}</strong><br/><span style="color: #666; font-size: 14px;">${site.address}</span></div>`)
            )
            .addTo(map.current!);

          // Add click handler
          el.addEventListener("click", () => {
            if (onSiteClick) {
              onSiteClick(site.id);
            }
            // Center map on clicked location
            map.current!.flyTo({
              center: site.coordinates,
              zoom: 11,
              duration: 1000,
            });
            marker.togglePopup();
          });

          markersRef.current.push(marker);
        });
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.default.NavigationControl(), "top-right");

    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [sites, selectedSiteId, onSiteClick]);

  // Update markers when selectedSiteId changes
  useEffect(() => {
    if (!map.current || !isLoaded || markersRef.current.length === 0) return;

    markersRef.current.forEach((marker, index) => {
      const site = sites[index];
      if (!site) return;

      const isSelected = selectedSiteId === site.id;
      const el = marker.getElement();
      
      if (el) {
        el.style.width = isSelected ? "56px" : "48px";
        el.style.height = isSelected ? "56px" : "48px";
        el.style.border = `3px solid ${isSelected ? "#811abd" : "#0EA5E9"}`;
        el.style.boxShadow = isSelected ? "0 0 15px rgba(129, 26, 189, 0.8), 0 0 30px rgba(129, 26, 189, 0.4), 0 4px 12px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.3)";
      }
    });
  }, [selectedSiteId, sites, isLoaded]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#811abd] mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}


