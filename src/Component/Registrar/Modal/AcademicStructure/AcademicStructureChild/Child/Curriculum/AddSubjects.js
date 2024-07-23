import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import view from '../../../../../../Controller/AcademicStructure/view'
import CurriculumModal from '../../Modal/CurriculumModal'

function AddSubjects(props) {

    const { modalStatus, setModalStatus, curriculumNo } = props;

    const [ courseList, setCourseList ] = useState([])
    const [ data, setData ] = useState([])
    const [ modalStatusCur, setModalStatusCur ] = useState(false)

    const inputData = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        })

        if (String(e.target.name) === "subject_course_code") {
            dataFiltering(e.target.value)
        }
    }

    const dataFiltering = (searchValue) => {
        for (let i = 0; i < courseList.length; i++) {
            if (Number(courseList[i].CourseNo) === Number(searchValue)) {
                setData({
                    ...data,
                    curriculum_coursecode: courseList[i].CourseCode,
                    curriculum_coursetitle: courseList[i].Title,
                    curriculum_courseDescription: courseList[i].Description,
                    curriculum_courseUnit: courseList[i].Units,
                    curriculum_courseLecHours: courseList[i].LecHours,
                    curriculum_courseLabHours: courseList[i].LabHours,
                    curriculum_courseCorequisite: courseList[i].Corequisite,
                    curriculum_coursePrequisite: courseList[i].Prerequisite,
                    curriculum_courseXGWA: courseList[i].ExcludedInTheGWA,
                    cno: curriculumNo
                })
            }
        }
    }

    // Function of Submitting the subjects from the form
    const handleSubmitSubjects = (e) => {
        e.preventDefault()
        setModalStatusCur(true)
    }

    const getCourseListFunc = () => {
        view.getCourseList()
        .then((res) => {
            setCourseList(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getCourseListFunc()
    }, [])

    return (
        <>
            { CurriculumModal && <CurriculumModal modalStatus={modalStatusCur} setModalStatus={setModalStatusCur} data={data} transType="POST" /> }
            <Modal
                show={modalStatus}
                centered
                size='xl'
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>NEW COURSE</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <div className='card shadow p-3 m-2'>
                            <div className='row'>
                                <form className='row' onSubmit={handleSubmitSubjects}>
                                    <div className='col-2'>
                                        <h6>Year</h6>
                                        <select className='form-control' name='subject_year' id='subject_year' onChange={inputData} required>
                                            <option></option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                        </select>
                                    </div>
                                    <div className='col-3'>
                                        <h6>Semester</h6>
                                        <select className='form-control' name='subject_semester' id='subject_semester' onChange={inputData} >
                                            <option></option>
                                            <option value='1ST'>First Semester</option>
                                            <option value='2ND'>Second Semester</option>
                                            <option value='3RD'>Third Semester</option>
                                            <option value='SUM'>Summer</option>
                                        </select>
                                    </div>
                                    <div className='col-7'>
                                        <h6>Course Code</h6>
                                        <select className='form-control' name='subject_course_code' id='subject_course_code' onChange={inputData} required>
                                            <option></option>       
                                            {
                                                courseList && courseList.map((item, index) => (
                                                    <option key={index} value={item.CourseNo}>{item.CourseCode} ({item.Title}) {item.UnitFee}</option>
                                                ))
                                            }                             
                                        </select>
                                    </div>
                                    <div className='col-12 text-center'>
                                        <input type="submit" value="SAVE" className='btn btn-primary mt-3 mb-3' style={{ width: '120px' }} />
                                    </div>
                                </form>
                                <div className='col-12'>
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td><b>Course Title</b></td>
                                                <td>
                                                    {
                                                        data.curriculum_coursetitle
                                                    }
                                                </td>
                                                <td><b>LEC Hours</b></td>
                                                <td>
                                                    {
                                                        data.curriculum_courseLecHours
                                                    }
                                                </td>
                                                <td><b>LAB Hours</b></td>
                                                <td>
                                                    {
                                                        data.curriculum_courseLabHours
                                                    }
                                                </td>
                                                <td><b>Units</b></td>
                                                <td>
                                                    {
                                                        data.curriculum_courseUnit
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><b>Corequisite</b></td>
                                                <td>
                                                    {
                                                        String(data.curriculum_courseCorequisite).length > 0 || data.curriculum_courseCorequisite !== null ? data.curriculum_courseCorequisite : "-"
                                                    }
                                                </td>
                                                <td><b>Prerequisite</b></td>
                                                <td>
                                                    {
                                                        data.curriculum_coursePrequisite
                                                    }
                                                </td>
                                                <td><b>XGWA</b></td>
                                                <td>
                                                    {
                                                        Number(data.curriculum_courseXGWA) ? 'Yes' : 'No'
                                                    }
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <button className='btn btn-secondary' onClick={() => setModalStatus(false)}>CLOSE</button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddSubjects
