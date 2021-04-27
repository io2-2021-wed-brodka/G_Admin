import {bikes_url} from "./urls"
import {axiosHandleResponse, getRequestConfig} from "./utilsApi"
import axios from "axios"



export enum BikeStatus {
    available, rented, reserved, blocked,
}

export interface Bike {
    id: string;
    status: BikeStatus;
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
    
