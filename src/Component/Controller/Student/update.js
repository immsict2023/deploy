import axios from "axios";
import config from "../../Security/config";

class update {

    static updateStudentInformation = (data) => {
        
        return new Promise((resolve, reject) => {
            try {
                
                // Student Information
                axios.defaults.withCredentials = true;
                axios.put(`${config.serverName}student/putStudentInformation`, data)
                .then((res) => {
                    if (!Boolean(res.data.success)) {
                        if (Number(res.data.res.affectedRows) === 0) {
                            console.log(res)
                            reject({message: 'Something Error! Please Contact the Software Developer!'})
                        }
                    }
                    
                    if (Boolean(res.data.success)) {
                        if (Number(res.data.res.affectedRows) > 0) {
                            console.log(res.data.message)
                            resolve({message: res.data.message, data: res.data.res })
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                    /*
                        if (!err.data.success) {
                            alert(err.data.message)
                            reject({message: err.data.message})
                        }
                    */
                })
            } catch (err) {
                resolve({message: err.data.message })
                console.log(err)
            }
        })
    }

}

export default update;