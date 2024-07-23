import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import view from '../../../Controller/Student/view'
import viewEnlist from '../../../Controller/Enlistment/view'
import { todayDateInput } from '../../../../Tools/date'
import ShowCharges from './StudentChild/Child/Payment/ShowCharges'
import currency from '../../../../Tools/currency'
import AddPaymentConfirmation from './StudentChild/Modal/ConfirmationModal/AddPaymentConfirmation'
import Loadings from '../../../Loadings/Loadings'
import ShowPayments from './StudentChild/Child/Payment/ShowPayments'

function AddPayment() {
  
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [bankList, setBankList] = useState([])
  const [cheque, setCheque] = useState(false)
  const [enrolledList, setEnrolledList] = useState([])
  const [studentRegistered, setStudentRegistered] = useState([]) 

  const [isSuccess, setIsSuccess] = useState(false)
  
  const [confirmationModalStatus, setConfirmationModalStatus] = useState(false);

  const [modalStatusCharges, setModalStatusCharges] = useState(false);
  const [modalStatusPayments, setModalStatusPayments] = useState(false);

  const today = todayDateInput()

  const navigate = useNavigate();
  
  const [accountChargesList, setAccountChargesList] = useState([])
  const [paymentData, setPaymentData] = useState({PaymentMode: 'Cash', PaymentDate: today, TotalPayable: null, AY: null, MCNo: null, ProgramNo: null, RegistrationNo: null, Sem: null, StudentID: null, StudentName: null, Year: null});

  const handleSubmitPayment = (e) => {
    e.preventDefault()
    if (Number(paymentData.TotalPayable) >= Number(paymentData.Amount) && Number(paymentData.Amount) > 0) {
      setConfirmationModalStatus(true)
    } else {
      alert('Invalid Payment: Payment must less than or Equal To Total Payable! Or else Please Reload the page!')
    }
  }

  const getStudentEnlistmentList = () => {
    view.getStudentEnlistmentList().then((res) => {
      //console.log(res)
    }).catch((err) => {
      console.error(err)
    })
  }

  const getBankListFunc = () => {
    view.getBankList().then((res) => {
      setBankList(res.data.rows)
    }).catch((err) => {
      console.log(err)
    })
  }

  const getTotalPayable = (StudentID) => {
    return view.getTotalPayable(StudentID).then((res) => {
      return res.TotalPayable
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleShowCharges = (e) => {
    e.preventDefault()
    if (paymentData.StudentID !== null && paymentData.StudentID !== undefined) {
      setModalStatusCharges(true)
    } else {
      alert('Please Select Student to Show their Charges!')
    }
  }

  const handleShowPayments = (e) => {
    e.preventDefault()
    if (paymentData.StudentID !== null && paymentData.StudentID !== undefined) {
      setModalStatusPayments(true)
    } else {
      alert('Please Select Student to Show their Payments!')
    }
  }


  const handleGetPaymentRecord = async (e) => {
    setLoadingStatus(true)
    const selected = e.target.value
    let found = false;
    for (let i = 0; i < enrolledList.length; i++) {
      if (String(enrolledList[i].StudentID) === String(selected)) {
        found = true;
        const payable = await getTotalPayable(enrolledList[i].StudentID)
        getAccountChargeListFunc(enrolledList[i].StudentID)
        setPaymentData({
          ...paymentData,
          AY: enrolledList[i].AY,
          Sem: enrolledList[i].Sem,
          StudentID: enrolledList[i].StudentID,
          StudentName: enrolledList[i].StudentName,
          Programno: enrolledList[i].Programno,
          RegistrationNo: enrolledList[i].RegistrationNo,
          TotalPayable: payable,
          Amount: payable
        });
        break
      }
    }
    if (!found) {
      setPaymentData({
        ...paymentData,
        AY: null,
        Sem: null,
        StudentID: null,
        StudentName: null,
        Programno: null,
        RegistrationNo: null,
        Amount: null
      });
      getAccountChargeListFunc('')
      alert("Please Select Item!")
    }
    setLoadingStatus(false)
  }

  const inputData = (e) => {
    if (e.target.name === 'PaymentMode') {
      if (e.target.value === "Cheque") {
        setCheque(true)
      } else {
        setCheque(false)
      }
    }
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    })
  };

  const getEnrolledListFunc = () => {
    view.getEnrolledList().then((res) => {
      if (res.data.success) {
        setEnrolledList(res.data.rows)
      } else {
        console.error(res.data.err)
      }
    }).catch((err) =>{
      console.error(err)
    })
  }

  const getAccountChargeListFunc = (studentid) => {
    const dataID = {studentid}
    view.getAccountCharge(dataID).then((res) => {
        setAccountChargesList(res.data.rows)
        console.log(res.data.rows)
    }).catch((err) => {
        console.error(err)
    })
  }

  const handlePaymentModal = (e) => {
    setIsSuccess(e)
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('../')
    }
  }) 

  useEffect(() => {
    getBankListFunc()
    getEnrolledListFunc()
    getStudentEnlistmentList()
  }, [])

  return (
    <>
      { loadingStatus && <Loadings loadingStatus={loadingStatus} /> }
      { confirmationModalStatus && <AddPaymentConfirmation modalStatus={confirmationModalStatus} setModalStatus={setConfirmationModalStatus} data={paymentData} ifSuccess={handlePaymentModal} /> }
      { modalStatusPayments && <ShowPayments modalStatus={modalStatusPayments} setModalStatus={setModalStatusPayments} data={paymentData} /> }
      { modalStatusCharges && <ShowCharges modalStatus={modalStatusCharges} setModalStatus={setModalStatusCharges} data={paymentData} /> }
      <Modal
        show={true}
        fullscreen
        scrollable
        centered
      >
        <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
          <div>
            <h5>ADD PAYMENT</h5>
          </div>
        </ModalHeader>
        <ModalBody style={{backgroundColor: '#B2BEB5'}}>
          <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
            <div style={{width: '1200px'}}>
              <div className='card shadow m-3 p-5'>
                <form>
                  <div className='row'>
                    <div className='col-12 text-end mb-2'>
                      <button style={{ width: '140px' }} onClick={handleShowPayments} className='btn btn-primary me-3'>Show Payments</button>
                      <button style={{ width: '140px' }} onClick={handleShowCharges} className='btn btn-primary'>Show Charges</button>
                    </div>
                    <div className='col-3 mt-2'>
                      <h6>Student ID</h6>
                      <input defaultValue={paymentData.StudentID} type='text' className='form-control' disabled />
                    </div>
                    <div className='col-5 mt-2'>
                      <h6>Student Name</h6>
                      <select onChange={handleGetPaymentRecord} className='form-control' name='StudentName'>
                        <option value={''}>Please Select Student...</option>
                        {
                          enrolledList && enrolledList.map((item, index) => (
                            <option key={index} value={item.StudentID}>{item.StudentName} ({item.StudentID})</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='col-2 mt-2'>
                      <h6>Registered No.</h6>
                      <input defaultValue={paymentData.RegistrationNo} className='form-control' type="text" disabled />
                    </div>
                    <div className='col-2 mt-2'>
                      <h6>Total Payable</h6>
                      <input defaultValue={paymentData.TotalPayable && currency.formatter.format(paymentData.TotalPayable)} className='form-control' type="text" disabled />
                    </div>
                    <div className='col-12 mt-4 mb-3'>
                        <hr />
                    </div>
                    <div className='col-3 mt-2'>
                      <h6>Payment Mode</h6>
                      <select value={paymentData.PaymentMode && paymentData.PaymentMode} onChange={inputData} name='PaymentMode' className='form-control'>
                        <option value={''}>Please Select Item...</option>
                        <option value={'Cash'}>Cash</option>
                        <option value={'Cheque'}>Cheque</option>
                      </select>
                    </div>
                    <div className='col-3 mt-2'>
                      <h6>OR No.</h6>
                      <input onChange={inputData} name='ORNo' className='form-control' type='text' />
                    </div>
                    <div className='col-3 mt-2'>
                      <h6>Amount</h6>
                      <input type='number' onChange={inputData} defaultValue={paymentData.TotalPayable && paymentData.TotalPayable} name='Amount' className='form-control' />
                    </div>
                    <div className='col-3 mt-2'>
                      <h6>Date Payment</h6>
                      <input onChange={inputData} name='PaymentDate' defaultValue={paymentData.PaymentDate} className='form-control' type='datetime-local' />
                    </div>
                    <div className='col-3 mt-2'>
                      <h6>Cheque Date</h6>
                      <input onChange={inputData} name='ChequeDate' className='form-control' type='date' disabled={!cheque} />
                    </div>
                    <div className='col-3 mt-2'>
                      <h6>Cheque No</h6>
                      <input onChange={inputData} name='ChequeNo' className='form-control' type='text' disabled={!cheque} />
                    </div>
                    <div className='col-6 mt-2'>
                      <h6>Bank</h6>
                      <select onChange={inputData} className='form-control' name='BankNo' disabled={!cheque}>
                        <option></option>
                        {
                          bankList && bankList.map((item, index) => (
                            <option key={index} value={item.BankNo}>{item.BankName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='col-12 mt-2'>
                      <h6>Remarks</h6>
                      <textarea onChange={inputData} name='Remarks' id='remarks' className='form-control' />
                    </div>
                  </div>
                  <div className='m-3 d-flex justify-content-center'>
                    <button onClick={handleSubmitPayment} style={{ width: "100px" }} type='submit' className='btn btn-primary me-2' >PROCEED</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
          <Link to='../' className='btn btn-secondary' >Close</Link>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AddPayment
