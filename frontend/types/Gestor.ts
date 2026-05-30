// src/types/Gestor.ts
import { UsuarioBase } from './Usuario';

export interface Gestor extends UsuarioBase {
  cargo: string;
}

// src/types/Responsavel.ts
import { UsuarioBase } from './Usuario';

export interface Responsavel extends UsuarioBase {
  parentesco: string;
}