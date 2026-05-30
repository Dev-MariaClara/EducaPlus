import { useState, useCallback } from 'react';
import { turmaService } from '../services/turmaService';
import { Turma } from '../types/Turma';

export function useTurmas() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarTurmas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await turmaService.listarTodas();
      setTurmas(data);
    } catch (err) {
      setError('Erro ao carregar as turmas.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const vincularAlunoATurma = async (turmaId: number, alunoId: number) => {
    setLoading(true);
    try {
      await turmaService.adicionarAluno(turmaId, alunoId);
      // Recarrega as turmas para atualizar a lista na tela
      await carregarTurmas(); 
    } catch (err) {
      setError('Erro ao vincular aluno à turma.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { 
    turmas, 
    loading, 
    error, 
    carregarTurmas, 
    vincularAlunoATurma 
  };
}