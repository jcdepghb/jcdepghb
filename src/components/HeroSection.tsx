"use client";

import Image from "next/image";
import { Instagram, Facebook, ArrowDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const socials = [
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: <Facebook className="h-5 w-5" />,
  },
];

const stats = [
  { value: "+30", label: "Qui amet corpti" },
  { value: "+200K", label: "Eos voluptate velit" },
  { value: "23", label: "Quo internos" },
];

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0">
        <Image
          src="/train.jpg"
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/50" />
      </div>

      <div className="relative z-10 container mx-auto flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-16 md:pb-16">
        <div className="flex flex-col md:flex-row gap-82 items-center justify-between w-full">

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Eos consequatur totam <span className="text-blue-400">aut assumenda</span> fugiat et modi assumenda!
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              Lorem ipsum dolor sit amet. Hic tempora natus aut ratione veniam quo sint maxime ut velit assumenda quo alias quis sit internos Quis aut unde tempora! Et quae aliquid ea ducimus enim aut iusto quia.
            </p>

            <div className="mt-10 w-full flex flex-col items-center md:items-start gap-8">
               <a href="#cadastro">
                <Button
                  size="lg"
                  className="bg-blue-300 text-slate-900 font-bold hover:bg-blue-300 shadow-lg transition-transform hover:scale-105 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-1000"
                >
                  Sed nobis
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <div className="flex items-center gap-4">
                 <span className="text-sm text-slate-400">Tnt a rerum:</span>
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-primary transition-colors duration-300"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center gap-10">
             <div className="relative h-72 w-72 lg:h-80 lg:w-80 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400/20">
               <Image
                 src="/tv.png"
                 alt="Foto de X"
                 fill
                 priority
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 className="object-cover"
               />
             </div>

             <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-4 text-center w-full max-w-sm">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-200 tracking-tighter">{stat.value}</h3>
                    <p className="mt-1 text-xs lg:text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
             </div>

             <a href="#sobre">
                <Button 
                  variant="outline" 
                  className="bg-transparent text-white border-white/50 hover:bg-white/20 hover:text-white transition-colors duration-300"
                >
                    Dolor sit
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
             </a>
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center gap-10 mt-16 w-full">
          <div className="relative h-48 w-48 rounded-full overflow-hidden shadow-lg border-4 border-primary/20">
              <Image
                  src="/estevao-reis-perfil2-rounded.png"
                  alt="Foto de Estevão Reis"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center w-full max-w-sm">
                {stats.map((stat) => (
                <div key={stat.label}>
                    <h3 className="text-3xl font-bold text-slate-200 tracking-tighter">{stat.value}</h3>
                    <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                </div>
                ))}
            </div>  

            <a href="#sobre">
                <Button 
                  variant="outline" 
                  className="bg-transparent text-white border-white/50 hover:bg-white/20 hover:text-white transition-colors duration-300"
                >
                    Et sunt quisquam
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </a>
        </div>
      </div>
    </section>
); }