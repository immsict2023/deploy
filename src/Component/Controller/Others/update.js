import axios from 'axios'
import config from '../../Security/config'
import sanitizer from '../../../Tools/sanitizer'

class update {

    static updateActive = (data) => {

        const idno = sanitizer.sanitizeInput(data.idno, "number")
        const value = sanitizer.sanitizeInput(Boolean(data.value) ? '1' : '0', "number")
        const tableName = sanitizer.sanitizeInput(data.tableName, "string")
        const columnName = sanitizer.sanitizeInput(data.columnName, "string")

        const query = `UPDATE ${tableName} set isactive = ${value} WHERE ${columnName} = ${idno}`
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.put(`${config.serverName}others/updateActive`, { query })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

}

export default update