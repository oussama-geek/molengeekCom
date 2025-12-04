"use client";

import LiveAgent from "@/components/LiveAgent";

export default function LiveAgentWrapper({ name, email }: { name?: string; email?: string }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

  // 🔹 Fonction universelle pour interroger le backend selon le sujet
  const fetchBackendInfo = async (topic: string): Promise<string | null> => {
    const lower = topic.toLowerCase();

    try {
      // 🎓 Cas : Formations / Coding School
      if (/(formation|cours|training|coding\s*school|développeur|react|laravel)/i.test(lower)) {
        const res = await fetch(`${API_BASE}/api/trainings/next`, { cache: "no-store" });
        if (!res.ok) return "Aucune formation trouvée.";
        const data = await res.json();

        if (!data || !data.length) return "Aucune formation prévue pour le moment.";

        return (
          "🎓 Formations à venir :\n" +
          data
            .map(
              (f: any, i: number) =>
                `${i + 1}. ${f.title} — Début le ${new Date(f.start_date).toLocaleDateString("fr-BE")}`
            )
            .join("\n")
        );
      }

      // 🗓️ Cas : Événements / Hackathons / Workshops
      if (/(événement|events?|hackathon|workshop|week)/i.test(lower)) {
        const res = await fetch(`${API_BASE}/api/events/next`, { cache: "no-store" });
        if (!res.ok) return "Aucun événement trouvé.";
        const data = await res.json();

        if (!data || !data.length) return "Aucun événement prévu actuellement.";

        return (
          "🗓️ Prochains événements :\n" +
          data
            .map(
              (e: any, i: number) =>
                `${i + 1}. ${e.name} — le ${new Date(e.date).toLocaleDateString("fr-BE")}`
            )
            .join("\n")
        );
      }

      // 💰 Cas : Paiements / Abonnements
      if (/(paiement|facture|abonnement|cotisation)/i.test(lower)) {
        const res = await fetch(`${API_BASE}/api/payments/status`, { cache: "no-store" });
        if (!res.ok) return "Impossible de récupérer les paiements.";
        const data = await res.json();

        return `💰 Paiements récents : ${data.total} transactions, dont ${data.pending} en attente.`;
      }

      return null;
    } catch (err) {
      console.error("Erreur lors de la récupération du backend :", err);
      return "⚠️ Impossible de récupérer les données pour le moment.";
    }
  };

  // 🔹 On passe la fonction à LiveAgent
  return <LiveAgent name={name} email={email} fetchBackendInfo={fetchBackendInfo} />;
}
