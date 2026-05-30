// src/types/Material.ts
export type TipoMaterial = 'PDF' | 'DOCX' | 'PPTX' | 'LINK';

export interface Material {
  id?: number;
  tipo: TipoMaterial;
  arquivo: string; // URL ou nome do arquivo
  turmaId?: number;
}

// src/types/Notificacao.ts
export type TipoNotificacao = 'AVISO' | 'TAREFA' | 'FALTA' | 'SISTEMA';

export interface Notificacao {
  id?: number;
  mensagem: string;
  tipo: TipoNotificacao;
  dataEnvio: string;
  destinatariosIds: number[];
}