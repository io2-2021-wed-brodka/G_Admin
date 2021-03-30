import { Http2ServerResponse } from "http2"
import { BASE_URL } from "./urls"
import { handleError, handleResponse, IApiResponse } from "./ApiUtils"

const bikes_url = BASE_URL + "bikes/"

export enum BikeState{
    Working,InService,Blocked,
  }
export  interface Bike{
    ID: number;
    State: BikeState;
    StationID?: number;
  }

export const postBike = async (bike: Bike) => {
    let url = bikes_url;
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url,{
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(bike)
    }).then<T>(handleResponse).catch<T>(handleError);
}

export const getBikes = async () => {
    let url = bikes_url + "getBikes";
    type T = IApiResponse<Bike[]>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json"
        })
    }).then<T>(handleResponse).catch<T>(handleError);
}
