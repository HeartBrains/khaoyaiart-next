import { getBuildCovers } from '@/lib/build-covers';
import { BkkkShell } from '@/components/bkkk/layout/BkkkShell';

export default async function BkkkLayout({ children }: { children: React.ReactNode }) {
  const { bkkk: initialCovers, bkkkCss: initialCss } = await getBuildCovers();

  return (
    <BkkkShell initialCovers={initialCovers} initialCss={initialCss}>
      {children}
    </BkkkShell>
  );
}
