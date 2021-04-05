import { Http2ServerResponse } from "http2"
import { BASE_URL } from "./urls"
import { axiosHandleResponse, handleError, handleResponse, IApiResponse } from "./ApiUtils"
import axios from "axios"

const bikes_url = BASE_URL + "bikes/"

export enum BikeState{
    Working,InService,Blocked,
  }
export  interface Bike{
    id: number;
    state: BikeState;
    station?: number;
  }

export const postBike = async (bike: Bike) => {
    let url = bikes_url;
    type T = IApiResponse<Http2ServerResponse>;
    axios.post(url,JSON.stringify(bike.station?.toString())).then(r=>axiosHandleResponse(r));
}

export const getBikes = async () => {
    let url = bikes_url;
    type T = IApiResponse<Bike[]>;
    return axios.get(url).then(r=>axiosHandleResponse(r));
}

export const deleteBike = async (bikeID: number) => {
    let url = bikes_url + bikeID+'/';
    type T = IApiResponse<Http2ServerResponse>;
  let res =  axios.delete(url).then(r=>axiosHandleResponse(r)).catch(()=>{console.log("error");});
}
    