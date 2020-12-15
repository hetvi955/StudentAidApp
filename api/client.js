import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.43.208:8888/",
});

export default apiClient;