import axios from "axios"
import config from "../../Security/config"

class view {

    static getClassroomList = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}classroom/getClassroomList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

}

export default view;








































export const getClassroomList = (axios, config) => {
    
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.get(`${config.serverName}classroom/getClassroomList`)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}