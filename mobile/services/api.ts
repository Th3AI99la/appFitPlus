import axios from "axios";

// API - conectada ao IPV4 - http://192.168.1.103:8888 /create 
// 172.20.10.4:8888

export const api = axios.create({
   baseURL: "http://172.20.10.4:8888"
   
});
