import React, { useEffect } from 'react';
import { Calendar, Clock, CheckSquare } from 'lucide-react';
import { useTurmas } from '../hooks/useTurmas';

export function DashboardProfessor() {
  const { turmas, loading, error, carregarTurmas } = useTurmas();

  useEffect(() => {
    carregarTurmas();
  }, [carregarTurmas]);

  if (loading) return <div className="p-8 text-center text-slate-500">Carregando suas turmas...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Visão Geral das Turmas</h2>
          <p className="text-slate-500">Acompanhe o engajamento e desempenho de suas disciplinas.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-50 font-medium flex items-center gap-2">
          <Calendar className="w-4 h-4"/> Ver Calendário
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {turmas.map(turma => (
          <div key={turma.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-5 text-white">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-white/20 px-2 py-1 rounded text-xs font-semibold">Cód: TM{turma.id}</span>
              </div>
              <h3 className="text-lg font-bold truncate">{turma.nome}</h3>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="text-center bg-slate-50 rounded-lg py-3">
                <p className="text-xs text-slate-400 uppercase font-semibold">Alunos Matriculados</p>
                <p className="text-xl font-bold text-slate-800">{turma.alunos?.length || 0}</p>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-indigo-50 text-indigo-700 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                  <CheckSquare className="w-4 h-4"/> Lançar Frequência
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {turmas.length === 0 && (
          <p className="col-span-3 text-center text-slate-500 py-10">Você ainda não tem turmas vinculadas.</p>
        )}
      </div>
    </div>
  );
}