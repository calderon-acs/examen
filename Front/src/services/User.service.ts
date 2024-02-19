import { local } from "../interceptors/Default.interceptor";

export const getSession = (sessionData:any) => {
  return local.post("user", sessionData);
};
