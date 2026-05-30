import React, { useEffect } from 'react';
import { useTurmas } from '../hooks/useTurmas';

export function DashboardProfessor() {
  // O Hook abstrai toda a complexidade
  const { turmas, loading, error, carregarTurmas } = useTurmas();

  useEffect(() => {
    carregarTurmas();
  }, [carregarTurmas]);

  if (loading) return <p>Carregando turmas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Aqui você faz o map nas turmas que vieram reais do Spring Boot */}
      {turmas.map(turma => (
        <div key={turma.id} className="bg-white p-5 rounded-2xl shadow-sm">
          <h3>{turma.nome}</h3>
        </div>
      ))}
    </div>
  );
}