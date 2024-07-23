import axios from "axios";
import config from "../../Security/config";

class deleteCrud {
    
    static deleteDropEnlistmentDetails(items) {
        axios.defaults.withCredentials = true;
        return axios.delete(`${config.serverName}enlistment/deleteDropEnlistmentDetails`, items )
        .then((res) => {
            return res.data; // Return the data from the response
        })
        .catch((err) => {
            console.error(err);
            throw err; // Throw the error so it can be caught elsewhere
        });
    }
}

export default deleteCrud;
