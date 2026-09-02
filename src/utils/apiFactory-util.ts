import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const proxyUrl = process.env.HTTPS_PROXY_URL!;

const proxyAgent =
  process.env.NODE_ENV === "production"
    ? new HttpsProxyAgent(proxyUrl)
    : undefined;

export const createApiInstance = (token: string) => {
  const instance = axios.create({
    baseURL: process.env.SAP_PROXY_URL!,
    timeout: 60000,
    ...(proxyAgent && {
      httpsAgent: proxyAgent,
    }),
  });

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    const fullUrl = axios.getUri(config);

    console.log("Axios Request URL:", fullUrl);
    return config;
  });

  return instance;
};
