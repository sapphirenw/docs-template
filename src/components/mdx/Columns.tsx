'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ColumnsProps {
	children: ReactNode;
	cols?: 2 | 3 | 4;
}

export function Columns({ children, cols = 2 }: ColumnsProps) {
	return (
		<div
			className={clsx(
				'my-6 grid gap-6',
				cols === 2 && 'grid-cols-1 md:grid-cols-2',
				cols === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
				cols === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
			)}
		>
			{children}
		</div>
	);
}

interface ColumnProps {
	children: ReactNode;
}

export function Column({ children }: ColumnProps) {
	return <div className="space-y-4">{children}</div>;
}
