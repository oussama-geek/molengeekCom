"use client";

import { useEffect, useRef, useState } from "react";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaGFtemFvZmsiLCJhIjoiY2x3MnN0cmRrMHJoYTJpb2N2OGQ2eTNnOSJ9.aLy9CQtGLr0A3rlH3x2TRg";

// Import logo
import logoImage from "../../public/assets/images/molengeek_shortlogo.png";

interface Location {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  address: string;
  status?: string;
  googleMapsUrl?: string;
}

const locations: Location[] = [
  {
    id: "molenbeek",
    name: "MolenGeek",
    coordinates: [4.341971018506868, 50.855473925648305],
    address: "Pl. de la Minoterie 10, 1080 Molenbeek-Saint-Jean, Belgique",
    status: "Confirmed Main Campus",
    googleMapsUrl: "https://maps.app.goo.gl/u8Df3aH4eMjQ37Yk7",
  },
  {
    id: "laeken",
    name: "MolenGeek Laeken",
    coordinates: [4.346337238089245, 50.87404715926756],
    address: "Specific address in Laeken, Brussels, Belgium (AI Center). Coords are approximate city center.",
    status: "AI Centre (Opened Sept 2024)",
    googleMapsUrl: "https://maps.app.goo.gl/u8Df3aH4eMjQ37Yk7",
  },
  {
    id: "frame",
    name: "Molengeek Frame",
    coordinates: [4.401979293910184, 50.850912584372736],
    address: "Blvd Auguste Reyers 84, 1030 Schaerbeek, Belgique",
    status: "Partnership/Future Hub",
    googleMapsUrl: "https://maps.app.goo.gl/4tECzArhMCPSk7dj8",
  },
  {
    id: "antwerp",
    name: "MolenGeek Antwerp",
    coordinates: [4.432586487820369, 51.21558826716 ],
    address: "Turnhoutsebaan 92, 2140 Antwerpen, Belgique",
    status: "Confirmed Campus",
    googleMapsUrl: "https://maps.app.goo.gl/dAavcqmKWtXKYMgr9",
  },
  // {
  //   id: "charleroi",
  //   name: "MolenGeek Charleroi",
  //   coordinates: [4.4446, 50.4074],
  //   address: "Charleroi, Belgium (Known as 'CharleWood' model. Coords are approximate city center.)",
  //   status: "Confirmed Campus ('CharleWood')",
  // },
  // {
  //   id: "roubaix",
  //   name: "MolenGeek Roubaix",
  //   coordinates: [3.1660, 50.6975],
  //   address: "78, Boulevard Leclerc, 59100 Roubaix, France",
  //   status: "Confirmed International Campus",
  // },
  {
    id: "al-hoceima",
    name: "MolenGeek Al Hoceima",
    coordinates: [-3.932751760205618, 35.24528004798468],
    address: "Al Hoceima, Morocco",
    status: "Status Unconfirmed/Past Project",
    googleMapsUrl: "https://maps.app.goo.gl/CCWVpgBXcD2v9eLo7",
  },
  {
    id: "luxembourg",
    name: "MolenGeek Luxembourg",
    coordinates: [5.485995971164187, 49.71709253208035 ],
    address: "Rue Camille Joset 1, 6730 Tintigny, Belgique",
    status: "Status Unconfirmed/Past Project",
    googleMapsUrl: "https://maps.app.goo.gl/p1pXLiVN4jWiox6k7",
  },
];

interface MapboxMapProps {
  onLocationClick?: (location: Location) => void;
  className?: string;
  selectedLocationId?: string | null;
}

export default function MapboxMap({ onLocationClick, className = "", selectedLocationId = null }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const onLocationClickRef = useRef(onLocationClick);
  const [isLoaded, setIsLoaded] = useState(false);

  // Update ref when callback changes
  useEffect(() => {
    onLocationClickRef.current = onLocationClick;
  }, [onLocationClick]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Dynamically import mapbox-gl only on client
    import("mapbox-gl").then((mapboxgl) => {
      // Import CSS dynamically
      import("mapbox-gl/dist/mapbox-gl.css");
      
      mapboxgl.default.accessToken = MAPBOX_TOKEN;

      // Initialize map centered on Belgium and France region
      // Center on the border region between Belgium and France
      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: "mapbox://styles/hamzaofk/cminh90l9014601s691bk3pbl",
        center: [4.0, 50.5], // Center on Belgium/France border region
        zoom: 7, // Zoom level to show Belgium and northern France clearly
        attributionControl: false,
      });

      map.current.on("load", () => {
        setIsLoaded(true);

        // Create a single line route starting from Molenbeek, passing through all locations, ending at Al Hoceima
        // Order: Molenbeek -> Laeken -> FRAME -> Antwerp -> Charleroi -> Roubaix -> Luxembourg -> Al Hoceima
        const routeOrder = [
          "molenbeek",    // Start
          "laeken",
          "frame",
          "antwerp",
          "charleroi",
          "roubaix",
          "luxembourg",
          "al-hoceima",   // End
        ];

        // Get coordinates in the route order
        const routeCoordinates: [number, number][] = routeOrder.map(id => {
          const location = locations.find(loc => loc.id === id);
          return location ? location.coordinates : null;
        }).filter((coord): coord is [number, number] => coord !== null);

        // Add single line source and layer
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: routeCoordinates,
            },
          },
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#811abd",
            "line-width": 2,
            "line-opacity": 0.7,
          },
        });

        // Add markers for each location
        locations.forEach((location) => {
          // Create custom marker element with logo - smaller size
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.width = "20px";
          el.style.height = "20px";
          el.style.borderRadius = "50%";
          el.style.backgroundColor = "white";
          el.style.border = "1.5px solid #811abd";
          el.style.cursor = "pointer";
          el.style.boxShadow = "0 0 8px rgba(129, 26, 189, 0.8), 0 0 15px rgba(129, 26, 189, 0.4), 0 1px 4px rgba(0,0,0,0.3)";
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.overflow = "hidden";
          el.title = location.name;

          // Create img element with logo
          const img = document.createElement("img");
          img.src = logoImage.src;
          img.alt = "Molengeek";
          img.style.width = "70%";
          img.style.height = "70%";
          img.style.objectFit = "contain";
          el.appendChild(img);

          // Create marker popup HTML without status, with Google Maps link
          let popupHTML = `<div style="padding: 8px; min-width: 200px;">
            <strong style="display: block; margin-bottom: 6px; font-size: 1em; color: #0EA5E9;">${location.name}</strong>
            <span style="display: block; margin-bottom: 8px; font-size: 0.85em; color: #666;">${location.address}</span>`;
          
          if (location.googleMapsUrl) {
            popupHTML += `<a href="${location.googleMapsUrl}" target="_blank" rel="noopener noreferrer" 
              style="display: inline-block; margin-top: 8px; padding: 6px 12px; background-color: #811abd; color: white; text-decoration: none; border-radius: 4px; font-size: 0.85em; font-weight: 500; transition: background-color 0.2s;"
              onmouseover="this.style.backgroundColor='#9d3dd1'"
              onmouseout="this.style.backgroundColor='#811abd'">
              📍 View on Google Maps
            </a>`;
          }
          
          popupHTML += `</div>`;
          
          const marker = new mapboxgl.default.Marker(el)
            .setLngLat(location.coordinates)
            .setPopup(
              new mapboxgl.default.Popup({ offset: 25, closeButton: false })
                .setHTML(popupHTML)
            )
            .addTo(map.current!);

          // Add click handler
          el.addEventListener("click", () => {
            if (onLocationClickRef.current) {
              onLocationClickRef.current(location);
            }
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
  }, []); // Empty dependency array - map only initializes once

  // Zoom to selected location
  useEffect(() => {
    if (!isLoaded || !map.current || !selectedLocationId) {
      // Reset zoom when no location is selected
      if (!selectedLocationId && isLoaded && map.current) {
        map.current.flyTo({
          center: [4.0, 50.5],
          zoom: 7,
          duration: 1000,
        });
      }
      return;
    }

    const selectedLocation = locations.find(loc => loc.id === selectedLocationId);
    if (selectedLocation && map.current) {
      // Use setTimeout to ensure map is ready
      setTimeout(() => {
        if (map.current) {
          map.current.flyTo({
            center: selectedLocation.coordinates,
            zoom: 16, // High zoom level to show only the selected marker
            duration: 1500, // Smooth animation
            essential: true,
          });
        }
      }, 100);
    }
  }, [selectedLocationId, isLoaded]);

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

