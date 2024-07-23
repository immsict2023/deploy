import axios from "axios"
import config from "../../Security/config"

class view {

    static getSemesterSettings = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}administrator/getSemesterSettings`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getTransactionItem = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}administrator/getTransactionItem`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getSettings = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}administrator/getSettings`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getInstallmentPlan = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}administrator/getInstallment`)
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















































export const getSettings = (axios, config) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.get(`${config.serverName}administrator/getSettings`)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export const getInstallment = (axios, config) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.get(`${config.serverName}administrator/getInstallment`)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export const getSemesterSettings = (axios, config) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.get(`${config.serverName}administrator/getSemesterSettings`)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export const getOtherFees = (axios, config) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.get(`${config.serverName}administrator/getOtherFees`)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export const getMiscellaneousFee = (axios, config) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.get(`${config.serverName}administrator/getMiscellaneousFee`)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export const getGradingSystem = (axios, config) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.get(`${config.serverName}administrator/getGradingSystem`)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

