// TIPAGEM DOS DADOS

interface RefeicoesProps {
   horario: string;
   nome: string;
   alimentos: string[];
}

// Refeicoes =  RefeicoesProps[]
export interface Data {
   nome: string;
   idade: number;
   genero: string;
   altura: number;
   peso: number;
   level: string;
   objetivo: string;
   refeicoes: RefeicoesProps[];
   suplementos: string[];
}
