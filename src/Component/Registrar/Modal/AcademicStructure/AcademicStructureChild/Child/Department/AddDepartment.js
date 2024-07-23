import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import axios from 'axios'
import config from '../../../../../../Security/config'
import { CollegeData } from '../../../../../../Controller/view/others' 
import AddDepartmentConfirmation from '../ConfirmationModal/AddDepartmentConfirmation'

function AddDepartment() {

    const [ department, setDepartment ] = useState([])
    const [ modalStatus, setModalStatus ] = useState(false)
    const [ data, setData ] = useState([])

    const getDepartment = (axios, config) => {
        CollegeData(axios, config)
        .then((res) => {
            setDepartment(res.rows)
        })
        .catch((err) => {
            console.error(err.message)
        })
    }

    const inputData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setModalStatus(true)
    }

    useEffect(() => {
        getDepartment(axios, config)
    }, [])

    return (
        <>
        { modalStatus && <AddDepartmentConfirmation modalStatus={modalStatus} setModalStatus={setModalStatus} data={data} /> }
            <Modal
                show={true}
                centered
                size='lg'
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>ADD DEPARTMENT</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <form noValidate>
                            <div className='card shadow m-2 p-3'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <h6>Code</h6>
                                        <input type='text' className='form-control' name='department_code' id='department_code' onChange={inputData} required />
                                    </div>
                                    <div className='col-6'>
                                        <h6>College</h6>
                                        <select className='form-control' name='college_code' id='college_code' onChange={inputData} required>
                                            <option></option>
                                            {
                                                department && department.map((item, index) => (
                                                    <option key={index} value={item.CollegeNo}>({item.Code}) {item.Name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-12'>
                                        <h6>Name</h6>
                                        <input type='text' className='form-control' name='department_name' id='department_name' onChange={inputData} required />
                                    </div>
                                </div>
                            </div>
                            <button id='submit' onClick={handleSubmit} hidden></button>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to={`../`} style={{width: '80px'}} className='btn btn-secondary me-2'>Close</Link>
                        <label htmlFor='submit' className='btn btn-primary' style={{ width: '85px'}}>Save</label>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddDepartment
