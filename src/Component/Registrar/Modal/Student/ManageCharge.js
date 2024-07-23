import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import view from '../../../Controller/Student/view'
import { convertDateWTime, convertDate } from '../../../../Tools/date'
import currency from '../../../../Tools/currency'

function ManageCharge() {
    
    const [accountChargesList, setAccountChargesList] = useState([])

    const MAX_PAGE_BUTTONS = 6; 
    const recordPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(accountChargesList.length / recordPerPage);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = accountChargesList.slice(firstIndex, lastIndex);
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

    const getAccountChargeListFunc = () => {
        view.getAccountChargeList().then((res) => {
            console.log(res)
            setAccountChargesList(res)
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getAccountChargeListFunc()
    }, [])
    
    return (
        <>
            <Modal
                show={true}
                fullscreen
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>MANAGE CHARGES</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <div className='card shadow p-4'>
                            <div className='d-flex justify-content-center p-3'>
                                <div style={{ width: '700px' }}>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <h6>Transaction From Date</h6>
                                            <input className='form-control' type='date' name='from_date' id='from_date' />
                                        </div>
                                        <div className='col-4'>
                                            <h6>Transaction To Date</h6>
                                            <input className='form-control' type='date' name='to_date' id='to_date' />
                                        </div>
                                        <div className='col-4'>
                                            <h6>Item Code</h6>
                                            <select className='form-control' name='item_code' id='item_code'>
                                                <option></option>
                                            </select>
                                        </div>

                                        <div className='col-4 mt-3'>
                                            <h6>Academic Year</h6>
                                            <select className='form-control' name='academic_year' id='academic_year'>
                                                <option></option>
                                            </select>
                                        </div>
                                        <div className='col-4 mt-3'>
                                            <h6>Semester</h6>
                                            <select className='form-control' name='semester' id='semester'>
                                                <option></option>
                                                <option value='1ST'>1ST</option>
                                                <option value='2ND'>2ND</option>
                                                <option value='3RD'>3RD</option>
                                                <option value='SUM'>SUM</option>
                                            </select>
                                        </div>
                                        <div className='col-4 mt-3'>
                                            <h6>Term</h6>
                                            <select className='form-control' name='term' id='term'>
                                                <option></option>
                                                <option value='All'>All</option>
                                                <option value='Due Immediately'>Due Immediately</option>
                                                <option value='Installment'>Installment</option>
                                            </select>
                                        </div>
                                        <div className='col-12 text-center mt-4 mb-4'>
                                            <button className='btn btn-primary'>SEARCH</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card shadow mt-3 p-4'>
                            <table className='table-responsive table table-hover'>
                                <thead>
                                    <tr>
                                        <th>Transaction Date</th>
                                        <th>AY, Semester</th>
                                        <th>Student ID</th>
                                        <th>EN</th>
                                        <th>Item Code</th>
                                        <th>Amount</th>
                                        <th>Terms</th>
                                        <th>Post Date</th>
                                        <th>Amount Paid</th>
                                        <th>Balance</th>
                                        <th>Is Paid?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        records && records.map((item, index) => (
                                            <tr key={index}>
                                                <td>{convertDateWTime(item.TransDateac)}<br /><b>Created On</b><br /><b>Description</b></td>
                                                <td>{item.AYac}, {item.Semac}<br />{convertDateWTime(item.CreatedOnac)}<br />{item.Descriptionac}</td>
                                                <td>{item.StudentNames} ({item.StudentIDac})<br /><b>Created By</b><br /><b>Remarks</b></td>
                                                <td>{item.RegistrationNoAc}<br />{item.Remarksac}</td>
                                                <td>{item.itemdescription}<br />{item.personnelname}</td>
                                                <td>{item.Amountac}</td>
                                                <td>{item.Termsac}</td>
                                                <td>{convertDate(item.PostDateac)}</td>
                                                <td>{currency.formatter.format(item.AmountPaidac)}</td>
                                                <td>{currency.formatter.format(item.Balanceac)}</td>
                                                <td>{item.IsPaid === 1 ? "Yes" : "No"}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className='container-fluid'>
                                <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${accountChargesList.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${accountChargesList.length}`}</label>
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

export default ManageCharge
