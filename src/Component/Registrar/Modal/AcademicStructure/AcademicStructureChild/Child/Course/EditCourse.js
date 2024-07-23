import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import view from '../../../../../../Controller/AcademicStructure/view'
import create from '../../../../../../Controller/AcademicStructure/create'
import deleteIcon from '../../../../../../../Assets/Icons/delete.png'
import AddCourseConfirmation from '../ConfirmationModal/AddCourseConfirmation'
import AddCourseDetail from '../ConfirmationModal/AddCourseDetail'
import DeleteCollegeConfirmation from '../ConfirmationModal/DeleteCourseConfirmation'
import DeleteCourseDetailsConfirmation from '../ConfirmationModal/DeleteCourseDetailsConfirmation'

function EditCourse(props) {

    const { modalStatus, setModalStatus, CourseNo } = props;

    // const [ modalStatus, setModalStatus ] = useState(false)
    const [ data, setData ] = useState([])
    const [ courseDataList, setCourseDataList ] = useState([])
    const [ courseTypeData, setCourseTypeData ] = useState([])
    const [ courseDetailsData, setCourseDetailsData ] = useState([])
    const [ isSuccessCreated, setIsSuccessCreated ] = useState(false)

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

    const getCourseData = () => {
        view.getCourseData({CourseNo}).then((res) => {
            setData(res.data.rows[0])
            console.log(res.data.rows[0])
        }).catch((setData) => {
            console.error(setData)
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
        view.getCourseDetails({CourseCode: data.CourseCode})
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

    const handleResponse = (res) => {
        setIsSuccessCreated(res)
    }

    const handleNewCourseDetail = () => {
        setAddCourseDetailModalStatus(true)
    }

    const handleDeleteCourseDetail = (item) => {
        setSelectedItem(item);
        setDeleteCourseDetailModalStatus(true);
    }

    useEffect(() => {
        getCourseData()
    }, [])

    useEffect(() => {
        getCourseDetailsFunc()
    })

    return (
        <>
            { deleteCourseDetailModalStatus && <DeleteCourseDetailsConfirmation modalStatus={deleteCourseDetailModalStatus} setModalStatus={setDeleteCourseDetailModalStatus} CourseDetailNo={selectedItem} /> }
            { addCourseDetailModalStatus && <AddCourseDetail modalStatus={addCourseDetailModalStatus} setModalStatus={setAddCourseDetailModalStatus} CourseCode={data.CourseCode} /> }
            { addCourseModalStatus && <AddCourseConfirmation modalStatus={addCourseModalStatus} setModalStatus={setAddCourseModalStatus} data={data} handleResponse={handleResponse} /> }
            <Modal
                show={modalStatus}
                fullscreen
                centered
                scrollable
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='text-center'>
                        <h5>EDIT COURSE</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid' style={{ width: "1300px" }}>
                        <div className='card shadow p-4 m-3'>   
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-3 mt-2'>
                                        <h6>Course Code</h6>
                                        <input defaultValue={data.CourseCode && data.CourseCode}  type='text' className='form-control' name='course_code' id='course_code' onChange={inputData} disabled required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Label</h6>
                                        <input defaultValue={data.Label && data.Label} type='text' className='form-control' name='course_label' id='course_label' onChange={inputData} disabled required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Title</h6>
                                        <input defaultValue={data.Title && data.Title}  type='text' className='form-control' name='course_title' id='course_title' onChange={inputData} disabled required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Subject</h6>
                                        <select className='form-control' value={data.SubjectNo && data.SubjectNo} name='subjectno' onChange={inputData}  disabled >
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
                                        <input defaultValue={data.Description && data.Description} type='text' className='form-control' name='course_description' id='course_description' onChange={inputData} disabled />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Type</h6>
                                        <select className='form-control' name='college_courseType' value={data.CourseType && data.CourseType} onChange={inputData} disabled required >
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
                                        <input defaultValue={data.LecHours && data.LecHours}  type='number' name='course_lecHour' className='form-control' onChange={inputData} disabled required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Lab Hours</h6>
                                        <input defaultValue={data.LabHours && data.LabHours}  type='number' name='course_labHour' className='form-control' onChange={inputData} disabled required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Units</h6>
                                        <input defaultValue={data.Units && data.Units}  type='number' name='course_units' className='form-control' onChange={inputData} disabled required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Unit Fee</h6>
                                        <input defaultValue={data.UnitFee && data.UnitFee}  type='text' name='course_unitFee' className='form-control' onChange={inputData} disabled required />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Corequisite</h6>
                                        <input defaultValue={data.Corequisite && data.Corequisite}  type='text' name='course_corequisite' className='form-control' onChange={inputData} disabled />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <h6>Prerequisite</h6>
                                        <input defaultValue={data.Prerequisite && data.Prerequisite}  type='text' name='course_prerequisite' className='form-control' onChange={inputData} disabled />
                                    </div>
                                    {
                                        /*
                                            <div className='col-12 mt-4 text-center'>
                                                <button className='btn btn-primary'  disabled>CREATE COURSE</button>
                                            </div>
                                        */
                                    }
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
                                        <th></th>
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
 
export default EditCourse