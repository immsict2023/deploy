import axios from 'axios';
import config from '../../Security/config';

class view {

    static getTotalStudentEnrolled() {
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getTotalStudentEnrolled`).then((res) => {
                resolve(res.data.id)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getStudentWithStudentid(id) {
        axios.defaults.withCredentials = true;
        const studentid = {studentid: id}
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getStudentData`, { params: studentid }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getStudentDataForLedger(id) {
        axios.defaults.withCredentials = true;
        const studentid = {studentid: id}
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getStudentDataForLedger`, { params: studentid }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getInstallmentStudentLedger(id) {
        axios.defaults.withCredentials = true;
        const data = {studentid: id}
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getInstallmentStudentLedger`, { params: data }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getChargeStudentLedger(id) {
        axios.defaults.withCredentials = true;
        const studentid = {studentid: id}
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getChargeStudentLedger`, { params: studentid }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getStudentSection(block) {
        axios.defaults.withCredentials = true;
        const blockid = {blockid: block}
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getStudentSection`, { params: blockid }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }       

    static getRegistrationFee(registrationid) {
        axios.defaults.withCredentials = true;
        const registrationno = {registrationno: registrationid}
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getRegistrationFee`, { params: registrationno }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getRegistrationDetails(registrationid) {
        axios.defaults.withCredentials = true;
        const registrationno = {registrationno: registrationid}
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getRegistrationDetails`, { params: registrationno }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getBankList() {
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getBankList`).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getAccountCharge(data) {
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getAccountCharge`, {params: data}).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getEnrolledList() {
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getEnrolledList`).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getTotalPayable(StudentID) {
        const data = {StudentID}
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getTotalPayable`, {params: data}).then((res) => {
                resolve(res.data.rows[0])
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getAccountChargeList() {
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getAccountChargeList`).then((res) => {
                resolve(res.data.rows)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getAccountPaymentListPartial() {
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getAccountPaymentListPartial`).then((res) => {
                resolve(res.data.rows)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getAccountChargeIndividual(RegistrationNo) {
        const data = {RegistrationNo}
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getAccountChargeIndividual`, {params: data}).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getStudentPermitList() {
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getStudentPermitList`).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getTransferStudentDetails() {
        axios.defaults.withCredentials = true;
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}student/getTransferStudentDetails`).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static getStudentList = () =>{
        return new Promise((resolve, reject) => {
            axios.default.withCredentials = true
            axios.get(`${config.serverName}student/getStudentList`)
            .then((response)=>{
                resolve(response.data.rows)
            })
            .catch((err) => reject(err))
        })
    }

    static getStudentEnlistmentList = () =>{
        return new Promise((resolve, reject) => {
            axios.default.withCredentials = true
            axios.get(`${config.serverName}student/getStudentEnlistmentList`)
            .then((response)=>{
                resolve(response.data.rows)
            })
            .catch((err) => reject(err))
        })
    }

    static getAccountPayment = (data) =>{
        return new Promise((resolve, reject) => {
            axios.default.withCredentials = true
            axios.get(`${config.serverName}student/getAccountPayment`, { params: data })
            .then((res)=>{
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}

export default view;
