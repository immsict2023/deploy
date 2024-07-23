import axios from "axios"
import config from "../../Security/config"
import sanitizer, { sanitizeInput } from '../../../Tools/sanitizer'

class update {

    static updatePersonnelInformation(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.put(`${config.serverName}personnel/putPersonnelInformation`, data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static updatePersonnelBackground(data) {

        const dataSanitized = {
            school: data.school,
            datesattended: `${data.from_date}-${data.to_date}`,
            degreeno: data.degreeno,
            otherdegree: data.otherdegree,
            awardsandhonors: data.awardsandhonors,
            personnelid: data.personnelid
        }

        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.put(`${config.serverName}personnel/putPersonnelBackground`, dataSanitized)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}

export default update