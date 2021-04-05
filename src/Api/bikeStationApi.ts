import { Http2ServerResponse } from "http2"
import { BASE_URL } from "./urls"
import { axiosHandleResponse, handleError, handleResponse, IApiResponse } from "./ApiUtils"
import { Bike } from "./bikeApi"
import axios from "axios";

const target_url = BASE_URL + "stations/";
const station_url = BASE_URL + "stations/";
export enum BikeStationState{
    Working,Blocked,
  }
  export  interface BikeStation{
    id: number;
    state: BikeStationState;
    name: string;
    bikes: Bike[];
}

export const postBikeStations = async (station: BikeStation) => {
    let url = station_url;
    type T = IApiResponse<Http2ServerResponse>;
    axios({
        method: 'post',
        url: url,
        data: {
            name: station.name,
        }
      });
}

export const getBikeStations = async () => {
    let url = station_url;
    type T = IApiResponse<Bike[]>;
    return axios.get(url).then(r=>axiosHandleResponse(r));
}

export const deleteBikeStation = async(stationID: string) =>
{
    let url = station_url + stationID+'/';
    type T = IApiResponse<Http2ServerResponse>;
    let res =  axios.delete(url).then(r=>axiosHandleResponse(r)).catch(()=>{console.log("error");});
}
  