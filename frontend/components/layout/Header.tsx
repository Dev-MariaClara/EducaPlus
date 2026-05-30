import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex justify-between items-center z-10 sticky top-0">
      
      {/* Container do Título */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800 hidden sm:block">
          {title}
        </h2>
      </div>
      
      {/* Container de Busca e Notificações */}
      <div className="flex items-center gap-4">
        
        {/* Barra de Busca */}
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-full border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Buscar no EducaPlus..." 
            className="bg-transparent border-none outline-none text-sm w-48 text-slate-700 placeholder-slate-400"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>

        {/* Botão de Notificação */}
        <button type="button" className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 hover:bg-indigo-50 rounded-full border border-slate-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
      </div>
    </header>
  );
}