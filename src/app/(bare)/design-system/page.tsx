import type { Metadata } from 'next';
import { DesignSystemClient } from '@/components/design-system/DesignSystemClient';
import { COMPONENT_REGISTRY } from '@/design-system/registry';
import { loadDesignSystemTokens } from '@/design-system/tokens';

export const metadata: Metadata = {
  title: 'MONOLITH — Tasarım Sistemi',
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  const tokens = loadDesignSystemTokens();
  return <DesignSystemClient tokens={tokens} components={COMPONENT_REGISTRY} />;
}
