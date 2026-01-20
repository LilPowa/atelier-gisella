import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // 1. Vérification de la réception de l'email
    console.log("--- TENTATIVE D'INSCRIPTION ---");
    console.log("Email reçu :", email);

    if (!email) {
      console.log("Erreur : Pas d'email fourni");
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    // 2. Vérification de la clé API
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) {
      console.error("ERREUR CRITIQUE : La variable BREVO_API_KEY est vide ou introuvable !");
      return NextResponse.json({ error: 'Config serveur manquante' }, { status: 500 });
    }
    
    // On affiche juste les 4 premiers caractères pour vérifier sans tout dévoiler
    console.log("Clé API chargée :", BREVO_API_KEY.substring(0, 5) + "...");

    // 3. Envoi à Brevo
    const LIST_ID = 3; // Vérifie bien ce chiffre sur Brevo !

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [LIST_ID],
        updateEnabled: true,
      }),
    });

    const data = await res.json();

    // 4. Résultat de Brevo
    if (!res.ok) {
      console.error("ERREUR BREVO :", JSON.stringify(data, null, 2));
      return NextResponse.json({ error: data.message || 'Erreur Brevo' }, { status: res.status });
    }

    console.log("SUCCÈS : Contact ajouté !");
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("ERREUR CODE :", error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}