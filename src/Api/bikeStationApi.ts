import { block_station_url, active_station_url, station_url } from "./urls";
import {
  axiosHandleResponse,
  getRequestConfig,
  IApiResponse,
} from "./utilsApi";
import { Bike } from "./bikeApi";
import axios from "axios";

export enum StationState {
  Working,
  Blocked,
}

export interface Station {
  id: string;
  state: StationState;
  name: string;
  activeBikesCount: number;
  bikes: Bike[];
}
interface Stations {
  stations: Station[];
}
export const postStation = async (stationName: string) => {
  return axios
    .post(station_url, { name: stationName }, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const getStations = async (): Promise<IApiResponse<Stations>> => {
  return axios
    .get(station_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const blockStation = async (stationID: string) => {
  axios
    .post(block_station_url, { id: stationID }, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const unblockStation = async (stationID: string) => {
  const block_station_id_url = `${block_station_url}${stationID}/`;
  axios
    .delete(block_station_id_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};


export const deleteBikeStation = async (stationID: string) => {
  let url = `${station_url}${stationID}/`;
  return axios.delete(url, getRequestConfig());
};

export const getActiveStations = async (): Promise<IApiResponse<Stations>> => {
  return axios
    .get(active_station_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const getBlockedStations = async (): Promise<IApiResponse<Stations>> => {
  return axios
    .get(block_station_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};