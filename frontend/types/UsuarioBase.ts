export type PerfilAcesso = 'ALUNO' | 'PROFESSOR' | 'GESTOR' | 'RESPONSAVEL';

export interface UsuarioBase {
  id?: number;
  nome: string;
  email: string;
  // A senha não vem do backend nas listagens, então não a colocamos na interface de leitura
}