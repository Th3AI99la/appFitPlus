// Version 1.0.1
import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { routes } from "./routes";
import os from "os"; // Importa o módulo os para obter o endereço IP local

const app = Fastify({ logger: true });
dotenv.config();

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

// Função para obter o endereço IPv4 local
function getLocalIPv4() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    if (!iface) continue;
    for (const { family, address, internal } of iface) {
      if (family === "IPv4" && !internal) {
        return address;
      }
    }
  }
  return "localhost";
}

const start = async () => {
  app.register(cors);
  app.register(routes);

  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
    const localIPv4 = getLocalIPv4();
    console.log(`\nServidor rodando no IP - IPV4: ${localIPv4}:3333\n`);
  } catch (err) {
    console.log(err);
  }
};

start();
