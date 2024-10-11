import { create } from "zustand";

// Dados dos Usuarios
export type UserFitPlus = {
   //tela 1
   name: string;
   idade: string;
   altura: string;
   peso: string;
   //tela 2
   level: string;
   objetivo: string;
   genero: string;
};

// Salvamento de Informaçoes

type DataState = {
   user: UserFitPlus;
   setPageOne: (data: Omit<UserFitPlus, "genero" | "objetivo" | "level">) => void; // tela 1 = OMIT - IGNORA
   setPageTwo: (data: Pick<UserFitPlus, "genero" | "objetivo" | "level">) => void; // tela 2 = PICK - PEGAR
};

// New Uuser - Store

export const useDataStore = create<DataState>((set) => ({
   user: {
      name: "",
      idade: "",
      altura: "",
      peso: "",
      level: "",
      objetivo: "",
      genero: ""
   },

   // Metodo de manipulação de dados

   setPageOne: (data) =>
      set((state) => ({
         user: { ...state.user, ...data }
      })),

   setPageTwo: (data) =>
      set((state) => ({
         user: { ...state.user, ...data }
      }))
}));
