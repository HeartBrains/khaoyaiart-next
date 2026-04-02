import { getBuildCovers } from '@/lib/build-covers';
import { BkkkShell } from '@/components/bkkk/layout/BkkkShell';
import { GtagConversionEvent } from '@/components/GtagConversionEvent';

export default async function BkkkLayout({ children }: { children: React.ReactNode }) {
  const { bkkk: initialCovers, bkkkCss: initialCss } = await getBuildCovers();

  return (
    <BkkkShell initialCovers={initialCovers} initialCss={initialCss}>
      <GtagConversionEvent />
      {children}
    </BkkkShell>
  );
}
