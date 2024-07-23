import axios from "axios";
import config from "../../Security/config";

class view {

    static enlistmentList = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getEnlistmentList`)
            .then((res)=> {
                resolve(res)
            })
            .catch((err) => {
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getStudentEnlistment = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getStudentEnlistment`, {params: data })
            .then((res)=> {
                resolve(res)
            })
            .catch((err) => {
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getMatriculationChange = (registrationno) => {
        const data = {registrationno}
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getMatriculationChange`, {params: data })
            .then((res)=> {
                resolve(res)
            })
            .catch((err) => {
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getRegistrationFeeDetails = (registrationno) => {
        const data = {registrationno}
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getRegistrationFeeDetails`, {params: data })
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getSubjectSchedule = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getSubjectSchedule`)
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getStudentForEnlistment = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getStudentForEnlistment`)
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getStudentTotalEnroll = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getStudentTotalEnroll`)
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getStudentOldAccountBalance = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getStudentOldAccountBalance`, {params: data })
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getBlockSection = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getBlockSection`, {params: data })
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getStudentEnlistSubject = (BlockID, Year, Sem) => {
        const data = { BlockID, Year, Sem }
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getStudentEnlistSubject`, {params: data })
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getOthersFeesList = (YearLevel) => {
        const data = { YearLevel }
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getOthersFeesList`, {params: data })
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }

    static getMiscellaneousFeesList = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}enlistment/getMiscellaneousFeesList`)
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                if (err.request) {
                    alert('No internet connection');
                }
                console.error(err)
                reject(err)
            })
        })
    }
}

export default view