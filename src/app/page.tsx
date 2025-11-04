'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { HeroSection } from '@/components/HeroSection';
import { CTASection } from '@/components/CTASection';

interface BaseData {
  id: string;
  name: string;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const leaderRefId = searchParams.get('ref') || undefined;

  const [leaders, setLeaders] = useState<BaseData[]>([]);
  const [regions, setRegions] = useState<BaseData[]>([]);

  useEffect(() => {
    const supabase = createClient();

    async function fetchData() {
      const [leadersRes, regionsRes] = await Promise.all([
        supabase.from('Users').select('id, name').eq('role', 'LEADER'),
        supabase.from('AdministrativeRegions').select('id, name').order('name')
      ]);

      if (leadersRes.data) setLeaders(leadersRes.data);
      if (regionsRes.data) setRegions(regionsRes.data);
    }

    fetchData();
  }, []);

  return (
    <>
      <CTASection leaders={leaders} regions={regions} leaderRefId={leaderRefId} />
    </>
); }