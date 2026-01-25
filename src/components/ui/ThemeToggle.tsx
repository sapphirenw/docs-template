'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg hover:bg-background-muted">
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={clsx(
        'p-2 rounded-lg transition-colors duration-200',
        'hover:bg-background-muted',
        'focus:outline-none focus:ring-2 focus:ring-primary-500/50'
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-foreground-muted" />
      ) : (
        <Moon className="w-5 h-5 text-foreground-muted" />
      )}
    </button>
  );
}
