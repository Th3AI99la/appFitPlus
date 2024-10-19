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
    let responseText =
      '```json\n{\n  "nome": "TESTE DO THALLES",\n  "sexo": "Masculino",\n  "idade": 23,\n  "altura": 1.78,\n  "peso": 70,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "08:00",\n      "nome": "Café da Manhã",\n      "alimentos": [\n        "2 fatias de pão integral",\n        "2 ovos mexidos",\n        "1 banana",\n        "1 copo de leite desnatado"\n      ]\n    },\n    {\n      "horario": "10:30",\n      "nome": "Lanche da Manhã",\n        "alimentos": [\n          "1 iogurte grego com granola"\n        ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoço",\n      "alimentos": [\n        "150g de frango grelhado",\n        "1 xícara de arroz integral",\n        "1 xícara de brócolis",\n        "Salada verde a vontade"\n      ]\n    },\n    {\n      "horario": "15:30",\n      "nome": "Lanche da Tarde",\n        "alimentos": [\n          "1 batata doce média",\n          "1 scoop de whey protein"\n        ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de carne vermelha magra",\n        "1 xícara de batata doce",\n        "1 xícara de couve-flor"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "nome": "Lanche da Noite",\n      "alimentos": [\n        "Caseína (opcional)"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Whey Protein",\n    "Creatina",\n    "BCAA"\n  ]\n}\n```';

    try {
      // Para extrair o JSON  (jsonStrin), A função  ".trim()" serve para remover espaço.
      let jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();

      // Conversão da jsonString, para um parse
      let jsonObject = JSON.parse(jsonString);

      // RETURN DE TESTE
      return reply.send({ data: jsonObject });
    } catch (err) {
      console.log(err);
    }
  });

  // ROTA CREATE NEW PERSON

  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutriController().handle(request, reply);
    }
  );
}
