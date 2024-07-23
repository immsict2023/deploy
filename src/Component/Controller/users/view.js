export const getUserList = (axios, config) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true
        axios.get(`${config.serverName}user/getUserList`)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}