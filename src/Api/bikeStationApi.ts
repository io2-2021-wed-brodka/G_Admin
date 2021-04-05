import { Http2ServerResponse } from "http2"
import { BASE_URL } from "./urls"
import { handleError, handleResponse, IApiResponse } from "./ApiUtils"
import { Bike } from "./bikeApi"

const target_url = BASE_URL + "stations/"

export enum BikeStationState{
    Working,Blocked,
  }
  export  interface BikeStation{
    ID: number;
    State: BikeStationState;
    LocationName: string;
    Bikes: Bike[];
}

export const postBikeStations = async (station: BikeStation) => {
    let url = target_url;
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url,{
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(station.LocationName)
    }).then<T>(handleResponse).catch<T>(handleError);
}

export const getBikeStations = async () => {
    let url = target_url + "getStations";
    type T = IApiResponse<Bike[]>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json"
        })
    }).then<T>(handleResponse).catch<T>(handleError);
}

export const deleteBikeStation = async(stationID: string) =>
{
    let url = target_url+"deleteGroup";
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url ,{
        method: "DELETE",
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(stationID)
    }).then<T>(handleResponse).catch<T>(handleError);
}
  