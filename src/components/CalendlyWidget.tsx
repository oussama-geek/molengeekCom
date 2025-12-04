"use client";

import { useEffect } from "react";

interface CalendlyWidgetProps {
  url: string;
  className?: string;
}

export default function CalendlyWidget({ url, className = "" }: CalendlyWidgetProps) {
  useEffect(() => {
    // Load Calendly CSS
    if (!document.querySelector('link[href*="calendly"]')) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // Load Calendly script dynamically
    if (!document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div 
      className={`calendly-inline-widget ${className}`}
      data-url={url}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}

