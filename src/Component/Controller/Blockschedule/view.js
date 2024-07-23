import config from "../../Security/config"
import axios from "axios"

class view {

    static getScheduleList = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}blockschedule/getScheduleList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getPossibleBlockID = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}blockschedule/getPossibleBlockID`, { params: data })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getCurriculumDetailsSubject = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}blockschedule/getCurriculumDetailsSubject`, { params: data })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getTimeFromSchedule = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}blockschedule/getTimeFromSchedule`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getTimeSpanSchedule = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}blockschedule/getTimeSpanSchedule`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getSubjectSchedule = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}blockschedule/getSubjectSchedule`, { params: data })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getBlockIndividual = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}blockschedule/getBlockIndividual`, { params: data })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getSectionList = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}blockschedule/getSectionList`, { params: data })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}

export default view









































export const getBlockSchedule = (axios, config) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.get(`${config.serverName}blockschedule/getEnlistmentList`)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}