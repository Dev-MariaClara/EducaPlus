import React from 'react';
import { GraduationCap, LogOut, ChevronRight, LucideIcon } from 'lucide-react';
import { PerfilAcesso } from '../../types/Usuario';

// Definindo a estrutura de um item de menu
export interface MenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarProps {
  userRole: PerfilAcesso;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems: MenuItem[];
  onLogout: () => void;
}

export function Sidebar({ userRole, activeTab, setActiveTab, menuItems, onLogout }: SidebarProps) {
  return (
    <aside className="w-full md:w-72 bg-slate-900 text-slate-300 flex flex-col z-20 shadow-2xl transition-all duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-slate-950/50">
        <div className="bg-indigo-600 p-2 rounded-xl">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className="text-xl font-bold tracking-wide text-white">EducaPlus</span>
          <span className="block text-[10px] uppercase tracking-wider text-indigo-300 font-semibold mt-0.5">Versão 2.0</span>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4 mt-2 px-2">Menu Principal</div>
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left font-medium ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50 transform scale-[1.02]' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`} />
                {item.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer in Sidebar */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex items-center gap-3 mb-4 px-2">
          <img className="w-10 h-10 rounded-full border border-slate-700" src="https://i.pravatar.cc/100?img=11" alt="Avatar" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Usuário Teste</p>
            <p className="text-xs text-indigo-400 truncate capitalize">{userRole.toLowerCase()}</p>
          </div>
        </div>
        <button 
          onClick={onLogout} 
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors border border-slate-700/50"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sair da Conta</span>
        </button>
      </div>
    </aside>
  );
}