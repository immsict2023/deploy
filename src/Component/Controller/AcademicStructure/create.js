import axios from "axios";
import config from "../../Security/config";

class create {

    static createCollege = (data) => {
        const postData = {
            collegeName: data.collegeName,
            collegeCode: data.collegeCode,
        }
        
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}academicstructure/postCollege`, postData)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }

    static createDepartment = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}academicstructure/postDepartment`, data)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static createProgram = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}academicstructure/postProgram`, data)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static createCurriculum = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}academicstructure/postCurriculum`, data)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static createCourse = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}academicstructure/postCourse`, data)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static createCourseDetails = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}academicstructure/postCourseDetails`, data)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static createCurriculumDetails = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}academicstructure/postCurriculumDetails`, data)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static createAssignedCourse = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.post(`${config.serverName}academicstructure/createAssignedCourse`,  data)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}

export default create;