// Version 1.0.1
import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { routes } from "./routes";

const app = Fastify({ logger: true });
dotenv.config();

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  app.register(cors);
  app.register(routes);

  try {
    await app.listen({ port: 8888, host: "0.0.0.0" });
    console.log("\nServidor rodando no localhost 8.8.8.8\n");
  } catch (err) {
    console.log(err);
  }
};

start();
