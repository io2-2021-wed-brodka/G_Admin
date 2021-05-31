import { login_url, logout_url } from "./urls";
import axios from "axios";
import { AxiosResponse } from "axios";
import {
  axiosHandleResponse,
  getRequestConfig,
  IApiResponse,
} from "./utilsApi";

const axiosHandleLoginResponse = async <T>(
  response: AxiosResponse
): Promise<IApiResponse<T>> => {
  if (response.status >= 200 && response.status < 300) {
    // frontend validation (hack) so that you can't login to admin with user/tech credentials
    if (response.data.role !== "admin") {
      alert("Bad credentials");
      window.location.href = "/login"; // refresh and redirect to main page
    }
    else {
      sessionStorage.setItem("token", response.data.token);
      window.location.href = "/"; // refresh and redirect to main page
    }
    return {
      isError: false,
      responseCode: response.status,
      data: response.status !== 204 ? await response.data : null,
    };
  } else {
    return {
      isError: true,
      responseCode: response.status,
      errorMessage: await response.data,
    };
  }
};

export const postLogin = async (login: string, password: string) => {
  axios
    .post(login_url, {
      login: login,
      password: password,
      role: "admin",
    })
    .then((r) => axiosHandleLoginResponse(r))
    .catch((r) => {
      if (r.response.status === 401) alert("Bad credentials");
      else console.log("error");
    });
};

export const postLogout = async () => {
  axios
    .post(logout_url, {}, getRequestConfig())
    .then((r) => {
      axiosHandleResponse(r);
      sessionStorage.clear();
      window.location.href = "/login";
    })
    .catch(() => {
      console.log("error");
    });
};
