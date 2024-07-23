import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-bootstrap'
import { Link, Outlet, useParams } from 'react-router-dom'
import view from '../../../Controller/Student/view'
import { convertDateWTime } from '../../../../Tools/date'
import currency from '../../../../Tools/currency'

function ManagePayment() {
    const [is_posted, setPosted_Status] = useState('Yes')
    const { selected, pay_id } = useParams();

    const [accountPayment, setAccountPayment] = useState([])

    const MAX_PAGE_BUTTONS = 10; 
    const recordPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(accountPayment.length / recordPerPage);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = accountPayment.slice(firstIndex, lastIndex);
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

    const getAccountPaymentListPartialFunc = async () => {
        await view.getAccountPaymentListPartial().then((res) => {
            console.log(res)
            setAccountPayment(res)
        }).catch((err) => {
            console.error(err)
        })
    } 

    useEffect(() => {
        getAccountPaymentListPartialFunc()
    }, [])

    return (
        <>
            <Outlet />
            <Modal
                show={true}
                scrollable
                autoFocus
                centered
                fullscreen
                animation={true}
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>MANAGE PAYMENT</h5>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid'>
                        <div className='card shadow m-4 p-4'>
                            <form>
                                <div className='container-fuild row mb-5'>
                                    <div className='col-5'>
                                        <h6><b>Payment Date</b></h6>
                                        <div className='row'>
                                            <div className='col-5'>
                                                <input className='form-control' type='date' name='form_date' />
                                            </div>
                                            <div className='col-1 text-center'>
                                                <label className='m-2'>to</label>
                                            </div>
                                            <div className='col-5'>
                                                <input className='form-control' type='date' name='to-date' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-2'>
                                        <h6><b>Posted</b></h6>
                                        <select className='form-control' name='is_posted' onChange={(e)=>setPosted_Status(e.target.value)} >
                                            <option></option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className='col-1'> 
                                        <input type='submit' className='btn btn-primary mt-4' value='SEARCH' />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='card shadow m-4 p-4'>
                            <div className='container-fluid text-end'>
                                {selected && pay_id ? <Link to='./' className='btn btn-primary'>RELOAD</Link> : ''}
                            </div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Payment Date</th>
                                        <th>Student ID</th>
                                        <th>OR No.</th>
                                        <th>Amount</th>
                                        <th>Payment Mode</th>
                                        <th>Cheque No.</th>
                                        <th>Cheque Date</th>
                                        <th>Bank</th>
                                        <th>EN</th>
                                        <th>Posted</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    records && records.map((item, index) => (
                                        <tr key={index}>
                                            <td>{convertDateWTime(item.PaymentDateap)}</td>
                                            <td>{item.StudentNames}  ({item.StudentIDap})</td>
                                            <td>{item.ORNoap}</td>
                                            <td>{currency.formatter.format(item.Amountap)}</td>
                                            <td>{item.Methodap !== null && item.Methodap !== undefined ? item.Methodap : '-'}</td>
                                            <td>{item.ChequeNoap !== null && item.ChequeNoap !== undefined ? item.ChequeNoap : '-'}</td>
                                            <td>{item.ChequeDateap !== null && item.ChequeDateap !== undefined ? convertDateWTime(item.ChequeDateap) : '-'}</td>
                                            <td>{item.BankNameb !== null && item.BankNameb !== undefined ? item.BankNameb : '-'}</td>
                                            <td>{item.RegistrationNo !== null && item.RegistrationNo !== undefined ? item.RegistrationNo : '-'}</td>
                                            <td>{item.IsPostedap === 1 ? 'Yes' : 'No'}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                            <div className='container-fluid'>
                                <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${accountPayment.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${accountPayment.length}`}</label>
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

export default ManagePayment
