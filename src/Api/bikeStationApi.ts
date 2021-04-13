import {BASE_URL} from "./urls"
import {axiosHandleResponse} from "./ApiUtils"
import {Bike} from "./bikeApi"
import axios from "axios";

const station_url = BASE_URL + "stations/";

export enum BikeStationState {
    Working, Blocked,
}

export interface BikeStation {
    id: string;
    state: BikeStationState;
    name: string;
    bikes: Bike[];
}

export const postStation = async (stationName: string) => {
    axios({
        method: 'post',
        url: station_url,
        data: {
            name: stationName,
        }
    }).then(r => axiosHandleResponse(r)).catch(err => {
        console.log(err);
    });
}

export const getStations = async () => {
    return axios.get(station_url)
    .then(r => axiosHandleResponse(r))
    .catch(() => console.log("error"));
}

export const deleteBikeStation = async (stationID: string) => {
    let url = station_url + stationID + '/';
    axios.delete(url).then(r => axiosHandleResponse(r)).catch(() => {
        console.log("error");
    });
}
  