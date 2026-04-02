import { getBuildCovers } from '@/lib/build-covers';
import { KyafShell } from '@/components/kyaf/layout/KyafShell';
import { GtagConversionEvent } from '@/components/GtagConversionEvent';

export default async function KyafLayout({ children }: { children: React.ReactNode }) {
  const { kyaf: initialCovers, kyafCss: initialCss } = await getBuildCovers();

  return (
    <KyafShell initialCovers={initialCovers} initialCss={initialCss}>
      <GtagConversionEvent />
      {children}
    </KyafShell>
  );
}
