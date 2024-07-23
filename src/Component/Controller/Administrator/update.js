import axios from "axios";
import config from "../../Security/config";

class updateAdministrator {

    static updateSettings = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.put(`${config.serverName}administrator/updateSettings`, data)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

}

export default updateAdministrator;