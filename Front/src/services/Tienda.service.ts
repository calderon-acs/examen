import { local } from "../interceptors/Default.interceptor";

export const saveTienda = (data:any) => {
  return local.post("/tienda", data);
};


export const getTienda = () => {
    return local.get("/tienda");
  };
  