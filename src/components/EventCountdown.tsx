'use client';
import { useState, useEffect, useCallback } from 'react';

interface EventCountdownProps {
  eventDate: string;
}

// Componente para uma unidade de tempo (Dia, Hora, etc.)
const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl lg:text-5xl font-bold tracking-tighter">{String(value).padStart(2, '0')}</span>
    <span className="text-xs uppercase tracking-widest opacity-75">{label}</span>
  </div>
);

export function EventCountdown({ eventDate }: EventCountdownProps) {
  // Usamos useCallback para garantir que a função não seja recriada a cada render
  // a menos que eventDate mude.
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(eventDate) - +new Date();
    let timeLeft = { dias: 0, horas: 0, minutos: 0, segundos: 0 };
    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [eventDate]); // A única dependência real é a data do evento

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Inicia o timer para atualizar a cada segundo
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Limpa o timer quando o componente é desmontado
    return () => clearTimeout(timer);
  }, [timeLeft, calculateTimeLeft]); // Roda o efeito novamente sempre que timeLeft ou a função mudam

  if (!timeLeft.dias && !timeLeft.horas && !timeLeft.minutos && !timeLeft.segundos) {
    return <span className="text-xl font-bold text-center">O evento já começou!</span>;
  }

  return (
    <div className="flex items-center justify-around w-full max-w-sm mx-auto">
      <TimeUnit value={timeLeft.dias} label="Dias" />
      <span className="text-4xl font-light -mt-4">:</span>
      <TimeUnit value={timeLeft.horas} label="Horas" />
      <span className="text-4xl font-light -mt-4">:</span>
      <TimeUnit value={timeLeft.minutos} label="Min" />
      <span className="text-4xl font-light -mt-4">:</span>
      <TimeUnit value={timeLeft.segundos} label="Seg" />
    </div>
  );
}