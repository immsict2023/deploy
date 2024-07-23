import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import view from '../../../../../../Controller/AcademicStructure/view'
import create from '../../../../../../Controller/AcademicStructure/create'
import deleteIcon from '../../../../../../../Assets/Icons/delete.png'
import AddCourseConfirmation from '../ConfirmationModal/AddCourseConfirmation'
import AddCourseDetail from '../ConfirmationModal/AddCourseDetail'
import DeleteCourseDetailsConfirmation from '../ConfirmationModal/DeleteCourseDetailsConfirmation'

function AddCourse() {

    // const [ modalStatus, setModalStatus ] = useState(false)
    const [ data, setData ] = useState({ course_code: null, course_label: null, course_title: null, course_subject: null, course_description: null, college_courseType: null, course_lecHour: null, course_labHour: null, course_units: null, course_unitFee: null, course_corequisite: null, course_prerequisite: null, fee_type: null, fee_description: null, fee_amount: null })
    const [ courseDataList, setCourseDataList ] = useState([])
    const [ courseTypeData, setCourseTypeData ] = useState([])
    const [ courseDetailsData, setCourseDetailsData ] = useState([])
    const [isSuccessCreated, setIsSuccessCreated ] = useState(false)

    const [selectedItem, setSelectedItem] = useState(null)

    const [ deleteCourseDetailModalStatus, setDeleteCourseDetailModalStatus ] = useState(false)
    const [ addCourseDetailModalStatus, setAddCourseDetailModalStatus ] = useState(false)
    const [ addCourseModalStatus, setAddCourseModalStatus ] = useState(false)
    
    const getSubjectListFunc = () => {
        view.getSubjectList()
        .then((res) => {
            setCourseDataList(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getCourseTypeFunction = () => {
        view.getCourseType()
        .then((res) => {
            setCourseTypeData(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const getCourseDetailsFunc = () => {
        view.getCourseDetails({CourseCode: data.course_code})
        .then((res) => {
            setCourseDetailsData(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setAddCourseModalStatus(true);
    }

    useEffect(() => {
        getSubjectListFunc()
        getCourseTypeFunction()
    }, [ data])

    const inputData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleDeleteCourseDetail = (item) => {
        setSelectedItem(item);
        setDeleteCourseDetailModalStatus(true);
    }

    const handleResponse = (res) => {
        setIsSuccessCreated(res)
    }

    const handleNewCourseDetail = () => {
        setAddCourseDetailModalStatus(true)
    }

    useEffect(() => {
        if (isSuccessCreated) {
            getCourseDetailsFunc()
        }
    })

    return (
        <>
            { deleteCourseDetailModalStatus && <DeleteCourseDetailsConfirmation modalStatus={deleteCourseDetailModalStatus} setModalStatus={setDeleteCourseDetailModalStatus} CourseDetailNo={selectedItem} /> }
            { addCourseDetailModalStatus && <AddCourseDetail modalStatus={addCourseDetailModalStatus} setModalStatus={setAddCourseDetailModalStatus} CourseCode={data.course_code} /> }
            { addCourseModalStatus && <AddCourseConfirmation modalStatus={addCourseModalStatus} setModalStatus={setAddCourseModalStatus} data={data} handleResponse={handleResponse} /> }
            <Modal
                show={true}
                fullscreen
                centered
                scrollable
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='text-center'>
                        <h5>NEW COURSE</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid' style={{ width: "1300px" }}>
                        <div className='card shadow p-4 m-3'>   
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-3 mt-2'>
                                        <h6>Course Code</h6>
                                        <input type='text' className='form-control' name='course_code' id='course_code' onChange={inputData} disabled={isSuccessCreated} required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Label</h6>
                                        <input type='text' className='form-control' name='course_label' id='course_label' onChange={inputData} disabled={isSuccessCreated} required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Title</h6>
                                        <input type='text' className='form-control' name='course_title' id='course_title' onChange={inputData} disabled={isSuccessCreated} required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Subject</h6>
                                        <select className='form-control' name='subjectno' onChange={inputData}  disabled={isSuccessCreated} >
                                            <option></option>
                                            {
                                                courseDataList && courseDataList.map((item, index) => (
                                                    <option value={item.SubjectNo} key={index}>{item.SubjectCode}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Description</h6>
                                        <input type='text' className='form-control' name='course_description' id='course_description' onChange={inputData} disabled={isSuccessCreated} />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Type</h6>
                                        <select className='form-control' name='college_courseType' onChange={inputData} disabled={isSuccessCreated} required >
                                            <option></option>
                                            {
                                                courseTypeData && courseTypeData.map((item, index) => (
                                                    <option key={index} value={item.TypeCode}>{item.Description}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <br />
                                    <div className='col-3 mt-2'>
                                        <h6>Lecture Hours</h6>
                                        <input type='number' name='course_lecHour' className='form-control' onChange={inputData} disabled={isSuccessCreated} required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Lab Hours</h6>
                                        <input type='number' name='course_labHour' className='form-control' onChange={inputData} disabled={isSuccessCreated} required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Units</h6>
                                        <input type='number' name='course_units' className='form-control' onChange={inputData} disabled={isSuccessCreated} required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Unit Fee</h6>
                                        <input type='text' name='course_unitFee' className='form-control' onChange={inputData} disabled={isSuccessCreated} required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Corequisite</h6>
                                        <input type='text' name='course_corequisite' className='form-control' onChange={inputData} disabled={isSuccessCreated} />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Prerequisite</h6>
                                        <input type='text' name='course_prerequisite' className='form-control' onChange={inputData} disabled={isSuccessCreated} />
                                    </div>
                                    <div className='col-12 mt-4 text-center'>
                                        <button className='btn btn-primary'  disabled={isSuccessCreated}>CREATE COURSE</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='card shadow p-4 m-3'>
                            <button onClick={handleNewCourseDetail} className='btn btn-primary mb-3' style={{ width: '200px' }}>NEW COURSE DETAIL</button>  
                            <table className='table table-hover navigation mt-4'>
                                <thead>
                                    <tr>
                                        <th>Fee Type</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th width={'50px'}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        courseDetailsData && courseDetailsData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.rftlabel}</td>
                                                <td>{item.rftdescription}</td>
                                                <td>{item.cdamount}</td>
                                                <td width={'auto'}>
                                                <button onClick={() => handleDeleteCourseDetail(item.coursedetailno)} className='btn'><img src={deleteIcon} width={'20px'} height={'20px'} alt='Delete Icon' /></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to={`../`} className='btn btn-secondary me-1'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}
 
export default AddCourse