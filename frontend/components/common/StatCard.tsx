import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  icon: LucideIcon;
  color: 'indigo' | 'emerald' | 'blue' | 'amber';
}

export function StatCard({ title, value, trend, icon: Icon, color }: StatCardProps) {
  const colorMap = {
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  const isPositive = trend.startsWith('+') || trend === 'Estável';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
          {trend}
        </span>
      </div>
      <p className="text-slate-500 text-sm font-semibold mb-1">{title}</p>
      <p className="text-3xl font-black text-slate-800">{value}</p>
    </div>
  );
}