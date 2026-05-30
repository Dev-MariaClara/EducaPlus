import React from 'react';
import { LucideIcon } from 'lucide-react';

interface RoleButtonProps {
  role: string;
  desc: string;
  icon: LucideIcon;
  color: 'indigo' | 'blue' | 'emerald' | 'orange';
  onClick: () => void;
}

export function RoleButton({ role, icon: Icon, color, onClick, desc }: RoleButtonProps) {
  const colorMap = {
    indigo: 'hover:border-indigo-500 hover:shadow-indigo-100',
    blue: 'hover:border-blue-500 hover:shadow-blue-100',
    emerald: 'hover:border-emerald-500 hover:shadow-emerald-100',
    orange: 'hover:border-orange-500 hover:shadow-orange-100',
  };

  const iconBgMap = {
    indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
  };

  return (
    <button 
      onClick={onClick} 
      className={`group flex flex-col items-center text-center p-6 bg-white border-2 border-slate-100 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${colorMap[color]}`}
    >
      <div className={`p-4 rounded-full mb-4 transition-colors duration-300 ${iconBgMap[color]}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">Entrar como {role}</h3>
      <p className="text-xs text-slate-500 font-medium">{desc}</p>
    </button>
  );
}