import { block_user_url, users_url } from "./urls";
import {
  axiosHandleResponse,
  getRequestConfig,
  IApiResponse,
} from "./utilsApi";
import axios from "axios";

export interface User {
  id: string;
  name: string;
}
interface Users {
  users: User[];
}

export const getUsers = async (): Promise<IApiResponse<Users>> => {
  return axios
    .get(users_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const blockUser = async (userID: string) => {
  axios
    .post(block_user_url, { id: userID }, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const getBlockedUsers = async (): Promise<IApiResponse<Users>> => {
  return axios
    .get(block_user_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const unblockUser = async (userID: string) => {
  const block_user_id_url = `${block_user_url}${userID}/`;
  axios
    .delete(block_user_id_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};
