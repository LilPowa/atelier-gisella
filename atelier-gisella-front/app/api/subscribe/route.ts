import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    // Remplace 2 par l'ID de ta liste Brevo si c'est différent
    const LIST_ID = 3; 

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email: email,
        listIds: [LIST_ID],
        updateEnabled: true, // Si l'email existe déjà, on le met à jour
      }),
    });

    if (!res.ok) {
        // On récupère l'erreur pour comprendre (ex: email déjà existant)
        const errorData = await res.json();
        return NextResponse.json({ error: errorData.message }, { status: res.status });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}