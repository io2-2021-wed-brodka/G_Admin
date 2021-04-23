import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from './urls';
import {
  axiosHandleResponse,
  getRequestConfig,
  IApiResponse,
} from './ApiUtils';

const login_url = `${BASE_URL}login/`;
const logout_url = `${BASE_URL}logout/`;

const axiosHandleLoginResponse = async <T>(
  response: AxiosResponse,
): Promise<IApiResponse<T>> => {
  if (response.status >= 200 && response.status < 300) {
    sessionStorage.setItem('token', response.data.token);
    window.location.href = '/'; // refresh and redirect to main page
    return {
      isError: false,
      responseCode: response.status,
      data: response.status !== 204 ? await response.data : null,
    };
  }
  return {
    isError: true,
    responseCode: response.status,
    errorMessage: await response.data,
  };
};

export const postLogin = async (login: string, password: string) => {
  axios
    .post(login_url, {
      login,
      password,
      role: 'admin',
    })
    .then((r) => axiosHandleLoginResponse(r))
    .catch((r) => {
      if (r.response.status == 401) alert('Bad credentials');
      else console.log('error');
    });
};

export const postLogout = async () => {
  axios
    .post(logout_url, {}, getRequestConfig())
    .then((r) => {
      axiosHandleResponse(r);
      sessionStorage.clear();
      window.location.href = '/login';
    })
    .catch(() => {
      console.log('error');
    });
};
