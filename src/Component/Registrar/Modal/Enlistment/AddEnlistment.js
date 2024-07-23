import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAcademicYear } from '../../../../Tools/date'
import view from '../../../Controller/Administrator/view'
import viewEnlist from '../../../Controller/Enlistment/view'
import algorithm from '../../../../Tools/FilteringAlgorithm'
import viewAcademic from '../../../Controller/AcademicStructure/view'
import { useAuth } from '../../../../AuthContext'
import Loadings from '../../../Loadings/Loadings'

import others from '../../../Controller/view/others'
import DisplaySubjectToEnroll from './EnlistmentChild/Child/DisplaySubjectToEnroll'

function Enlistment() {

    const { data } = useAuth();
    const [academicYear, setAcademicYear] = useState([])
    const [semester, setSemester] = useState([])
    const [registrationData, setRegistrationData] = useState({ Sem: data.Sem, AY: data.AY, RegistrationNo: null, BlockType: null, PaymentOption: '3PPLAN', Status: 'CONT', ProgramNo: -1 });
    const [installmentPlan, setInstallmentPlan] = useState([]);
    const [studentListForEnlistment, setStudentListForEnlistment] = useState([]);
    const [blockSection, setBlockSection] = useState(null);
    const [programList, setProgramList] = useState([]);
    const [modalStatusRegularStudentSubject, setModalStatusRegularStudentSubject] = useState(false);
    const [isReg, setIsReg] = useState(false);
    const [loadingModalStatus, setLoadingModalStatus] = useState(false)
    
    /*
        const getSettingsFunc = (sem) => {
            view.getSettings().then((res) => {
                // console.log(res.data.rows[0])
                const today = new Date().toISOString();
                setRegistrationData({
                    ...registrationData,
                    isforceopenregistration: Date(res.data.rows[0].forceopenregistrationfrom) >= Date(today) && Date(res.data.rows[0].forceopenregistrationto) <= Date(today),
                    islateregistration: sem === "1ST" ? Date(res.data.rows[0].firstsemregistrationfrom) >= Date(today) && Date(res.data.rows[0].firstsemregistrationto) <= Date(today) : sem === '2ND' ? Date(res.data.rows[0].secondsemregistrationfrom) >= Date(today) && Date(res.data.rows[0].secondsemregistrationto) <= Date(today) : sem === "SUM" ? Date(res.data.rows[0].summerregistrationfrom
                    ) >= Date(today) && Date(res.data.rows[0].summerregistrationto) <= Date(today) : "Please Select Valid Sem!"
                })
            }).catch((err) => {
                console.error(err) 
            })
        }
    */

    const getAcademicYearFunc = () => {
        getAcademicYear().then((res) => {
            setAcademicYear(res)
        }).then((err) => {
            console.error(err)
        })
    }

    const getInstallmentFunc = () => {
        view.getInstallmentPlan().then((res) => {
            setInstallmentPlan(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const getSemesterFunc = async () => {
        others.getSemester().then((res) => {
            setSemester(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const getStudentTotalEnrollFunc = async () => {
        const data = await viewEnlist.getStudentTotalEnroll();
        setRegistrationData({
            ...registrationData,
            Count: data.data.rows[0].totalEnroll
        })
    }
    
    const getProgramListEnlistFunc = () => {
        viewAcademic.getProgramListEnlist().then((res) => {
            setProgramList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const getStudentOldAccountBalanceFunc = (StudentID, temp) => {
        const query = { StudentID };
        viewEnlist.getStudentOldAccountBalance(query).then((res) => {
            setRegistrationData({
                ...registrationData,
                OldAccount: res.data.rows[0].OldAccount === null ? 0 : res.data.rows[0].OldAccount,
                StudentID: temp.StudentID,
                StudentName: temp.StudentName,
                StudentUID: temp.StudentUID,
                ProgramNo: temp.ProgramNo
            })
        }).catch((err) => {
            console.error(err)
        })
        setLoadingModalStatus(false)
    };

    const getBlockSectionFunc = (data) => {
        setLoadingModalStatus(true)
        viewEnlist.getBlockSection(data).then((res) => {
            setBlockSection(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
        setLoadingModalStatus(false)
    }

    const inputData = (e) => {
        
        if (e.target.name === 'StudentID') {
            setLoadingModalStatus(true)
            const temp = algorithm.filterStudentID(studentListForEnlistment, e.target.value)
            getStudentOldAccountBalanceFunc(e.target.value, temp)
        }
        
        if (e.target.name === 'AY' || e.target.name === 'Sem' || e.target.name === 'BlockType' || e.target.name === 'Year' || e.target.name === 'ProgramNo') {
            setBlockSection(null)
            refreshBlock()
        }

        setRegistrationData({
            ...registrationData,
            [e.target.name]: e.target.value
            
        })
    }

    const getStudentListForEnlistmentFunc = () => {
        viewEnlist.getStudentForEnlistment().then((res) => {
            setStudentListForEnlistment(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const refreshBlock = () => {
        if (registrationData.AY !== null && registrationData.Sem !== null && registrationData.BlockType !== null && registrationData.Year !== null && registrationData.ProgramNo !== null) {
            if (blockSection === null) {
                getBlockSectionFunc(registrationData)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setModalStatusRegularStudentSubject(true)
    }

    useEffect(() =>  {
        getAcademicYearFunc()
        getSemesterFunc()
        getInstallmentFunc()
        getStudentListForEnlistmentFunc()
        getStudentTotalEnrollFunc()
        getProgramListEnlistFunc()
    }, [])

    useEffect(() => {
        refreshBlock()
    })

    return (
        <>
        {loadingModalStatus && <Loadings loadingStatus={loadingModalStatus}  />}
        {modalStatusRegularStudentSubject && <DisplaySubjectToEnroll modalStatus={modalStatusRegularStudentSubject} setModalStatus={setModalStatusRegularStudentSubject} data={registrationData} />}
        <Modal
            show={true}
            backdrop="static"
            keyboard={false}
            size='xl'
            centered
        >
            <Modal.Header className='text-white' style={{backgroundColor: '#031B5B'}}>
                <h5>ADD ENLISTMENT</h5>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: '#B2BEB5'}}>
                <div className='card shadow m-3 p-5'>
                    <form noValidate={false} onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-4 mt-2'>
                                <h6>Student ID</h6>
                                <select name='StudentID' onChange={inputData} className='form-control' required>
                                    <option value={null}></option>
                                    {
                                        studentListForEnlistment && studentListForEnlistment.map((item, index) =>(
                                            <option key={index} value={item.StudentID}>{item.StudentName} ({item.StudentID})</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='col-4 mt-2'>
                                <h6>Student Name</h6>
                                <input defaultValue={registrationData.StudentName && registrationData.StudentName} className='form-control' type='text'  disabled={true} name='StudentName' />
                            </div>
                            <div className='col-2 mt-2'>
                                <h6>Old Account</h6>
                                <input defaultValue={registrationData.OldAccount && registrationData.OldAccount} className='form-control' type='text' disabled={true} name='OldAccount' />
                            </div>
                            <div className='col-2 mt-2'>
                                <h6>Enrollee Count</h6>
                                <input defaultValue={registrationData.Count && registrationData.Count} className='form-control' type='number' disabled={true} name='Count'/>
                            </div>
                            <div className='col-12 mt-2'>
                                <hr />
                            </div>
                            <div className='col-3 mt-2'>
                                <h6>Academic Year</h6>
                                <select value={registrationData.AY && registrationData.AY} onChange={inputData} className='form-control' name='AY' required disabled>
                                    <option value={null}></option>
                                    {
                                        academicYear && academicYear.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <h6>Semester</h6>
                                <select value={registrationData.Sem && registrationData.Sem} onChange={inputData} className='form-control' name='Sem' required disabled>
                                    <option value={null}></option>
                                    {
                                        semester && semester.map((item, index) => (
                                            <option key={index} value={item.Code}>{`${(item.Code)} ${item.Label}`}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <h6>Payment Option</h6>
                                <select value={registrationData.PaymentOption} onChange={inputData} className='form-control' name='PaymentOption' required>
                                    <option value={null}></option> 
                                    {
                                        installmentPlan && installmentPlan.map((item, index) => (
                                            <option value={item.PlanCode} key={index}>{`${(item.PlanCode)} ${item.Label}`}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <h6>Status</h6>
                                <select value={registrationData.Status} onChange={inputData} className='form-control' name='Status' required>
                                    <option value={null}></option>
                                    <option value='CONT'>CONT (Continuing)</option>
                                    <option value='NEW'>NEW (Beginning Freshman)</option>
                                    <option value='RET'>RET (Returnee)</option>
                                    <option value='TFE'>TFE (Transferee)</option>
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <h6>Program</h6>
                                <select value={registrationData.ProgramNo} onChange={inputData} className='form-control' name='ProgramNo' disabled required>
                                    <option value={null}></option>
                                    {
                                        programList && programList.map((item, index) => (
                                            <option key={index} value={item.ProgramNo}>{item.Code} ({item.Title})</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <h6>Year Level</h6>
                                <select defaultValue={registrationData.Year} onChange={inputData} name='Year' className='form-control ' required> 
                                    <option value={null}></option>
                                    <option value={1}>Year 1</option>
                                    <option value={2}>Year 2</option>
                                    <option value={3}>Year 3</option>
                                    <option value={4}>Year 4</option>
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <h6>Block Type</h6>
                                <select defaultValue={registrationData.BlockType} onChange={inputData} name='BlockType' className='form-control' required>
                                    <option value={null}></option>
                                    <option value={'REG'}>REGULAR</option>
                                    <option value={'IRREG'}>IRREGULAR</option>
                                </select>
                            </div>
                            <div className='col-3 mt-2'>
                                <h6>Block</h6>
                                <select defaultValue={registrationData.BlockID} onChange={inputData} name='BlockID' className='form-control' required>
                                    <option value={null}></option>
                                    {
                                        blockSection && blockSection.map((item, index) => (
                                            <option key={index} value={item.BlockID}>{item.BlockID}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='text-center'>
                            <input className='btn btn-primary mt-4' type='submit' value='Continue' />
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: '#031B5B'}}>
                <Link to='../' className='btn btn-secondary'>Cancel</Link>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default Enlistment
