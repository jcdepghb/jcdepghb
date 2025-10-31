import React from 'react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { createClient } from '@/lib/supabase/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = 'https://juntos-por-mais.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eos consequatur totam",
  description: "Lorem ipsum dolor sit amet",
  icons: {
    icon: '/tv.png',
  },
  openGraph: {
    title: "Eos consequatur totam",
    description: "Lorem ipsum dolor sit amet",
    url: siteUrl,
    siteName: "Eos consequatur totam",
    images: [
      {
        url: `${siteUrl}/tv.png`,
        secureUrl: `${siteUrl}/tv.png`,
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: "Estevão Reis - Juntos por Mais",
    }, ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eos consequatur totam",
    description: "Lorem ipsum dolor sit amet",
    images: [`${siteUrl}/tv.png`], 
}, };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  let profilePictureUrl: string | null = null;

  if (user) {
    const { data: profile } = await supabase
      .from('Users')
      .select('role, profile_picture_url')
      .eq('auth_id', user.id)
      .single();

    if (profile) {
      isAdmin = profile.role === 'ADMIN';
      profilePictureUrl = profile.profile_picture_url;
  } }

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Header user={user} isAdmin={isAdmin} profilePictureUrl={profilePictureUrl} />
        <main className="pt-16 flex-grow">
          {children}
        </main>
        <Footer /> 
      </body>
    </html>
); }