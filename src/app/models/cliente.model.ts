// src/app/models/cliente.model.ts

export interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    senha: string;
    perfis: string[];
    dataCriacao: string | Date; // Alterado para aceitar string ou Date
  }
  