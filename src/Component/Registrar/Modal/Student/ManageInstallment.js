import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import viewEn from '../../../Controller/Enlistment/view'
import currency from '../../../../Tools/currency'
import { convertDateWTime } from '../../../../Tools/date'
import SubInstallmentDisplay from './StudentChild/Child/ManageInstallment/SubInstallmentDisplay'

function ManageInstallment() {

    const [enlistmentList, setEnlistmentList] = useState([])

    const MAX_PAGE_BUTTONS = 10; 
    const recordPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(enlistmentList.length / recordPerPage);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = enlistmentList.slice(firstIndex, lastIndex);
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

    const getEnlistmentListFunc = () => {
        viewEn.enlistmentList().then((res) => {
            setEnlistmentList(res.data.rows)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getEnlistmentListFunc()
    }, [])

    return (
        <>
            <Modal
                show={true}
                size='xl'
                fullscreen
                scrollable
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>MANAGE INSTALLMENT</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid p-5'>
                        <div className='row'>
                            <div className='card shadow p-3'>
                                <div className='container-fluid d-flex justify-content-center'>
                                    <div style={{ width: '1200px' }} className='row'>
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
                                                <option value='3RD'>3RD</option>
                                                <option value='SUM'>SUM</option>
                                            </select>
                                        </div>
                                        <div className='col-2'>
                                            <h6>Plan Code</h6>
                                            <select className='form-control' name='semester' id='semester'>
                                                <option></option>
                                                <option value='1PPLAN'>1PPLAN</option>
                                                <option value='2PPLAN'>2PPLAN</option>
                                                <option value='3PPLAN'>3PPLAN</option>
                                            </select>
                                        </div>
                                        <div className='col-2'>
                                            <h6>Created On</h6>
                                            <input className='form-control' type='date' name='created_on' id='created_on' />
                                        </div>
                                        <div className='col-2'>
                                            <h6>Created To</h6>
                                            <input className='form-control' type='date' name='created_to' id='created_to' />
                                        </div>
                                        <div className='col-2 mt-4'>
                                            <button className='btn btn-primary w-100'>SEARCH</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card shadow mt-5'>
                                <div className='p-4'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>AY, Semester</th>
                                                <th>Student ID</th>
                                                <th>EN</th>
                                                <th>Plan Code</th>
                                                <th>Plan Amount</th>
                                                <th>Created On</th>
                                                <th>Last Updated On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                records && records.map((item, index) => (
                                                   <>
                                                        <tr key={index} className='mt-2'>
                                                            <td>{item.AY}, {item.Sem}</td>
                                                            <td>{item.StudentName} ({item.StudentID})</td>
                                                            <td>{item.RegistrationNo}</td>
                                                            <td>{item.PaymentOption}</td>
                                                            <td>{currency.formatter.format(item.TotalDue)}</td>
                                                            <td>{convertDateWTime(item.CreatedOn)}</td>
                                                            <td>{item.LastUpdatedOn !== null && item.LastUpdatedOn ? convertDateWTime(item.LastUpdatedOn) : '-'}</td>
                                                        </tr>
                                                        <tr key={index + .1}>
                                                            <td colSpan={9}>
                                                                <SubInstallmentDisplay data={item.RegistrationNo} />
                                                            </td>
                                                        </tr>
                                                   </>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className='container-fluid'>
                                        <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${enlistmentList.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${enlistmentList.length}`}</label>
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
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link className='btn btn-secondary' to='../'>CANCEL</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ManageInstallment
