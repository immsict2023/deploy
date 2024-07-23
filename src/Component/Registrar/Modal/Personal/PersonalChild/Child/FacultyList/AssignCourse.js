import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import view from '../../../../../../Controller/Personnel/view';
import viewAcademic from '../../../../../../Controller/AcademicStructure/view';
import create from '../../../../../../Controller/AcademicStructure/create';
import crudDelete from '../../../../../../Controller/AcademicStructure/delete';

function AssignCourse(props) {

    const { modalStatus, setModalStatus, data } = props;
    const [personnelData, setPersonnelData] = useState([])
    const [personnelName, setPersonnelName] = useState(null);
    const [personnelAssignedCourse, setPersonnelAssignedCourse] = useState([])
    const [courseList, setCourseList] = useState([])
    const [courseData, setCourseData] = useState({ CourseCode: null, PersonnelID: data })
    
    const getPersonnelInformationFunc = () => {
        view.getPersonnelInformation(data).then((res) => {
            setPersonnelData(res.data.res[0])
            setPersonnelName(`${res.data.res[0].Prefix !== null ? res.data.res[0].Prefix : ''} ${res.data.res[0].FirstName !== null ? res.data.res[0].FirstName : ''} ${res.data.res[0].MiddleName !== null ? res.data.res[0].MiddleName : ''}. ${res.data.res[0].LastName !== null ? res.data.res[0].LastName : ''}`)
        }).catch((err) => {
            console.error(err)
        })
    }

    const courseListFunc = () => {
        viewAcademic.getCourseList().then((res) => {
            setCourseList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const getAssignedCourseListFunc = () => {
        viewAcademic.getAssignedCourseList({PersonnelID: data}).then((res) => {
            setPersonnelAssignedCourse(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        create.createAssignedCourse(courseData).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.error(err);
        })
    }

    const handleDeleteCourse = (CANo) => {
        crudDelete.deleteAssignCourse({CANo}).then((res) => {
           alert('Successfully Deleted!')
        }).catch((err) => {
            console.error(err)
        })
    }

    const inputData = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        getPersonnelInformationFunc()
        courseListFunc()
    }, [])

    useEffect(() => {
        getAssignedCourseListFunc()
    })

    return (
        <>
            <Modal
                show={modalStatus}
                size='lg'
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h6>ASSIGN COURSE</h6>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid '>
                        <div className='card shadow mb-3'>
                            <div className=' d-flex justify-content-center row'>
                                <div className='col-5 m-3'>
                                    <h6>Personnel Name:</h6>
                                    <input className='form-control' defaultValue={personnelName} disabled/>
                                </div>
                                <div className='col-5 m-3'>
                                    <h6>Personnel ID:</h6>
                                    <input className='form-control' defaultValue={personnelData.PersonnelID} disabled/>
                                </div>
                            </div>
                        </div>
                        <div className='card shadow p-4'>
                            <form>
                                <div className='d-flex justify-content-center row'>
                                    <div className='col-6'>
                                        <h6>Course Code</h6>
                                        <select onChange={inputData} style={{ width: '300px' }} name='CourseCode' className='form-control'>
                                            <option></option>
                                            {
                                                courseList && courseList.map((item, index) => (
                                                    <option key={index} value={item.CourseCode}>{item.CourseCode}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-12 text-center mt-3'>
                                        <button onClick={handleSubmit} type='submit' value={'Add'} className='btn btn-primary'>ADD</button>
                                    </div>
                                </div>
                            </form>
                            <table className='table mt-3'>
                                <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        personnelAssignedCourse && personnelAssignedCourse.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.CourseCode}</td>
                                                <td className='text-center'><button className='btn btn-danger' onClick={() => handleDeleteCourse(item.CANo)}>DELETE</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
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

export default AssignCourse