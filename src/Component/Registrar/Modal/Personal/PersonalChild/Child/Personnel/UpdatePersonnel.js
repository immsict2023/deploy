import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import view from '../../../../../../Controller/Personnel/view'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import UpdatePersonnelConfirmation from '../../Modal/UpdatePersonnelConfirmation'
import { defaultDateInputValue } from '../../../../../../../Tools/date'

function UpdatePersonnel() {
    const [ personnel_details_data, setPersonnel_Details_Data ] = useState({personnelid: null, prefix: null, suffix: null, firstname: null, middlename: null, lastname: null, dob: null, pob: null, gender: null, citizenship: null, maritalstatus: null, address: null, phoneno: null, designation: null, department: null, email: null, facultyrank: null, primaryteachingdiscipline: null, employmenttype: null, employmenttenure: null, teachingload: null, employedsince: null, employeduntil: null, annualsalary: null, active: true, remarks: null, mobileno: null})
    const [ personnel_educational_data, setPersonnel_Educational_Data ] = useState({ school: null, personnelid: null, datesattended: null, degreeno: null, otherdegree: null, fieldofstudy: null, awardandhonors: null, from_date: null, to_date: null, awardsandhonors: null })
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
    const [ modalStatusUpdate, setModalStatusUpdate ] = useState(false)
    const [ editMode, setEditMode ] = useState(true)
    
    const { id } = useParams()


    const getYearFunc = () => {
        const todayYear = new Date().getFullYear();
        for (var i = todayYear; i >= 1900; i-- ) {
            year.push({
                no: i
            })
        }
    }

    /*
        const handleEditMode = () => {
            setEditMode(editMode ? false : true)
        }
    */
    
    const getPersonnelInformationFunc = () => {
        view.getPersonnelInformation(id).then((res) => {
            setPersonnel_Details_Data(res.data.res[0])
        }).catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const getPersonnelBackgroundFunc = () => {
        view.getPersonnelBackground(id).then((res) => {
            setPersonnel_Educational_Data(res.data.res[0])
        }).catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
            console.error(err)
        })
    }

    const inputDataTwo = (e) => {
        setPersonnel_Educational_Data({
            ...personnel_educational_data,
            [e.target.name]: e.target.value
        })
    }    
    
    const inputData = (event) => {
        event.target.name === 'status' ? 
        setPersonnel_Details_Data({
            ...personnel_details_data,
            [event.target.name]: event.target.checked
        })
        :
        setPersonnel_Details_Data({
            ...personnel_details_data,
            [event.target.name]: event.target.value
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

    const getTotalCountPersonnelFunc = () => {
        view.getTotalCountPersonnel()
        .then((res) => {

            // Personnel ID for Basic Information
            setPersonnel_Details_Data({
                ...personnel_details_data,
                personnel_id: res.data.id
            })

            // Personnel ID for Background
            setPersonnel_Educational_Data({
                ...personnel_educational_data,
                personnelid: res.data.id
            })
        })
        .catch((err) => {
            alert('Server Error! Please Contact the Software Developer!')
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
                console.error(res.data.err)
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
        setModalStatusUpdate(true)
    }

    const checkIfAlreadyRegistered = () => {
        view.checkIfAlreadyRegistered(personnel_details_data.personnel_id).then((res) => {
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
        getTotalCountPersonnelFunc()
        getPrefixListFunc()
        getSuffixListFunc()
        getPersonnelTypeListFunc()
        getFacultyRankListFunc()
        getEmploymentTensureListFunc()
        getTeachingLoadListFunc()
        getAnnualSalaryListFunc()
        getYearFunc()
        getPersonnelInformationFunc()
        getPersonnelBackgroundFunc()
        getDegreeListFunc()
    }, [])

    useState(() => {
        checkIfAlreadyRegistered()
    })

    return (
        <>
            { modalStatusUpdate && <UpdatePersonnelConfirmation modalStatus={modalStatusUpdate} setModalStatus={setModalStatusUpdate} data0={personnel_details_data} data1={personnel_educational_data} currentPage={currentPage}  /> }
            <Modal
                show={true}
                size={`${currentPage === 0 ? 'xl' : 'lg'}`}
                scrollable
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h5>{editMode ? 'UPDATE' : 'SHOW'} PERSONNEL</h5>
                </ModalHeader>
                <ModalBody>
                    {
                        currentPage === 0 ?
                        <>
                            <form className='card shadow p-3 m-3 border-0' noValidate={false}>
                                <div className='container-fluid row'>
                                    <div className='container-fluid text-center mb-2'>
                                        <h5>PERSONNEL INFORMATION</h5>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Personnel ID</h6>
                                        <input type='text' className='form-control' name='personnel_id' id='personnel_id' value={personnel_details_data.personnelid && personnel_details_data.personnelid} disabled={true}  />
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Prefix</h6>
                                        <select className='form-control' name='prefix' id='prefix' onChange={inputData} disabled={!editMode} value={personnel_details_data.prefix && personnel_details_data.prefix}  >
                                            <option></option>
                                            {
                                                prefixList && prefixList.map((item, index) => (
                                                    <option key={index} value={item.prefix}>{item.prefix}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Suffix</h6>
                                        <select className='form-control' name='suffix' id='suffix' onChange={inputData} disabled={!editMode} value={personnel_details_data.suffix && personnel_details_data.suffix}>
                                            <option></option>
                                            {
                                                suffixList && suffixList.map((item, index) => (
                                                    <option key={index} value={item.suffix}>{`(${item.suffix}) - ${item.meaning}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>First Name</h6>
                                        <input type='text' className='form-control' name='firstname' id='firstname' onChange={inputData} disabled={!editMode} value={personnel_details_data.firstname && personnel_details_data.firstname}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Middle Name</h6>
                                        <input type='text' className='form-control' name='middlename' id='middlename' onChange={inputData} disabled={!editMode} value={personnel_details_data.middlename && personnel_details_data.middlename}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Last Name</h6>
                                        <input type='text' className='form-control' name='lastname' id='lastname' onChange={inputData} disabled={!editMode} value={personnel_details_data.lastname && personnel_details_data.lastname}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Date of Birth</h6>
                                        <input type='date' className='form-control' name='dob' id='dob' onChange={inputData} disabled={!editMode} defaultValue={personnel_details_data.dob && defaultDateInputValue(personnel_details_data.dob)}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Place of Birth</h6>
                                        <input type='text' className='form-control' name='pob' id='pob' onChange={inputData} disabled={!editMode} value={personnel_details_data.pob && personnel_details_data.pob}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Gender</h6>
                                        <select className='form-control' name='gender' id='gender' onChange={inputData} disabled={!editMode}  value={personnel_details_data.gender && personnel_details_data.gender}>
                                            <option></option>
                                            <option key={0} value='F'>F</option>
                                            <option key={1} value='M'>M</option>
                                        </select>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>citizenship </h6>
                                        <select className='form-control' name='citizenship' id='citizenship' value={personnel_details_data.citizenship && personnel_details_data.citizenship} onChange={inputData} disabled={!editMode}>
                                            <option></option>
                                            {
                                                countryList && countryList.map((item, index) => (
                                                    <option key={index} value={item.iso2}>{item.countryname}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Marital Status</h6>      
                                        <select className='form-control' name='maritalstatus' id='maritalstatus' onChange={inputData} disabled={!editMode}  value={personnel_details_data.maritalstatus && personnel_details_data.maritalstatus}>       
                                            <option></option>
                                            {
                                                maritalStatus && maritalStatus.map((item, index) => (
                                                    <option key={index} value={item.status}>{`(${item.status}) - ${item.description}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Address</h6>
                                        <input className='form-control' name='address' id='address' onChange={inputData} disabled={!editMode}  value={personnel_details_data.address && personnel_details_data.address}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Phone No.</h6>
                                        <input type='text' className='form-control' name='phoneno' id='phoneno'  onChange={inputData} disabled={!editMode}  value={personnel_details_data.phoneno && personnel_details_data.phoneno}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Mobile No.</h6>
                                        <input type='text' className='form-control' name='mobileno' id='mobileno'  onChange={inputData} disabled={!editMode}  value={personnel_details_data.mobileno && personnel_details_data.mobileno}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Designation</h6>
                                        <select className='form-control' name='designationno' id='designationno' onChange={inputData} disabled={!editMode}  value={personnel_details_data.designationno && personnel_details_data.designationno}>
                                            <option></option>
                                            {
                                                designationList && designationList.map((item, index) => (
                                                    <option key={index} value={item.designationno}>{item.label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    
                                    <div className='col-4 mt-2'>
                                        <h6>Department</h6>
                                        <select className='form-control' name='deptno' id='deptno' onChange={inputData} disabled={!editMode}  value={personnel_details_data.deptno && personnel_details_data.deptno}>
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
                                        <input className='form-control' type='email' name='email' id='email' onChange={inputData} disabled={!editMode} value={personnel_details_data.email && personnel_details_data.email}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Faculty Rank</h6>
                                        <select className='form-control' name='facultyrank' id='facultyrank' onChange={inputData} disabled={!editMode} value={personnel_details_data.facultyrank && personnel_details_data.facultyrank}>
                                            <option></option>
                                            {
                                                facultyRankList && facultyRankList.map((item, index) => (
                                                    <option key={index} value={item.code}>{`(${item.code}) - ${item.description}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Primary Teaching Discipline</h6>
                                        <select className='form-control' name="primaryteachingdiscipline" id="primaryteachingdiscipline" value={personnel_details_data.primaryteachingdiscipline && personnel_details_data.primaryteachingdiscipline} onChange={inputData} disabled={!editMode}>
                                            <option></option>
                                            {
                                                teachingDesciplineList && teachingDesciplineList.map((item, index) => (
                                                    <option value={item.disciplinecode} key={index}>{`(${item.disciplinecode}) - ${item.disciplinename}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Employment Type</h6>
                                        <select className='form-control' name='employmenttype' id='employmenttype' onChange={inputData} disabled={!editMode} value={personnel_details_data.employmenttype && personnel_details_data.employmenttype}>
                                            <option></option>
                                            {
                                                personnelTypeList && personnelTypeList.map((item, index) => (
                                                    <option key={index} value={item.typecode}>{item.description}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Employment Tensure</h6>
                                        <select className='form-control' name='employmenttenure' id='employmenttenure' onChange={inputData} disabled={!editMode} value={personnel_details_data.employmenttenure && personnel_details_data.employmenttenure}>
                                            <option></option>
                                            {
                                                employmentTensureList && employmentTensureList.map((item, index) => (
                                                    <option value={item.code} key={index}>{`(${item.code}) - ${item.description}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Teaching Load</h6>
                                        <select className='form-control' name='teachingload' id='teachingload' onChange={inputData} disabled={!editMode} value={personnel_details_data.teachingload && personnel_details_data.teachingload}>
                                            <option></option>
                                            {
                                                teachingLoadList && teachingLoadList.map((item, index) => (
                                                    <option key={index} value={item.code}>{`(${item.code}) - ${item.description}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Employed Since</h6>
                                        <input className='form-control' type='date' name='employedsince' id='employedsince'  onChange={inputData} disabled={!editMode} defaultValue={personnel_details_data.employedsince && defaultDateInputValue(personnel_details_data.employedsince)}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Employed Until</h6>
                                        <input className='form-control' type='date' name='employeduntil' id='employeduntil'  onChange={inputData} disabled={!editMode} defaultValue={personnel_details_data.employeduntil && defaultDateInputValue(personnel_details_data.employeduntil)}/>
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <h6>Annual Salary</h6>
                                        <select className='form-control' name='annualsalary' id='annualsalary' onChange={inputData} disabled={!editMode} value={personnel_details_data.annualsalary && personnel_details_data.annualsalary}>
                                            <option></option>
                                            {
                                                annualSalaryList && annualSalaryList.map((item, index) => (
                                                    <option key={index} value={item.code}>{`(${item.code}) - ${item.description}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    {
                                        /*
                                            <div className='col-4 mt-2'>
                                                <h6>Active</h6>
                                                <select className='form-control' name='isactive' id='isactive' onChange={inputData} disabled={!editMode} value={personnel_details_data.isactive.data[0] && personnel_details_data.isactive.data[0]}>
                                                    <option></option>
                                                    <option value='1'>Yes</option>
                                                    <option value='0'>No</option>
                                                </select>
                                            </div>
                                        */
                                    }
                                    <div className='col-12 mt-2'>
                                        <h6>Remarks</h6>
                                        <textarea className='form-control' value={personnel_details_data.remarks && personnel_details_data.remarks} name='remarks' id='remarks' onChange={inputData} disabled={!editMode}></textarea>
                                    </div>
                                </div>
                            </form>
                        </>
                        :
                        currentPage === 1 ?
                        <>
                            <form className='card shadow p-3 m-3 border-0'>
                                <div className='row'>
                                    <div className='col-12 text-center mb-2'>
                                        <h5>EDUCATIONAL BACKGROUND</h5>
                                    </div>
                                    <div className='col-6'>
                                        <h6>School</h6>
                                        <input type='text' name='school' value={personnel_educational_data && personnel_educational_data.school && personnel_educational_data.school } className='form-control' onChange={inputDataTwo} disabled={!editMode} />
                                    </div>
                                    <div className='col-6'>
                                        <h6>Dates Attended</h6>
                                        <div className='container-fluid float-start'>
                                            <div className='row'>
                                                <div className='col-5'>
                                                    <select className='form-control' defaultValue={personnel_educational_data && personnel_educational_data.datesattended.split('-')[0]} name='from_date' onChange={inputDataTwo} disabled={!editMode} >
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
                                                    <select className='form-control' name='to_date' defaultValue={personnel_educational_data && personnel_educational_data.datesattended.split('-')[1]}  onChange={inputDataTwo} disabled={!editMode}>
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
                                        <h6>Degree</h6>
                                        <select className='form-control' name='degreeno' value={4} onChange={inputDataTwo} disabled={!editMode}>
                                            <option></option>
                                            {
                                                degreeList && degreeList.map((item, index) => (
                                                    <option value={item.degreeno} key={index}>{item.label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6 mt-2' >
                                        <h6>Field Of Study</h6>
                                        <input type='text' name='fieldofstudy' value={personnel_educational_data && personnel_educational_data.fieldofstudy && personnel_educational_data.fieldofstudy} className='form-control' onChange={inputDataTwo} disabled={!editMode}/>
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <h6>Awards / Honors</h6>
                                        <textarea className='form-control' name='awardsandhonors' value={personnel_educational_data && personnel_educational_data.awardsandhonors && personnel_educational_data.awardsandhonors} onChange={inputDataTwo} disabled={!editMode}></textarea>
                                    </div>
                                </div>
                            </form>
                        </>
                        :
                        <>
                        </>
                    }
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-center'>
                        <button style={{ width: '100px' }} className='btn text-white me-2 text-decoration-none' onClick={()=> setCurrentPage(currentPage-1)} disabled={currentPage === 0 ? true: false}>Back</button>
                        <Link style={{ width: '100px' }} to='../' className='btn btn-danger me-2'>Close</Link>
                        <button style={{ width: '100px' }} className='btn btn-primary me-2' onClick={handleSubmitPersonnel}>Update</button>
                        {
                            // <button style={{ width: '100px' }} onClick={handleSubmitPersonnel} className='btn btn-primary me-2' disabled={currentPage === 0 ? Boolean(Number(information)) : currentPage === 1 ? Boolean(Number(background)) : false}>Submit</button>
                        }
                        <button style={{ width: '100px' }} className='btn text-white text-decoration-none' onClick={()=> setCurrentPage(currentPage+1)} disabled={currentPage === 1 ? true: false}>Next</button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default UpdatePersonnel
