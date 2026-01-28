'use client';

import {
	ReactNode,
	useState,
	createContext,
	useContext,
	Children,
	isValidElement,
} from 'react';
import { clsx } from 'clsx';

interface TabsContextValue {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps {
	children: ReactNode;
	defaultValue?: string;
}

export function Tabs({ children, defaultValue }: TabsProps) {
	const childArray = Children.toArray(children);
	const firstTab = childArray.find(
		(child) => isValidElement(child) && child.type === Tab
	);
	const firstValue = isValidElement(firstTab) ? firstTab.props.value : '';

	const [activeTab, setActiveTab] = useState(defaultValue || firstValue);

	return (
		<TabsContext.Provider value={{ activeTab, setActiveTab }}>
			<div className="my-6">{children}</div>
		</TabsContext.Provider>
	);
}

interface TabListProps {
	children: ReactNode;
}

export function TabList({ children }: TabListProps) {
	return (
		<div className="scrollbar-none mb-4 flex gap-1 overflow-x-auto border-b border-border">
			{children}
		</div>
	);
}

interface TabTriggerProps {
	value: string;
	children: ReactNode;
}

export function TabTrigger({ value, children }: TabTriggerProps) {
	const context = useContext(TabsContext);
	if (!context) throw new Error('TabTrigger must be used within Tabs');

	const { activeTab, setActiveTab } = context;
	const isActive = activeTab === value;

	return (
		<button
			onClick={() => setActiveTab(value)}
			className={clsx(
				'-mb-px whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-all duration-200',
				isActive
					? 'border-primary-500 text-primary-500'
					: 'border-transparent text-foreground-muted hover:border-border hover:text-foreground'
			)}
		>
			{children}
		</button>
	);
}

interface TabProps {
	value: string;
	children: ReactNode;
}

export function Tab({ value, children }: TabProps) {
	const context = useContext(TabsContext);
	if (!context) throw new Error('Tab must be used within Tabs');

	const { activeTab } = context;

	if (activeTab !== value) return null;

	return <div className="animate-fade-in">{children}</div>;
}

// Code group for multiple code examples
interface CodeGroupProps {
	children: ReactNode;
}

export function CodeGroup({ children }: CodeGroupProps) {
	const childArray = Children.toArray(children);
	const [activeIndex, setActiveIndex] = useState(0);

	// Extract titles from children
	const tabs = childArray.map((child, index) => {
		if (isValidElement(child)) {
			const title = child.props.title || `Tab ${index + 1}`;
			return { title, content: child };
		}
		return { title: `Tab ${index + 1}`, content: child };
	});

	return (
		<div className="my-6 overflow-hidden rounded-xl border border-border">
			<div className="scrollbar-none flex gap-1 overflow-x-auto bg-background-muted px-2 pt-2">
				{tabs.map((tab, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
						className={clsx(
							'whitespace-nowrap rounded-t-lg px-4 py-2 text-sm font-medium transition-all duration-200',
							activeIndex === index
								? 'bg-background-soft text-foreground'
								: 'text-foreground-muted hover:text-foreground'
						)}
					>
						{tab.title}
					</button>
				))}
			</div>
			<div className="[&_.code-block]:my-0 [&_.code-block_pre]:rounded-t-none [&_.code-block_pre]:border-0">
				{tabs[activeIndex]?.content}
			</div>
		</div>
	);
}
