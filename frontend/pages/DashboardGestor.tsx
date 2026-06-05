import React from 'react';

export function DashboardGestor() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 p-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Painel do Gestor</h1>
        <p className="text-slate-600 mb-6">Aqui você pode acompanhar resultados escolares, métricas da escola e dados dos professores.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-800">Visão geral</h2>
            <p className="text-slate-500 mt-2">Resumo rápido dos indicadores educacionais.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-800">Relatórios</h2>
            <p className="text-slate-500 mt-2">Acesse os relatórios de desempenho das turmas e alunos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
