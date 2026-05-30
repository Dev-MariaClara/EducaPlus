import api from './api';
import { Aluno } from '../types/Aluno';
import { Avaliacao } from '../types/Avaliacao';

export const alunoService = {
  cadastrar: async (aluno: Omit<Aluno, 'id'>): Promise<Aluno> => {
    const response = await api.post<Aluno>('/api/alunos', aluno);
    return response.data;
  },

  listarTodos: async (): Promise<Aluno[]> => {
    const response = await api.get<Aluno[]>('/api/alunos');
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Aluno> => {
    const response = await api.get<Aluno>(`/api/alunos/${id}`);
    return response.data;
  },

  atualizar: async (id: number, aluno: Aluno): Promise<Aluno> => {
    const response = await api.put<Aluno>(`/api/alunos/${id}`, aluno);
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/api/alunos/${id}`);
  },

  // Rota específica do diagrama de classes
  visualizarNotas: async (id: number): Promise<Avaliacao[]> => {
    const response = await api.get<Avaliacao[]>(`/api/alunos/${id}/notas`);
    return response.data;
  }
};