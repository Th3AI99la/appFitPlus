import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

import { CreateNutriController } from "./controllers/CreateNutriController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  // ROTA TESTE
  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
    console.log("ROTA CHAMADAAAA!!!");

    reply.send({ "DEU CERTO!!!!": true });
  });

  // ROTA TESTE CONTROLLER CREATE

  fastify.get(
    "/create", async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutriController().handle(request, reply);
    }
  );
}
