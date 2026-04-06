'use client';

import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { ReactNode } from 'react';

const frameworks = ['Chi', 'Gin', 'Echo', 'Fiber', 'net/http'];

interface FrameworkTabsProps {
  children: ReactNode;
}

export function FrameworkTabs({ children }: FrameworkTabsProps) {
  return (
    <Tabs items={frameworks}>
      {children}
    </Tabs>
  );
}

export { Tab as FrameworkTab };
