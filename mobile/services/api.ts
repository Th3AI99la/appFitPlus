import axios from "axios";
import Constants from "expo-constants";

// Pega o IP local da máquina onde o Expo está rodando
const LOCAL_IP = Constants.expoConfig?.hostUri?.split(":")[0];

// Cria a instância do axios usando o IP detectado
export const api = axios.create({
  baseURL: `http://${LOCAL_IP}:3333` // Seu backend Fastify
});
