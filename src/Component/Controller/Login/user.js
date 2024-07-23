import axios from 'axios'
import config from '../../Security/config'

export const AccountLogin = (email, password, axios, config, navigate) => {
  return new Promise((resolve, reject) => {
    const data = { email, password };
    axios.defaults.withCredentials = true;
    axios.get(`${config.serverName}login/auth0`, { params: data})
      .then((res) => {
        if (Boolean(res.data.login)) {
          alert(res.data.message)
          if (res.data.data.RoleID === "REG" || res.data.data.RoleID === "STF_CAS") {
            navigate('../registrar/enlistment');
            resolve(res.data.data);
          } else {
            reject("Invalid Role!");
            alert("Invalid Role!");
          }
        } else {
          if (!Boolean(res.data.login)) {
            reject(res.data.message)
            alert(res.data.message)
          }
        }
      })
      .catch((err) => reject(err));
  });
};

export const userInfo = () => {
  return new Promise((resolve, reject) => {
    axios.defaults.withCredentials = true
    axios.get(`${config.serverName}user/userInfo`)
    .then((res) => {
      if (res.data.length > 0) {
        resolve({found: true, data: res})
      } else {
        reject({found: false})
      }
    })
    .catch((err) => reject({error: true, message: err}))
  })
}

export const checkLoginWithData = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${config.serverName}user/userCheckLoginInformation`)
    .then((res) =>{
      resolve(res)
    })
    .catch((err) => reject(err));
  })
}

export const checkLoginUser = () => {
  axios.get(`${config.serverName}status/checkLogin`)
  .then((res) =>{
    return {data: res.data.valid}
  })
  .catch((err) => console.error(err));
}