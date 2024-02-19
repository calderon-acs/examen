import { local } from "../interceptors/Default.interceptor";

export const getArticulos = () => {
  return local.get("/articulo");
};

export const saveArticulo = (data:any) => {
  return local.post("/articulo", data);
};