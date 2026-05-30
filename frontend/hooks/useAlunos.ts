import { useState, useCallback } from 'react';
import { alunoService } from '../services/alunoService';
import { Aluno } from '../types/Aluno';
import { Avaliacao } from '../types/Avaliacao';

export function useAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [notas, setNotas] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarAlunos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await alunoService.listarTodos();
      setAlunos(data);
    } catch (err) {
      setError('Erro ao carregar a lista de alunos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const carregarNotasDoAluno = useCallback(async (alunoId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await alunoService.visualizarNotas(alunoId);
      setNotas(data);
    } catch (err) {
      setError('Erro ao carregar as notas do aluno.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    alunos, 
    notas, 
    loading, 
    error, 
    carregarAlunos, 
    carregarNotasDoAluno 
  };
}