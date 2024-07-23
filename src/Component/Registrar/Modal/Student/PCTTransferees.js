import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import view from '../../../Controller/Student/view'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import NewPCTTransferees from './StudentChild/Child/PCTTransferees/NewPCTTransferees'

function PCTTransferees() {

    const [modalStatusNewPCT, setModalStatusNewPCT] = useState(false)
    const [transferStudentList, setTransferStudentList] = useState([])

    const MAX_PAGE_BUTTONS = 10; 
    const recordPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(transferStudentList.length / recordPerPage);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = transferStudentList.slice(firstIndex, lastIndex);
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
    const numbers = [...Array(endPage - startPage + 1).keys()].map((_, i) => startPage + i);

    const nextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const changeCurrentPage = (page) => {
        setCurrentPage(page);
    };

    const prePage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };


    const getTransferStudentDetailsFunc = () => {
        view.getTransferStudentDetails().then((res) => { 
            setTransferStudentList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const handleNewPCT = () => {
        setModalStatusNewPCT(true)
    }

    useEffect(() => {
        getTransferStudentDetailsFunc()
    }, [])

    return (
        <>
        {modalStatusNewPCT && <NewPCTTransferees modalStatus={modalStatusNewPCT} setModalStatus={setModalStatusNewPCT} />}
            <Modal
                show={true}
                centered
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>PREVIOUS PROGRAMS AND COURSES TAKEN</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid p-5'>
                        <div className='card p-3 m-5'>
                            <div className='container-fluid p-3'>
                                <button onClick={handleNewPCT} className='btn btn-primary' style={{ width: '100px' }}> <FontAwesomeIcon icon={faPlus} />  NEW</button>
                            </div>
                            <table className='table m-3'>
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Institution Name</th>
                                        <th>AY, Sem</th>
                                        <th>Program Code</th>
                                        <th>Program Description</th>
                                        <th>Posted</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        records && records.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.StudentName} ({item.StudentIDsep})</td>
                                                <td>{item.InstitutionNamesep}</td>
                                                <td>{item.AY}, {item.Semsep}</td>
                                                <td>{item.ProgramCodesep}</td>
                                                <td>{item.ProgramDescriptionsep}</td>
                                                <td>{item.IsPosted === 1 ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <button className='btn btn-primary'>SHOW</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className='container-fluid mt-3'>
                                <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${transferStudentList.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${transferStudentList.length}`}</label>
                                <nav className=' d-flex justify-content-center'>
                                    <ul className='pagination'>
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className='page-link' onClick={prePage}>Prev</button>
                                        </li>
                                        {numbers.map((item, index) => (
                                        <li className={`page-item ${currentPage === item ? 'active' : ''}`} key={index}>
                                            <button className='page-link' onClick={() => changeCurrentPage(item)}>{item}</button>
                                        </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className='page-link' onClick={nextPage}>Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link className='btn btn-secondary' to='../'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default PCTTransferees
