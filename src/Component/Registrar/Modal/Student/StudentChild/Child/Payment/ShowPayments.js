import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import view from '../../../../../../Controller/Student/view';
import currency from '../../../../../../../Tools/currency'
import { militaryDateTimeToStandard } from '../../../../../../../Tools/date';

function ShowPayments(props) {

    const { modalStatus, setModalStatus, data } = props ;

    const [accountPaymentList, setAccountPaymentList] = useState([])

    const getAccountPaymentFunc = () => {
        console.log(data)
        const dataID = {StudentID: data.StudentID}
        view.getAccountPayment(dataID).then((res) => {
            console.log(res.data.rows)
            setAccountPaymentList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }
    
    useEffect(() => {
        getAccountPaymentFunc()
    }, [])

    return (
        <Modal
            show={modalStatus}
            centered
            scrollable
            fullscreen
        >
            <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                <h6>SHOW PAYMENTS</h6>
            </ModalHeader>
            <ModalBody>
                <div className='container-fluid'>
                    <div className='d-flex justify-content-center p-3'>
                        <div className='card shadow p-5' style={{ width: '1500px' }}>
                            <div className='card shadow p-2 text-white' style={{backgroundColor: '#031B5B'}}>
                                <div className='row d-flex justify-content-center'>
                                    <div className='col-1'>
                                        <h6>Student ID:</h6>
                                    </div>
                                    <div className='col-3'>
                                        <h6>{data.StudentID && data.StudentID}</h6>
                                    </div>
                                    <div className='col-1'>
                                        <h6>Name:</h6>
                                    </div>
                                    <div className='col-3'>
                                        <h6>{data.StudentName && data.StudentName}</h6>
                                    </div>
                                </div>
                            </div>
                            {
                                accountPaymentList && accountPaymentList.map((item, index) => (
                                    <div key={index} className='card shadow p-3 mt-2'>
                                        <div className='row'>
                                            <div className='col-2'>
                                                <h6>Student ID: </h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6 className='text-danger'>{item.StudentID}</h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6>Student Name: </h6>
                                            </div>
                                            <div className='col-6'>
                                                <h6 className='text-danger'>{item.StudentName}</h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6>OR No: </h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6 className='text-danger'>{item.ORNo}</h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6>Description: </h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6 className='text-danger'>{item.Description}</h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6>Method: </h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6 className='text-danger'>{item.Method}</h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6>Amount Paid: </h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6 className='text-danger'>{currency.formatter.format(item.AmountPaid)}</h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6>Date Payment: </h6>
                                            </div>
                                            <div className='col-2'>
                                                <h6 className='text-danger'>{militaryDateTimeToStandard(item.PaymentDate)}</h6>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                <button onClick={() => setModalStatus(false)} className='btn btn-secondary'>Close</button>
            </ModalFooter>
        </Modal>
    )
}

export default ShowPayments