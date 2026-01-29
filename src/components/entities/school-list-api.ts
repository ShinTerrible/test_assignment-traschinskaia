import axios from "axios";

const API_URL = "https://schooldb.skillline.ru/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  console.log(`${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

api.interceptors.response.use(
  (respons) => {
    return respons;
  },

  (error) => {
    const status = error.respons?.status;
    switch (status) {
      case 400:
        console.error("Ошибка валидации");
        break;
      case 404:
        console.error("Страница не найдена");
        break;

      case 429:
        console.warn("Слишком частые запросы");
        break;

      case 500:
        console.error("Ошибка сервера");
        break;

      default:
        console.error("Неизвестная ошибка");
    }

    return Promise.reject(error);
  },
);

export default api;
