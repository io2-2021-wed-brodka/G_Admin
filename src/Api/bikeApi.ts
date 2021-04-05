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
    // return fetch(url,{
    //     method: "POST",
    //     headers: new Headers({
    //         'Accept': 'application/json',
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*", 
    //     }),
    //     body: JSON.stringify(bike.StationID?.toString())
    // }).then<T>(handleResponse).catch<T>(handleError);
    axios.post(url,JSON.stringify(bike.station?.toString())).then(r=>axiosHandleResponse(r));
}

export const getBikes = async () => {
    let url = bikes_url;
    type T = IApiResponse<Bike[]>;
    // alert("i ma getting bikes");
    // return fetch(url, {
    //     method: "GET",
    //     headers: new Headers({
    //         'Accept': 'application/json',
    //         "Content-Type": "application/json", 
    //         "Access-Control-Allow-Origin": "*",          
    //     })
    // }).then<T>(handleResponse).catch<T>(handleError);
    return axios.get(url).then(r=>axiosHandleResponse(r));
}

export const deleteBike = async (bikeID: number) => {
    let url = bikes_url + bikeID;
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url,{
        method: "DELETE",
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json"
        })
    }).then<T>(handleResponse).catch<T>(handleError);
}
    