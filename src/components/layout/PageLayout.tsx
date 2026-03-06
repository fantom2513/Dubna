import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  useEffect(() => {
    document.title = `${title} — Дубна`;
  }, [title]);

  return (
    <div className="pt-20 min-h-screen">
      {children}
    </div>
  );
}
