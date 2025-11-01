'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link'; // Importado para corrigir o erro do <a>
import { createClient } from '@/lib/supabase/client';
import { EventRegistrationForm } from "@/components/EventRegistrationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { EventCountdown } from '@/components/EventCountdown';

type EventDetails = {
  id: string;
  name: string;
  event_date: string;
  description: string | null;
  location: string | null;
};

type Region = {
  id: string;
  name: string;
};

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;
  const formRef = useRef<HTMLDivElement>(null);

  const [event, setEvent] = useState<EventDetails | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const supabase = createClient();
    async function fetchData() {
      setLoading(true);
      const [eventResponse, regionsResponse] = await Promise.all([
        supabase.from('Events').select('*').eq('slug', slug).single(),
        // Erro de sintaxe corrigido: 'id, name' deve ser uma string única
        supabase.from('AdministrativeRegions').select('id, name').order('name')
      ]);
      if (eventResponse.error || !eventResponse.data) {
        setError("Evento não encontrado ou indisponível.");
      } else {
        setEvent(eventResponse.data);
      }
      if (regionsResponse.data) setRegions(regionsResponse.data);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (loading) {
    return (
      // Corrigido: Fundo neutro e spinner laranja
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="w-16 h-16 border-4 border-stone-200 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      // Corrigido: Fundo neutro e cores de botão
      <div className="min-h-screen flex items-center justify-center bg-stone-100 text-center p-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">Evento Não Encontrado</h2>
          <p className="text-neutral-600 mt-2">O link pode estar quebrado ou o evento foi removido.</p>
          {/* Corrigido: <a> tag substituída por <Link> */}
          <Link href="/" className="mt-6 inline-block px-6 py-2 bg-neutral-800 text-white rounded-lg font-medium hover:bg-neutral-700 transition-colors">
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }
  
  const date = new Date(event.event_date);
  const formattedDateRaw = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(date);
  // Corrigido: Capitalização da primeira letra
  const formattedDate = formattedDateRaw.charAt(0).toUpperCase() + formattedDateRaw.slice(1);
  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo'
  }).format(date);

  // Corrigido: Paleta de cores laranja/neutra
  const nameHash = event.name.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0);
  const gradients = [
    'from-orange-600 via-orange-500 to-amber-400',
    'from-neutral-800 via-stone-700 to-neutral-800',
    'from-amber-500 via-orange-500 to-red-500',
    'from-orange-500 via-amber-400 to-orange-500',
    'from-neutral-900 via-neutral-800 to-stone-800'
  ];
  const selectedGradient = gradients[Math.abs(nameHash) % gradients.length];

  return (
    // Corrigido: Fundo neutro
    <div className="min-h-screen bg-stone-100">
      {/* --- HEADER --- */}
      <header className="relative h-[60vh] min-h-[450px] flex flex-col justify-center items-center text-center text-white p-4">
        <div className={`absolute inset-0 bg-gradient-to-r ${selectedGradient} animate-gradient-x`}>
          <Image
            src="/traffic.jpg"
            alt="Imagem de fundo do evento"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative  px-8 md:px-16 z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            {event.name}
          </h1>

          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto whitespace-pre-wrap">
            {event.description || "Junte-se a nós em um encontro especial para discutir o futuro da nossa cidade."}
          </p>
   
        </div>
      </header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="relative z-10 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-12 max-w-6xl mx-auto">

            {/* --- COLUNA ESQUERDA: Informações consolidadas --- */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* ================================================ */}
            {/* ===== ADICIONE ESTE NOVO CARD PARA O CONVITE ===== */}
            {/* ================================================ */}
            <Card className="shadow-xl border-0 rounded-2xl bg-white p-2">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-xl font-bold text-neutral-800 mb-4">Convite Oficial</h3>
                <div className="rounded-lg overflow-hidden border border-stone-200">
                  <Image
                    src="/image.png" // Puxando da pasta /public/image.png
                    alt={`Convite para o evento ${event.name}`}
                    width={1080}  // Use a largura real da sua imagem
                    height={1920} // Use a altura real da sua imagem
                    className="w-full h-auto" // Garante a responsividade
                  />
                </div>
              </CardContent>
            </Card>
            {/* ================================================ */}
            {/* ============= FIM DO NOVO CARD =============== */}
            {/* ================================================ */}

            {/* Este é o card que já existia (countdown e detalhes) */}
            <Card className="shadow-xl border-0 rounded-2xl bg-white p-2">
              <CardContent className="p-6 space-y-6">
                {/* --- MUDANÇA DE COR: Countdown --- */}
            
                  <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-xl p-6 text-center">
                    <h3 className="font-bold mb-4 uppercase tracking-wider">Faltam</h3>
                    <EventCountdown eventDate={event.event_date} />
                  </div>

                  <div className="space-y-5 pt-4">
                    {/* Corrigido: Cores dos Ícones */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-100 rounded-xl"><Calendar className="h-6 w-6 text-orange-700" /></div>
                      <div>
                        <h3 className="font-bold text-neutral-800">Data e Horário</h3>
                        <p className="text-neutral-600">{formattedDate}</p>
                        <p className="text-neutral-600 font-medium">{formattedTime} (Horário de Brasília)</p>
                      </div>
                    </div>
                    {event.location && (
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-100 rounded-xl"><MapPin className="h-6 w-6 text-amber-700" /></div>
                        <div>
                          <h3 className="font-bold text-neutral-800">Localização</h3>
                          <p className="text-neutral-600">{event.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* --- COLUNA DIREITA: Formulário --- */}
            {/* Corrigido: Layout com -mt-48 apenas em telas grandes (lg) */}
            <div className="lg:col-span-2" ref={formRef}>
              <Card className="shadow-2xl border-0 rounded-2xl sticky top-6 lg:-mt-38">
                {/* Corrigido: Cor do header do formulário */}
                <CardHeader className="bg-neutral-800 text-white text-center rounded-t-2xl">
                  <CardTitle className="text-2xl font-bold">Participe</CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-white rounded-b-2xl">
                  <EventRegistrationForm eventId={event.id} regions={regions} />
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}