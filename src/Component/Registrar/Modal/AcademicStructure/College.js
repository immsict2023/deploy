import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { CollegeData } from '../../../Controller/view/others'
import config from '../../../Security/config'
import axios from 'axios'
import editIcon from '../../../../Assets/Icons/pencil.png'
import deleteIcon from '../../../../Assets/Icons/delete.png'
import Encryptor from '../../../../Tools/Encryptor'
import DeleteCollegeConfirmation from './AcademicStructureChild/Child/ConfirmationModal/DeleteCollegeConfirmation'

function College() {

    const [college, setCollege] = useState(null)
    const [ selectedItem, setSelectedItem ] = useState(null)
    const [ modalStatus, setModalStatus ] = useState(false)

    const fetchCollege = async () => {
        try {
            const collegeData = await CollegeData(axios, config);
            setCollege(collegeData.rows)
        } catch (error) {
            alert('Error fetching country data:', error);
        }
    }

    const handleDeleteData = (idno) => {
        setSelectedItem(idno)
        setModalStatus(true)
    }

    useEffect(() => {
        try {
            fetchCollege()
        } catch(error) {
            console.error(error)
        }
    }, [])

    return (
        <>
        { modalStatus && <DeleteCollegeConfirmation modalStatus={modalStatus} setModalStatus={setModalStatus} idno={selectedItem} /> }
            <Outlet />
            <Modal
                show={true}
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>COLLEGE</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <Link to={`add-college`} className='btn btn-primary m-2'>NEW COLLEGE</Link>
                        <div className='card shadow m-2 p-5 m-3'>
                            <table className='table navigation table-bordered table-hover'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Active</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        college && college.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.Name}</td>
                                                <td>{item.Code}</td>
                                                <td>{item.IsActive === 1 ? 'Yes' : 'No'}</td>
                                                <td width={140} className='text-center'>
                                                { /* <Link to={`edit-college/${Encryptor.encryptInformation(item.collegeno)}`} style={{width: '20'}} className='btn me-1'><img src={editIcon} alt='Edit Icon' style={{width: '20px'}}  /></Link> */}
                                                    <button onClick={() => handleDeleteData(item.CollegeNo)} style={{width: '20'}} className='btn'><img src={deleteIcon} alt='Delete Icon' style={{width: '20px'}}  /></button>
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
                    <div className='container-fluid'>
                        <Link to={`../`} className='btn btn-secondary float-end'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default College
