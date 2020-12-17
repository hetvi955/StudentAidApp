import { create } from "apisauce";
import AuthStorage from "../Auth/storage";

const apiClient = create({
  baseURL: "http://192.168.43.208:8888/",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await AuthStorage.getToken();
  if (!authToken) return;
  request.headers["Auth-Token"] = authToken;
});

export default apiClient;