import React, { useEffect } from 'react';
import { Award, Calendar, CheckSquare, BookOpen, Clock } from 'lucide-react';
import { useAlunos } from '../hooks/useAlunos';

export function DashboardAluno() {
  const { notas, loading, error, carregarNotasDoAluno } = useAlunos();
  const ALUNO_ID_LOGADO = 1; // Em um cenário real, viria do token JWT/AuthContext

  useEffect(() => {
    carregarNotasDoAluno(ALUNO_ID_LOGADO);
  }, [carregarNotasDoAluno]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Profile Aluno */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex-shrink-0 z-10">
            <img src="https://i.pravatar.cc/150?img=33" alt="Aluno" className="w-full h-full object-cover"/>
        </div>
        <div className="flex-1 z-10">
          <h2 className="text-2xl font-bold text-slate-800">João Silva Carvalho</h2>
          <p className="text-slate-500 mb-4">Matrícula: 2026001</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabela de Notas conectada ao Backend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-500"/> Minhas Avaliações
          </h3>
          
          {loading ? (
             <p className="text-slate-500">Buscando notas...</p>
          ) : error ? (
             <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-sm">
                    <th className="pb-3 font-semibold">Tipo</th>
                    <th className="pb-3 font-semibold">Peso</th>
                    <th className="pb-3 font-semibold text-right">Nota Obtida</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {notas.map((avaliacao, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 font-bold text-slate-800">{avaliacao.tipo}</td>
                      <td className="py-4 text-slate-500">{avaliacao.peso}</td>
                      <td className="py-4 text-right">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                          avaliacao.nota >= 7 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {avaliacao.nota.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {notas.length === 0 && (
                    <tr><td colSpan={3} className="py-4 text-center text-slate-500">Nenhuma nota lançada ainda.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}