"use client";

import { ReactNode } from "react";
import {
  AlertCircle,
  Info as InfoIcon,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { clsx } from "clsx";

type CalloutType = "note" | "info" | "warning" | "danger" | "tip" | "success";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: typeof InfoIcon;
    containerClass: string;
    iconClass: string;
    titleClass: string;
  }
> = {
  note: {
    icon: InfoIcon,
    containerClass: "bg-blue-500/10 border-blue-500/30",
    iconClass: "text-blue-500",
    titleClass: "text-blue-600 dark:text-blue-400",
  },
  info: {
    icon: InfoIcon,
    containerClass: "bg-blue-500/10 border-blue-500/30",
    iconClass: "text-blue-500",
    titleClass: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    containerClass: "bg-amber-500/10 border-amber-500/30",
    iconClass: "text-amber-500",
    titleClass: "text-amber-600 dark:text-amber-400",
  },
  danger: {
    icon: AlertCircle,
    containerClass: "bg-red-500/10 border-red-500/30",
    iconClass: "text-red-500",
    titleClass: "text-red-600 dark:text-red-400",
  },
  tip: {
    icon: Lightbulb,
    containerClass: "bg-primary-500/10 border-primary-500/30",
    iconClass: "text-primary-500",
    titleClass: "text-primary-600 dark:text-primary-400",
  },
  success: {
    icon: CheckCircle,
    containerClass: "bg-emerald-500/10 border-emerald-500/30",
    iconClass: "text-emerald-500",
    titleClass: "text-emerald-600 dark:text-emerald-400",
  },
};

const defaultTitles: Record<CalloutType, string> = {
  note: "Note",
  info: "Info",
  warning: "Warning",
  danger: "Danger",
  tip: "Tip",
  success: "Success",
};

export function Callout({ type = "note", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;
  const displayTitle = title || defaultTitles[type];

  return (
    <div
      className={clsx(
        "my-6 rounded-xl border px-4 py-3",
        config.containerClass,
      )}
    >
      <div className="flex items-center gap-3 mt-2 mb-4">
        <Icon className={clsx("h-5 w-5 flex-shrink-0", config.iconClass)} />
        <span className={clsx("font-semibold text-sm", config.titleClass)}>
          {displayTitle}
        </span>
      </div>
      <div className="ml-8 text-sm text-foreground-muted [&>p]:m-0 my-2">
        {children}
      </div>
    </div>
  );
}

// Convenience components
export function Note(props: Omit<CalloutProps, "type">) {
  return <Callout type="note" {...props} />;
}

export function InfoCallout(props: Omit<CalloutProps, "type">) {
  return <Callout type="info" {...props} />;
}

// Alias for backward compatibility
export { InfoCallout as Info };

export function Warning(props: Omit<CalloutProps, "type">) {
  return <Callout type="warning" {...props} />;
}

export function Danger(props: Omit<CalloutProps, "type">) {
  return <Callout type="danger" {...props} />;
}

export function Tip(props: Omit<CalloutProps, "type">) {
  return <Callout type="tip" {...props} />;
}

export function Success(props: Omit<CalloutProps, "type">) {
  return <Callout type="success" {...props} />;
}
