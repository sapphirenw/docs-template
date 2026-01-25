'use client';

import { ReactNode, Children, isValidElement } from 'react';
import { clsx } from 'clsx';

interface StepsProps {
  children: ReactNode;
}

export function Steps({ children }: StepsProps) {
  const childArray = Children.toArray(children);

  return (
    <div className="my-8 ml-4 border-l-2 border-border pl-8 space-y-8">
      {childArray.map((child, index) => {
        if (isValidElement(child) && child.type === Step) {
          return (
            <div key={index} className="relative">
              <div
                className={clsx(
                  'absolute -left-[41px] flex items-center justify-center',
                  'w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold'
                )}
              >
                {index + 1}
              </div>
              {child}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
}

interface StepProps {
  title: string;
  children: ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="text-foreground-muted">{children}</div>
    </div>
  );
}
