import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import view from '../../../../../../Controller/AcademicStructure/view'
import create from '../../../../../../Controller/AcademicStructure/create'
import deleteIcon from '../../../../../../../Assets/Icons/delete.png'
import AddCourseConfirmation from '../../ConfirmationModal/AddCourseConfirmationmation'

function AddCourse() {

    const { success } = useParams()

    // const [ modalStatus, setModalStatus ] = useState(false)
    const [ data, setData ] = useState({ course_code: "", course_label: "", course_title: "", course_subject: "", course_description: "", college_courseType: "", course_lecHour: "", course_labHour: "", course_units: "", course_unitFee: "", course_corequisite: "", course_prerequisite: "", fee_type: "", fee_description: "", fee_amount: "" })
    const [ courseDataList, setCourseDataList ] = useState([])
    const [ courseTypeData, setCourseTypeData ] = useState([]) 
    const [ ifSuccess, setIfSuccess ] = useState(false)
    const [ courseDetailsData, setCourseDetailsData ] = useState([])
    const [ registrationFeeTypeData, setRegistrationFeeTypeData ] = useState([])
    const [ modalStatusCreate, setModalStatusCreate ] = useState(false)
    const [ pageNumber, setPageNumber ] = useState(0)
    
    const getSubjectListFunc = () => {
        view.getSubjectList()
        .then((res) => {
            setCourseDataList(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getRegistrationFeeTypeFunc = () => {
        view.getRegistrationFeeType()
        .then((res) => {
            setRegistrationFeeTypeData(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
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

    const getCourseDetailsFunction = (data) => {
        view.getCourseDetails(data)
        .then((res) => {
            setCourseDetailsData(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const createCourseFunc = (e) => {
        e.preventDefault()
    }

    const handleNextPage = () => {
        setPageNumber(Number(pageNumber) + 1)
    }

    const handleBackPage = () => {
        setPageNumber(Number(pageNumber) - 1)
    }

    useEffect(() => {
        getSubjectListFunc()
        getCourseTypeFunction()
        getCourseDetailsFunction(data)
        getRegistrationFeeTypeFunc()
    }, [ data])

    const inputData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleCreateCourseDetails = (e) => {
        e.preventDefault()
        create.createCourseDetails(data)
        .then((res) => {
            if (res.data.affectedRows > 0 ) {
                alert('Succesfully Inserted!')
                getCourseDetailsFunction(data)
            } else {
                alert('Unsuccesful Insert!')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            { modalStatusCreate && <AddCourseConfirmation modalStatus={modalStatusCreate} setModalStatus={setModalStatusCreate} data={data} /> }
            <Modal
                show={true}
                size='xl'
                centered
                scrollable
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='text-center'>
                        <h5>ADD COURSE</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        {
                            pageNumber === 0 ?
                            <>
                                <form noValidate={false} onSubmit={createCourseFunc}>
                                    <div className='card shadow p-3 m-3'>   
                                        <div className='row'>
                                            <div className='col-6 mt-2'>
                                                <h6>Course Code</h6>
                                                <input defaultValue={data.course_code} type='text' className='form-control' name='course_code' id='course_code' onChange={inputData} disabled={ifSuccess ? true: false} required />
                                            </div>
                                            <div className='col-6 mt-2'>
                                                <h6>Label</h6>
                                                <input defaultValue={data.course_label}  type='text' className='form-control' name='course_label' id='course_label' onChange={inputData} disabled={ifSuccess ? true: false} required />
                                            </div>
                                            <div className='col-6 mt-2'>
                                                <h6>Title</h6>
                                                <input defaultValue={data.course_title}  type='text' className='form-control' name='course_title' id='course_title' onChange={inputData} disabled={ifSuccess ? true: false} required />
                                            </div>
                                            <div className='col-6 mt-2'>
                                                <h6>Subject</h6>
                                                <select className='form-control' value={data.subjectno} name='subjectno' onChange={inputData} disabled={ifSuccess ? true: false}>
                                                    <option></option>
                                                    {
                                                        courseDataList && courseDataList.map((item, index) => (
                                                            <option value={item.subjectno} key={index}>{item.subjectcode}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className='col-6 mt-2'>
                                                <h6>Description</h6>
                                                <input defaultValue={data.course_description} type='text' className='form-control' name='course_description' id='course_description' onChange={inputData} disabled={ifSuccess ? true: false} required />
                                            </div>
                                            <div className='col-6 mt-2'>
                                                <h6>Type</h6>
                                                <select className='form-control' name='college_courseType' value={data.college_courseType} onChange={inputData} disabled={ifSuccess ? true: false} required >
                                                    <option></option>
                                                    {
                                                        courseTypeData && courseTypeData.map((item, index) => (
                                                            <option key={index} value={item.typecode}>{item.description}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <br />
                                            <div className='col-3 mt-2'>
                                                <h6>Lecture Hours</h6>
                                                <input defaultValue={data.course_lecHour}  type='number' name='course_lecHour' className='form-control' onChange={inputData} disabled={ifSuccess ? true: false} required />
                                            </div>
                                            <div className='col-3 mt-2'>
                                                <h6>Lab Hours</h6>
                                                <input defaultValue={data.course_labHour}  type='number' name='course_labHour' className='form-control' onChange={inputData} disabled={ifSuccess ? true: false} required />
                                            </div>
                                            <div className='col-3 mt-2'>
                                                <h6>Units</h6>
                                                <input defaultValue={data.course_units}  type='number' name='course_units' className='form-control' onChange={inputData} disabled={ifSuccess ? true: false} required />
                                            </div>
                                            <div className='col-3 mt-2'>
                                                <h6>Unit Fee</h6>
                                                <input defaultValue={data.course_unitFee}  type='text' name='course_unitFee' className='form-control' onChange={inputData} disabled={ifSuccess ? true: false} required />
                                            </div>
                                            <div className='col-6 mt-2'>
                                                <h6>Corequisite</h6>
                                                <input defaultValue={data.course_corequisite}  type='text' name='course_corequisite' className='form-control' onChange={inputData} disabled={ifSuccess ? true: false} required />
                                            </div>
                                            <div className='col-6 mt-2'>
                                                <h6>Prerequisite</h6>
                                                <input defaultValue={data.course_prerequisite}  type='text' name='course_prerequisite' className='form-control' onChange={inputData} disabled={ifSuccess ? true: false} required />
                                            </div>
                                            {
                                                !ifSuccess ?
                                                <>
                                                    <div className='col-12 text-center'>
                                                        <input type='submit' className='btn btn-primary mt-3' value='CREATE' style={{width: "100px"}}  disabled={ifSuccess ? true: false} />
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className='col-12 text-center'>
                                                        <button className='btn btn-primary mt-3' style={{width: "100px"}} onClick={handleNextPage}>Next</button>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </form>
                            </>
                            :
                            pageNumber === 1 && Boolean(ifSuccess) ? 
                            <>
                                <div className='card shadow p-3 m-3'>
                                    <form noValidate={false}  onSubmit={handleCreateCourseDetails}>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <h6>Fee Type</h6>
                                                <select className='form-control' name='course_feetype' onChange={inputData} disabled={data.course_code && data.course_title && data.course_lecHour && data.course_labHour && data.course_units && data.course_unitFee ? false : true} required>
                                                    <option value={null}></option>
                                                    {
                                                        registrationFeeTypeData && registrationFeeTypeData.map((item, index) => (
                                                            <option key={index} value={item.rftcode}>{item.label}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className='col-4'>
                                                <h6>Description</h6>
                                                <input defaultValue={data.fee_description}  name='course_description' className='form-control' onChange={inputData} disabled={data.course_code && data.course_title && data.course_lecHour && data.course_labHour && data.course_units && data.course_unitFee ? false : true} required />
                                            </div>
                                            <div className='col-2'>
                                                <h6>Amount</h6>
                                                <input defaultValue={data.fee_amount}  name='course_amount' className='form-control' onChange={inputData} disabled={data.course_code && data.course_title && data.course_lecHour && data.course_labHour && data.course_units && data.course_unitFee ? false : true} required />
                                            </div>
                                            <div className='col-2'>
                                                <input className='btn btn-primary mt-4 form-control'value={"ADD"} type='submit' />
                                            </div>
                                        </div>    
                                    </form>
                                    <table className='table-responsive table table-hover navigation table-bordered mt-4'>
                                        <thead className='small'>
                                            <tr>
                                                <th>Fee Type</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th width={'50px'}></th>
                                            </tr>
                                        </thead>
                                        <tbody className='small'>
                                            {
                                                courseDetailsData && courseDetailsData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.rftlabel}</td>
                                                        <td>{item.cddescription}</td>
                                                        <td>{item.cdamount}</td>
                                                        <td width={'auto'}>
                                                            <button className='btn'><img src={deleteIcon} width={'20px'} height={'20px'} alt='Delete Icon' /></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            
                                        </tbody>
                                    </table>
                                    <div className='col-12 text-center'>
                                        <button className='btn btn-secondary mt-3' style={{width: "100px"}} onClick={handleBackPage}>Back</button>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                            </>
                        }
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