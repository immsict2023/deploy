import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import currency from '../../../../Tools/currency';
import view from '../../../Controller/Reports/view';
import { Link } from 'react-router-dom';
import Loadings from '../../../Loadings/Loadings';

function PaymentCollection() {

    const [searchDate, setSearchDate] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [isButtonClick, setIsButtonClick] = useState(false);

    const MAX_PAGE_BUTTONS = 10; 
    const recordPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(paymentList.length / recordPerPage);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = paymentList.slice(firstIndex, lastIndex);
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

    const getPaymentCollectionFunc = () => {
        view.getPaymentCollection(searchDate).then((res) => {
            setPaymentList(res.data.rows)
            setIsButtonClick(false)
        }).catch((err) => {
            setIsButtonClick(false)
            console.error(err)
        })
    }

    const totalAmount = paymentList.reduce((sum, current) => sum + current.Amount, 0);

    const inputData = (e) => {
        console.log(e.target.value)
        setSearchDate({
            ...searchDate,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setIsButtonClick(true)
        if (searchDate.fromDate !== undefined && searchDate.fromDate !== null && searchDate.fromDate !== "" && searchDate.toDate !== undefined && searchDate.toDate !== null && searchDate.toDate !== "") {
            getPaymentCollectionFunc(searchDate)
        }
    }

    return (
        <>
            { isButtonClick && <Loadings loadingStatus={isButtonClick} /> }
            <Modal
                show={true}
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h6>PAYMENT COLLECTION</h6>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-12 d-flex justify-content-center mt-2'>
                                <div className='card shadow p-3' style={{ width: '1500px' }}>
                                    <form onSubmit={handleSubmitSearch}>
                                        <div className='row d-flex justify-content-center'>
                                            <div className='col-3'>
                                                <h6>From</h6>
                                                <input onChange={inputData} type='date' className='form-control' name='fromDate' />
                                            </div>
                                            <div className='col-3'>
                                                <h6>To</h6>
                                                <input onChange={inputData} type='date' className='form-control' name='toDate' />
                                            </div>
                                            <div className='col-12 d-flex justify-content-center mt-3'>
                                                <input disabled={isButtonClick} style={{ width: '200px' }} type='submit' value='Search' className='form-control btn btn-primary' name='to-date' />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='col-12 text-center mt-5  d-flex justify-content-center'>
                                <div className='card shadow p-3' style={{ width: '1500px' }}>
                                    <div className='card shadow p-3'>
                                        <label><b>ILOILO MERCHANT MARINE SCHOOL</b></label>
                                        <label>STUDENT ACCOUNTING OFFICE</label>
                                        <label>Cabugao Sur, Pavia, 5001, Iloilo</label>
                                        <label>Tel. No.: (033) 327-9973</label><br />
                                        <h4>PAYMENT COLLECTION</h4>
                                    </div>
                                    <div className='card shadow mt-4 p-3'>
                                        <div className='container-fluid text-center m-3'>
                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6 className='text-dark'>To: {searchDate.toDate && searchDate.toDate}</h6>
                                                </div>
                                                <div className='col-4'>
                                                    <h6 className='text-dark'>From: {searchDate.fromDate && searchDate.fromDate}</h6>
                                                </div>
                                                <div className='col-4'>
                                                    <h6 className='text-danger'>Total: {currency.formatter.format(totalAmount && totalAmount)}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>DATE</th>
                                                    <th>STUDENT ID</th>
                                                    <th>STUDENT NAME</th>
                                                    <th>DESCRIPTION</th>
                                                    <th>OR #</th>
                                                    <th>MODE</th>
                                                    <th>PAID AMOUNT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    records && records.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.PaymentDate}</td>
                                                            <td>{item.StudentID}</td>
                                                            <td className='text-start'>{item.StudentName}</td>
                                                            <td className='text-start'>{item.Description === null || item.Description === undefined ? '-' : item.Description }</td>
                                                            <td>{item.ORNo}</td>
                                                            <td>{item.Method}</td>
                                                            <td className='text-end'>{currency.formatter.format(item.Amount)}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            <tfoot className='bg-danger text-white'>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th>Total:</th>
                                                    <th className='text-end text-white'>{currency.formatter.format(totalAmount)}</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <div className='container-fluid mt-3'>
                                            <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${paymentList.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${paymentList.length}`}</label>
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
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <Link to={'../'} className='btn btn-secondary'>Close</Link>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default PaymentCollection