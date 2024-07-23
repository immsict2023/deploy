import axios from "axios";
import config from "../../Security/config";

class create {

    static createBlockSchedule = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}blockschedule/createBlockSchedule`, { params: data })
            .then((res) => {
                resolve(res)
            })  
            .catch((err) => {
                reject(err)
            })
        })
    }

    static createSubjectSchedule = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}blockschedule/createSubjectSchedule`, data)
            .then((res) => {
                resolve(res)
            })  
            .catch((err) => {
                reject(err)
            })
        })
    }
}

export default create;
