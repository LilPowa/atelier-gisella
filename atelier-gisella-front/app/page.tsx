"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, ShoppingBag } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;

      setLoading(true);

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setRegistered(true);
          setEmail("");
        } else {
          alert("Une erreur est survenue. Vérifiez votre email.");
        }
      } catch (error) {
        console.error(error);
        alert("Erreur de connexion.");
      } finally {
        setLoading(false);
      }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      
      {/* Container Principal */}
      <div className="max-w-md w-full space-y-8 text-center">
        
        {/* Logo / Icône (Temporaire en attendant le vrai logo) */}
        <div className="flex justify-center animate-bounce">
          <div className="bg-slate-900 p-4 rounded-full">
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Titre et Accroche */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            L'Atelier de Gisella
          </h1>
          <p className="text-lg text-slate-600">
            Bougies artisanales
          </p>
        </div>

        {/* Carte d'inscription */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle>Bientôt disponible</CardTitle>
            <CardDescription>
              Notre boutique est en cours de création. Inscrivez-vous pour être informé de l'ouverture !
            </CardDescription>
          </CardHeader>
          <CardContent>
            {registered ? (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium animate-in fade-in zoom-in">
                Merci ! Votre inscription est bien prise en compte. À très vite !
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-left">
                  <Input 
                    type="email" 
                    placeholder="votre-email@exemple.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscription...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Me prévenir
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} L'Atelier de Gisella. Tous droits réservés.
        </p>
      </div>
    </main>
  );
}