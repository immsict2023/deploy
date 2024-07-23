import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import currency from '../../../../../../Tools/currency';
import view from '../../../../../Controller/Enlistment/view';
import create from '../../../../../Controller/Enlistment/create';

function DisplaySubjectToEnroll(props) {

    const { modalStatus, setModalStatus, data } = props;
    const { BlockID, Year, Sem } = data && data

    const [subjectList, setSubjectList] = useState([])
    const [miscellaneousFeesList, setMiscellaneousFeesList] = useState([])
    const [othersFeesList, setOthersFeesList] = useState([])
    const [paymentDetails, setPaymentDetails] = useState([])

    const MAX_PAGE_BUTTONS = 10; 

    const mcrecordPerPage = 10;
    const [mccurrentPage, setMcCurrentPage] = useState(1);
    const mctotalPages = Math.ceil(miscellaneousFeesList.length / mcrecordPerPage);
    const mclastIndex = mccurrentPage * mcrecordPerPage;
    const mcfirstIndex = mclastIndex - mcrecordPerPage;
    const mcRecords = miscellaneousFeesList.slice(mcfirstIndex, mclastIndex);
    const mcstartPage = Math.max(1, mccurrentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    const mcendPage = Math.min(mctotalPages, mcstartPage + MAX_PAGE_BUTTONS - 1);
    const mcnumbers = [...Array(mcendPage - mcstartPage + 1).keys()].map((_, i) => mcstartPage + i);

    const ofrecordPerPage = 10;
    const [ofcurrentPage, setOfCurrentPage] = useState(1);
    const oftotalPages = Math.ceil(othersFeesList.length / ofrecordPerPage);
    const oflastIndex = ofcurrentPage * ofrecordPerPage;
    const offirstIndex = oflastIndex - ofrecordPerPage;
    const ofRecords = othersFeesList.slice(offirstIndex, oflastIndex);
    const ofstartPage = Math.max(1, ofcurrentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    const ofendPage = Math.min(oftotalPages, ofstartPage + MAX_PAGE_BUTTONS - 1);
    const ofnumbers = [...Array(ofendPage - ofstartPage + 1).keys()].map((_, i) => ofstartPage + i);

    const srecordPerPage = 10;
    const [scurrentPage, setSCurrentPage] = useState(1);
    const stotalPages = Math.ceil(subjectList.length / srecordPerPage);
    const slastIndex = scurrentPage * srecordPerPage;
    const sfirstIndex = slastIndex - srecordPerPage;
    const sRecords = subjectList.slice(sfirstIndex, slastIndex);
    const sstartPage = Math.max(1, scurrentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    const sendPage = Math.min(stotalPages, sstartPage + MAX_PAGE_BUTTONS - 1);
    const snumbers = [...Array(sendPage - sstartPage + 1).keys()].map((_, i) => sstartPage + i);

    const getStudentEnlistSubjectFunc = (BlockID, Year, Sem) => {
        view.getStudentEnlistSubject(BlockID, Year, Sem).then((res) => {
            console.log(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const getMiscellaneousFeesListFunc = () => {
        view.getMiscellaneousFeesList().then((res) => {
            setMiscellaneousFeesList(res.data.rows)
        }).catch((err) => {
            console.error(err.message)
        })
    }

    const getOthersFeesListFunc = (YearLevel) => {
        view.getOthersFeesList(YearLevel).then((res) => {
            setOthersFeesList(res.data.rows)
        }).catch((err) => {
            console.error(err.message)
        })
    }

    const handleEnrollStudent = () => {
        create.createEnlistStudent(data).then((res) => {
            console.log(res)
            if (res.data.success) {
                if (res.data.res[1].affectedRows > 0) {
                    alert('Successfully Enlist!')
                    setPaymentDetails(res.data.res[0][0])
                }
            } else {
                alert(`${res.data.err.code}: ${res.data.err.sqlMessage}`)
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getStudentEnlistSubjectFunc(BlockID, Year, Sem)
        getOthersFeesListFunc(Year)
        getMiscellaneousFeesListFunc()
    }, [BlockID, Year, Sem])

    return (
        <>
            <Modal
                show={modalStatus}
                centered
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h6>ENROLL CONFIRMATION</h6>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid p-3 d-flex justify-content-center align-items-center' style={{ height: '86vh' }}>
                        <div className='card shadow p-4' style={{ width: '1000px' }}>
                            <div className='row'>
                                <div className='col-12 text-center mb-3  card shadow border-0 p-2 text-dark'>
                                    <h5>STUDENT INFORMATION</h5>
                                </div>
                                <div className='col-6 mt-3'>
                                    <h6>Name</h6>
                                    <label className='form-control'>{data.StudentName}</label>
                                </div>
                                <div className='col-6 mt-3'>
                                    <h6>Student ID</h6>
                                    <label className='form-control'>{data.StudentID}</label>
                                </div>
                                <div className='col-12 text-center mt-4'>
                                    <h6>Enlistment Details</h6>
                                </div>
                                <div className='col-2 mt-3'>
                                    <h6>Old Account</h6>
                                    <label className='form-control'>{currency.formatter.format(data.OldAccount)}</label>
                                </div>
                                <div className='col-2 mt-3'>
                                    <h6>Payment option</h6>
                                    <label className='form-control'>{data.PaymentOption}</label>
                                </div>
                                <div className='col-3 mt-3'>
                                    <h6>Year , Semester</h6>
                                    <label className='form-control'>{data.Year} Year , {data.Sem}</label>
                                </div>
                                <div className='col-2 mt-3'>
                                    <h6>Status</h6>
                                    <label className='form-control'>{data.Status}</label>
                                </div>
                                <div className='col-3 mt-3'>
                                    <h6>Block</h6>
                                    <label className='form-control'>{data.BlockID}</label>
                                </div>
                            </div>
                            <div className='container-fluid text-center mt-4'>
                                <button onClick={handleEnrollStudent} style={{ width: '120px' }} className='btn btn-primary'>ENROLL</button>
                            </div>
                            <div className='container-fluid mt-5'>
                                <div className='row'>
                                    <div className='col-12 text-center mb-3  card shadow border-0 p-2 text-dark'>
                                        <h5>PAYMENT DETAILS</h5>
                                    </div>
                                    <div className='col-4 mt-3'>
                                        <h6>Total Units</h6>
                                        <input className='form-control' type='text' defaultValue={paymentDetails.TotalUnits && paymentDetails.TotalUnits} disabled />
                                    </div>
                                    <div className='col-4 mt-3'>
                                        <h6>Total Lab Fee</h6>
                                        <input className='form-control' type='text' defaultValue={paymentDetails.TotalLabFee && currency.formatter.format(paymentDetails.TotalLabFee)} disabled />
                                    </div>
                                    <div className='col-4 mt-3'>
                                        <h6>Total Misc Fee</h6>
                                        <input className='form-control' type='text' defaultValue={paymentDetails.TotalMiscFee && currency.formatter.format(paymentDetails.TotalMiscFee)} disabled />
                                    </div>
                                    <div className='col-4 mt-3'>
                                        <h6>Total Other Fee</h6>
                                        <input className='form-control' type='text' defaultValue={paymentDetails.TotalOtherFee && currency.formatter.format(paymentDetails.TotalOtherFee)} disabled />
                                    </div>
                                    <div className='col-4 mt-3'>
                                        <h6>Total TAAF Fee</h6>
                                        <input className='form-control' type='text' defaultValue={paymentDetails.TotalTAAF && currency.formatter.format(paymentDetails.TotalTAAF)} disabled />
                                    </div>
                                    <div className='col-4 mt-3'>
                                        <h6>Total Tuition</h6>
                                        <input className='form-control' type='text' defaultValue={paymentDetails.TotalTuition && currency.formatter.format(paymentDetails.TotalTuition)} disabled />
                                    </div>
                                    <div className='col-4 mt-3'>
                                        <h6>Total Tuition And Fees</h6>
                                        <input className='form-control' type='text' defaultValue={paymentDetails.TotalTuitionAndFees && currency.formatter.format(paymentDetails.TotalTuitionAndFees)} disabled />
                                    </div>
                                    <div className='col-4 mt-3'>
                                        <h6>Total Due</h6>
                                        <input className='form-control' type='text' defaultValue={paymentDetails.TotalTuitionAndFees && currency.formatter.format(paymentDetails.TotalTuitionAndFees)} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            /*
                                <div className='card shadow p-3 mt-3'>
                                    <div className='container-fluid'>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <div className='card shadow text-center p-3'>
                                                    <h6 className='mt-2 mb-2'><b>LIST OF MISCELLANEOUS FEES</b></h6>
                                                    <table className='table table-borderless text-start'>
                                                        <thead>
                                                            <tr>
                                                                <th>Item</th>
                                                                <th>Amount</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                mcRecords && mcRecords.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.Item}</td>
                                                                        <td>{currency.formatter.format(item.Amount)}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <th className='text-end'>Total Amount:</th>
                                                                <th>{currency.formatter.format(mcRecords.reduce((accumulator, currentObject) => { return accumulator + currentObject.Amount; }, 0))}</th>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                    {
                                                        mcRecords.length > mcrecordPerPage ?
                                                        (
                                                            <div className='container-fluid'>
                                                                <nav className=' d-flex justify-content-center'>
                                                                <ul className='pagination'>
                                                                    <li className={`page-item ${mccurrentPage === 1 ? 'disabled' : ''}`}>
                                                                    <button className='page-link' onClick={mcprePage}>Prev</button>
                                                                    </li>
                                                                    {mcnumbers.map((item, index) => (
                                                                    <li className={`page-item ${mccurrentPage === item ? 'active' : ''}`} key={index}>
                                                                        <button className='page-link' onClick={() => mcchangeCurrentPage(item)}>{item}</button>
                                                                    </li>
                                                                    ))}
                                                                    <li className={`page-item ${mccurrentPage === mctotalPages ? 'disabled' : ''}`}>
                                                                    <button className='page-link' onClick={mcnextPage}>Next</button>
                                                                    </li>
                                                                </ul>
                                                                </nav>
                                                            </div>
                                                        )
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-4'>
                                                <div className='card shadow text-center p-3'>
                                                    <h6 className='mt-2 mb-2'><b>LIST OF SUBJECTS</b></h6>
                                                    <table className='table text-start table-borderless'>
                                                        <thead>
                                                            <tr>
                                                                <th>Course Code</th>
                                                                <th>Units</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                sRecords && sRecords.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.CourseCode}</td>
                                                                        <td>{item.Units}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <th className='text-end'>Total Units:</th>
                                                                <th>{sRecords.reduce((accumulator, currentObject) => { return accumulator + currentObject.Units; }, 0)}</th>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                    {
                                                        sRecords.length > srecordPerPage ?
                                                        (
                                                            <div className='container-fluid'>
                                                                <nav className=' d-flex justify-content-center'>
                                                                <ul className='pagination'>
                                                                    <li className={`page-item ${scurrentPage === 1 ? 'disabled' : ''}`}>
                                                                    <button className='page-link' onClick={sprePage}>Prev</button>
                                                                    </li>
                                                                    {mcnumbers.map((item, index) => (
                                                                    <li className={`page-item ${scurrentPage === item ? 'active' : ''}`} key={index}>
                                                                        <button className='page-link' onClick={() => schangeCurrentPage(item)}>{item}</button>
                                                                    </li>
                                                                    ))}
                                                                    <li className={`page-item ${scurrentPage === stotalPages ? 'disabled' : ''}`}>
                                                                    <button className='page-link' onClick={snextPage}>Next</button>
                                                                    </li>
                                                                </ul>
                                                                </nav>
                                                            </div>
                                                        )
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-4'>
                                                <div className='card shadow text-center p-3'>
                                                    <h6 className='mt-2 mb-2'><b>LIST OF OTHERS FEES</b></h6>
                                                    <table className='table table-borderless text-start'>
                                                        <thead>
                                                            <tr>
                                                                <th>Item</th>
                                                                <th>Amount</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                ofRecords && ofRecords.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.Item} Amount:</td>
                                                                        <td>{currency.formatter.format(item.Amount)}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <th className='text-end'>Total Amount:</th>
                                                                <th>{currency.formatter.format(ofRecords.reduce((accumulator, currentObject) => { return accumulator + currentObject.Amount; }, 0))}</th>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                    {
                                                        ofRecords.length > ofrecordPerPage ?
                                                        (
                                                            <div className='container-fluid'>
                                                                <nav className=' d-flex justify-content-center'>
                                                                <ul className='pagination'>
                                                                    <li className={`page-item ${ofcurrentPage === 1 ? 'disabled' : ''}`}>
                                                                    <button className='page-link' onClick={ofprePage}>Prev</button>
                                                                    </li>
                                                                    {mcnumbers.map((item, index) => (
                                                                    <li className={`page-item ${ofcurrentPage === item ? 'active' : ''}`} key={index}>
                                                                        <button className='page-link' onClick={() => ofchangeCurrentPage(item)}>{item}</button>
                                                                    </li>
                                                                    ))}
                                                                    <li className={`page-item ${ofcurrentPage === oftotalPages ? 'disabled' : ''}`}>
                                                                    <button className='page-link' onClick={ofnextPage}>Next</button>
                                                                    </li>
                                                                </ul>
                                                                </nav>
                                                            </div>
                                                        )
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='container-fluid text-center mt-2'>
                                        <button onClick={handleEnrollStudent} style={{ width: '120px' }} className='btn btn-primary'>ENROLL</button>
                                    </div>
                                </div>
                            */
                        }
                    </div>
                </ModalBody>
                <ModalFooter  className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <button onClick={()=> {setModalStatus(false)}} className='btn btn-secondary'>Close</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default DisplaySubjectToEnroll