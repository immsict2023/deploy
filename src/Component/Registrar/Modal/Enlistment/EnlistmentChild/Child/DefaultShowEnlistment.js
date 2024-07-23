import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, Outlet, useParams } from 'react-router-dom'
import view from '../../../../../Controller/Enlistment/view'
import { convertDateWTime } from '../../../../../../Tools/date'
import currency from '../../../../../../Tools/currency'
import buttonPrinter from '../../../../../../Assets/Icons/button_preview_and_print_over.gif'
import viewStudent from '../../../../../Controller/Student/view'
import { militaryToStandardTime } from '../../../../../../Tools/date'

function DefaultShowEnlistment() {

    const [studentEnlistment, setStudentEnlistment] = useState([])
    const [isassessed, setIsassessed] = useState([])
    
    const [studentSection, setStudentSection] = useState([])
    const [islateregistration, setIslateregistration] = useState([])
    const [isprinted, setIsprinted] = useState([])
    const [isforceopenregistration, setIsforceopenregistration] = useState([])
    const [totalUnits, setTotalUnits] = useState(0)
    const [registrationFee, setRegistrationFee] = useState([])

    const [tabsNumber, setTabsNumber] = useState(0)
    const [grantdiscount, setGrantdiscount] = useState(0)

    const [blockid, setBlockid] = useState(null)
    const [registrationNo, setRegistrationNo] = useState(null)


    const { registrationno } = useParams()

    const getStudentEnlistmentFunc = (registrationno) => {
        const data = {registrationno}
        view.getStudentEnlistment(data).then((res) => {
            console.log(res)
            if (res.data.rows.length > 0) {
                console.log(res)
                setIsassessed(res.data.rows[0].isassessed.data)
                setIslateregistration(res.data.rows[0].islateregistration.data)
                setIsprinted(res.data.rows[0].isprinted.data)
                setBlockid(res.data.rows[0].blockid)
                setIsforceopenregistration(res.data.rows[0].isforceopenregistration.data)
                setRegistrationNo(res.data.rows[0].registrationno)
                setStudentEnlistment(res.data.rows[0])
                setGrantdiscount(res.data.rows[0].grantdiscount.data)
            } else {
                alert('No Data Found!')
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    
    const countUnits = (data) => {
        var totalUnitsSum = 0;
        for (var i = 0; i <  data.length; i++) {
            totalUnitsSum+=Number(data[i].units);
        }
        setTotalUnits(totalUnitsSum)
    }

    
    const getStudentSectionFunc = (blockid) => {
        viewStudent.getStudentSection(blockid).then((res) => {
            if (res.data.success) {
                if (Number(res.data.rows.length) > 0) {
                    setStudentSection(res.data.rows)
                    console.log(res.data.rows)
                    countUnits(res.data.rows)
                }
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    const getRegistrationFeeFunc = (registrationno) => {
        viewStudent.getRegistrationFee(registrationno).then((res) => {
            if (res.data.success) {
                if (Number(res.data.rows.length) > 0) {
                    setRegistrationFee(res.data.rows)
                }
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getStudentEnlistmentFunc(registrationno)
        
    }, [registrationno])

    useEffect(() => {
        if (blockid !== null && blockid !== undefined) {
            getStudentSectionFunc(blockid);
        }
    }, [blockid])

    useEffect(() => {
        if (registrationNo !== null && registrationNo !== undefined) {
            getRegistrationFeeFunc(registrationNo)
        }
    }, [registrationNo])

    return (
        <>
            <Modal
                show={true}
                fullscreen
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>ENLISTMENT</h5>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid'>
                        <div className='card p-3 m-5'>
                            <table className='table table-borderless'>
                                <tbody>
                                    <tr>
                                        <td>{/*<Link to={`show-student-ledger/${studentEnlistment.studentid}`} style={{ width: '60%' }} className='btn text-end'><img src={buttonLedger} alt='Ledger' /></Link>*/}</td>
                                        <td><Link style={{ width: '60%' }} className='btn text-start'><img src={buttonPrinter} alt='RF' /></Link></td>
                                        <td>Payment Option</td>
                                        <td><b>{studentEnlistment.paymentoption && studentEnlistment.paymentoption }</b></td>
                                        <td>Grant Discount</td>
                                        <td><b>No: { /* grantdiscount[0] && grantdiscount[0] */}</b></td>
                                        <td>Total Units</td>
                                        <td><b>{`${studentEnlistment.totalunits && studentEnlistment.totalunits} x ${studentEnlistment.unitfee && studentEnlistment.unitfee}`}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Printed On</td>
                                        <td><b>{convertDateWTime(studentEnlistment.printedon && studentEnlistment.printedon)}</b></td>
                                        <td></td>
                                        <td></td>
                                        <td>Scholarship Discount</td>
                                        <td><b>{studentEnlistment.scholarshipdiscount && studentEnlistment.scholarshipdiscount} %</b></td>
                                        <td>Total Tuition</td>
                                        <td><b>{currency.formatter.format(studentEnlistment.totaltuition && studentEnlistment.totaltuition)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>AY, Sem</td>
                                        <td><b>{`${studentEnlistment.ay && studentEnlistment.ay}, ${studentEnlistment.sem && studentEnlistment.sem}`}</b></td>
                                        <td>Enlisted on</td>
                                        <td><b>{convertDateWTime(studentEnlistment.printedon && studentEnlistment.printedon)}</b></td>
                                        <td>Enlistment No.</td>
                                        <td><b>{studentEnlistment.registrationno && studentEnlistment.registrationno}</b></td>
                                        <td>Total Misc Fees</td>
                                        <td><b>{currency.formatter.format(studentEnlistment.totalmiscfees && studentEnlistment.totalmiscfees)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Student ID</td>
                                        <td><b>{studentEnlistment.studentid && studentEnlistment.studentid}</b></td>
                                        <td>Student Name</td>
                                        <td><b>{studentEnlistment.studentname && studentEnlistment.studentname}</b></td>
                                        <td></td>
                                        <td><b></b></td>
                                        <td>Total Other Fees</td>
                                        <td><b>{currency.formatter.format(studentEnlistment.totalotherfees && studentEnlistment.totalotherfees)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td><b>{studentEnlistment.status && studentEnlistment.status}</b></td>
                                        <td>Program</td>
                                        <td><b>{studentEnlistment.code && studentEnlistment.code}</b></td>
                                        <td>Year Level</td>
                                        <td><b>Year {studentEnlistment.year && studentEnlistment.year}</b></td>
                                        <td>Total Lab Fees</td>
                                        <td><b>{currency.formatter.format(studentEnlistment.totallabfees && studentEnlistment.totallabfees)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Block Type</td>
                                        <td><b>{`${studentEnlistment.blocktype && studentEnlistment.blocktype}`}</b></td>
                                        <td>Block</td>
                                        <td><b>{studentEnlistment.section && studentEnlistment.section}</b></td>
                                        <td>Unit Fee</td>
                                        <td><b>{currency.formatter.format(studentEnlistment.unitfee && studentEnlistment.unitfee)}</b></td>
                                        <td>Total TAAF</td>
                                        <td><b>{currency.formatter.format(studentEnlistment.totaltaaf && studentEnlistment.totaltaaf)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Is Assessed? <b>{ /* isassessed[0] && isassessed[0] === 1 ? 'Yes' : 'No' */ }</b></td>
                                        <td>Is Late Reg <b>{ /* isprinted[0] && isprinted[0] === 1 ? 'Yes' : 'No' */ }</b></td>
                                        <td>Created On</td>
                                        <td><b>{convertDateWTime(studentEnlistment.createdon && studentEnlistment.createdon)}</b></td>
                                        <td>Last Updated On</td>
                                        <td><b>{convertDateWTime(studentEnlistment.lastupdatedon && studentEnlistment.lastupdatedon)}</b></td>
                                        <td>Total Tuition + Fees</td>
                                        <td><b>{currency.formatter.format(studentEnlistment.totaltuitionandfees && studentEnlistment.totaltuitionandfees)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Is Printed?? <b>{isprinted && isprinted === 1 ? 'Yes' : 'No'}</b></td>
                                        <td>Is Forced Reg? <b>{ isforceopenregistration && isforceopenregistration === 1 ? 'Yes' : 'No' }</b></td>
                                        <td>Created By</td>
                                        <td><b className='text-danger'>To Be Followed</b></td>
                                        <td>Last Updated By</td>
                                        <td><b className='text-danger'>To Be Followed</b></td>
                                        <td>Old Account</td>
                                        <td><b>{currency.formatter.format(studentEnlistment.oldaccount && studentEnlistment.oldaccount)}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Log Message</td>
                                        <td> <b className='text-danger'>To Be Followed</b></td>
                                        <td>Remarks</td>
                                        <td><b>{studentEnlistment.remarks && studentEnlistment.remarks}</b></td>
                                        <td></td>
                                        <td></td>
                                        <td>Less Downpayment</td>
                                        <td><b>{currency.formatter.format(studentEnlistment.oldaccount && studentEnlistment.oldaccount)}</b></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Less Tuition Discount</td>
                                        <td><b>{currency.formatter.format(studentEnlistment.downpayment && studentEnlistment.downpayment)}</b></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='text-danger'>Total Due</td>
                                        <td className='text-danger'><b>{currency.formatter.format(studentEnlistment.totaldue && studentEnlistment.totaldue)}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='card p-3 m-5'>
                            <div className='container-fluid p-3 mb-3'>
                                <button className={`btn me-3 ${tabsNumber === 0 ? 'btn-primary' : `btn-secondary`}`} style={{width: '180px'}} onClick={()=> setTabsNumber(0)}>Enlistment Details</button>
                                <button className={`btn me-3 ${tabsNumber === 1 ? `btn-primary` : `btn-secondary`}`} style={{width: '180px'}} onClick={()=> setTabsNumber(1)}>Fees Breakdown</button>
                            </div>
                            {
                                tabsNumber === 0 ? 
                                <>
                                    <div className='container-fluid' style={{ height: '500px', overflow: 'scroll' }} >
                                        <table className='table table-borderless'>
                                            <thead>
                                                <tr>
                                                    <th>Course Code</th>
                                                    <th>Room</th>
                                                    <th>Time From</th>
                                                    <th>Time Span</th>
                                                    <th>Days</th>
                                                    <th>Units</th>
                                                    <th>Unit Fee</th>
                                                    <th>Instructor</th>
                                                    <th>XGWA</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    studentSection && studentSection.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.CourseCode && item.CourseCode}</td>
                                                            <td>{item.RoomID && item.RoomID}</td>
                                                            <td>{militaryToStandardTime(item.TimeFrom && item.TimeFrom)}</td>
                                                            <td>{item.TimeSpan && item.TimeSpan}</td>
                                                            <td>{item.Days && item.Days}</td>
                                                            <td>{item.Units && item.Units}</td>
                                                            <td>{item.UnitFee && item.UnitFee}</td>
                                                            <td>{item.LastName !== null && item.LastName !== undefined && item.FirstName !== null && item.FirstName !== undefined ? `${item.LastName}, ${item.FirstName}`: '-'}</td>
                                                            <td>{item.ExcludedInTheGWA && item.ExcludedInTheGWA === 1 ? 'Yes' : 'No' }</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th>Total</th>
                                                    <th>{totalUnits}</th>
                                                    <th>{currency.formatter.format(studentEnlistment.totaltuition)}</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </>
                                :
                                tabsNumber === 1 ?
                                <>
                                    <div className='container-fluid' style={{ height: '500px', overflow: 'scroll' }} >
                                        <table className='table table-borderless'>
                                            <thead>
                                                <tr>
                                                    <th>Fee Type</th>
                                                    <th>Description</th>
                                                    <th>Amount</th>
                                                    <th>Course Code</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    registrationFee && registrationFee.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.Label}</td>
                                                            <td>{item.Description}</td>
                                                            <td>{item.Amount}</td>
                                                            <td>{item.CourseCode}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                null 
                            }
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link className='btn btn-secondary' to={'../'}>Close</Link>
                    </div>
                </ModalFooter>
            </Modal>
            <Outlet />
        </>
    )
}

export default DefaultShowEnlistment