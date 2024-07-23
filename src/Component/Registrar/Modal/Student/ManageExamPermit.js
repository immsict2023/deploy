import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import view from '../../../Controller/Student/view'
import { convertDateWTime } from '../../../../Tools/date'

function ManageExamPermit() {

    const [examPermitList, setExamPermitList] = useState([])

    const MAX_PAGE_BUTTONS = 10; 
    const recordPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(examPermitList.length / recordPerPage);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = examPermitList.slice(firstIndex, lastIndex);
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

    const getStudentPermitListFunc = () => {
        view.getStudentPermitList().then((res) => {
            console.log(res.data.rows)
            setExamPermitList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getStudentPermitListFunc()
    }, [])

    return (
        <>
            <Modal
                show={true}
                centered
                scrollable
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>MANAGE EXAM PERMIT</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <div className='p-3 card shadow mt-5'>
                            <div className='d-flex justify-content-center'>
                                <div style={{ width: '1200px' }}>
                                    <div className='row'>
                                        <div className='col-2'>
                                            <h6>AY</h6>
                                            <select className='form-control' name='ay' id='ay'>
                                                <option></option>
                                            </select>
                                        </div>
                                        <div className='col-2'>
                                            <h6>Semester</h6>
                                            <select className='form-control' name='semester' id='semester'>
                                                <option value='All'>All</option>
                                                <option value='1ST'>1ST</option>
                                                <option value='2ND'>2ND</option>
                                            </select>
                                        </div>
                                        <div className='col-2'>
                                            <h6>Semester</h6>
                                            <select className='form-control' name='semester' id='semester'>
                                                <option value='All'>All</option>
                                                <option value='Prelim Exam'>Prelim Exam</option>
                                                <option value='Midterm Exam'>Midterm Exam</option>
                                                <option value='Final Exam'>Final Exam</option>
                                            </select>
                                        </div>
                                        <div className='col-2'>
                                            <h6>Issue On</h6>
                                            <input type='date' className='form-control' name='issued_on' id='issued_on' />
                                        </div>
                                        <div className='col-2'>
                                            <h6>Issue To</h6>
                                            <input type='date' className='form-control' name='issued_to' id='issued_to' />
                                        </div>
                                        <div className='col-2'>
                                            <button className='btn btn-primary mt-4 w-100'>SEARCH</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card p-3 mt-3'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Permit ID</th>
                                        <th>EP</th>
                                        <th>Block ID</th>
                                        <th>AY</th>
                                        <th>Semester</th>
                                        <th>Registar</th>
                                        <th>Cashier</th>
                                        <th>Issued On</th>
                                        <th>Created By</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        records && records.map((item, index) => ( 
                                        <tr key={index}>
                                            <td>{item.StudentName} ({item.StudentID})</td>
                                            <td>{item.PermitID}</td>
                                            <td>{item.ExamPeriod}</td>
                                            <td>{item.BlockID}</td>
                                            <td>{item.ExamPeriod}</td>
                                            <td>{item.Sem}</td>
                                            <td>{item.RegistrarName}</td>
                                            <td>{item.CashierName}</td>
                                            <td>{convertDateWTime(item.CreatedOn)}</td>
                                            <td>{item.CreatedBy}</td>
                                            <td>
                                                <button className='btn btn-primary me-2'>SHOW</button>
                                                <button className='btn btn-danger'>DELETE</button>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className='container-fluid'>
                                <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${examPermitList.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${examPermitList.length}`}</label>
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
                    <Link to='../' className='btn btn-secondary'>CLOSE</Link>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ManageExamPermit
