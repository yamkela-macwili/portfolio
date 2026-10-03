import { ReactNode, Key } from 'react';

export default function Card({ children, className = '', title, key }: { children: ReactNode, className?: string, title?: string, key?: Key }) {
  return (
    <div key={key} className={`bg-surface border border-border rounded-card p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-fg mb-4">{title}</h3>}
      {children}
    </div>
  );
}
