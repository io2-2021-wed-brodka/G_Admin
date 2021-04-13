import {BASE_URL} from "./urls"
import {axiosHandleResponse, handleResponse} from "./ApiUtils"
import axios from "axios";

const login_url = BASE_URL + "login/";

export const postLogin = async (login: string, password: string) => {
    axios({
        method: 'post',
        url: login_url,
        data: {
            login: login,
            password: password,
            role: "admin"
        }
    }).then(r => axiosHandleResponse(r)).catch(() => {
        console.log("error");
    });
}
  