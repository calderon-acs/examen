import { axiosGlobal } from "./GlobalAxios";

const local = axiosGlobal.create({ baseURL: process.env.REACT_APP_API_URL });

export { local };
