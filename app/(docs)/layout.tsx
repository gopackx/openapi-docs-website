import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-route">
      <DocsLayout {...baseOptions()} tree={source.pageTree}>
        {children}
      </DocsLayout>
    </div>
  );
}
