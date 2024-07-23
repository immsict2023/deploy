import axios from "axios";
import config from "../../Security/config";

class create {

    static createPersonnel(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}personnel/postPersonnel`, data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

}

export default create