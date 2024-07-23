import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { getOtherFees } from '../../../Controller/Administrator/view'
import { stringIsNull } from '../../../../Tools/text'
import config from './../../../Security/config'
import axios from 'axios'
import currency from '../../../../Tools/currency'

function OthersFee() {

    const [otherFees, setOtherFees] = useState([])

    const MAX_PAGE_BUTTONS = 10; 
    const recordPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(otherFees.length / recordPerPage);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = otherFees.slice(firstIndex, lastIndex);
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
    const numbers = [...Array(endPage - startPage + 1).keys()].map((_, i) => startPage + i);
    const [loadingStatus, setLoadingStatus] = useState(false)

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

    const otherFeesFunc = () => {
        getOtherFees(axios, config)
        .then((res) => {
            setOtherFees(res.data.rows)
            console.log(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        otherFeesFunc()
    }, [])

    return (
        <>
        <Outlet />
            <Modal
                show={true}
                fullscreen
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>OTHER FEES</h5>
                    </div>
                </ModalHeader>
                <ModalBody className='d-flex justify-content-center align-items-center' style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'  style={{width: '1200px'}}>
                        <div className='card shadow m-2 p-3'>
                            <button style={{ width: '155px' }} className='btn btn-primary m-2'>NEW OTHER FEES</button>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th style={{ width: '500px' }}>Item</th>
                                        <th>Amount</th>
                                        <th>Year Level</th>
                                        <th>Active</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        records && records.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.Item}</td>
                                                <td>{currency.formatter.format(item.Amount)}</td>
                                                <td>{item.YearLevel}</td>
                                                <td>Yes</td>
                                                <td>
                                                    <button style={{width: '80px'}} className='btn btn-secondary' >EDIT</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className='container-fluid'>
                                <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${otherFees.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${otherFees.length}`}</label>
                                <nav className=' d-flex justify-content-end'>
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
                        <Link to='../' className='btn btn-secondary'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default OthersFee
