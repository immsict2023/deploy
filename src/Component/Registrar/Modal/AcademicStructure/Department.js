import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
import config from '../../../Security/config'
import { departmentData } from '../../../Controller/view/others'
import deleteIcon from '../../../../Assets/Icons/delete.png'
import editIcon from '../../../../Assets/Icons/pencil.png'
import Encryptor from '../../../../Tools/Encryptor'
import DeleteDepartmentConfirmation from './AcademicStructureChild/Child/ConfirmationModal/DeleteDepartmentConfirmation'

function Department() {

    const [department, setDepartment] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [modalStatusDelete, setModalStatusDelete] = useState(false)

    const getDepartment = (axios, config) => {
        departmentData(axios, config)
        .then((res) => {
            setDepartment(res.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const handleDeleteData = (idno) => {
        setSelectedItem(idno)
        setModalStatusDelete(true)
    }

    useEffect(() => {
        getDepartment(axios, config)
    })

    return (
        <>
        { modalStatusDelete && <DeleteDepartmentConfirmation modalStatus={modalStatusDelete} setModalStatus={setModalStatusDelete} idno={selectedItem} /> }
            <Outlet />
            <Modal
                show={true}
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>DEPARTMENT CATALOG</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid' style={{ width: "1500px" }}>
                        <Link to={`add-department`} className='btn btn-primary m-2'>NEW DEPARTMENT</Link>
                        <div className='card shadow m-2 p-3'>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>College</th>
                                        <th>Active</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        department && department.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.departmentCode}</td>
                                            <td>{item.departmentName}</td>
                                            <td>{item.collegeCode}</td>
                                            <td>{Boolean(item.isActive) ? 'Yes' : 'No'}</td>
                                            {
                                                /*
                                                    <td>
                                                        <Link to={`edit-department/${Encryptor.encryptInformation(item.departmentNo)}`} className='btn'><img src={editIcon} alt='Edit Icon' width='20px' /></Link>
                                                        <button onClick={() => handleDeleteData(item.departmentNo) } className='btn'><img src={deleteIcon} alt='Delete Icon' width='20px' /></button>
                                                    </td>
                                                */
                                            }
                                        </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white float-end' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to={`../`} className='btn btn-secondary'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Department
