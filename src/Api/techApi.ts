import axios from "axios";
import { techs_url } from "./urls";
import {
  IApiResponse,
  getRequestConfig,
  axiosHandleResponse,
} from "./utilsApi";

export interface Tech {
  id: string;
  name: string;
}
export interface Techs {
  techs: Tech[];
}
export interface NewTech {
  name: string;
  passworld: string;
}

export const getTechs = async (): Promise<IApiResponse<Techs>> => {
  return axios
    .get(techs_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const addTech = async (newTech: NewTech) => {
  axios
    .post(
      techs_url,
      { name: newTech.name, password: newTech.password },
      getRequestConfig()
    )
    .then((r) => axiosHandleResponse(r));
};

export const getTech = async (techID: string) => {
  let url = `${techs_url}${techID}/`;
  return axios.get(url, getRequestConfig());
};

export const deleteTech = async (techID: string) => {
  let url = `${techs_url}${techID}/`;
  return axios.delete(url, getRequestConfig());
};
