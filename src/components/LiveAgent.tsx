"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GoogleGenAI } from "@google/genai";
import { Sparkles, X, Send, Trash } from "lucide-react";

interface LiveAgentProps {
    name?: string;
    email?: string;
    fetchBackendInfo?: (topic: string) => Promise<string | null>;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export default function LiveAgent({ name, email, fetchBackendInfo }: LiveAgentProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            role: "assistant",
            content: `👋 Bonjour ${name ?? ""} ! Je suis **SideBot**, ton assistant SideGeek. Pose-moi ta question, je peux te guider ou te donner les infos du back 🔍`,
        },
    ]);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    const excludedRoutes = ["/login", "/register", "/reset-password"];
    if (excludedRoutes.includes(pathname)) return null;

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const suggestions = useMemo(
        () => [
            "Comment m'inscrire à un événement ?",
            "Voir les formations disponibles",
            "Modifier mon profil",
            "Aide sur les paiements",
        ],
        []
    );

    // 🔍 Navigation automatique
    const detectIntent = useCallback(
        async (message: string): Promise<boolean> => {
            const lower = message.toLowerCase();

            if (/(événements?|events?).*?(inscri|particip|aller|comment)/.test(lower)) {
                router.push("/events");
                setChatMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content:
                            "🗓️ **Inscription à un événement** :\n1️⃣ Page **Événements** → choisis ton événement\n2️⃣ Clique sur **Participer**\n3️⃣ Vérifie ton e-mail ✅",
                    },
                ]);
                return true;
            }

            if (/(formation|cours|school)/.test(lower)) {
                router.push("/trainings");
                setChatMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content:
                            "💡 **Formations disponibles** :\nVa sur la page Formations pour voir les prochaines sessions et t’y inscrire.",
                    },
                ]);
                return true;
            }

            if (/(profil|compte|avatar|info perso)/.test(lower)) {
                router.push("/profile");
                setChatMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content:
                            "👤 **Profil** :\nModifie ton nom, ton e-mail ou tes informations personnelles ici.",
                    },
                ]);
                return true;
            }

            return false;
        },
        [router]
    );

    const handleClearChat = () => {
        if (confirm("Voulez-vous vraiment effacer cette conversation ?")) {
          localStorage.removeItem("sidebot-chat-history");
          setChatMessages([
            {
              role: "assistant",
              content: `👋 Bonjour ${name ?? ""} ! Je suis **SideBot**, ton assistant SideGeek. Pose-moi ta question, je peux te guider ou te donner les infos du back 🔍`,
            },
          ]);
        }
      };

    // 💬 Envoi avec contexte + données du back
    // 💬 Envoi avec contexte + données du back
    const sendChatMessage = async (text?: string) => {
        const message = (text ?? chatInput).trim();
        if (!message || chatLoading) return;

        setChatInput("");
        setChatMessages((prev) => [...prev, { role: "user", content: message }]);
        setChatLoading(true);

        try {
            // 🧩 1️⃣ Récupère d'abord les infos backend
            let backendInfo = "";
            if (fetchBackendInfo) {
                const info = await fetchBackendInfo(message);
                if (info && !/Aucune information/i.test(info)) {
                    backendInfo = `\n\n📊 Données réelles du back :\n${info}`;
                }
            }

            // ⚙️ 2️⃣ Si on a des données backend, on saute detectIntent (pas besoin de router.push)
            if (!backendInfo) {
                const handled = await detectIntent(message);
                if (handled) {
                    setChatLoading(false);
                    return;
                }
            }

            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
            if (!apiKey) {
                setChatMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "⚠️ Impossible de contacter l’IA pour le moment." },
                ]);
                return;
            }

            const ai = new GoogleGenAI({ apiKey });

            const context = chatMessages
                .slice(-6)
                .map((m) => `${m.role === "user" ? "Utilisateur" : "Assistant"}: ${m.content}`)
                .join("\n");

                // 🧠 Garder la dernière donnée backend connue si la nouvelle question est vague
const lastBackendData = chatMessages
.reverse()
.find((m) => m.role === "assistant" && m.content.includes("🎓") || m.content.includes("🗓️"))
?.content;

if (!backendInfo && lastBackendData) {
backendInfo = lastBackendData;
}

            // 🧠 3️⃣ Nouveau prompt beaucoup plus directif
            const persona = `
Tu es **SideBot**, l’assistant IA intégré à la plateforme SideGeek.
Tu aides les utilisateurs comme Elias à comprendre les formations, événements, paiements et profils.

Règles :
1. Si des **données backend** sont présentes, tu dois les **réutiliser dans les prochaines réponses** tant qu’elles sont pertinentes.
2. Si l’utilisateur te dit "Oui", "ok", "merci", etc., tu continues la conversation sur le même sujet sans redemander de précision.
3. Si le backend a donné une liste (formations, événements), reformule-la naturellement : bullet points, dates claires, emoji si utile.
4. Si aucune donnée n’est reçue, guide vers la page correspondante.
5. Toujours répondre en français clair et naturel (3 à 6 phrases max).
6. N’invente jamais de dates ou d’événements si aucune donnée n’est reçue.

📊 Données backend disponibles :
${backendInfo || "Aucune donnée fournie"}

🧠 Historique de la conversation :
${context}

💬 Nouvelle question :
${message}
`;

            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash-lite",
                contents: [{ role: "user", parts: [{ text: persona }] }],
            });

            const reply =
                response.text?.trim() ||
                "🤖 Je suis là pour t’aider, peux-tu préciser ta question ?";
            setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch (err) {
            console.error(err);
            setChatMessages((prev) => [
                ...prev,
                { role: "assistant", content: "❌ Une erreur est survenue. Réessaie plus tard." },
            ]);
        } finally {
            setChatLoading(false);
        }
    };


    return (
        <>
            {/* Bouton flottant */}
            {!open && (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-700 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all"
                >
                    <Sparkles className="w-6 h-6 animate-pulse" />
                </button>
            )}

            {/* Fenêtre de chat */}
            {open && (
                <div className="fixed bottom-20 right-6 z-50 w-[92vw] max-w-md h-[550px] bg-white/80 backdrop-blur-xl border border-purple-100 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-fade-in">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-3 text-white">
                        <span className="font-semibold text-sm">Assistant SideGeek</span>
                        <div className="flex items-center gap-3">
                        <button
                            onClick={handleClearChat}
                            title="Effacer la conversation"
                            className="hover:text-fuchsia-200 transition-colors"
                        >
                            <Trash size={20} />
                        </button>
                            <button onClick={() => setOpen(false)} className="text-white/90 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Corps */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3">
                        {/* Suggestions */}
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendChatMessage(s)}
                                    className="text-xs px-2 py-1 bg-purple-50 border border-purple-200 text-purple-700 rounded-full hover:bg-purple-100 transition"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Messages */}
                        {chatMessages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                                <div
                                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.role === "assistant"
                                        ? "bg-white border text-gray-700 shadow-sm"
                                        : "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
                                        }`}
                                    dangerouslySetInnerHTML={{
                                        __html: m.content
                                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                            .replace(/\n/g, "<br/>"),
                                    }}
                                />
                            </div>
                        ))}

                        {chatLoading && (
                            <div className="text-xs text-gray-500 flex items-center gap-1 animate-pulse">
                                ✍️ L’agent rédige une réponse…
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t bg-white/90 p-3">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                void sendChatMessage();
                            }}
                            className="flex gap-2"
                        >
                            <input
                                className="flex-1 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                                placeholder="Écris ton message..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={!chatInput.trim() || chatLoading}
                                className="bg-gradient-to-r from-purple-700 to-fuchsia-700 text-white px-3 py-2 rounded-md hover:scale-105 transition disabled:opacity-50"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }
      `}</style>
        </>
    );
}
