import {BASE_URL} from "./urls"
import {axiosHandleResponse} from "./ApiUtils"
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
    let res =  await axios({
        method: 'post',
        url: bikes_url,
        data: {
            stationId: station,
        }
    });
}

export const getBikes = async () => {
    return axios.get(bikes_url).then(r =>  axiosHandleResponse(r));
}

export const deleteBike = async (bikeID: string) => {
    let delete_url = bikes_url + bikeID + '/';
    let res =  await axios.delete(delete_url).then(r => axiosHandleResponse(r)).catch(() => {
        console.log("Error in deleteBike api call");
    });
}
    
