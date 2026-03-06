import type { ReactNode } from 'react';
import { Drawer } from 'vaul';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function MobileDrawer({ isOpen, onClose, children, title }: MobileDrawerProps) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl outline-none"
          style={{
            background: '#0d1117',
            borderTop: '1px solid var(--glass-border)',
            maxHeight: '85vh',
          }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full" style={{ background: 'var(--glass-border)' }} />
          </div>

          {title && (
            <div className="px-6 pt-2 pb-4 border-b flex-shrink-0" style={{ borderColor: 'var(--glass-border)' }}>
              <Drawer.Title
                className="text-sm uppercase tracking-[0.2em] text-text-secondary"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {title}
              </Drawer.Title>
            </div>
          )}

          <div className="overflow-y-auto px-6 py-4 flex-1">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
