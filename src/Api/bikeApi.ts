import axios from 'axios';
import { BASE_URL } from './urls';
import { axiosHandleResponse, getRequestConfig } from './ApiUtils';

const bikes_url = `${BASE_URL}bikes/`;

export enum BikeStatus {
  Available,
  Rented,
  Reserved,
  Blocked,
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
};

export const getBikes = async () => axios
  .get(bikes_url, getRequestConfig())
  .then((r) => axiosHandleResponse(r));

export const deleteBike = async (bikeID: string) => {
  const delete_url = `${bikes_url}${bikeID}/`;
  axios
    .delete(delete_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch(() => {
      console.log('Error in deleteBike api call');
    });
};
