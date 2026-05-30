import api from './api';
import { Turma } from '../types/Turma';

export const turmaService = {
  criar: async (turma: Omit<Turma, 'id' | 'alunos' | 'professores'>): Promise<Turma> => {
    const response = await api.post<Turma>('/api/turmas', turma);
    return response.data;
  },

  listarTodas: async (): Promise<Turma[]> => {
    const response = await api.get<Turma[]>('/api/turmas');
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Turma> => {
    const response = await api.get<Turma>(`/api/turmas/${id}`);
    return response.data;
  },

  // Vincula o aluno à turma
  adicionarAluno: async (turmaId: number, alunoId: number): Promise<void> => {
    await api.post(`/api/turmas/${turmaId}/alunos/${alunoId}`);
  }
};