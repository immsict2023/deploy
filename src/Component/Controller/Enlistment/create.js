import axios from "axios"
import config from "../../Security/config"

class create {

    static createMatriculationChange = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}enlistment/createMatriculationChange`, data)
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                console.error(err)
                reject(err)
            })
        })
    }

    static createNewFeeDetail = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}enlistment/createNewFeeDetail`, data)
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                console.error(err)
                reject(err)
            })
        })
    }

    static createNewSubject = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}enlistment/createNewSubject`, data)
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                console.error(err)
                reject(err)
            })
        })
    }

    static createEnlistStudent = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}enlistment/createEnlistStudent`, data)
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                console.error(err)
                reject(err)
            })
        })
    }

}

export default create