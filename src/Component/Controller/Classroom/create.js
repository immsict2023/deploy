import axios from "axios";
import config from "../../Security/config";

class create {

    static createClassrrom = async (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}classroom/createClassroom`, data)
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