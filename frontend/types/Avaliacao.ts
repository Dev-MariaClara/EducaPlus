// src/types/Avaliacao.ts
export interface Avaliacao {
  id?: number;
  tipo: string;
  peso: number;
  nota: number;
  alunoId: number; // Chave de ligação para o frontend saber de quem é a nota
}

// src/types/Frequencia.ts
export interface Frequencia {
  id?: number;
  data: string; // Vem como string ISO (ex: "2026-05-28") do Spring Boot
  presente: boolean;
  alunoId: number;
}