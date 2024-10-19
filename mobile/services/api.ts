import axios from "axios";

// API - conectada ao IPV4 - http://192.168.1.103:8888 /create

// http://10.200.2.228:8888 - UEG

export const api = axios.create({
   baseURL: "http://192.168.1.104:8888"
});
