import { AxiosResponse } from "axios";

export interface IApiResponse<T> {
  isError: boolean;
  errorMessage?: string;
  responseCode: number;
  data?: T;
}

export const handleResponse = async <T>(
  response: Response
): Promise<IApiResponse<T>> => {
  if (response.ok) {
    return {
      isError: false,
      responseCode: response.status,
      data: response.status !== 204 ? await response.json() : null,
    };
  }
  return {
    isError: true,
    responseCode: response.status,
    errorMessage: await response.text(),
  };
};
export const axiosHandleResponse = async <T>(
  response: AxiosResponse
): Promise<IApiResponse<T>> => {
  if (response.status >= 200 && response.status < 300) {
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

export const handleError = async <T>(error: any): Promise<IApiResponse<T>> => ({
  isError: true,
  responseCode: error.status,
  errorMessage: error.message,
});

export const getRequestConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
