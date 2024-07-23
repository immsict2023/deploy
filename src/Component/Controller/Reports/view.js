import config from "../../Security/config";
import axios from "axios";

class view {
    static getPaymentCollection = (data) => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}reports/getPaymentCollection`, { params: data })
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