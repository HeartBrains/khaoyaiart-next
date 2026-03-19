'use client';
import { useAppNavigate } from '@/components/bkkk/utils/useAppNavigate';
import * as Pages from '@/components/bkkk/components/pages/index';

interface ClientPageProps {
  site?: string;
  component: string;
  [key: string]: unknown;
}

export function ClientPage({ component, ...props }: ClientPageProps) {
  const navigate = useAppNavigate();
  const PageComponent = (Pages as unknown as Record<string, React.ComponentType<{ onNavigate?: (page: string, slug?: string) => void; [key: string]: unknown }>>)[component];
  if (!PageComponent) return null;
  return <PageComponent onNavigate={navigate} {...props} />;
}
