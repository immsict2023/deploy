import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import config from '../../../../../../Security/config';
import { Country, MaritalStatus, Suffix } from '../../../../../../Controller/view/others';
import view from '../../../../../../Controller/AcademicStructure/view';
import AddModalStudentConfirmation from '../../Modal/ConfirmationModal/AddModalStudentConfirmation';
import noPhoto from '../../../../../../../Assets/Icons/nophoto.png'
import FileChecker from '../../../../../../../Tools/fileChecker'
import viewStudent from '../../../../../../Controller/Student/view';
import viewAS from '../../../../../../Controller/AcademicStructure/view';

function AddStudent() {
  
  const [studentInformation, setStudentInformation] = useState({ studentid: null, firstname: null, middlename: null, lastname: null, suffix: null, isactive: 1, gender: null, dob: null, pob: null, maritalstatus: "Single", citizenship: "PH", mobileno: null, homephoneno: null, currentphoneno: null, fathername: null, fathercontactno: null, fatherprofession: null, fatherplaceofwork: null, fatherannualincome: null, mothername: null, mothercontactno: null, motherprofession: null, motherplaceofwork: null, motherannualincome: null, guardianname: null, guardiancontactno: null, guardianprofession: null, guardianplaceofwork: null, guardianannualincome: null, addresseeofgradereport: null, primaryschool: null, primaryfromyear: null, primarytoyear: null, primaryschoolhonors: null, highschool: null, secondaryfromyear: null, secondarytoyear: null, highschoolhonors: null, college: null, collegefromyear: null, collegetoyear: null, collegehonors: null, programno: null, ay: null, sem: null, remarksAdmission: null, homeaddress: null, currentaddress: null, email: null, remarksBackground: null, nceeyeartaken: null, nceescore: null, percentilerank: null, entranceinterviewscale: null, entranceenglishscore: null, entrancemathscore: null, entrancesciencescore: null, nceeno: null});
  const [currPage, setCurrPage] = useState(0)
  const [ay, setAy] = useState([])
  const [curriculumList, setCurriculumList] = useState([])
  const [addModalStatus, setAddModalStatus] = useState(false)
  const [country, setCountry] = useState([])
  const [maritalStatus, setMaritalStatus] = useState("")
  const [suffix, setSuffix] = useState("")
  const [imgPath, setImgPath] = useState("")
  const [setupYear, setSetupYear] = useState([])
  const [programList, setProgramList] = useState([])

  const getNewStudentIDNo = () => {
    viewStudent.getTotalStudentEnrolled().then((res) => {
      setStudentInformation({
        ...studentInformation,
        studentid: res
      })
    }).catch((err) => {
      console.error(err)
    })
  }

  const getProgramListFunc = () => {
    viewAS.getProgramList().then((res) => {
      setProgramList(res.data.rows)
    }).catch((err) => {
      console.error(err)
    })
  }

  const generateYear = () => {
    const temp = []
    for (var i = new Date().getFullYear(); i >= 1990; i--) {
      temp.push(i)
    }
    setSetupYear(temp)
  }
    
  const generateAY = () => {
    const academicYears = [];
    for (let i = new Date().getFullYear(); i > 2016; i--) {
      academicYears.push(`${i}-${i + 1}`);
    }
    setAy(academicYears);
  }

  const handleNextPage = () => {
    setCurrPage(currPage+1)
  }

  const handleBackPage = () => {
    setCurrPage(currPage-1)
  }
  
  const getCurriculumListFunc = () => {
    view.getCurriculumList().then((res) => {
      setCurriculumList(res.data.rows)
    }).catch((err) => {
      console.error(err)
    })
  }

  const inputData = (e) => {
    setStudentInformation({
      ...studentInformation,
      [e.target.name]: e.target.value
    })
  }

  const inputImageDisplay = (e) => {
    console.log(e.target.files[0])
    if (FileChecker.ImageChecker(e.target.files[0])) {
      setImgPath(URL.createObjectURL(e.target.files[0]))
      console.log(e.target.files[0])
      setStudentInformation({
        ...studentInformation,
        [e.target.name]: e.target.files[0]
      })
    } else {
      setImgPath('')
    }
  }

  const handleSubmitStudent = (e) => {
    e.preventDefault();
    if (studentInformation.firstname !== '' && studentInformation.firstname !== null && studentInformation.lastname !== '' && studentInformation.lastname !== null && studentInformation.programno !== null && studentInformation.sem !== null && studentInformation.sem !== null) {
      setAddModalStatus(true)
    } else {
      alert('Please Fill Up the Important Information!')
    }
  }
  const fetchCountry = async () => {
    try {
      const countryData = await Country(axios, config);
      setCountry(countryData.rows)
    } catch (err) {
      throw err;
    }
  };

  const fetchMaritalStatus = async () => {
    try {
      const maritalStatusData = await MaritalStatus(axios, config);
      setMaritalStatus(maritalStatusData.rows)
    } catch (error) {
      alert('Error fetching country data:', error);
    }
  };

  const fetchSuffix = async () => {
    try {
      const suffixData = await Suffix(axios, config);
      setSuffix(suffixData.rows)
    } catch (error) {
      alert('Error fetching country data:', error);
    }
  };

  useEffect(() => {
    try {
      fetchSuffix()
      fetchMaritalStatus()
      fetchCountry()
      generateAY()
      getCurriculumListFunc()
      generateYear()
      getProgramListFunc()
      getNewStudentIDNo()
    } catch(err) {
      console.error(err)
    }
      
  }, [])

  return (
    <>
    { addModalStatus && <AddModalStudentConfirmation modalStatus={addModalStatus} setModalStatus={setAddModalStatus} data={studentInformation} /> }
      <Modal
        show={true}
        fullscreen
        backdrop='static'
        keyboard='false'
        scrollable='true'
      >
        <ModalHeader style={{backgroundColor: '#031B5B'}} >
            <div className='container-fluid text-white row'>
              <div className='col'>
                <h5 className='text-start'>ADD NEW STUDENT</h5>
              </div>
            </div>
        </ModalHeader>
        <ModalBody>
        <main>
          <form noValidate={false}>
            {
              currPage === 0 ? 
                (
                  <div className='d-flex justify-content-center align-items-center'>
                    <div className='card shadow p-4 m-3 border' style={{ width: '1200px' }}>
                      <div className='row'>
                        <div className='text-center card mt-3 bg-primary p-3 text-white mb-3'>
                          <h3>STUDENT'S INFORMATION</h3>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>First Name <span className='text-danger'>{studentInformation.firstname === null || studentInformation.firstname === '' ? '⚠️*' : '' }</span></h6>
                          <input onChange={inputData} type='text' name='firstname' id='firstname' className='form-control'  defaultValue={studentInformation.firstname && studentInformation.firstname}  />
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Middle Name</h6>
                          <input onChange={inputData} type='text' name='middlename' id='middlename' className='form-control' defaultValue={studentInformation.middlename && studentInformation.middlename} />
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Last Name  <span className='text-danger'>{studentInformation.lastname === null || studentInformation.lastname === '' ? '⚠️*' : '' }</span></h6>
                          <input onChange={inputData} type='text' name='lastname' id='lastname' className='form-control' defaultValue={studentInformation.lastname && studentInformation.lastname} />
                        </div>
                        <div className='col-md-1 mt-2'>
                          <h6>Suffix</h6>
                          <select onChange={inputData} className='form-control' name='suffix' id='suffix' value={studentInformation.suffix && studentInformation.suffix}>
                            <option value={null}></option>
                            {
                              suffix && suffix.map((item, index) => (
                                <option key={index} value={item.Suffix}>{item.Suffix}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className='col-md-1 mt-2'>
                          <h6>Active</h6>
                          <select onChange={inputData} className='form-control' name='isactive' id='isactive' value={studentInformation.isactive && studentInformation.isactive}>
                            <option key={1} value={null}></option>
                            <option key={2} value={1}>Yes</option>
                            <option key={3} value={0}>No</option>
                          </select>
                        </div>
                        <div className='col-md-1 mt-2'>
                          <h6>Gender</h6>
                          <select onChange={inputData} className='form-control' name='gender' id='gender' value={studentInformation.gender && studentInformation.gender}>
                            <option key={1} value={null}></option>
                            <option key={2} value={'M'}>Male</option>
                            <option key={3} value={'F'}>Female</option>
                          </select>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Date of Birth</h6>
                          <input onChange={inputData} type='date' name='dob' id='dob' className='form-control'  defaultValue={studentInformation.dob && studentInformation.dob}/>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Place of Birth</h6>
                          <input onChange={inputData} type='text' name='pob' id='pob' className='form-control'  defaultValue={studentInformation.pob && studentInformation.pob}/>
                        </div>
                        <div className='col-md-3 mt-2'>
                            <h6>Marital Status</h6>
                            <select onChange={inputData} className='form-control' name='maritalstatus' id='maritalstatus' value={studentInformation.maritalstatus && studentInformation.maritalstatus}>
                              <option value={null}></option>
                              {
                                maritalStatus && maritalStatus.map((item, index) => (
                                  <option key={index} value={item.Status}>{item.Status}</option>
                                ))
                              }
                            </select>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Citizenship </h6>
                          <select onChange={inputData} className='form-control' value={studentInformation.citizenship && studentInformation.citizenship}>
                            <option value={null}></option>
                            {
                              country && country.map((item, index) => (
                                <option key={index} value={item.ISO2}>{item.CountryName} ({item.ISO2})</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Email</h6>
                          <input onChange={inputData} type='email' className='form-control' name='email' id='email' defaultValue={studentInformation.email && studentInformation.email}/>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Home Address</h6>
                          <input onChange={inputData} type='text' className='form-control' name='homeaddress' id='homeaddress'  defaultValue={studentInformation.homeaddress && studentInformation.homeaddress}/>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Current Address</h6>
                          <input onChange={inputData} type='text' className='form-control' name='currentaddress' id='currentaddress'  defaultValue={studentInformation.currentaddress && studentInformation.currentaddress}/>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Mobile No.</h6>
                          <input onChange={inputData} type='text' className='form-control' name='mobileno' id='mobileno'  defaultValue={studentInformation.mobileno && studentInformation.mobileno}/>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Home Phone No.</h6>
                          <input onChange={inputData} type='text' className='form-control' name='homephoneno' id='homephoneno' defaultValue={studentInformation.homephoneno && studentInformation.homephoneno}/>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Current Phone No.</h6>
                          <input onChange={inputData} type='text' className='form-control' name='currentphoneno' id='currentphoneno'  defaultValue={studentInformation.currentphoneno && studentInformation.currentphoneno}/>
                        </div>
                        <div className='text-center mt-3'>
                          <h5>FATHER'S INFORMATION</h5>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Father's Name</h6>
                          <input onChange={inputData} type='text' className='form-control' name='fathername' id='fathername'  defaultValue={studentInformation.fathername && studentInformation.fathername}/>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Father's Contact No.</h6>
                          <input onChange={inputData} type='text' className='form-control' name='fathercontactno' id='fathercontactno'  defaultValue={studentInformation.fathercontactno && studentInformation.fathercontactno}/>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Father's Profession</h6>
                          <input onChange={inputData} type='text' className='form-control' name='fatherprofession' id='fatherprofession' defaultValue={studentInformation.fatherprofession && studentInformation.fatherprofession}/>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Father's Place Of Work</h6>
                          <input onChange={inputData} type='text' className='form-control' name='fatherplaceofwork' id='fatherplaceofwork' defaultValue={studentInformation.fatherplaceofwork && studentInformation.fatherplaceofwork}/>
                        </div>  
                        <div className='col-md-3 mt-2'>
                          <h6>Father's Annual Income</h6>
                          <input onChange={inputData} type='number' className='form-control' name='fatherannualincome' id='fatherannualincome' defaultValue={studentInformation.fatherannualincome && studentInformation.fatherannualincome}/>
                        </div>
                        <div className='text-center'>
                          <h5>MOTHER'S INFORMATION</h5>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Mother's Name</h6>
                          <input onChange={inputData} type='text' className='form-control' name='mothername' id='mothername' defaultValue={studentInformation.mothername && studentInformation.mothername}/>
                        </div> 
                        <div className='col-md-3 mt-2'>
                          <h6>Mother's Contact No.</h6>
                          <input onChange={inputData} type='text' className='form-control' name='mothercontactno' id='mothercontactno' defaultValue={studentInformation.mothercontactno && studentInformation.mothercontactno} />
                        </div> 
                        <div className='col-md-3 mt-2'>
                          <h6>Mother's Profession</h6>
                          <input onChange={inputData} type='text' className='form-control' name='motherprofession' id='motherprofession' defaultValue={studentInformation.motherprofession && studentInformation.motherprofession} />
                        </div> 
                        <div className='col-md-3 mt-2'>
                          <h6>Mother's Place of Work</h6>
                          <input onChange={inputData} type='text' className='form-control' name='motherplaceofwork' id='motherplaceofwork' defaultValue={studentInformation.motherplaceofwork && studentInformation.motherplaceofwork}/>
                        </div> 
                        <div className='col-md-3 mt-2'>
                          <h6>Mother's Annual Income</h6>
                          <input onChange={inputData} type='number' className='form-control' name='motherannualincome' id='motherannualincome' defaultValue={studentInformation.motherannualincome && studentInformation.motherannualincome}/>
                        </div> 
                        <div className='text-center'>
                          <h5>GUARDIAN'S INFORMATION</h5>
                        </div>
                        <div className='col-md-3 mt-2'>
                          <h6>Guardian's Name</h6>
                          <input onChange={inputData} type='text' className='form-control' name='guardianname' id='guardianname' defaultValue={studentInformation.guardianname && studentInformation.guardianname}/>
                        </div> 
                        <div className='col-md-3 mt-2'>
                          <h6>Guardian's Contact No.</h6>
                          <input onChange={inputData} type='text' className='form-control' name='guardiancontactno' id='guardiancontactno' defaultValue={studentInformation.guardiancontactno && studentInformation.guardiancontactno}/>
                        </div> 
                        <div className='col-md-3 mt-2'>
                          <h6>Guardian's Profession</h6>
                          <input onChange={inputData} type='text' className='form-control' name='guardianprofession' id='guardianprofession' defaultValue={studentInformation.guardianprofession && studentInformation.guardianprofession}/>
                        </div> 
                        <div className='col-md-3 mt-2'>
                          <h6>Guardian's Place of Work</h6>
                          <input onChange={inputData} type='text' className='form-control' name='guardianplaceofwork' id='guardianplaceofwork' defaultValue={studentInformation.guardianplaceofwork && studentInformation.guardianplaceofwork}/>
                        </div> 
                        <div className='col-md-3 mt-2'>
                          <h6>Guardian's Annual Income</h6>
                          <input onChange={inputData} type='number' className='form-control' name='guardianannualincome' id='guardianannualincome' defaultValue={studentInformation.guardianannualincome && studentInformation.guardianannualincome}/>
                        </div> 
                        <div className='col-md-3 mt-2'>
                          <h6>Addressee Of Grade Report</h6>
                          <input onChange={inputData} type='text' className='form-control' name='addresseeofgradereport' defaultValue={studentInformation.addresseeofgradereport && studentInformation.addresseeofgradereport}/>
                        </div>
                      </div> 
                    </div>
                  </div>
                )
              :
              currPage === 1 ? 
                (
                  <div className='d-flex justify-content-center align-items-center' style={{ height: '85vh' }}>
                    <div className='container card shadow p-3 m-3 border-0' style={{ width: '1200px' }} >
                      <div className='text-center card mt-3 bg-primary p-3 text-white mb-3'>
                        <h3>STUDENT ADMISSION</h3>
                      </div>
                      <div className='row'>
                        <div className='col-6'>
                          <h6>Program <span className='text-danger'>{studentInformation.programno === null || studentInformation.programno === '' ? '⚠️*' : '' }</span></h6>
                          <select onChange={inputData} name='programno' id='programno' className='form-control' value={studentInformation.programno && studentInformation.programno} required>
                            <option value={null}></option>
                            {
                              programList && programList.map((item, index) => (
                                <option key={index} value={item.proNo}>{`${item.depName} (${item.proCode})`}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className='col-md-3'>
                          <h6>AY <span className='text-danger'>{studentInformation.ay === null || studentInformation.ay === '' ? '⚠️*' : '' }</span></h6>
                          <select onChange={inputData} name='ay' id='ay' className='form-control'  value={studentInformation.ay && studentInformation.ay}  required>
                            <option value={null}></option>
                            {
                              ay.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className='col-md-3'>
                          <h6>Semester <span className='text-danger'>{studentInformation.sem === null || studentInformation.sem === '' ? '⚠️*' : '' }</span></h6>
                          <select onChange={inputData} name='sem' id='sem' className='form-control' value={studentInformation.sem && studentInformation.sem} required>
                            <option value={null}></option>
                            <option value='1ST'>First Semester</option>
                            <option value='2ND'>Second Semester</option>
                            <option value='3RD'>Third Semester</option>
                            <option value='SUM'>Summer</option>
                          </select>
                        </div>
                        <div className='col-md-12'>
                          <h6>Remarks</h6>
                          <textarea onChange={inputData} className='form-control' type='text' name='remarksAdmission' defaultValue={studentInformation.remarksAdmission && studentInformation.remarksAdmission} id='remarksAdmission' required/>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              :
              currPage === 2 ? 
                (
                  <div className='d-flex justify-content-center align-items-center' style={{ height: '85vh' }}>
                    <div className='card shadow p-3 m-3 border-0'  style={{ width: '1200px' }} >
                      <div className='row'>
                        {/*                 Primary School Information              */}
                        <div className='text-center card mt-3 bg-primary p-3 text-white mb-3'>
                            <h3>PRIMARY SCHOOL INFORMATION</h3>
                        </div>
                        <div className='col-4'>
                            <h6>Primary School</h6>
                            <textarea onChange={inputData} className='form-control' type='text' name='primaryschool' id='primaryschool' defaultValue={studentInformation.primaryschool && studentInformation.primaryschool} required/>
                        </div>
                        <div className='col-4'>
                            <h6>Primary School Time Period</h6>
                            <div className='row'>
                                <div className='col-6'>
                                    <select onChange={inputData} className='form-control' type='number' name='primaryfromyear' id='primaryfromyear' value={studentInformation.primaryfromyear && studentInformation.primaryfromyear} required>
                                      <option value={null}></option>
                                      {
                                        setupYear.map((item, index) => (
                                          <option value={item} key={index}>{item}</option>
                                        ))
                                      }
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <select onChange={inputData} className='form-control' type='number' name='primarytoyear' id='primarytoyear' value={studentInformation.primarytoyear && studentInformation.primarytoyear} required>
                                      <option value={null}></option>
                                      {
                                        setupYear.map((item, index) => (
                                          <option value={item} key={index}>{item}</option>
                                        ))
                                      }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <h6>Awards / Honors</h6>
                            <textarea onChange={inputData} className='form-control' type='text' name='primaryschoolhonors' id='primaryschoolhonors' defaultValue={studentInformation.primaryschoolhonors && studentInformation.primaryschoolhonors} required/>
                        </div>
                        {/*                 Secondary School Information          */}
                        <div className='text-center pt-5 pb-3'>
                            <h5>SECONDARY/HIGH SCHOOL INFORMATION</h5>
                        </div>
                        <div className='col-4'>
                            <h6>High School</h6>
                            <textarea onChange={inputData} className='form-control' type='text' name='highschool' id='highschool' defaultValue={studentInformation.highschool && studentInformation.highschool} required/>
                        </div>
                        <div className='col-4'>
                            <h6>High School Time Period</h6>
                            <div className='row'>
                                <div className='col-6'>
                                    <select onChange={inputData} className='form-control' type='number' name='secondaryfromyear' id='secondaryfromyear' value={studentInformation.secondaryfromyear && studentInformation.secondaryfromyear} required>
                                      <option value={null}></option>
                                      {
                                        setupYear.map((item, index) => (
                                          <option value={item} key={index}>{item}</option>
                                        ))
                                      }
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <select onChange={inputData} className='form-control' type='number' name='secondarytoyear' id='secondarytoyear' value={studentInformation.secondarytoyear && studentInformation.secondarytoyear} required>
                                      <option value={null}></option>
                                      {
                                        setupYear.map((item, index) => (
                                          <option value={item} key={index}>{item}</option>
                                        ))
                                      }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <h6>Awards / Honors</h6>
                            <input onChange={inputData} className='form-control' type='text' name='highschoolhonors' id='highschoolhonors' defaultValue={studentInformation.highschoolhonors && studentInformation.highschoolhonors} required/>
                        </div>
                        {/*                 College Information          */}
                        <div className='text-center pt-5 pb-3'>
                            <h5>COLLEGE INFORMATION</h5>
                        </div>
                        <div className='col-4'>
                            <h6>College</h6>
                            <textarea onChange={inputData} className='form-control' type='text' name='college' id='college' defaultValue={studentInformation.college && studentInformation.college} required/>
                        </div>
                        <div className='col-4'>
                            <h6>College Time Period</h6>
                            <div className='row'>
                                <div className='col-6'>
                                    <select onChange={inputData} className='form-control' type='number' name='collegefromyear' id='collegefromyear' value={studentInformation.collegefromyear && studentInformation.collegefromyear} required>
                                      <option value={null}></option>
                                      {
                                        setupYear.map((item, index) => (
                                          <option value={item} key={index}>{item}</option>
                                        ))
                                      }
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <select onChange={inputData} className='form-control' type='number' name='collegetoyear' id='collegetoyear' value={studentInformation.collegetoyear && studentInformation.collegetoyear} required>
                                    <option value={null}></option>
                                      {
                                        setupYear.map((item, index) => (
                                          <option value={item} key={index}>{item}</option>
                                        ))
                                      }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                          <h6>Awards / Honors</h6>
                          <textarea onChange={inputData} className='form-control' type='text' name='collegehonors' id='collegehonors' defaultValue={studentInformation.collegehonors && studentInformation.collegehonors} required/>
                        </div>

                        <div className='col-4 mt-4'>
                          <h6>Entrance Interview Scale</h6>
                          <input onChange={inputData} className='form-control' type='text' name='entranceinterviewscale' id='entranceinterviewscale' defaultValue={studentInformation.entranceinterviewscale && studentInformation.entranceinterviewscale} required/>
                        </div>
                        <div className='col-4 mt-4'>
                          <h6>Entrance English Score</h6>
                          <input onChange={inputData} className='form-control' type='text' name='entranceenglishscore' id='entranceenglishscore' defaultValue={studentInformation.entranceenglishscore && studentInformation.entranceenglishscore} required/>
                        </div>
                        <div className='col-4 mt-4'>
                          <h6>Entrance Math Score</h6>
                          <input onChange={inputData} className='form-control' type='text' name='entrancemathscore' id='entrancemathscore' defaultValue={studentInformation.entrancemathscore && studentInformation.entrancemathscore} required/>
                        </div>

                        <div className='col-4 mt-3'>
                          <h6>Entrance Science Score</h6>
                          <input onChange={inputData} className='form-control' type='text' name='entrancesciencescore' id='entrancesciencescore' defaultValue={studentInformation.entrancesciencescore && studentInformation.entrancesciencescore} required/>
                        </div>
                        <div className='col-4 mt-3'>
                          <h6>NCEE Score</h6>
                          <input onChange={inputData} className='form-control' type='text' name='nceescore' id='nceescore' defaultValue={studentInformation.nceescore && studentInformation.nceescore} required/>
                        </div>
                        <div className='col-4 mt-3'>
                          <h6>NCEE Number</h6>
                          <input onChange={inputData} className='form-control' type='text' name='nceeno' id='nceeno' defaultValue={studentInformation.nceeno && studentInformation.nceeno} required/>
                        </div>

                        <div className='col-4 mt-3'>
                          <h6>NCEE Year Taken</h6>
                          <input onChange={inputData} className='form-control' type='text' name='nceeyeartaken' id='nceeyeartaken' defaultValue={studentInformation.nceeyeartaken && studentInformation.nceeyeartaken} required/>
                        </div>
                        <div className='col-4 mt-3'>
                          <h6>Percentile Rank</h6>
                          <input onChange={inputData} className='form-control' type='text' name='percentilerank' id='percentilerank' defaultValue={studentInformation.percentilerank && studentInformation.percentilerank} required/>
                        </div>
                        <div className='col-4 mt-3'>
                          <h6>Remarks</h6>
                          <textarea onChange={inputData} className='form-control' type='text' name='remarksBackground' id='remarksBackground' defaultValue={studentInformation.remarksBackground && studentInformation.remarksBackground} required/>
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
        <ModalFooter style={{backgroundColor: '#031B5B'}}>
          <div className='container-fluid text-center'>
            <button style={{ width: '90px' }} className='btn text-white me-2' onClick={handleBackPage} disabled={currPage === 0 ? true : false}>Back</button>
            <Link style={{ width: '90px' }} to='../' className='btn btn-secondary me-2' disabled={true}>Close</Link>
            {
              currPage === 2 ? 
              <>
                <label htmlFor='saveNewStudent' onClick={handleSubmitStudent} style={{ width: '90px' }} className='btn btn-primary me-2' >Save</label>
              </>
              :
              <>
              </>
            }
            <button style={{ width: '90px' }} className='btn text-white' onClick={handleNextPage} disabled={currPage === 2 ? true : false}>Next</button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AddStudent
