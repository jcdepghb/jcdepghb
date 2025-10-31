// src/components/EventCountdown.tsx
'use client';

import { useState, useEffect } from 'react';

interface EventCountdownProps {
  // A propriedade agora se chama 'targetDate' para ser mais genérica
  targetDate: string;
}

export function EventCountdown({ targetDate }: EventCountdownProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      Dias: 0,
      Horas: 0,
      Minutos: 0,
      Segundos: 0,
    };

    if (difference > 0) {
      timeLeft = {
        Dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutos: Math.floor((difference / 1000 / 60) % 60),
        Segundos: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Atualiza o contador a cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Verifica se o tempo já esgotou
  const isTimeUp = !Object.values(timeLeft).some((value) => value > 0);

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3">
      {isTimeUp ? (
        <span className="text-xl font-bold text-center">O evento já começou!</span>
      ) : (
        Object.entries(timeLeft).map(([interval, value]) => (
          <div key={interval} className="flex flex-col items-center justify-center bg-white/20 p-3 rounded-lg min-w-[70px] text-center">
            <span className="text-3xl font-bold tracking-tighter">{String(value).padStart(2, '0')}</span>
            <span className="text-xs uppercase opacity-75">{interval}</span>
          </div>
        ))
      )}
    </div>
  );
}