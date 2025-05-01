// Sempre alterar de acordo com o IP do servidor que está rodando o backend
// Para saber o IP do servidor, basta digitar no terminal o comando: ipconfig
// E procurar pelo IPV4
// Alterar o IP no baseURL

import axios from "axios";

// API - conectada ao IPV4 - http://192.168.1.103:8888 /create

// http://10.200.2.228:8888 - UEG

export const api = axios.create({
   baseURL: "http://192.168.15.90:8888"
});

// verificar esse erro do package.json