import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import type { Icon as PhosphorIconType } from '@phosphor-icons/react';
import {
  House,
  Atom,
  MapPin,
  Newspaper,
  Images,
  ArrowSquareOut,
  MagnifyingGlass,
  Lightning,
} from '@phosphor-icons/react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface CommandItem {
  group: string;
  label: string;
  icon: PhosphorIconType;
  action: () => void;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const commands: CommandItem[] = [
  { group: 'Разделы', label: 'Главная', icon: House, action: () => scrollTo('hero') },
  { group: 'Разделы', label: 'О городе', icon: House, action: () => scrollTo('about') },
  { group: 'Разделы', label: 'Наука и ОИЯИ', icon: Atom, action: () => scrollTo('science') },
  { group: 'Разделы', label: 'Достопримечательности', icon: MapPin, action: () => scrollTo('attractions') },
  { group: 'Разделы', label: 'Новости', icon: Newspaper, action: () => scrollTo('live') },
  { group: 'Разделы', label: 'Галерея', icon: Images, action: () => scrollTo('gallery') },
  {
    group: 'Внешние ссылки',
    label: 'Сайт ОИЯИ',
    icon: ArrowSquareOut,
    action: () => window.open('https://jinr.ru', '_blank'),
  },
  {
    group: 'Внешние ссылки',
    label: 'ОЭЗ Дубна',
    icon: ArrowSquareOut,
    action: () => window.open('https://oez-dubna.ru', '_blank'),
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('open-command-palette', onOpen);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('open-command-palette', onOpen);
    };
  }, []);

  function runCommand(action: () => void) {
    setOpen(false);
    setTimeout(action, 150);
  }

  const grouped = commands.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    (acc[cmd.group] ??= []).push(cmd);
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="p-0 border-0 max-w-lg overflow-hidden"
        style={{
          background: 'rgba(13, 17, 23, 0.95)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <Command className="w-full" style={{ fontFamily: 'Geologica, sans-serif' }}>
          {/* Search input */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            <MagnifyingGlass size={16} className="text-text-secondary flex-shrink-0" />
            <Command.Input
              placeholder="Поиск по сайту..."
              className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            />
            <kbd
              className="text-[10px] text-text-secondary border rounded px-1.5 py-0.5 flex-shrink-0"
              style={{ borderColor: 'var(--glass-border)', fontFamily: '"IBM Plex Mono", monospace' }}
            >
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-72 overflow-y-auto py-2">
            <Command.Empty className="py-6 text-center text-sm text-text-secondary">
              Ничего не найдено
            </Command.Empty>

            {Object.entries(grouped).map(([group, items]) => (
              <Command.Group key={group}>
                <div
                  className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text-secondary"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  {group}
                </div>
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Command.Item
                      key={item.label}
                      value={item.label}
                      onSelect={() => runCommand(item.action)}
                      className="flex items-center gap-3 px-3 py-2.5 mx-1 rounded-md cursor-pointer text-sm text-text-secondary transition-colors"
                      style={
                        {
                          '--cmdk-item-hover-bg': 'var(--glass-bg)',
                        } as React.CSSProperties
                      }
                    >
                      <Icon size={16} className="flex-shrink-0 text-accent-primary" />
                      <span className="flex-1 text-text-primary">{item.label}</span>
                      {item.group === 'Внешние ссылки' && (
                        <ArrowSquareOut size={12} className="text-text-secondary opacity-60" />
                      )}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ))}
          </Command.List>

          {/* Footer */}
          <div
            className="flex items-center gap-3 px-4 py-2 border-t"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            <Lightning size={12} className="text-accent-primary" />
            <span className="text-[10px] text-text-secondary" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              Открыть: Ctrl+K
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
