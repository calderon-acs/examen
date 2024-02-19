import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Cookies from "universal-cookie";

// Exporta una función que devuelve una instancia de Axios personalizada con los interceptores
export const axiosGlobal = {
  create: (config: CreateAxiosDefaults): AxiosInstance => {
    let instance = axios.create(config);

    instance.interceptors.request.use(
      (config) => {
        const cookies = new Cookies(null, { path: "/" });

        cookies.get("Session");

        let session = cookies.get("Session");

        if (session) {
          config.headers.Authorization = `Bearer ${session}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (config) => {
        return config.data;
      },
      (error) => {
        const cookies = new Cookies(null, { path: "/" });
        console.log(error);
        if (error.response && error.response.status === 401) {
          cookies.remove("Session", { path: "/" });

          window.location.href = "/";
        }
        let msg = "";
        if (error.response && error.response.data) {
          msg = error.response.data;
        } else {
          msg = error.message;
        }
        toast.error(msg);
        return Promise.reject(error);
      }
    );

    return instance;
  },
};
