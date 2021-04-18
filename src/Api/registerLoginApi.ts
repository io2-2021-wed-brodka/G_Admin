import {BASE_URL} from "./urls"
import axios from "axios";
import {AxiosResponse} from "axios"
import {axiosHandleResponse, IApiResponse} from "./ApiUtils"

const login_url = BASE_URL + "login/";
const logout_url = BASE_URL + "logout/";

export const postLogin = async (login: string, password: string) => {
    axios({
        method: 'post',
        url: login_url,
        data: {
            login: login,
            password: password,
            role: "user"
        }
    }).then(r => axiosHandleLoginResponse(r)).catch(() => {
        console.log("error"); });
}

const axiosHandleLoginResponse = async <T>(response: AxiosResponse): Promise<IApiResponse<T>> => {
    if (response.status >= 200 && response.status < 300) {
        let token = response.data.token;
        sessionStorage.setItem("token", token);
        //setDefaultHeader(token);
        window.location.href="/"; // odśwież całą stronę oraz przenieś na główną stronę
        return {
            isError: false,
            responseCode: response.status,
            data: response.status !== 204 ? await response.data : null,
        }
    } else {
        return {
            isError: true,
            responseCode: response.status,
            errorMessage: await response.data,
        }
    }
}

const setDefaultHeader = (token : string | null) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.common["Content-Type"] = "application/json";
}

export const postLogout = async () => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
    };
    axios.post(logout_url, {}, {headers}).then(r => { 
            axiosHandleResponse(r); 
            sessionStorage.clear();
            //setDefaultHeader(null);
            window.location.href="/login";})
        .catch(() => { console.log("error"); });
}
  