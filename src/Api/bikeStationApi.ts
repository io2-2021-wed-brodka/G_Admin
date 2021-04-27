import {block_station_url, station_url} from "./urls"
import {axiosHandleResponse, getRequestConfig} from "./utilsApi"
import {Bike} from "./bikeApi"
import axios from "axios";

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
    axios.post(block_station_url, {id: stationID}, getRequestConfig())
    .then(r => axiosHandleResponse(r))
}

export const deleteBikeStation = async (stationID: string) => {
    let url = `${station_url}${stationID}/`;
    axios.delete(url, getRequestConfig())
    .then(r => axiosHandleResponse(r))
}
