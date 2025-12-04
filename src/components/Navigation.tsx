"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Briefcase,
  Shield,
  Bell,
  Settings,
  LogOut,
  Zap,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// On retire les props onRoleSwitch et onSignOut, car ils ne sont pas passés depuis la page serveur.
// On gère le changement de rôle et la déconnexion localement (pour la démo).

interface NavigationProps {
  currentRole: "client" | "partner" | "admin";
}

const Navigation = ({
  currentRole,
}: NavigationProps) => {
  const router = useRouter();
  const { getCartCount } = useCart();

  // Pour la démo, on stocke le rôle localement (en vrai, il faudrait le stocker globalement ou dans la session)
  const [role, setRole] = useState<"client" | "partner" | "admin">(currentRole);

  // Simule le changement de rôle (redirection ou reload selon le rôle)
  const handleRoleSwitch = (newRole: "client" | "partner" | "admin") => {

    setRole(newRole);
    // Redirige vers la page dashboard correspondante (ici, on reste sur /dashboard, mais on pourrait faire plus)
    router.push("/dashboard");
    // En vrai, il faudrait aussi mettre à jour le rôle côté serveur/session
  };

  // Simule la déconnexion
  const handleSignOut = () => {
    // Ici, on pourrait faire un appel API de logout, puis rediriger
    router.push("/login");
  };

  const roles = [
    {
      value: "client" as const,
      label: "Client",
      icon: Users,
      color: "bg-brand-orange text-white",
    },
    {
      value: "partner" as const,
      label: "Sponsor",
      icon: Briefcase,
      color: "bg-brand-blue text-white",
    },
    {
      value: "admin" as const,
      label: "Admin",
      icon: Shield,
      color: "bg-brand-green text-white",
    },
  ];

  return (
    <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-md bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">SideGeek</span>
            </div>
          </div>

          {/* Sélecteur de rôle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Rôle actuel :
            </span>
            <div className="flex bg-muted rounded-lg p-1">
              {roles.map((roleItem) => {
                const Icon = roleItem.icon;
                const isActive = roleItem.value === role;
                return (
                  <Button
                    key={roleItem.value}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleRoleSwitch(roleItem.value)}
                    className={`relative ${
                      isActive ? roleItem.color : "hover:bg-muted-foreground/10"
                    } transition-all duration-200`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{roleItem.label}</span>
                    {isActive && (
                      <Badge
                        variant="secondary"
                        className="ml-2 bg-white/20 text-white"
                      >
                        Actif
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {getCartCount() > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                  {getCartCount() > 9 ? '9+' : getCartCount()}
                </Badge>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                3
              </Badge>
            </Button>

            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => router.refresh()}
              aria-label="Rafraîchir"
            >
              <RefreshCw className="w-5 h-5" />
            </Button> */}

            <ThemeToggle />

            <Button variant="ghost" size="icon" aria-label="Paramètres">
              <Settings className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
