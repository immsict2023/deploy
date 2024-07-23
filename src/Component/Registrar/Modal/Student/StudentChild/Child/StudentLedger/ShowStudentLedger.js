import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import view from '../../../../../../Controller/Student/view'
import viewSettings from '../../../../../../Controller/Administrator/view'
import NewCharge from './NewCharge'
import currency from '../../../../../../../Tools/currency'

function ShowStudentLedger() {

    const [studentData, setStudentData] = useState([])
    const [installmentStudentLedger, setInstallmentStudentLedger] = useState([])
    const [chargeStudentLedger, setChargeStudentLedger] = useState([])

    const [chargeModalStatus, setChargeModalStatus] = useState(false)
    const [importantCharge, setImportantCharge] = useState([])

    const [buttonSelected, setButtonSelected] = useState('charges')
    const [errorDisplay, setErrorDisplay] = useState('')
    const { studentid } = useParams()

    // Installment
    // Table Responsive With Pagination
    const recordPerPageInstallment = 8;
    const [ currentPageInstallment, setCurrentPageInstallment ] = useState(1)
    const lastIndexInstallment = currentPageInstallment * recordPerPageInstallment;
    const firstIndexInstallment = lastIndexInstallment - recordPerPageInstallment;
    const recordsInstallments = installmentStudentLedger.slice(firstIndexInstallment, lastIndexInstallment);
    const npageInstallment = Math.ceil(installmentStudentLedger.length / recordPerPageInstallment)
    const numbersInstallment = [...Array(npageInstallment + 1).keys()].slice(1)
    
    // Charges
    // Table Responsive With Pagination
    const recordPerPage = 8;
    const [ currentPage, setCurrentPage ] = useState(1)
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = chargeStudentLedger.slice(firstIndex, lastIndex);
    const npage = Math.ceil(chargeStudentLedger.length / recordPerPage)
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

    const nextPageInstallment = () => {
        if (currentPageInstallment !== lastIndexInstallment) {
            setCurrentPageInstallment(currentPageInstallment + 1)
        }
    }

    const changeCurrentPageInstallment = (id) => {
        setCurrentPageInstallment(id)
    }

    const prePageInstallment = () => {
        if (currentPageInstallment !== firstIndexInstallment) {
            setCurrentPageInstallment(currentPageInstallment - 1)
        }
    }

    const getStudentDataForLedgerFunc = () => {
        
        view.getStudentDataForLedger(studentid).then((res) => { 
            if (Boolean(res.data.success)) {
                if (Number(res.data.length) <= 0) {
                    setErrorDisplay('Student Installment Data is not Found!')
                }
                
                if (Number(res.data.length) > 0) {
                    setStudentData(res.data.rows[0])
                    var currentDate = new Date();
                    
                    var day = currentDate.getDate();
                    var month = currentDate.getMonth() + 1; 
                    var year = currentDate.getFullYear();
                    
                    var formattedDate = day + "/" + month + "/" + year;

                    viewSettings.getSettings().then((res1) => {
                        setImportantCharge({
                            ...importantCharge,
                            postdate: formattedDate,
                            studentid, 
                            studentname: res.data.rows[0].studentname,
                            aysem: `${res1.data.rows[0].CurrentAY}, ${res1.data.rows[0].CurrentSem}`,
                            registrationno: res.data.rows[0].registrationno,
                            terms: 'Due Immediately',
                            ay: res1.data.rows[0].CurrentAY,
                            sem: res1.data.rows[0].CurrentSem
                        })
                    }).catch((err) => {
                        console.error(err)
                    })
                }
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    const getInstallmentStudentLedgerFunc = () => {
        view.getInstallmentStudentLedger(studentid).then((res) => {
            if (res.data.success) {
                if (Number(res.data.length) > 0) {
                    setInstallmentStudentLedger(res.data.rows)
                }
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    const getChargeStudentLedgerFunc = () => {
        view.getChargeStudentLedger(studentid).then((res) => {
            if (Boolean(res.data.success)) {
                if (Number(res.data.length) > 0) {
                    setChargeStudentLedger(res.data.rows)
                }
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getStudentDataForLedgerFunc()
        getInstallmentStudentLedgerFunc()
        getChargeStudentLedgerFunc()
    }, [])
    
    return (
        <>
        { chargeModalStatus && <NewCharge modalStatus={chargeModalStatus} setModalStatus={setChargeModalStatus} data={importantCharge} /> }
            <Modal
                show={true}
                fullscreen
                centered
                scrollable
                animation={true}
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-start text-white'>
                        <h5>STUDENT LEDGER</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <main className='row d-flex justify-content-center'>
                        <div className='card shadow p-5 m-2' style={{ width: '1200px' }}>
                            <div className='container text-center'>
                                <h4>STUDENT LEDGER</h4>
                            </div>
                            <table className='table table-borderless'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>Student ID</b></td>
                                        <td>
                                            {
                                                studentData && studentData.studentid
                                            }
                                        </td>
                                        <td><b>Student Name</b></td>
                                        <td>
                                            {
                                                studentData && studentData.studentname
                                            }
                                        </td>
                                        <td><b>Program</b></td>
                                        <td>
                                            {
                                                studentData && studentData.code
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Date Admitted</b></td>
                                        <td>
                                            {
                                                studentData  && studentData.dateadmitted
                                            }
                                        </td>
                                        <td><b>Remarks</b></td>
                                        <td>
                                            {
                                                studentData && studentData.remarks 
                                            }
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='card shadow p-5 m-2'  style={{ width: '1200px' }}> 
                            <div>
                                <button style={{ width: '140px' }} onClick={() => setButtonSelected('charges')} className='btn btn-primary me-3' disabled={buttonSelected === 'charges' ? true : false} >CHARGES</button>
                                <button style={{ width: '140px' }} onClick={() => setButtonSelected('installments')} className='btn btn-primary' disabled={buttonSelected === 'installments' ? true : false} >INSTALLMENTS</button>
                            </div>
                            {
                                buttonSelected === 'charges' ?
                                <>
                                    <div className='text-center'>
                                        <h5>CHARGE</h5>
                                    </div>
                                    <div className='text-left mb-4'>
                                        <button style={{ width: '140px' }} onClick={()=> setChargeModalStatus(true)} className='btn btn-primary'>NEW CHARGE</button>
                                    </div>
                                    <table className='table table-borderless table-hover'>
                                        <thead>
                                            <tr>
                                                <th>Item Code</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Terms</th>
                                                <th>Post Date</th>
                                                <th>AY, Semester</th>
                                                <th>Balance</th>
                                                <th>Paid</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                records && records.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.itemcode}</td>
                                                        <td>{item.description}</td>
                                                        <td>{currency.formatter.format(item.amount)}</td>
                                                        <td>{item.terms}</td>
                                                        <td>{item.postdate}</td>
                                                        <td>{item.aysem}</td>
                                                        <td>{currency.formatter.format(item.balance)}</td>
                                                        <td>{item.ispaid}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className='container-fluid'>
                                        <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage*records.length}/${chargeStudentLedger.length}` : `${((currentPage-1)*recordPerPage)+records.length}/${chargeStudentLedger.length}`}</label>
                                        <nav className='float-end'>
                                        <ul className='pagination'>
                                            <li className='page-item'>
                                            <button href='#' className='page-link' onClick={prePage}>Prev</button>
                                            </li>
                                            {
                                            numbers.map((item, index) => (
                                                <li className={`page-item ${currentPage === item ? 'active' : ''}`} key={index}> 
                                                <button href='#' className='page-link' onClick={() => changeCurrentPage(item)} >{item}</button>
                                                </li>
                                            ))
                                            }
                                            <li className='page-item'>
                                            <button href='#' className='page-link' onClick={nextPage}>Next</button>
                                            </li>
                                        </ul>
                                        </nav>
                                    </div>
                                </>
                                :
                                buttonSelected === 'installments' ?
                                <>
                                    <div className='text-center'>
                                        <h5>INSTALLMENTS</h5>
                                    </div>
                                    <table className='table table-borderless table-hover'>
                                        <thead>
                                            <tr>
                                                <th>AY, Semester</th>
                                                <th>Enlistment No.</th>
                                                <th>Installment No.</th>
                                                <th>Installment Amount</th>
                                                <th>Post On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                recordsInstallments && recordsInstallments.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.aysem}</td>
                                                        <td>{item.registrationno}</td>
                                                        <td>{item.installmentno}</td>
                                                        <td>{item.installmentamount} %</td>
                                                        <td>{item.poston}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className='container-fluid'>
                                        <label><b>Total Record:</b> {recordsInstallments.length === recordPerPageInstallment ? `${currentPageInstallment*recordsInstallments.length}/${installmentStudentLedger.length}` : `${((currentPageInstallment-1)*recordPerPageInstallment)+recordsInstallments.length}/${installmentStudentLedger.length}`}</label>
                                        <nav className='float-end'>
                                            <ul className='pagination'>
                                                <li className='page-item'>
                                                <button href='#' className='page-link' onClick={prePageInstallment}>Prev</button>
                                                </li>
                                                {
                                                numbersInstallment.map((item, index) => (
                                                    <li className={`page-item ${currentPageInstallment === item ? 'active' : ''}`} key={index}> 
                                                    <button href='#' className='page-link' onClick={() => changeCurrentPageInstallment(item)} >{item}</button>
                                                    </li>
                                                ))
                                                }
                                                <li className='page-item'>
                                                <button href='#' className='page-link' onClick={nextPageInstallment}>Next</button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </>
                                :
                                <></>
                            }
                        </div>
                    </main>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <Link to='../' className='btn btn-secondary'>CLOSE</Link>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ShowStudentLedger
