import { Aluno } from './Aluno';
import { Professor } from './Professor';

export interface Turma {
  id?: number;
  nome: string;
  alunos?: Aluno[];
  professores?: Professor[];
}