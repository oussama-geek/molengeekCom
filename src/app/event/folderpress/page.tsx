"use client";

import PresentationNavbar from "@/components/PresentationNavbar";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export default function PressFolderPage() {
  const pdfUrl =
    "/assets/documents/Dossier_de_Presse_MolenGeek_face_a_lavenir.pdf";
  const pdfFileName = "Dossier_de_Presse_MolenGeek_face_a_lavenir.pdf";

  return (
    <div className="min-h-screen bg-background">
      <PresentationNavbar />
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <iframe
          src="/assets/documents/Dossier_de_Presse_MolenGeek_face_a_lavenir.pdf"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}
