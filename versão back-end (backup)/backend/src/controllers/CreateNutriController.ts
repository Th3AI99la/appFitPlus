import { FastifyRequest, FastifyReply } from "fastify";

import { CreateNutriService } from "../services/CreateNutriService";

// TIPAGEN
export interface DataProps {
  nome: string;
  idade: number;
  genero: string;
  altura: number;
  peso: number;
  level: string;
  objetivo: string;
}

class CreateNutriController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // PEGAR DO BODY E PASSAR PARA APLICAÇÃO
    const { nome, peso, altura, idade, genero, objetivo, level } =
      request.body as DataProps;

    const createNutri = new CreateNutriService();

    const nutri = await createNutri.execute({
      nome,
      idade,
      genero,
      altura,
      peso,
      level,
      objetivo,
    });

    reply.send(nutri);
  }
}

export { CreateNutriController };
