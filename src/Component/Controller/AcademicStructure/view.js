import axios from 'axios'
import config from '../../Security/config'

class view {

    static getAssignedCourseList = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}academicstructure/getAssignedCourseList`, {params: data})
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getCurriculumList = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}academicstructure/getCurriculumList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
    
    static getCurriculumListByProgram = (ProgramNo) => {
        const data = {ProgramNo}
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true
            axios.get(`${config.serverName}academicstructure/curriculumListByProgram`, { params: data })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getCourseList = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}academicstructure/getCourseList`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static getSubjectList = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}academicstructure/getSubjectList`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static getCourseType = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}academicstructure/getCourseType`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static getCourseDetails = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}academicstructure/getCourseDetails`, { params: data})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static getCourseData = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}academicstructure/getCourseData`, { params: data})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static getRegistrationFeeType = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}academicstructure/getRegistrationFeeType`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static getProgramList = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}others/getProgram`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static getCurriculumDetails = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}academicstructure/getCurriculumDetailsList`, { params: data})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static getCurriculumSolo = (data) => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}academicstructure/getCurriculumSolo`, { params: data})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static getDepartmentList = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}others/getDepartment`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    static getCollege = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}others/getCollege`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    /*
        static getProgramList = () => {
            return new Promise((resolve, reject) => {
                axios.defaults.withCredentials = true;
                axios.get(`${config.serverName}others/getProgram`)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            })
        }
    */

    // This function return all the value from program table and not using JOIN from other table
    static getProgramListOnly = () => {
        return new Promise((resolve, reject) => {
            try {
                axios.defaults.withCredentials = true;
                axios.get(`${config.serverName}academicstructure/getProgramList`)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            } catch(err) {
                console.error(err)
            }
        })
        
    }

    static getProgramListEnlist = () => {
        return new Promise((resolve, reject) => {
            try {
                axios.defaults.withCredentials = true;
                axios.get(`${config.serverName}academicstructure/getProgramListEnlist`)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            } catch(err) {
                console.error(err)
            }
        })
    }

    static getCourseDetailsList = (coursecode) => {
        const data = {coursecode}
        return new Promise((resolve, reject) => {
            try {
                axios.defaults.withCredentials = true;
                axios.get(`${config.serverName}academicstructure/getCourseDetailsList`, {params: data})
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            } catch(err) {
                console.error(err)
            }
        })
    }

    static getCurriculumForBlockSection = (data) => {
        return new Promise((resolve, reject) => {
            try {
                axios.defaults.withCredentials = true;
                axios.get(`${config.serverName}academicstructure/getCurriculumForBlockSection`, {params: data})
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
            } catch(err) {
                console.error(err)
            }
        })
    }
}

export default view