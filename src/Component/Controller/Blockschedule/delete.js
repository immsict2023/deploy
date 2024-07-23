import axios from "axios"
import config from "../../Security/config"

class deleteSchedule {

    static deleteSubjectSchedule = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.delete(`${config.serverName}blockschedule/deleteSubjectSchedule`, { params: data })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

}

export default deleteSchedule;