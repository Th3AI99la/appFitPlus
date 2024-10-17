// TIPAGEM DOS DADOS

interface RefeicoesProps {
   horario: string;
   nome: string;
   alimentos: string[];
}

export interface Data {
   nome: string;
   idade: number;
   genero: string;
   altura: number;
   peso: number;
   level: string;
   objetivo: string;
   refeicoes: RefeicoesProps[];
}
