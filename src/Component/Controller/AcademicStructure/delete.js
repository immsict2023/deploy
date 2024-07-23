import axios from 'axios'
import config from '../../Security/config'

class crudDelete {

    static deleteCurriculumDetails = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.delete(`${config.serverName}academicstructure/deleteCurriculumDetails`, { params: data })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static deleteCollege = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.delete(`${config.serverName}academicstructure/deleteCollege`, { params: data })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static deleteDepartment = (data) => {
        console.log('Function ' + data)
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.delete(`${config.serverName}academicstructure/deleteDepartment`, { params: data })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static deleteProgram = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.delete(`${config.serverName}academicstructure/deleteProgram`, { params: data })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static deleteCourseDetail = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.delete(`${config.serverName}academicstructure/deleteCourseDetail`, { params: data })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static deleteAssignCourse = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.delete(`${config.serverName}academicstructure/deleteAssignCourse`, { params: data })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

}

export default crudDelete;