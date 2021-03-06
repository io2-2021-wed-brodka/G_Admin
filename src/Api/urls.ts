const env = process.env.REACT_APP_STAGE;

const prodUrl = 'http://ec2-18-156-197-166.eu-central-1.compute.amazonaws.com:8080/';
export const BASE_URL = env === 'prod' ? prodUrl : 'http://localhost:8000';

export const station_url = BASE_URL + "stations";
export const block_station_url = station_url + "/blocked";
export const active_station_url = station_url + "/active";
export const bikes_url = BASE_URL + "bikes";
export const login_url = BASE_URL + "login";
export const logout_url = BASE_URL + "logout";
export const users_url = BASE_URL + "users";
export const block_user_url = users_url + "/blocked";
export const techs_url = BASE_URL + "techs";
