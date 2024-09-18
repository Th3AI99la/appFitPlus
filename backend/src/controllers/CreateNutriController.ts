import { FastifyRequest, FastifyReply } from "fastify";

class CreateNutriController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    console.log("ROTA CHAMADA NUTRI CONTROLLER");

    reply.send({ message: "ROTA CHAMADA NUTRI" });
  }
}

export { CreateNutriController };
