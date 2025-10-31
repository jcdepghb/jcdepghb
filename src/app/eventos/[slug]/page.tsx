'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center p-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Evento Não Encontrado</h2>
          <p className="text-gray-600 mt-2">O link pode estar quebrado ou o evento foi removido.</p>
          <a href="/" className="mt-6 inline-block px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
            Voltar ao Início
          </a>
        </div>
      </div>
    );
  }

  
  const date = new Date(event.event_date);
  const formattedDateRaw = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(date);
  const formattedDate = formattedDateRaw.charAt(0).toUpperCase() + formattedDateRaw.slice(1);
  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo'
  }).format(date);

  const nameHash = event.name.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0);
  const gradients = [
    'from-purple-500 via-pink-500 to-red-500', 'from-blue-500 via-cyan-500 to-teal-500',
    'from-green-500 via-emerald-500 to-lime-500', 'from-orange-500 via-amber-500 to-yellow-500',
    'from-indigo-500 via-purple-500 to-pink-500'
  ];
  const selectedGradient = gradients[Math.abs(nameHash) % gradients.length];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- HEADER --- */}
      <header className="relative h-[60vh] min-h-[450px] flex flex-col justify-center items-center text-center text-white p-4">
        <div className={`absolute inset-0 bg-gradient-to-r ${selectedGradient} animate-gradient-x`}>
          <Image
            src="/train.jpg"
            alt="Imagem de fundo do evento"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative px-8 md:px-16 z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-lg">
            {event.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
            {event.description || "Junte-se a nós em um encontro especial para discutir o futuro da nossa cidade."}
          </p>
    
        </div>
      </header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="relative -mt-16 z-10">
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            
            {/* --- COLUNA ESQUERDA: Informações consolidadas --- */}
            <div className="lg:col-span-3">
              <Card className="shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm p-2">
                <CardContent className="p-6 space-y-6">
                  {/* Countdown no topo */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 text-center">
                    <h3 className="font-bold mb-4">Countdown</h3>
                    <EventCountdown targetDate={event.event_date} />
                  </div>

                  {/* Detalhes do Evento */}
                  <div className="space-y-5 pt-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl"><Calendar className="h-6 w-6 text-blue-600" /></div>
                      <div>
                        <h3 className="font-bold text-gray-800">Data e Horário</h3>
                        <p className="text-gray-600">{formattedDate}</p>
                        <p className="text-gray-600 font-medium">{formattedTime} (Horário de Brasília)</p>
                      </div>
                    </div>
                    {event.location && (
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-100 rounded-xl"><MapPin className="h-6 w-6 text-purple-600" /></div>
                        <div>
                          <h3 className="font-bold text-gray-800">Localização</h3>
                          <p className="text-gray-600">{event.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* --- COLUNA DIREITA: Formulário --- */}
            <div className="lg:col-span-2" ref={formRef}>
              <Card className="shadow-2xl border-0 rounded-2xl sticky top-6">
                <CardHeader className="bg-gray-800 text-white text-center rounded-t-2xl">
                  <CardTitle className="text-2xl font-bold">Participe</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
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