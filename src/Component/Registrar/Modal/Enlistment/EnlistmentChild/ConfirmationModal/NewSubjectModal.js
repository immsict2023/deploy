import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import view from '../../../../../Controller/Enlistment/view'
import { addTimeToMilitaryTime, militaryToStandardTime } from '../../../../../../Tools/date';
import CreateNewSubjectConfirmation from './CreateNewSubjectConfirmation';

function NewSubjectModal(props) {

    const { modalStatus, setModalStatus, matriculationChange, onSuccessCount, count, matriculationChangeExist, registrationSubjectDetails } = props;

    const [modalStatusSubject, setModalStatusSubject] = useState(false)
    const [scheduleSubject, setScheduleSubject] = useState([])
    const [matriculationChangeValidated, setMatriculationChangeValidated] = useState([])
    const [similar, setSimilar] = useState(false)

    const [invalidSubject, setInvalidSubject] = useState([])
    const [defaultCount, setDefaultCount] = useState(null)
    const defaultFlag = count;
    const [subjectDetails, setSubjectDetails] = useState([])

    const [changeCount, setChangeCount] = useState()

    const getSubjectScheduleFunc = async () => {
        const getSubjectSchedule = await view.getSubjectSchedule()
        if (getSubjectSchedule.data.success) {
            if (getSubjectSchedule.data.rows.length > 0) {
                setScheduleSubject(getSubjectSchedule.data.rows)
            } else {
                alert("No Record Found!")
            }
        } else {
            console.error(getSubjectSchedule)
            alert("Error Fetching Subject Schedule: Please Contact the Software Developer!")
        }
    }
    const searchSimilarColumn = (tableOne, tableTwo) => {
    
        for (const itemOne of tableOne) {
            for (const itemTwo of tableTwo) {

                if (itemOne.scheduleno === itemTwo.scheduleno) {
                    setSimilar(true);
                    break;
                }
            }
            if (similar) {
                setInvalidSubject(true)
            } else {
                setInvalidSubject(false)
            }
        }
    
        if (similar) {
            setChangeCount(changeCount + 1)
        } 
    };

    /*
    const searchSimilarColumn = (tableOne, tableTwo) => {
        let similar = false;
    
        for (const itemOne of tableOne) {
            for (const itemTwo of tableTwo) {
                if (String(itemOne.days).includes(",")) {
                    containsStringOne = true;
                    containsStringOneArray = String(itemOne.days).split(",")
                }
                
                if (String(itemTwo.days).includes(",")) {
                    containsStrinTwo = true;
                    containsStrinTwoArray = String(itemTwo.days).split(",")
                }

                if (itemOne.scheduleno === itemTwo.scheduleno) {
                    similar = true;
                    break;
                }

                if (containsStringOne || containsStrinTwo) {
                    if (containsStringOneArray[0] === containsStrinTwoArray[0] || containsStringOneArray[1] === containsStrinTwoArray[1] || containsStringOneArray[0] === containsStrinTwoArray[1] || containsStringOneArray[1] === containsStrinTwoArray[0]) {
                        similar = true;
                        break;
                    }
                }
            }
            if (similar) {
                break;
            }
        }
    
        if (similar) {
            alert("Invalid Subject to Be Added!");
            setInvalidSubject(true)
        } else {
            setInvalidSubject(false)
        }
    };
    */

    /*
    const searchSimilarColumn = (tableOne, tableTwo) => {
        let containsStringOne = false;
        let containsStringTwo = false;
        let containsStringOneArray = [];
        let containsStringTwoArray = [];
    
        for (const itemOne of tableOne) {
            for (const itemTwo of tableTwo) {
                if (String(itemOne.days).includes(",")) {
                    containsStringOne = true;
                    containsStringOneArray = String(itemOne.days).split(",");
                }
    
                if (String(itemTwo.days).includes(",")) {
                    containsStringTwo = true;
                    containsStringTwoArray = String(itemTwo.days).split(",");
                }
    
                if (itemOne.scheduleno === itemTwo.scheduleno) {
                    setSimilar(true)
                    break;
                }
    
                if (containsStringOne || containsStringTwo) {
                    if (
                        containsStringOneArray.includes(containsStringTwoArray[0]) ||
                        containsStringOneArray.includes(containsStringTwoArray[1]) ||
                        containsStringTwoArray.includes(containsStringOneArray[0]) ||
                        containsStringTwoArray.includes(containsStringOneArray[1])
                    ) {
                        setSimilar(true);
                        break;
                    }
                }
            }
            if (similar) {
                break;
            }
        }
    
        if (similar) {
            alert("Invalid Subject to Be Added!");
            setInvalidSubject(true);
        } else {
            setInvalidSubject(false);
        }
    };
    */  

    const handleCreateNewSubject = () => {
        if (invalidSubject) {
            alert("Invalid Insert! Select Another Subject!")
        } else {
            setSubjectDetails({
                ...subjectDetails,
                studentname: matriculationChange.studentname
            })
            setModalStatusSubject(true)
        }
    }

    const searchItem = (id) => {
        scheduleSubject.forEach((item) => {
            if (Number(item.scheduleno) === Number(id)) {
                setSubjectDetails({
                    ...item,
                    studentid: matriculationChange.studentid,
                    registrationno: matriculationChange.registrationno
                })
                setMatriculationChangeValidated({
                    ...matriculationChange,
                    addedunits: matriculationChange.addedunits + item.units,
                    addedtuition: matriculationChange.addedtuition + (item.units * item.unitfee),
                    addedtuitionandfees: matriculationChange.droppedtuitionandfees + (item.units * item.unitfee),
                    totaldue: matriculationChange.totaldue + (item.units * item.unitfee)
                })
                searchSimilarColumn(registrationSubjectDetails, [item])
            }
        });
    }

    const handleFetchData = (e) => {
        setSimilar(false)
        searchItem(e.target.value)
    }

    useEffect(() => {
        if (defaultCount > defaultFlag) {
          onSuccessCount(defaultCount)
          setModalStatus(false)
        }
    }, [defaultCount])

    useEffect(() => {
        getSubjectScheduleFunc()
    }, [])

    return (
        <>
        {modalStatusSubject && <CreateNewSubjectConfirmation modalStatus={modalStatusSubject} setModalStatus={setModalStatusSubject} matriculationChangeValidated={matriculationChangeValidated} onSuccessCount={((count) => {setDefaultCount(count)})} count={count} matriculationChangeExist={matriculationChangeExist} subjectDetails={subjectDetails} />}
            <Modal
                show={modalStatus}
                size='lg'
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h6>ADD NEW SUBJECT</h6>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid row'>
                        <div className='col-md-9 mt-2'>
                            <h6>Course Code</h6>
                            <select onClick={handleFetchData} className='form-control' name="coursecode">
                                <option value=""></option>
                                {
                                    scheduleSubject && scheduleSubject.map((item, index) => (
                                        <option key={index} value={item.scheduleno}>{`${item.coursecode} / ${addTimeToMilitaryTime(item.timefrom, item.timespan)} ${item.days} @${item.roomid} / ${item.blockid}`}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='col-md-3 mt-2'>
                            <h6>Course Code</h6>
                            <input defaultValue={subjectDetails.coursecode && subjectDetails.coursecode} type='text' className='form-control' name='room' disabled />
                        </div>
                        <div className='col-md-3 mt-2'>
                            <h6>Time From</h6>
                            <input defaultValue={subjectDetails.timefrom && militaryToStandardTime(subjectDetails.timefrom)} type='text' className='form-control' name='timefrom' disabled />
                        </div>
                        <div className='col-md-3 mt-2'>
                            <h6>Time Span</h6>
                            <input defaultValue={subjectDetails.timespan && subjectDetails.timespan} type='text' className='form-control' name='timespan' disabled />
                        </div>
                        <div className='col-md-3 mt-2'>
                            <h6>Days</h6>
                            <input defaultValue={subjectDetails.days && subjectDetails.days} type='text' className='form-control' name='days' disabled />
                        </div>
                        <div className='col-md-3 mt-2'>
                            <h6>Unit</h6>
                            <input defaultValue={subjectDetails.units && subjectDetails.units} type='text' className='form-control' name='units' disabled />
                        </div>
                        <div className='col-md-3 mt-2'>
                            <h6>Unit Fee</h6>
                            <input defaultValue={subjectDetails.unitfee && subjectDetails.unitfee} type='text' className='form-control' name='unitfee' disabled />
                        </div>
                        <div className='col-md-6 mt-2'>
                            <h6>Instructor</h6>
                            <input defaultValue={subjectDetails.prefix && subjectDetails.firstname && subjectDetails.middlename && subjectDetails.lastname &&  `${subjectDetails.prefix} ${subjectDetails.firstname} ${subjectDetails.middlename}. ${subjectDetails.lastname}`} type='text' className='form-control' name='instructor' disabled />
                        </div>
                        <div className='col-md-12 mt-4 text-center'>
                            <button className='btn btn-success' onClick={handleCreateNewSubject} style={{ width: "120px" }}>SAVE</button>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <button onClick={() => setModalStatus(false)} className='btn btn-secondary'>Close</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default NewSubjectModal