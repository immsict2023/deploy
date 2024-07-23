import axios from "axios";
import config from "../../Security/config";

class auth {

    static isAuthenticated = async () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}auth0/isAuthenticated`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
  
    static userRole = async () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}user/userInfo`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static userLogout = async () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}auth0/logout`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}

export default auth