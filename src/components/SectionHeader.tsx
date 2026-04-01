import { ReactNode } from 'react';

export default function SectionHeader({ title, description, icon: Icon }: { title: string, description: string, icon: any }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Icon className="text-emerald-400" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      <p className="text-slate-400 text-lg max-w-3xl">{description}</p>
    </div>
  );
}
