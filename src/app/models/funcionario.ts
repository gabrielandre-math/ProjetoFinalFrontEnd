export interface Funcionario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  perfis: number[]; 
  senha?: string; 
  dataCriacao?: Date | string; 
}
