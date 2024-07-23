import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../../../../../Security/config'
import { departmentData, degreeData } from '../../../../../../Controller/view/others' 
import AddProgramConfirmation from '../ConfirmationModal/AddProgramConfirmation'

function AddProgram() {

    const [ modalStatus, setModalStatus ] = useState(false)
    const [ department, setDepartment ] = useState([])
    const [ degree, setDegree ] = useState([])
    const [ data, setData ] = useState([])

    const inputData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    
    const getDepartment = (axios, config) => {
        departmentData(axios, config)
        .then((res) => {
            setDepartment(res.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getDegree = (axios, config) => {
        degreeData(axios, config)
        .then((res) => {
            setDegree(res.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setModalStatus(true)
    }

    useEffect(() => {
        getDepartment(axios,config)
        getDegree(axios, config)
    }, [])

    return (
        <>
            { modalStatus && <AddProgramConfirmation modalStatus={modalStatus} setModalStatus={setModalStatus} data={data} />}
            <Modal
                show={true}
                size='lg'
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='text-center'>
                        <h5>ADD PROGRAM</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <form noValidate={true}>
                            <div className='card shadow p-3 m-3'>   
                                <div className='row'>
                                    <div className='col-6'>
                                        <h6>Degree</h6>
                                        <select className='form-control' name='program_degree' id='program_degree ' onChange={inputData} required={true}>
                                            <option></option>
                                            {
                                                degree && degree.map((item, index) => (
                                                    <option key={index} value={item.DegreeNo}>{item.Label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <h6>Code</h6>
                                        <input type='text' className='form-control' name='program_code' id='program_code'  onChange={inputData} required={true}/>
                                    </div>
                                    <div className='col-12'>
                                        <h6>Title</h6>
                                        <input className='form-control' name='program_title' id='program_title'  onChange={inputData} required={true}/>
                                    </div>
                                    <div className='col-12'>
                                        <h6>Description</h6>
                                        <textarea className='form-control' name='program_description' id='program_description' onChange={inputData} required={true}></textarea>
                                    </div>
                                    <div className='col-12'>
                                        <h6>Department</h6>
                                        <select className='form-control' name='program_department' id='program_department' onChange={inputData} required={true}>
                                            <option></option>
                                            {
                                                department && department.map((item, index) => (
                                                    <option key={index} value={item.departmentNo}>{item.departmentName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type='submit' id='submit' onClick={handleSubmit} hidden></button>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <label htmlFor='submit' className='btn btn-primary me-2'>Save</label>
                        <Link to={`../`} className='btn btn-secondary'>Close</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}
 
export default AddProgram