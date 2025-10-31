'use client';

import { useState, useEffect, useCallback } from 'react';

interface EventCountdownProps {
  eventDate: string;
}

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl lg:text-5xl font-bold tracking-tighter">{String(value).padStart(2, '0')}</span>
    <span className="text-xs uppercase tracking-widest opacity-75">{label}</span>
  </div>
);

export function EventCountdown({ eventDate }: EventCountdownProps) {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(eventDate) - +new Date();
    let timeLeft = { dias: 0, horas: 0, minutos: 0, segundos: 0 };

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
    }; }
    return timeLeft;
  }, [eventDate]);

  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const hasTimeLeft = Object.values(timeLeft).some(value => value > 0);

  if (!hasTimeLeft) {
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
); }