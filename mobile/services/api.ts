import axios from "axios";

// API - conectada ao IPV4 - http://192.168.1.103:8888 /create

export const api = axios.create({
   baseURL: "http://190.178.2.115:8888"
});
