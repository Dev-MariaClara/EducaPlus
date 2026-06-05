import { UsuarioBase } from './Usuario';

export interface Aluno extends UsuarioBase {
  matricula: string;
  turmaId?: number; // Referência opcional caso precise saber a turma de forma rápida
}