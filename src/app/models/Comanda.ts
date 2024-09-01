export interface Comanda {
    id: number;
    imagemUrl: string;
    dataAbertura: string;
    dataFechamento?: string;
    prioridade: number;
    status: string;
    titulo: string;
    observacoes: string;
    mesa: string;
    cliente: number;
    funcionario: number;
    nomeFuncionario: string;
    nomeCliente: string; 
  }
  