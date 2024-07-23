import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import view from '../../../../../Controller/Blockschedule/view';
import { militaryToStandardTime } from '../../../../../../Tools/date';
import viewClass from '../../../../../Controller/Classroom/view';
import viewAcademic from '../../../../../Controller/AcademicStructure/view';
import viewPersonnel from '../../../../../Controller/Personnel/view';
import create from '../../../../../Controller/Blockschedule/create';

function AddBlockScheduleModal(props) {
    const { modalStatus, setModalStatus, data } = props;
    const [timeFrom, setTimeFrom] = useState([]);
    const [timeSpan, setTimeSpan] = useState([]);
    const [classroomList, setClassroomList] = useState([]);
    const [subjectData, setSubjectData] = useState({ ExcludedInTheGWA: 0, Instructor: "-1", BlockID: data.BlockID === undefined || data.Block === null ? data.Block : data.BlockID })
    const [courseList, setCourseList] = useState([])
    const [instructorList, setInstructorList] = useState([])

    const getTimeFromScheduleFunc = () => {
        view.getTimeFromSchedule().then((res) => {
            setTimeFrom(res.data.rows);
        }).catch((err) => {
            alert(err);
        });
    };

    const getTimeSpanScheduleFunc = () => {
        view.getTimeSpanSchedule().then((res) => {
            setTimeSpan(res.data.rows);
        }).catch((err) => {
            alert(err);
        });
    }

    const getClassroomListFunc = () => {
        viewClass.getClassroomList().then((res) => {
            setClassroomList(res.data.rows);
        }).catch((err) => {
            alert(err);
        });
    };

    const getCurriculumForBlockSectionFunc = () => {
        console.log(data)
        viewAcademic.getCurriculumForBlockSection(data).then((res) => {
            setCourseList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const inputData = (e) => {
        if (String(e.target.name) === "CourseCode") {
            console.log(subjectData)
            getSubjectInstructorAssignedFunc(e.target.value)
            if (String(e.target.value).length > 0) {
                let found = false;
                for (let i = 0; i < courseList.length ; i++ ) {
                    if (String(courseList[i].CourseCode) === String(e.target.value)) {
                        found = true;
                        setSubjectData({
                            ...subjectData,
                            [e.target.name]: e.target.value,
                            Units: courseList[i].Units,
                            LabHours: courseList[i].LabHours,
                            LecHours: courseList[i].LecHours,
                            Corequisite: courseList[i].Corequisite,
                            UnitFee: courseList[i].UnitFee,
                            ExcludedInTheGWA: courseList[i].ExcludedInTheGWA,
                            Instructor: -1
                        })
                    }
                }
                if (!found) {
                    setSubjectData({
                        ...subjectData,
                        [e.target.name]: e.target.value,
                        Units: 0,
                        LabHours: 0,
                        LecHours: 0,
                        Corequisite: 0,
                        UnitFee: 0,
                        Instructor: -1
                    })
                }
            }
        } else {
            setSubjectData({
                ...subjectData,
                [e.target.name]: e.target.value === "-1" ? 0 : e.target.value
            })
        }
    }

    const getSubjectInstructorAssignedFunc = (CourseCode) => {
        viewPersonnel.getSubjectInstructorAssigned(CourseCode).then((res) => {
            setInstructorList(res.data.res)
            console.log(res.data.res)
        }).catch((err) => {
            console.error(err)
        })
    }

    const handleSubmitSchedule = (e) => {
        e.preventDefault();
        create.createSubjectSchedule(subjectData).then((res) => {
            if (res.data.success) {
                if (res.data.res.affectedRows > 0) {
                    alert("Successfully Inserted!")
                    setModalStatus(false)
                }
            } else {
                alert(res.data.err.sqlMessage)
            }
        }).catch((err) => {
            alert(err.sqlMessage)
        })
    }

    useEffect(() => {
        console.log(data)
        getTimeFromScheduleFunc();
        getClassroomListFunc();
        getTimeSpanScheduleFunc()
        getCurriculumForBlockSectionFunc();
        setSubjectData({ ...subjectData, Curriculum: data.Curriculum, Year: data.Year, Semester: data.Semester, BlockID: data.Block === undefined || data.Block === null ? data.BlockID : data.Block })
    }, []);

    return (
        <Modal
            show={modalStatus}
            centered
            size='xl'
        >
            <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                <h5>ADD NEW BLOCK SUBJECT</h5>
            </ModalHeader>
            <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                <form noValidate={false} onSubmit={handleSubmitSchedule}>
                    <div className='container'>
                        <div className='card shadow p-4'>
                            <div className='row'>
                                <div className='col-4 mt-3'>
                                    <h6>Course Code</h6>
                                    <select className='form-control' name='CourseCode' onChange={inputData} required>
                                        <option value={"-1"}></option>
                                        {
                                            courseList && courseList.map((item, index) => (
                                                <option key={index} value={item.CourseCode}>({item.CourseCode}) {item.CourseTitle}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='col-2 mt-3'>
                                    <h6>Room</h6>
                                    <select className='form-control' name='Room' onChange={inputData} required>
                                        <option value={"-1"}></option>
                                        {
                                            classroomList && classroomList.map((item, index) => (
                                                <option key={index} value={item.RoomID}>{item.RoomID}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='col-2 mt-3'>
                                    <h6>Time From</h6>
                                    <select className='form-control' name='TimeFrom' onChange={inputData} required>
                                        <option value={"-1"}></option>
                                        {
                                            timeFrom && timeFrom.map((item, index) => (
                                                <option key={index} value={item.TimeFrom}>{militaryToStandardTime(item.TimeFrom)}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='col-2 mt-3'>
                                    <h6>Time Span</h6>
                                    <select className='form-control' name='TimeSpan' onChange={inputData} required>
                                        <option value={"-1"}></option>
                                        {
                                            timeSpan && timeSpan.map((item, index) => (
                                                <option key={index} value={item.TimeSpan}>{item.Label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='col-2 mt-3'>
                                    <h6>Days</h6>
                                    <input className='form-control' type='text' name='Days' onChange={inputData} required/>
                                </div>
                                <div className='col-2 mt-3'>
                                    <h6>Units</h6>
                                    <input defaultValue={subjectData.Units && subjectData.Units} className='form-control' type='text' name='Units' disabled/>
                                </div>
                                <div className='col-2 mt-3'>
                                    <h6>Unit Fee</h6>
                                    <input defaultValue={subjectData.UnitFee && subjectData.UnitFee} className='form-control' type='text' name='UnitFee' disabled/>
                                </div>
                                <div className='col-4 mt-3'>
                                    <h6>Instructor</h6>
                                    <select className='form-control' name='Instructor' value={subjectData.Instructor && subjectData.Instructor} onChange={inputData} required>
                                        <option value={"-1"}></option>
                                        {
                                            instructorList && instructorList.map((item, index) => (
                                                <option value={item.PersonnelID} key={index}>{item.FullName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='col-2 mt-3'>
                                    <h6>XGWA?</h6>
                                    <select className='form-control' name='ExcludedInTheGWA' value={subjectData.ExcludedInTheGWA && subjectData.ExcludedInTheGWA} onChange={inputData} disabled>
                                        <option value={"-1"}></option>
                                        <option value={1}>Yes</option>
                                        <option value={0}>No</option>
                                    </select>
                                </div>
                                <div className='col-12 mt-3 text-center'>
                                    <input type='submit' className='btn btn-primary' value='INSERT' />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                <button className='btn btn-secondary' onClick={() => setModalStatus(false)}>Close</button>
            </ModalFooter>
        </Modal>
    );
}

export default AddBlockScheduleModal;
