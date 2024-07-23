import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import view from '../../../../../../Controller/AcademicStructure/view'
import AddCourseDetailConfirmation from './AddCourseDetailConfirmation'

function AddCourseDetail(props) {
    
    
    const { modalStatus, setModalStatus, CourseCode } = props
    const [ addConfirmatinModalStatus, setAddConfirmatinModalStatus] = useState(false)
    const [ registrationFeeTypeData, setRegistrationFeeTypeData ] = useState([])
    const [isSuccessCreated, setIsSuccessCreated] = useState(false)
    const [data, setData] = useState({ CourseCode })

    const getRegistrationFeeTypeFunc = () => {
        view.getRegistrationFeeType()
        .then((res) => {
            setRegistrationFeeTypeData(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const inputData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleResponse = (res) => {
        setIsSuccessCreated(res)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setAddConfirmatinModalStatus(true)
    }

    useEffect(() => {
        getRegistrationFeeTypeFunc()
    }, [])

    useEffect(() => {
        if (isSuccessCreated) {
            setModalStatus(false)
        }
    })

    return (
        <>
            { addConfirmatinModalStatus && <AddCourseDetailConfirmation modalStatus={addConfirmatinModalStatus} setModalStatus={setAddConfirmatinModalStatus} data={data} response={handleResponse} /> }
            <Modal
                show={modalStatus}
                centered
                size='lg'
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h6>NEW COURSE DETAIL</h6>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <form onSubmit={handleSubmit}>
                        <div className='card shadow p-3'>
                            <div className='row'>
                                <div className='col-8 mt-2'>
                                    <h6>Fee Type</h6>
                                    <select className='form-control' name='course_feetype' onChange={inputData}  required>
                                        <option value={null}></option>
                                        {
                                            registrationFeeTypeData && registrationFeeTypeData.map((item, index) => (
                                                <option key={index} value={item.RFTCode}>{item.Label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='col-4 mt-2'>
                                    <h6>Amount</h6>
                                    <input defaultValue={data.fee_amount}  name='course_amount' className='form-control' onChange={inputData}  required />
                                </div>
                                <div className='col-12 mt-2'>
                                    <h6>Description</h6>
                                    <input defaultValue={data.fee_description}  name='course_description' className='form-control' onChange={inputData}  required />
                                </div>
                                <div className='col-12 text-center'>
                                    <input style={{ width: "100px" }} className='btn btn-primary mt-4 form-control'value={"ADD"} type='submit' />
                                </div>
                            </div>
                        </div>
                    </form>  
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <button onClick={() => setModalStatus(false)} className='btn btn-secondary'>Close</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddCourseDetail