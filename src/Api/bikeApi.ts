import {BASE_URL} from "./urls"
import {axiosHandleResponse, getRequestConfig} from "./ApiUtils"
import axios from "axios"

const bikes_url = BASE_URL + "bikes/";

export enum BikeState {
    Working, InService, Blocked,
}

export interface Bike {
    id: string;
    status: BikeState;
    station?: {
        id: string;
        name: string;
    };
}

export const postBike = async (station: string) => {
    axios.post(bikes_url, { stationId: station }, getRequestConfig());
}

export const getBikes = async () => {
    return axios.get(bikes_url, getRequestConfig())
    .then(r => axiosHandleResponse(r));
}

export const deleteBike = async (bikeID: string) => {
    let delete_url = `${bikes_url}${bikeID}/`;
    axios.delete(delete_url, getRequestConfig())
    .then(r => axiosHandleResponse(r))
    .catch(() => { console.log("Error in deleteBike api call"); });
}
    
