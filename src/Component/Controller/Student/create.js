import axios from 'axios';
import config from '../../Security/config';

class create {
    
    static createStudentInformation = (data) => {
        return new Promise((resolve, reject) => {
            try {
                
                // Student Information
                axios.defaults.withCredentials = true;
                axios.post(`${config.serverName}student/postStudentInformation`, data)
                .then((res) => {
                    console.log(res)
                    if (!Boolean(res.data.success)) {
                        if (Number(res.data.res.affectedRows) === 0) {
                            console.log(res)
                            reject({message: 'Something Error! Please Contact the Software Developer!'})
                        }
                    }
                    
                    if (Boolean(res.data.success)) {
                        if (Number(res.data.res.affectedRows) > 0) {
                            resolve({message: res.data.message, success: res.data.res.affectedRows })
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            } catch (err) {
                resolve({message: err.data.message })
                console.log(err)
            }
        })
    }
    
    static createPayments(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}student/createPayments`, data )
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