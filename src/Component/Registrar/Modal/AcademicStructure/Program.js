import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { ProgramData } from '../../../Controller/view/others';
import config from '../../../Security/config';
import axios from 'axios'
import Encryptor from '../../../../Tools/Encryptor';

import icon_delete from '../../../../Assets/Icons/delete.png';
import icon_edit from '../../../../Assets/Icons/pencil.png';

import DeleteProgramConfirmation from './AcademicStructureChild/Child/ConfirmationModal/DeleteProgramConfirmation';

function Program() {

    const [ program, setProgram ] = useState([])
    const [ modalStatusDelete, setModalStatusDelete ] = useState(false)
    const [ selectedItem, setSelectedItem ] = useState(null)

    // Table Responsive With Pagination
    const recordPerPage = 10;
    const [ currentPage, setCurrentPage ] = useState(1)
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = program.slice(firstIndex, lastIndex);
    const npage = Math.ceil(program.length / recordPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const nextPage = () => {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }

    const changeCurrentPage = (id) => {
        setCurrentPage(id)
    }

    const prePage = () => {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }

    const fetchCollege = async () => {
        try {
            const collegeData = await ProgramData(axios, config);
            setProgram(collegeData.rows)
        } catch (error) {
            alert('Error fetching country data:', error);
        }
    }

    const handleDeleteData = (id) => {
        setSelectedItem(id)
        setModalStatusDelete(true)
    }

    useEffect(() => {
        fetchCollege()
    })

    return (
        <>
        { modalStatusDelete && <DeleteProgramConfirmation modalStatus={modalStatusDelete} setModalStatus={setModalStatusDelete} idno={selectedItem} /> }
            <Outlet />
            <Modal
                show={true}
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>PROGRAM CATEGORY</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <Link to={`add-program`} className='btn btn-primary m-2'>NEW PROGRAM</Link>
                        <div className='card shadow m-2 p-3'>
                            <table className='table-responsive table table-hover navigation table-bordered mt-2'>
                                <thead>
                                    <tr>
                                        <th>Degree</th>
                                        <th>Code</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Active</th>
                                        <th width={'120px'}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        records && records.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.degTitle}</td>
                                                <td>{item.proCode}</td>
                                                <td>{item.proTitle}</td>
                                                <td>{item.proDes}</td>
                                                <td>{Boolean(item.isActive) ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <Link to={`edit-program/${Encryptor.encryptInformation(item.proNo)}`} className='btn'><img src={icon_edit} width={20} height={20} alt='edit icon' /></Link>
                                                    <button onClick={() => handleDeleteData(item.proNo)} className='btn'><img src={icon_delete} width={20} height={20} alt='delete icon' /></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className='container-fluid'>
                                <nav className='float-end'>
                                    <ul className='pagination'>
                                        <li className='page-item'>
                                            <a href='#' className='page-link' onClick={prePage}>Prev</a>
                                        </li>
                                        {
                                            numbers.map((item, index) => (
                                                <li className={`page-item ${currentPage === item ? 'active' : ''}`} key={index}> 
                                                    <a href='#' className='page-link' onClick={() => changeCurrentPage(item)} >{item}</a>
                                                </li>
                                            ))
                                        }
                                        <li className='page-item'>
                                            <a href='#' className='page-link' onClick={nextPage}>Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link className='btn btn-secondary' to={`../`}>Close</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Program
