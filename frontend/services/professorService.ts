import api from './api';
import { Professor } from '../types/Professor';
import { Avaliacao } from '../types/Avaliacao';
import { Frequencia } from '../types/Frequencia';

export const professorService = {
  cadastrar: async (professor: Omit<Professor, 'id'>): Promise<Professor> => {
    const response = await api.post<Professor>('/api/professores', professor);
    return response.data;
  },

  listarTodos: async (): Promise<Professor[]> => {
    const response = await api.get<Professor[]>('/api/professores');
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Professor> => {
    const response = await api.get<Professor>(`/api/professores/${id}`);
    return response.data;
  },

  atualizar: async (id: number, professor: Professor): Promise<Professor> => {
    const response = await api.put<Professor>(`/api/professores/${id}`, professor);
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/api/professores/${id}`);
  },

  // Ações específicas do diagrama
  lancarNota: async (professorId: number, avaliacao: Avaliacao): Promise<void> => {
    await api.post(`/api/professores/${professorId}/avaliacoes`, avaliacao);
  },

  registrarFrequencia: async (professorId: number, frequencia: Frequencia): Promise<void> => {
    await api.post(`/api/professores/${professorId}/frequencias`, frequencia);
  }
};