import {Http2ServerResponse} from "http2"
import {BASE_URL} from "./urls"
import {axiosHandleResponse, IApiResponse} from "./ApiUtils"
import axios from "axios"

const bikes_url = BASE_URL + "bikes/"

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
    let url = bikes_url;
    type T = IApiResponse<Http2ServerResponse>;
    axios({
        method: 'post',
        url: url,
        data: {
            stationId: station,
        }
    });
}

export const getBikes = async () => {
    return axios.get(bikes_url).then(r => axiosHandleResponse(r));
}

export const deleteBike = async (bikeID: string) => {
    let url = bikes_url + bikeID + '/';
    type T = IApiResponse<Http2ServerResponse>;
    let res = axios.delete(url).then(r => axiosHandleResponse(r)).catch(() => {
        console.log("error");
    });
}
    