import axios from "axios";
import config from "../../Security/config";

class others {

    static getSemester = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get(`${config.serverName}others/getSemester`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

}

export default others



























// Country
export const Country = async (axios, config) => {
    try {
        const response = await axios.get(`${config.serverName}others/getCountry`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const MaritalStatus = async (axios, config) => {
    try {
        const response = await axios.get(`${config.serverName}others/getMaritalStatus`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const Suffix = async (axios, config) => {
    try {
        const response = await axios.get(`${config.serverName}others/getSuffix`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const CollegeData = async (axios, config) => {
    try {
        const response = await axios.get(`${config.serverName}others/getCollege`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const ProgramData = async (axios, config) => {
    try {
        const response = await axios.get(`${config.serverName}others/getProgram`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const departmentData = async (axios, config) => {
    try {
        const response = await axios.get(`${config.serverName}others/getDepartment`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const degreeData = async (axios, config) => {
    try {
        const response = await axios.get(`${config.serverName}others/getDegree`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const semesterData = async (axios, config) => {
    try {
        const response = await axios.get(`${config.serverName}others/getSemester`);
        return response;
    } catch (err) {
        throw err;
    }
}