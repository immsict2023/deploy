import axios from "axios";
import config from "../../Security/config";

class update {

    static updateDropEnlistmentDetails(item) {
        const data = {item}

        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.put(`${config.serverName}enlistment/updateDropEnlistmentDetails`, data)
            .then((res) => {
                    if (!Boolean(res.data.success)) {
                        if (Number(res.data.res.affectedRows) === 0) {
                            console.log(res)
                            reject({message: 'Something Error! Please Contact the Software Developer!'})
                        }
                    }
                    if (Boolean(res.data.success)) {
                        if (Number(res.data.res.affectedRows) > 0) {
                            resolve(res)
                        } 
                    }
            })
            .catch((err) => {
                console.log(err)
                if (!err.data.success) {
                    resolve({message: err.data.message })
                    console.log(err)
                }
            })
        })
    }
    
    static updateMatriculationChange = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.put(`${config.serverName}enlistment/updateMatriculationChange`, data)
            .then((res)=> {
                resolve(res)
            })
            .catch((err) =>{
                console.error(err)
                reject(err)
            })
        })
    }

    static updateDropRegFeesDetails = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.put(`${config.serverName}enlistment/updateDropRegFeesDetails`, data)
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

export default update