import axios from "axios";
import config from "../../Security/config";
import sanitizer from "../../../Tools/sanitizer"

class update {

    static updateCollege = (data) => {

        const dataSanitized = {
            code: sanitizer.sanitizeInput(data.code, "string"),
            name: sanitizer.sanitizeInput(data.name, "string"),
            collegeno: sanitizer.sanitizeInput(data.collegeno, "string")
        }

        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.put(`${config.serverName}academicstructure/updateCollege`, dataSanitized)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static updateProgram = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.put(`${config.serverName}academicstructure/updateProgram`, data)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

}

export default update