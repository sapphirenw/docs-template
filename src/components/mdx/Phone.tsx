'use client';

import React from 'react';
import clsx from 'clsx';

interface PhoneProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light' | 'gold' | 'blue';
  caption?: string;
  className?: string;
}

const variantStyles = {
  dark: {
    frame: 'bg-[#1a1a1a]',
    bezel: 'bg-[#0a0a0a]',
    button: 'bg-[#2a2a2a]',
  },
  light: {
    frame: 'bg-[#e8e8e8]',
    bezel: 'bg-[#f5f5f5]',
    button: 'bg-[#d0d0d0]',
  },
  gold: {
    frame: 'bg-[#d4c4a8]',
    bezel: 'bg-[#e8dcc8]',
    button: 'bg-[#c4b498]',
  },
  blue: {
    frame: 'bg-[#1e3a5f]',
    bezel: 'bg-[#2a4a6f]',
    button: 'bg-[#0e2a4f]',
  },
};

export function Phone({ children, variant = 'dark', caption, className }: PhoneProps) {
  const styles = variantStyles[variant];

  return (
    <figure className={clsx('my-6 flex flex-col items-center', className)}>
      {/* iPhone Frame */}
      <div
        className={clsx(
          'relative',
          'w-[280px]',
          'rounded-[3rem]',
          'p-3',
          styles.frame,
          'shadow-xl',
          'border border-black/10 dark:border-white/10'
        )}
      >
        {/* Side buttons - Volume */}
        <div
          className={clsx(
            'absolute -left-[3px] top-[100px] w-[3px] h-[30px] rounded-l-sm',
            styles.button
          )}
        />
        <div
          className={clsx(
            'absolute -left-[3px] top-[140px] w-[3px] h-[55px] rounded-l-sm',
            styles.button
          )}
        />
        <div
          className={clsx(
            'absolute -left-[3px] top-[205px] w-[3px] h-[55px] rounded-l-sm',
            styles.button
          )}
        />
        {/* Side button - Power */}
        <div
          className={clsx(
            'absolute -right-[3px] top-[160px] w-[3px] h-[80px] rounded-r-sm',
            styles.button
          )}
        />

        {/* Inner bezel */}
        <div
          className={clsx(
            'relative',
            'rounded-[2.25rem]',
            'overflow-hidden',
            styles.bezel,
            'p-[2px]'
          )}
        >
          {/* Screen */}
          <div className="relative rounded-[2.1rem] overflow-hidden bg-black aspect-[9/19.5]">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
              <div className="w-[90px] h-[28px] bg-black rounded-full flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-6" />
              </div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:m-0 [&_video]:w-full [&_video]:h-full [&_video]:object-cover [&>p]:m-0 [&>p]:h-full">
              {children}
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/30 rounded-full" />
          </div>
        </div>
      </div>

      {caption && (
        <figcaption className="text-sm text-foreground-muted text-center mt-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface PhoneGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function PhoneGroup({ children, className }: PhoneGroupProps) {
  return (
    <div
      className={clsx(
        'my-6 flex flex-wrap items-start justify-center gap-8',
        className
      )}
    >
      {children}
    </div>
  );
}
