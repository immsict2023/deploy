import axios from "axios"
import config from "../../Security/config"

class view {

    static personnelList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getPersonnelList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static countryList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getCountryList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static teachingDesciplineList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getTeachingDesciplineList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static departmentList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}others/getDepartment`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static designationList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getDesignationList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static maritalStatusList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getMaritalStatusList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getTotalCountPersonnel = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getTotalCountPersonnel`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getPrefixList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getPrefixList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getSuffixList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getSuffixList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getPersonnelTypeList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getPersonnelTypeList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getFacultyRankList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getFacultyRankList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getEmploymentTensureList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getEmploymentTensureList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getTeachingLoadList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getTeachingLoadList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getAnnualSalaryList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getAnnualSalaryList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getDegreeList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}others/getDegree`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static checkIfAlreadyRegistered = (personnelid) => {
        const data = {
            personnelid
        }
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/checkIfAlreadyRegistered`, {params: data})
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getPersonnelInformation = (personnelid) => {
        const data = {
            personnelid
        }
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/personnelInformation`, {params: data})
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getPersonnelBackground = (personnelid) => {
        const data = {
            personnelid
        }
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/personnelBackground`, {params: data})
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getPersonnelFacultyList = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getPersonnelFacultyList`)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getSubjectInstructorAssigned = (CourseCode) => {
        const data = { CourseCode }
        return new Promise((resolve, reject) => {
            axios.get(`${config.serverName}personnel/getSubjectInstructorAssigned`, { params: data })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}

export default view