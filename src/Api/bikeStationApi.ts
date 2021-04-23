import axios from 'axios';
import { BASE_URL } from './urls';
import { axiosHandleResponse, getRequestConfig } from './ApiUtils';
import { Bike } from './bikeApi';

const station_url = `${BASE_URL}stations/`;

export enum StationState {
  Working,
  Blocked,
}

export interface Station {
  id: string;
  state: StationState;
  name: string;
  bikes: Bike[];
}

export const postStation = async (stationName: string) => axios
  .post(station_url, { name: stationName }, getRequestConfig())
  .then((r) => axiosHandleResponse(r));

export const getStations = async () => axios
  .get(station_url, getRequestConfig())
  .then((r) => axiosHandleResponse(r));

export const blockBikeStation = async (stationID: string) => {
  const url = `${station_url}blocked/`;
  axios
    .post(url, { id: stationID }, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const deleteBikeStation = async (stationID: string) => {
  const url = `${station_url}${stationID}/`;
  axios.delete(url, getRequestConfig()).then((r) => axiosHandleResponse(r));
};
