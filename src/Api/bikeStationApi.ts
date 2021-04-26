import {BASE_URL} from "./urls"
import {axiosHandleResponse, getRequestConfig} from "./ApiUtils"
import {Bike} from "./bikeApi"
import axios from "axios";

const station_url = BASE_URL + "stations/";

export enum StationState {
    Working, Blocked,
}

export interface Station {
    id: string;
    state: StationState;
    name: string;
    bikes: Bike[];
}

export const postStation = async (stationName: string) => {
    return axios.post(station_url, {name: stationName}, getRequestConfig())
    .then(r => axiosHandleResponse(r));
}

export const getStations = async () => {
    return axios.get(station_url, getRequestConfig())
    .then(r => axiosHandleResponse(r));
}

export const blockBikeStation = async (stationID: string) => {
    let url = `${station_url}blocked/`;
    axios.post(url, {id: stationID}, getRequestConfig())
    .then(r => axiosHandleResponse(r))
}

export const deleteBikeStation = async (stationID: string) => {
    let url = `${station_url}${stationID}/`;
    return axios.delete(url);
}
