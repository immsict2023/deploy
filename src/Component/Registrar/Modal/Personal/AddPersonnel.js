import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import view from '../../../Controller/Personnel/view'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import CreatePersonnelConfirmation from './PersonalChild/Modal/CreatePersonnelConfirmation'


function AddPersonnel() {

    const [ personnelDetailsData, setPersonnelDetailsData ] = useState({personnel_id: null, prefix: null, suffix: null, first_name: null, middle_name: null, last_name: null, date_of_birth: null, place_of_birth: null, gender: null, citizenship: 'PH', marital_status: null, address: null, phone_no: null, designation: null, department: null, email: null, faculty_rank: null, primary_teaching_discipline: null, employment_type: null, employment_tenure: null, teaching_load: null, employed_since: null, employed_until: null, annual_salary: null, active: 1, remarks: null, mobile_no: null, school: null, personnelid: null, datesattended: null, degreeno: null, otherdegree: null, fieldofstudy: null, awardandhonors: null, from_date: null, to_date: null, awardsandhonors: null })
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ countryList, setCountryList ] = useState([])
    const [ teachingDesciplineList, setTeachingDesciplineList ] = useState([])
    const [ departmentList, setDepartmentList ] = useState([])
    const [ designationList, setDesignationList ] = useState([])
    const [ maritalStatus, setMaritalStatus ] = useState([])
    const [ prefixList, setPrefixList ] = useState([])
    const [ suffixList, setSuffixList ] = useState([])
    const [ personnelTypeList, setPersonnelTypeList ] = useState([])
    const [ facultyRankList, setFacultyRankList ] = useState([])
    const [ employmentTensureList, setEmploymentTensureList ] = useState([])
    const [ teachingLoadList, setTeachingLoadList ] = useState([])
    const [ annualSalaryList, setAnnualSalaryList ] = useState([])
    const [ year, setyear ] = useState([])
    const [ degreeList, setDegreeList ] = useState([])    
    const [ modalStatusCreate, setModalStatusCreate ] = useState(false)

    const linkValue = new URLSearchParams(window.location.search)
    const information = linkValue.get('information')
    const background = linkValue.get('background')

    const getYearFunc = () => {
        const todayYear = new Date().getFullYear();
        for (var i = todayYear; i >= 1900; i-- ) {
            year.push({
                no: i
            })
        }
    }
    
    const inputData = (e) => {
        e.target.name === 'status' ? 
        setPersonnelDetailsData({
            ...personnelDetailsData,
            [e.target.name]: e.target.checked
        })
        :
        setPersonnelDetailsData({
            ...personnelDetailsData,
            [e.target.name]: e.target.value
        })
    }

    const getCountryListFunc = () => {
        view.countryList()
        .then((res) => {
            if (res.data.success) {
                setCountryList(res.data.res)
            } 
            if (Boolean(res.data.error)) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.res)
            }
        })
        .catch((err) => {
          console.error(err)
        })
    }

    const getDesignationListFunc = () => {
        view.designationList()
        .then((res) => {
            if (res.data.success) {
                setDesignationList(res.data.res)
            }
            if (res.data.error) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.res)
            }
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const teachingDesciplineListFunc = () => {
        view.teachingDesciplineList()
        .then((res) => {
            if (res.data.success) {
                setTeachingDesciplineList(res.data.res)
            }
            if (res.data.error) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.err)
            }
        })
        .catch((err) => {
          console.error(err)
        })
    }

    const departmentListFunc = () => {
        view.departmentList()
        .then((res) => {
            setDepartmentList(res.data.rows)
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const maritalStatusListFunc = () => {
        view.maritalStatusList()
        .then((res) => {
            if (res.data.success) {
                setMaritalStatus(res.data.res)
            }
            if (res.data.error) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.res)
            }
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const getPrefixListFunc = () => {
        view.getPrefixList()
        .then((res) => {
            if (res.data.success) {
                setPrefixList(res.data.res)
            }
            if (res.data.error) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.res)
            }
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const getSuffixListFunc = () => {
        view.getSuffixList()
        .then((res) => {
            if (res.data.success) {
                setSuffixList(res.data.res)
            }
            if (res.data.error) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.res)
            }
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const getPersonnelTypeListFunc = () => {
        view.getPersonnelTypeList()
        .then((res) => {
            if (res.data.success) {
                setPersonnelTypeList(res.data.res)
            }
            if (res.data.error) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.res)
            }
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const getFacultyRankListFunc = () => {
        view.getFacultyRankList()
        .then((res) => {
            if (res.data.success) {
                setFacultyRankList(res.data.res)
            }
            if (res.data.error) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.res)
            }
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const getEmploymentTensureListFunc = () => {
        view.getEmploymentTensureList()
        .then((res) => {
            if (res.data.success) {
                setEmploymentTensureList(res.data.res)
            }
            if (res.data.error) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.res)
            }
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const getTeachingLoadListFunc = () => {
        view.getTeachingLoadList()
        .then((res) => {
            if (res.data.success) {
                setTeachingLoadList(res.data.res)
            }
            if (res.data.error) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.res)
            }
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const getAnnualSalaryListFunc = () => {
        view.getAnnualSalaryList()
        .then((res) => {
            if (res.data.success) {
                setAnnualSalaryList(res.data.res)
            }
            if (res.data.error) {
                alert('Server Error! Please Contact the Software Developer!')
                console.error(res.data.res)
            }
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const getDegreeListFunc = () => {
        view.getDegreeList().then((res) => {
            setDegreeList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const handleSubmitPersonnel = (e) => {
        e.preventDefault()
        console.log(personnelDetailsData)
        if (personnelDetailsData.first_name !== null  && personnelDetailsData.last_name !== null 
            && personnelDetailsData.designation !== null &&  personnelDetailsData.department !== null 
            && personnelDetailsData.school !== null  && personnelDetailsData.fieldofstudy !== null ) {
            setModalStatusCreate(true)
        } else {
            alert("Please Complete Fill Up the important Details");
        }
    }

    const checkIfAlreadyRegistered = () => {
        view.checkIfAlreadyRegistered(personnelDetailsData.personnel_id).then((res) => {
            // console.log(res)
        }).catch((err) => {
            console.error(err)
        })
    }
    
    useEffect(() => {
        getCountryListFunc()
        departmentListFunc()
        teachingDesciplineListFunc()
        getDesignationListFunc()
        maritalStatusListFunc()
        getPrefixListFunc()
        getSuffixListFunc()
        getPersonnelTypeListFunc()
        getFacultyRankListFunc()
        getEmploymentTensureListFunc()
        getTeachingLoadListFunc()
        getAnnualSalaryListFunc()
        getYearFunc()
        getDegreeListFunc()
    }, [])

    useState(() => {
        checkIfAlreadyRegistered()
    }, [])

    return (
        <>
        { modalStatusCreate && <CreatePersonnelConfirmation modalStatus={modalStatusCreate} setModalStatus={setModalStatusCreate} data={personnelDetailsData} currentPage={currentPage} /> }
            <Modal
                show={true}
                fullscreen
                scrollable
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h5>NEW PERSONNEL</h5>
                </ModalHeader>
                <ModalBody>
                <main>
                    <form >
                        {
                        currentPage === 0 ? 
                            (
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className='card shadow p-4 m-3 border' style={{ width: '1200px' }}>
                                    <div className='row'>
                                        <div className='container-fluid text-center mb-2'>
                                            <h5>PERSONNEL INFORMATION</h5>
                                        </div>
                                        <div className='col-1 mt-2'>
                                            <h6>Prefix</h6>
                                            <select className='form-control' name='prefix' id='prefix' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.prefix && personnelDetailsData.prefix}  >
                                                <option></option>
                                                {
                                                    prefixList && prefixList.map((item, index) => (
                                                        <option key={index} value={item.Prefix}>{item.Prefix}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6>Suffix</h6>
                                            <select className='form-control' name='suffix' id='suffix' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.suffix && personnelDetailsData.suffix}>
                                                <option></option>
                                                {
                                                    suffixList && suffixList.map((item, index) => (
                                                        <option key={index} value={item.Suffix}>{`(${item.Suffix}) - ${item.Meaning}`}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-3 mt-2'>
                                            <h6>First Name {personnelDetailsData.first_name === null || personnelDetailsData.first_name === '' ? (<span className='text-danger'>*</span>) : null}</h6>
                                            <input type='text' className='form-control' name='first_name' id='first_name' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.first_name && personnelDetailsData.first_name} />
                                        </div>
                                        <div className='col-3 mt-2'>
                                            <h6>Middle Name</h6>
                                            <input type='text' className='form-control' name='middle_name' id='middle_name' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.middle_name && personnelDetailsData.middle_name} />
                                        </div>
                                        <div className='col-3 mt-2'>
                                            <h6>Last Name {personnelDetailsData.last_name === null || personnelDetailsData.last_name === '' ? (<span className='text-danger'>*</span>) : null}</h6>
                                            <input type='text' className='form-control' name='last_name' id='last_name' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.last_name && personnelDetailsData.last_name} />
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Date of Birth</h6>
                                            <input type='date' className='form-control' name='date_of_birth' id='date_of_birth' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.date_of_birth && personnelDetailsData.date_of_birth}/>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Place of Birth</h6>
                                            <input type='text' className='form-control' name='place_of_birth' id='place_of_birth' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.place_of_birth && personnelDetailsData.place_of_birth}/>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Gender</h6>
                                            <select className='form-control' name='gender' id='gender' onChange={inputData} disabled={Number(information) === 1 ? true : false}  value={personnelDetailsData.gender && personnelDetailsData.gender}>
                                                <option></option>
                                                <option key={0} value='F'>F</option>
                                                <option key={1} value='M'>M</option>
                                            </select>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Citizenship </h6>
                                            <select className='form-control' name='citizenship' id='citizenship' onChange={inputData} value={personnelDetailsData.citizenship && personnelDetailsData.citizenship} disabled={Number(information) === 1 ? true : false}>
                                                <option></option>
                                                {
                                                    countryList && countryList.map((item, index) => (
                                                        <option key={index} value={item.ISO2}>{item.CountryName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Marital Status</h6>      
                                            <select className='form-control' name='marital_status' id='marital_status' onChange={inputData} disabled={Number(information) === 1 ? true : false}  value={personnelDetailsData.marital_status && personnelDetailsData.marital_status}>       
                                                <option></option>
                                                {
                                                    maritalStatus && maritalStatus.map((item, index) => (
                                                        <option key={index} value={item.Status}>{`(${item.Status}) - ${item.Description}`}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Address</h6>
                                            <input className='form-control' name='address' id='address' onChange={inputData} disabled={Number(information) === 1 ? true : false}  value={personnelDetailsData.address && personnelDetailsData.address}/>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Phone No.</h6>
                                            <input type='text' className='form-control' name='phone_no' id='phone_no'  onChange={inputData} disabled={Number(information) === 1 ? true : false}  value={personnelDetailsData.phone_no && personnelDetailsData.phone_no}/>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Mobile No.</h6>
                                            <input type='text' className='form-control' name='mobile_no' id='mobile_no'  onChange={inputData} disabled={Number(information) === 1 ? true : false}  value={personnelDetailsData.mobile_no && personnelDetailsData.mobile_no}/>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Designation {personnelDetailsData.designation === null || personnelDetailsData.designation === '' ? (<span className='text-danger'>*</span>) : null}</h6>
                                            <select className='form-control' name='designation' id='designation' onChange={inputData} disabled={Number(information) === 1 ? true : false}  value={personnelDetailsData.designation && personnelDetailsData.designation} >
                                                <option></option>
                                                {
                                                    designationList && designationList.map((item, index) => (
                                                        <option key={index} value={item.DesignationNo}>{item.Label}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        
                                        <div className='col-4 mt-2'>
                                            <h6>Department {personnelDetailsData.department === null || personnelDetailsData.department === '' ? (<span className='text-danger'>*</span>) : null}</h6>
                                            <select className='form-control' name='department' id='department' onChange={inputData} disabled={Number(information) === 1 ? true : false}  value={personnelDetailsData.department && personnelDetailsData.department}>
                                                <option></option>
                                                {
                                                    departmentList && departmentList.map((item, index) => (
                                                        <option value={item.departmentNo} key={index}>{`(${item.collegeCode}) ${item.departmentName}`}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Email</h6>
                                            <input className='form-control' type='email' name='email' id='email' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.email && personnelDetailsData.email}/>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Faculty Rank</h6>
                                            <select className='form-control' name='faculty_rank' id='faculty_rank' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.faculty_rank && personnelDetailsData.faculty_rank}>
                                                <option></option>
                                                {
                                                    facultyRankList && facultyRankList.map((item, index) => (
                                                        <option key={index} value={item.Code}>{`(${item.Code}) - ${item.Description}`}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Primary Teaching Discipline</h6>
                                            <select className='form-control' name="primary_teaching_discipline" id="primary_teaching_discipline" onChange={inputData} disabled={Number(information) === 1 ? true : false}>
                                                <option></option>
                                                {
                                                    teachingDesciplineList && teachingDesciplineList.map((item, index) => (
                                                        <option value={item.DisciplineCode} key={index}>{`(${item.DisciplineCode}) - ${item.DisciplineName}`}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Employment Type</h6>
                                            <select className='form-control' name='employment_type' id='employment_type' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.employment_type && personnelDetailsData.employment_type}>
                                                <option></option>
                                                {
                                                    personnelTypeList && personnelTypeList.map((item, index) => (
                                                        <option key={index} value={item.TypeCode}>{item.Description}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Employment Tensure</h6>
                                            <select className='form-control' name='employment_tensure' id='employment_tensure' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.employment_tensure && personnelDetailsData.employment_tensure}>
                                                <option></option>
                                                {
                                                    employmentTensureList && employmentTensureList.map((item, index) => (
                                                        <option value={item.Code} key={index}>{`(${item.Code}) - ${item.Description}`}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Teaching Load</h6>
                                            <select className='form-control' name='teaching_load' id='teaching_load' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.teaching_load && personnelDetailsData.teaching_load}>
                                                <option></option>
                                                {
                                                    teachingLoadList && teachingLoadList.map((item, index) => (
                                                        <option key={index} value={item.Code}>{`(${item.Code}) - ${item.Description}`}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Employed Since</h6>
                                            <input className='form-control' type='date' name='employed_since' id='employed_since'  onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.employed_since && personnelDetailsData.employed_since}/>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Employed Until</h6>
                                            <input className='form-control' type='date' name='employed_until' id='employed_until'  onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.employed_until && personnelDetailsData.employed_until}/>
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <h6>Annual Salary</h6>
                                            <select className='form-control' name='annual_salary' id='annual_salary' onChange={inputData} disabled={Number(information) === 1 ? true : false} value={personnelDetailsData.annual_salary && personnelDetailsData.annual_salary}>
                                                <option></option>
                                                {
                                                    annualSalaryList && annualSalaryList.map((item, index) => (
                                                        <option key={index} value={item.Code}>{`(${item.Code}) - ${item.Description}`}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-12 mt-2'>
                                            <h6>Remarks</h6>
                                            <textarea className='form-control' name='remarks' id='remarks' onChange={inputData} disabled={Number(information) === 1 ? true : false}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        :
                        currentPage === 1 ? 
                            (
                            <div className='d-flex justify-content-center align-items-center' style={{ height: '85vh' }}>
                                <div className='container card shadow p-3 m-3 border-0' style={{ width: '1200px' }} >
                                    <div className='row'>
                                        <div className='col-12 text-center mb-2'>
                                            <h5>EDUCATIONAL BACKGROUND</h5>
                                        </div>
                                        <div className='col-6'>
                                            <h6>School{personnelDetailsData.school === null || personnelDetailsData.school === '' ? (<span className='text-danger'>*</span>) : null}</h6>
                                            <input type='text' name='school' value={personnelDetailsData.school && personnelDetailsData.school} className='form-control' onChange={inputData} disabled={Number(background) === 1 && Number(information) ? true : false} />
                                        </div>
                                        <div className='col-6'>
                                            <h6>Dates Attended</h6>
                                            <div className='container-fluid float-start'>
                                                <div className='row'>
                                                    <div className='col-5'>
                                                        <select className='form-control' value={personnelDetailsData.from_date && personnelDetailsData.from_date} name='from_date' onChange={inputData} disabled={Number(background) === 1 && Number(information) ? true : false} >
                                                            <option></option>
                                                            {
                                                                year && year.map((item, index) => (
                                                                    <option value={item.no} key={index}>{item.no}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col-2'>
                                                        <h6>To</h6>
                                                    </div>
                                                    <div className='col-5'>
                                                        <select className='form-control' name='to_date' value={personnelDetailsData.to_date && personnelDetailsData.to_date}  onChange={inputData} disabled={Number(background) === 1 && Number(information) ? true : false}>
                                                            <option></option>
                                                            {
                                                                year && year.map((item, index) => (
                                                                    <option value={item.no} key={index}>{item.no}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-6 mt-2'>
                                            <h6>Degree {personnelDetailsData.degreeno === null || personnelDetailsData.degreeno === '' ? (<span className='text-danger'>*</span>) : null}</h6>
                                            <select className='form-control' name='degreeno' value={personnelDetailsData.degreeno && personnelDetailsData.degreeno} onChange={inputData} disabled={Number(background) === 1 && Number(information) ? true : false}>
                                                <option></option>
                                                {
                                                    degreeList && degreeList.map((item, index) => (
                                                        <option value={item.DegreeNo} key={index}>{item.Label}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-6 mt-2' onChange={inputData} disabled={Number(background) === 1 && Number(information) ? true : false}>
                                            <h6>Field Of Study{personnelDetailsData.fieldofstudy === null || personnelDetailsData.fieldofstudy === '' ? (<span className='text-danger'>*</span>) : null}</h6>
                                            <input type='text' name='fieldofstudy' value={personnelDetailsData.fieldofstudy && personnelDetailsData.fieldofstudy} className='form-control' />
                                        </div>
                                        <div className='col-12 mt-2'>
                                            <h6>Awards / Honors</h6>
                                            <textarea className='form-control' name='awardsandhonors' value={personnelDetailsData.awardsandhonors && personnelDetailsData.awardsandhonors} onChange={inputData} disabled={Number(background) === 1 && Number(information) ? true : false}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        :
                        null
                        }
                        <button id='saveNewStudent' hidden>Save</button>
                    </form>
                </main>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-center'>
                        <button className='btn text-white me-2 text-decoration-none' onClick={()=> setCurrentPage(currentPage-1)} disabled={currentPage === 0 ? true: false}>Back</button>
                        <Link to='../' className='btn btn-danger me-2'>Cancel</Link>
                        <button onClick={handleSubmitPersonnel} className='btn btn-primary me-2' disabled={currentPage === 0 ? Boolean(Number(information)) : currentPage === 1 ? Boolean(Number(background)) : false}>Submit</button>
                        <button className='btn text-white text-decoration-none' onClick={()=> setCurrentPage(currentPage+1)} disabled={currentPage === 1 ? true: false}>Next</button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddPersonnel
