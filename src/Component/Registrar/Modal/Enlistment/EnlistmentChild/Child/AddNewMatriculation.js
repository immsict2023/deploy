import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, Outlet, useParams } from 'react-router-dom'
import view from '../../../../../Controller/Enlistment/view'
import currency from '../../../../../../Tools/currency'
import viewStudent from '../../../../../Controller/Student/view'
import DropEnlistmentConfirmation from '../ConfirmationModal/DropEnlistmentConfirmation'
import DropFeesConfirmation from '../ConfirmationModal/DropFeesConfirmation'
import { militaryToStandardTime } from '../../../../../../Tools/date'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faLock, faLockOpen, faPlus } from '@fortawesome/free-solid-svg-icons'
import NewFeesModal from '../ConfirmationModal/NewFeesModal'
import NewSubjectModal from '../ConfirmationModal/NewSubjectModal'

function AddNewMatriculation() {

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth returns zero-based index
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    const [countDropSubject, setCountDropSubject] = useState(0)

    const [registrationSubjectDetails, setRegistrationSubjectDetails] = useState([])
    const [totalUnits, setTotalUnits] = useState(0)
    const [registrationFee, setRegistrationFee] = useState([])
    const [matriculationChange, setMatriculationChange] = useState({matriculationchangefee: null, reason: null, datefiled: formattedDate, addedunits: 0, addedtuition: 0, addedmiscfees: 0, addedotherfees: 0, addedlabfees: 0, addedtaaf: 0, addedtuitionandfees: 0, totaldue: 0, droppedunits: 0, droppedtuition: 0, droppedmiscfees: 0, droppedotherfees: 0, droppedlabfees: 0, droppedtaaf: 0, droppedtuitionandfees: 0})
    const [studentEnlistmentInfo, setStudentEnlistmentInfo] = useState([])

    const [tabsNumber, setTabsNumber] = useState(0)

    const [modalStatusInlistment, setModalStatusInlistment] = useState(false)
    const [modalStatusFees, setModalStatusFees] = useState(false)
    const [modalStatusNewFees, setModalStatusNewFees] = useState(false)
    const [modalStatusNewSubject, setModalStatusNewSubject] = useState(false)

    const [matriculationChangeExist, setMatriculationChangeExist] = useState(null)

    const [enlistmentLockTransaction, setEnlistmentLockTransaction] = useState(false)
    const [feesBreakdownLockTransaction, setFeesBreakdownLockTransaction] = useState(false)

    const [enlistmentDrop, setEnlistmentDrop] = useState([])
    const [feesBreakdown, setFeesBreakdown] = useState([])

    const checkerForAllLength = enlistmentDrop.length > 0 || feesBreakdown.length > 0;
    const checkerEnlistmentLength = enlistmentDrop.length > 0;
    const checkerFeesLength = feesBreakdown.length > 0;

    const { registrationno } = useParams()

    const getStudentData = (registrationno) => {
        const data = {registrationno}
        view.getStudentEnlistment(data).then((res) => {
            if (res.data.rows.length > 0) {
                setStudentEnlistmentInfo(res.data.rows[0])
                getMatriculationChangeFunc(registrationno)
                setMatriculationChange({
                    ...matriculationChange,
                    ay: res.data.rows[0].ay,
                    sem: res.data.rows[0].sem,
                    registrationno : res.data.rows[0].registrationno ,
                    studentid: res.data.rows[0].studentid,
                    programno : res.data.rows[0].programno,
                    section : "IRREG-BLOCK"
                })
            } else {
                alert('No Student Data Found!')
            }
        }).catch((err) => {
            console.error(err)
        })
    }
 
    const getMatriculationChangeFunc = (registrationno) => {
        view.getMatriculationChange(registrationno).then((res) => {
            if (res.data.rows.length > 0) {
                setMatriculationChange(res.data.rows[0]); 
                console.log(res.data.rows[0])
                setMatriculationChangeExist(true)
            } else {
                setMatriculationChangeExist(false)
            }
        }).catch((err) => {
            console.error(err);
        });
    };    
    
    const countUnits = (data) => {
        try {
            var totalUnitsSum = 0;
            for (var i = 0; i <  data.length; i++) {
                totalUnitsSum+=Number(data[i].Units);
            }
            setTotalUnits(totalUnitsSum)
        } catch(err) {
            console.error(err)
        }
    }
    
    const getRegistrationSubjectDetailsFunc = (registrationno) => {
        viewStudent.getRegistrationDetails(registrationno).then((res) => {
            if (res.data.success) {
                if (Number(res.data.rows.length) > 0) {
                    setRegistrationSubjectDetails(res.data.rows)
                    countUnits(res.data.rows)
                }
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    const getRegistrationFeeDetailsFunc = (registrationno) => {
        view.getRegistrationFeeDetails(registrationno).then((res) => {
            if (res.data.success) {
                if (Number(res.data.rows.length) > 0) {
                    setRegistrationFee(res.data.rows)
                }
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    const dropSubject = (subjectNo, id, item) => {
        setEnlistmentLockTransaction(false)
        if (enlistmentDrop.includes(subjectNo)) {
            enlistmentDrop.splice(enlistmentDrop.indexOf(subjectNo), 1);                 // Array List of Deleting rows
            document.getElementById(id).checked = false;
            setMatriculationChange({
                ...matriculationChange,
                droppedunits: matriculationChange.droppedunits - item.Units,
                droppedtuition: matriculationChange.droppedtuition - (item.Units * item.UnitFee),
                totaldue: matriculationChange.totaldue + (item.Units * item.UnitFee),
                droppedtuitionandfees: matriculationChange.droppedtuitionandfees - (item.Units * item.UnitFee)
            })
        } else {
            enlistmentDrop.push(subjectNo)
            document.getElementById(id).checked = true;
            setMatriculationChange({
                ...matriculationChange,
                droppedunits: matriculationChange.droppedunits + item.Units,
                droppedtuition: matriculationChange.droppedtuition + (item.Units * item.UnitFee),
                totaldue: matriculationChange.totaldue - (item.Units * item.UnitFee),
                droppedtuitionandfees: matriculationChange.droppedtuitionandfees + (item.Units * item.UnitFee)
            })
        }
    }

    const inputData = (e) => {
        setMatriculationChange({
            ...matriculationChange,
            [e.target.name]: e.target.value
        }) 
    }

    const dropFeesBreakdown = (regnfeedetailno, id, item) => {
        
        setFeesBreakdownLockTransaction(false)
        if (feesBreakdown.includes(regnfeedetailno)) {
            feesBreakdown.splice(feesBreakdown.indexOf(regnfeedetailno), 1);             // Array List of Deleting rows

            document.getElementById(id).checked = false;
            if (String(item.RFTCode) === "LF") {
                setMatriculationChange({
                    ...matriculationChange,
                    droppedlabfees: matriculationChange.droppedlabfees - item.Amount,
                    droppedtuitionandfees: matriculationChange.droppedtuitionandfees - item.Amount,
                    totaldue: matriculationChange.totaldue + item.Amount
                })
            }
            if (String(item.RFTCode) === "MF") {
                setMatriculationChange({
                    ...matriculationChange,
                    droppedmiscfees: matriculationChange.droppedmiscfees - item.Amount,
                    totaldue: matriculationChange.totaldue + item.Amount,
                    droppedtuitionandfees: matriculationChange.droppedtuitionandfees - item.Amount
                })
            }
            if (String(item.RFTCode) === "OF") {
                setMatriculationChange({
                    ...matriculationChange,
                    droppedotherfees: matriculationChange.droppedotherfees - item.Amount,
                    totaldue: matriculationChange.totaldue + item.Amount,
                    droppedtuitionandfees: matriculationChange.droppedtuitionandfees - item.Amount
                })
            }
            if (String(item.RFTCode) === "TAAF") {
                setMatriculationChange({
                    ...matriculationChange,
                    droppedtaaf: matriculationChange.droppedtaaf - item.Amount,
                    totaldue: matriculationChange.totaldue + item.Amount,
                    droppedtuitionandfees: matriculationChange.droppedtuitionandfees - item.Amount
                })
            }
        } else {
            feesBreakdown.push(regnfeedetailno)
            document.getElementById(id).checked = true;
            if (String(item.RFTCode) === "LF") {
                setMatriculationChange({
                    ...matriculationChange,
                    droppedlabfees: matriculationChange.droppedlabfees + item.Amount,
                    totaldue: matriculationChange.totaldue - item.Amount,
                    droppedtuitionandfees: matriculationChange.droppedtuitionandfees + item.Amount
                })
            }
            if (String(item.RFTCode) === "MF") {
                setMatriculationChange({
                    ...matriculationChange,
                    droppedmiscfees: matriculationChange.droppedmiscfees + item.Amount,
                    totaldue: matriculationChange.totaldue - item.Amount,
                    droppedtuitionandfees: matriculationChange.droppedtuitionandfees + item.Amount
                })
            }
            if (String(item.RFTCode) === "OF") {
                setMatriculationChange({
                    ...matriculationChange,
                    droppedotherfees: matriculationChange.droppedotherfees + item.Amount,
                    totaldue: matriculationChange.totaldue - item.Amount,
                    droppedtuitionandfees: matriculationChange.droppedtuitionandfees + item.Amount
                })
            }
            if (String(item.RFTCode) === "TAAF") {
                setMatriculationChange({
                    ...matriculationChange,
                    droppedtaaf: matriculationChange.droppedtaaf + item.Amount,
                    totaldue: matriculationChange.totaldue - item.Amount,
                    droppedtuitionandfees: matriculationChange.droppedtuitionandfees + item.Amount
                })
            }
        }
        
    }

    const handleNewFeesModal = () => {
        const matriculationChangeFee = matriculationChange.matriculationchangefee;
        if (typeof matriculationChangeFee === 'string' && matriculationChangeFee.trim() === '' ) {
            alert("Please Fill the Matriculation Change Fee!");
        } else if (!matriculationChange?.reason?.trim()) {
            alert("Please Fill the Reason!");
        } else {
            setModalStatusNewFees(true);  
        }     
    }   

    const handleNewSubjectModal = () => {
        setMatriculationChange({
            ...matriculationChange,
            studentname: studentEnlistmentInfo.studentname
        })
        const matriculationChangeFee = matriculationChange.matriculationchangefee;
        if (typeof matriculationChangeFee === 'string' && matriculationChangeFee.trim() === '' ) {
            alert("Please Fill the Matriculation Change Fee!");
        } else if (!matriculationChange?.reason?.trim()) {
            alert("Please Fill the Reason!");
        } else {
            setModalStatusNewSubject(true)
        }  
    }

    const handleDropEnlistment = () => {
        feesBreakdown.splice(0, feesBreakdown.length);
        setModalStatusInlistment(true)
    }

    const handleFeesBreakdown = () => {
        enlistmentDrop.splice(0, enlistmentDrop.length);
        setModalStatusFees(true)
    }

    const enlistmentLockTransactionFunc = () => {
        if (enlistmentDrop.length > 0 ) {
            if (String(matriculationChange.reason).length > 0) {
                if (String(matriculationChange.matriculationchangefee).length > 0) {
                    setEnlistmentLockTransaction(true)
                } else {
                    setEnlistmentLockTransaction(false)
                    alert('Please fill up the Matriculation Change Fee Field!')
                }
            } else {
                setEnlistmentLockTransaction(false)
                alert('Please fill up the Reason Field!')
            }
            
        } else {
            setEnlistmentLockTransaction(false)
            alert('Please Select Item to DROP!')
        }
    }

    const feesBreakdownLockTransactionFunc = () => {
        if (feesBreakdown.length > 0) {
            if (String(matriculationChange.reason).length > 0) {
                if (String(matriculationChange.matriculationchangefee).length > 0) {
                    setFeesBreakdownLockTransaction(true)
                } else {
                    setFeesBreakdownLockTransaction(false)
                    alert('Please fill up the Matriculation Change Fee Field!')
                }
            } else {
                setFeesBreakdownLockTransaction(false)
                alert('Please fill up the Reason Field!')
            }
        } else {
            setFeesBreakdownLockTransaction(false)
            alert('Please Select Item to DROP!')
        }
    }

    useEffect(() => {
        getStudentData(registrationno);
        getRegistrationFeeDetailsFunc(registrationno);
        getRegistrationSubjectDetailsFunc(registrationno);
        feesBreakdown.splice(feesBreakdown.indexOf(0), 1);
        enlistmentDrop.splice(enlistmentDrop.indexOf(0), 1);
        setEnlistmentLockTransaction(false)
        setFeesBreakdownLockTransaction(false)
    }, [countDropSubject]);
    

    return (
        <>
        {modalStatusInlistment && <DropEnlistmentConfirmation modalStatus={modalStatusInlistment} setModalStatus={setModalStatusInlistment} data={enlistmentDrop} onSuccessCount={((count) => {setCountDropSubject(count)})} count={countDropSubject} mData={matriculationChange} matriculationChangeExist={matriculationChangeExist} />}
        {modalStatusFees && <DropFeesConfirmation modalStatus={modalStatusFees} setModalStatus={setModalStatusFees} data={feesBreakdown} onSuccessCount={((count) => {setCountDropSubject(count)})} count={countDropSubject} mData={matriculationChange} matriculationChangeExist={matriculationChangeExist} />}
        {modalStatusNewFees && <NewFeesModal modalStatus={modalStatusNewFees} setModalStatus={setModalStatusNewFees} onSuccessCount={((count) => {setCountDropSubject(count)})} count={countDropSubject} matriculationChange={matriculationChange} studentEnlistmentInfo={studentEnlistmentInfo} matriculationChangeExist={matriculationChangeExist}/>}
        {modalStatusNewSubject && <NewSubjectModal modalStatus={modalStatusNewSubject} setModalStatus={setModalStatusNewSubject} matriculationChange={matriculationChange} onSuccessCount={((count) => {setCountDropSubject(count)})} count={countDropSubject} matriculationChangeExist={matriculationChangeExist} registrationSubjectDetails={registrationSubjectDetails}/>}
            <Modal
                show={true}
                fullscreen
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>ADD MATRICULATION CHANGE</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <div className='card p-4 m-5 shadow'>
                            <table className='table table-borderless'>
                                <tbody>
                                    <tr>
                                        <td>Student ID</td>
                                        <td><b>{`${studentEnlistmentInfo.studentname && studentEnlistmentInfo.studentname} (${studentEnlistmentInfo.studentid && studentEnlistmentInfo.studentid})`}</b></td>
                                        <td></td>
                                        <td></td>
                                        <td>Added Units</td>
                                        <td><b>{matriculationChange.addedunits === undefined || matriculationChange.addedunits === null ? 0 : matriculationChange.addedunits}</b></td>
                                        <td>Dropped Units</td>
                                        <td><b>{matriculationChange.droppedunits === undefined || matriculationChange.droppedunits === null ? 0 : matriculationChange.droppedunits}</b></td>
                                    </tr>
                                    <tr>
                                        <td>AY</td>
                                        <td><b>{studentEnlistmentInfo.ay}</b></td>
                                        <td>Sem</td>
                                        <td><b>{studentEnlistmentInfo.sem}</b></td>
                                        <td>Added Tuition</td>
                                        <td><b>{currency.formatter.format(matriculationChange.addedtuition === undefined || matriculationChange.addedtuition === null ? 0 : matriculationChange.addedtuition)}</b></td>
                                        <td>Dropped Tuition</td>
                                        <td><b>{currency.formatter.format(matriculationChange.droppedtuition === undefined || matriculationChange.droppedtuition === null ? 0 : matriculationChange.droppedtuition)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Program</td>
                                        <td><b>{studentEnlistmentInfo.code && studentEnlistmentInfo.code}</b></td>
                                        <td>Section/Block</td>
                                        <td><b>{studentEnlistmentInfo.section && studentEnlistmentInfo.section}</b></td>
                                        <td>Added Misc Fees</td>
                                        <td><b>{currency.formatter.format(matriculationChange.addedmiscfees === undefined || matriculationChange.addedmiscfees === null ? 0 : matriculationChange.addedmiscfees)}</b></td>
                                        <td>Dropped Misc Fees</td>
                                        <td><b>{currency.formatter.format(matriculationChange.droppedmiscfees === undefined || matriculationChange.droppedmiscfees === null ? 0 : matriculationChange.droppedmiscfees)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Date Filed</td>
                                        <td><input onChange={inputData} type='datetime-local' defaultValue={matriculationChange.datefiled} className='form-control' name='datefiled' /></td>
                                        <td>Matriculation Change Fee</td>
                                        <td><input onChange={inputData} defaultValue={matriculationChange.matriculationchangefee && matriculationChange.matriculationchangefee} type='number' name='matriculationchangefee' className='form-control' /></td>
                                        <td>Added Other Fees</td>
                                        <td><b>{currency.formatter.format(matriculationChange.addedotherfees === undefined || matriculationChange.addedotherfees === null ? 0 : matriculationChange.addedotherfees)}</b></td>
                                        <td>Dropped Other Fees</td>
                                        <td><b>{currency.formatter.format(matriculationChange.droppedotherfees === undefined || matriculationChange.droppedotherfees === null ? 0 : matriculationChange.droppedotherfees)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Reason</td>
                                        <td colSpan={3}><textarea  onChange={inputData} defaultValue={matriculationChange.reason && matriculationChange.reason} className='form-control' name='reason'/></td>
                                        <td>Added Lab Fees</td>
                                        <td><b>{currency.formatter.format(matriculationChange.addedlabfees === undefined || matriculationChange.addedlabfees === null ? 0 : matriculationChange.addedlabfees)}</b></td>
                                        <td>Dropped Lab Fees</td>
                                        <td><b>{currency.formatter.format(matriculationChange.droppedlabfees === undefined || matriculationChange.droppedlabfees === null ? 0 : matriculationChange.droppedlabfees)}</b></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Added TAAF</td>
                                        <td><b>{currency.formatter.format(matriculationChange.addedtaaf === undefined || matriculationChange.addedtaaf === null ? 0 : matriculationChange.addedtaaf)}</b></td>
                                        <td>Dropped TAAF</td>
                                        <td><b>{currency.formatter.format(matriculationChange.droppedtaaf === undefined || matriculationChange.droppedtaaf === null ? 0 : matriculationChange.droppedtaaf)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Enlistment No.</td>
                                        <td><b>{studentEnlistmentInfo.registrationno && studentEnlistmentInfo.registrationno}</b></td>
                                        <td></td>
                                        <td></td>
                                        <td>Added Tuition And Fees</td>
                                        <td><b>{currency.formatter.format(matriculationChange.addedtuitionandfees === undefined || matriculationChange.addedtuitionandfees === null ? 0 : matriculationChange.addedtuitionandfees)}</b></td>
                                        <td>Dropped Tuition And Fees</td>
                                        <td><b>{currency.formatter.format(matriculationChange.droppedtuitionandfees === undefined || matriculationChange.droppedtuitionandfees === null ? 0 : matriculationChange.droppedtuitionandfees)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Lock Dropping?</td>
                                        <td><b>{}</b></td>
                                        <td></td>
                                        <td></td>
                                        <td>Total Due</td>
                                        <td><b className='text-danger'>{currency.formatter.format(matriculationChange.totaldue === null || matriculationChange.totaldue === undefined ? 0 : matriculationChange.totaldue)}</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='container-fluid text-center mt-3 mb-3'>
                                {
                                    tabsNumber === 0  ?
                                    <>
                                        <button style={{ width: "130px"}} className='btn btn-danger p-2' onClick={handleDropEnlistment} disabled={!enlistmentLockTransaction}><FontAwesomeIcon size='lg' icon={faFloppyDisk} />  DROP </button>
                                    </>
                                    :
                                    tabsNumber === 1 ? 
                                    <>
                                        <button style={{ width: "130px"}} className='btn btn-danger p-2'onClick={handleFeesBreakdown} disabled={!feesBreakdownLockTransaction}><FontAwesomeIcon size='lg' icon={faFloppyDisk} />  DROP</button>
                                    </>
                                    : 
                                    <></>
                                }
                            </div>
                        </div>
                        <div className='card p-4 m-5 card shadow'>
                            <div className='container-fluid p-3 mb-3'>
                                <button className={`btn me-3 ${tabsNumber === 0 ? 'btn-primary' : `btn-secondary`}`} style={{width: '180px'}} onClick={()=> setTabsNumber(0)} disabled={checkerFeesLength}>Enlistment Details</button>
                                <button className={`btn me-3 ${tabsNumber === 1 ? `btn-primary` : `btn-secondary`}`} style={{width: '180px'}} onClick={()=> setTabsNumber(1)} disabled={checkerEnlistmentLength}>Fees Breakdown</button>
                                {tabsNumber === 0 ? <button className='btn btn-warning me-3' style={{width: '180px'}} onClick={handleNewSubjectModal} disabled={checkerForAllLength}><FontAwesomeIcon size='lg' icon={faPlus}/>   New Subject</button> : null}
                                {tabsNumber === 1 ? <button className='btn btn-warning me-3' style={{width: '180px'}} onClick={handleNewFeesModal} disabled={checkerForAllLength}><FontAwesomeIcon size='lg' icon={faPlus}/>   New Fees</button> : null}
                                {tabsNumber === 0 ? <button onClick={enlistmentLockTransactionFunc} className={enlistmentLockTransaction ? "btn btn-danger" : "btn btn-success"}>{enlistmentLockTransaction ? <FontAwesomeIcon size='lg' icon={faLock} /> : <FontAwesomeIcon size='lg' icon={faLockOpen} />}{enlistmentLockTransaction ? "  Locked Transaction" : `  Open Transaction`}</button> : tabsNumber === 1 ? <button onClick={feesBreakdownLockTransactionFunc} className={feesBreakdownLockTransaction ? "btn btn-danger" : "btn btn-success"}>{feesBreakdownLockTransaction ? <FontAwesomeIcon size='lg' icon={faLock} /> : <FontAwesomeIcon size='lg' icon={faLockOpen} />}{feesBreakdownLockTransaction ? "  Locked Transaction" : `  Open Transaction`}</button> : null }
                            </div>
                            {
                                tabsNumber === 0 ? 
                                <>
                                    <div className='container-fluid' style={{ height: '440px', overflow: 'scroll' }} >
                                        <table className='table table-borderless table-hover' aria-disabled>
                                            <thead>
                                                <tr>
                                                    <th>Course Code</th>
                                                    <th>Room</th>
                                                    <th>Time From</th>
                                                    <th>Time Span</th>
                                                    <th>Days</th>
                                                    <th>Units</th>
                                                    <th>Unit Fee</th>
                                                    <th>Instructor</th>
                                                    <th>XGWA</th>
                                                    <th className='text-center'>Is Droppped</th>
                                                    <th>Is Added</th>
                                                    <th>Drop Subject</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    registrationSubjectDetails && registrationSubjectDetails.map((item, index) => (
                                                        <tr key={index} className={`pointer`}  onClick={() => item.IsDropped === 0 && item.IsDropped !== null || "NULL" && item.IsDropped !== undefined ? dropSubject(item.RegnDetailNo, `cbEnlistment${index}`, item) : null}>
                                                            <td>{item.CourseCode && item.CourseCode}</td>
                                                            <td>{item.RoomID && item.RoomID}</td>
                                                            <td>{militaryToStandardTime(item.TimeFrom && item.TimeFrom)}</td>
                                                            <td>{item.TimeSpan && item.TimeSpan}</td>
                                                            <td>{item.Days && item.Days}</td>
                                                            <td>{item.Units && item.Units}</td>
                                                            <td>{item.UnitFee && item.UnitFee}</td>
                                                            <td>{item.LastName !== null && item.LastName !== undefined && item.FirstName !== null && item.FirstName !== undefined ? `${item.LastName}, ${item.firstname}`: '-'}</td>
                                                            <td>{item.ExcludedInTheGWA === 1 ? 'Yes' : 'No'}</td>
                                                            <td className='text-center'><button className={`${item.IsDropped === 1 ? 'btn btn-danger' : 'btn btn-primary'}`} disabled>{item.IsDropped === 1 ? 'Yes' : 'No'}</button></td>
                                                            <td className='text-center'><button className={`${item.IsAdded === 1 ? 'btn btn-danger' : 'btn btn-primary'}`} disabled>{item.IsAdded === 1 ? 'Yes' : 'No'}</button></td>
                                                            <td><input className='largerCheckbox' defaultChecked={item.IsDropped === 1} id={`cbEnlistment${index}`} type='checkbox' disabled={item.IsDropped === 1} /></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th>Total</th>
                                                    <th>{totalUnits}</th>
                                                    <th>{currency.formatter.format(matriculationChange.totaltuition)}</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </>
                                :
                                tabsNumber === 1 ?
                                <>
                                    <div className='container-fluid' style={{ height: '440px', overflow: 'scroll' }} >
                                        <table className='table table-borderless table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Fee Type</th>
                                                    <th>Description</th>
                                                    <th>Amount</th>
                                                    <th>Course Code</th>
                                                    <th className='text-center'>Is Droppped</th>
                                                    <th className='text-center'>Is Added</th>
                                                    <th>Drop Fee</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    registrationFee && registrationFee.map((item, index) => (
                                                        <tr key={index} className='pointer' onClick={() => item.IsDropped === 0 ? dropFeesBreakdown(item.RegnFeeDetailNo, `cbFees${index}`, item) : null} >
                                                            <td>{item.Label}</td>
                                                            <td>{item.Description}</td>
                                                            <td>{item.Amount}</td>
                                                            <td>{item.CourseCode}</td>
                                                            <td className='text-center'><button className={`${item.IsDropped === 1 ? 'btn btn-danger' : 'btn btn-primary'}`} disabled>{item.IsDropped === 1 ? 'Yes' : 'No'}</button></td>
                                                            <td className='text-center'><button className={`${item.IsAdded === 1 ? 'btn btn-danger' : 'btn btn-primary'}`} disabled>{item.IsAdded === 1 ? 'Yes' : 'No'}</button></td>
                                                            <td><input className='largerCheckbox' defaultChecked={item.IsDropped === 1} id={`cbFees${index}`} type='checkbox' disabled={item.IsDropped === 1} /></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                null 
                            }
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link className='btn btn-secondary' to={'../'}>Close</Link>
                    </div>
                </ModalFooter>
            </Modal>
            <Outlet />
        </>
    )
}

export default AddNewMatriculation