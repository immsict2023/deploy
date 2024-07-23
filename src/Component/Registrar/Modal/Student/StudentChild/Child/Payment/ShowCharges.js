import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import view from '../../../../../../Controller/Student/view';
import currency from '../../../../../../../Tools/currency'

function ShowCharges(props) {

    const { modalStatus, setModalStatus, data } = props ;

    const [accountChargesList, setAccountChargesList] = useState([])

    const getAccountChargeFunc = () => {
        const dataID = {studentid: data.StudentID}
        view.getAccountCharge(dataID).then((res) => {
            setAccountChargesList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }
    
    useEffect(() => {
        getAccountChargeFunc()
    }, [])

    return (
        <Modal
            show={modalStatus}
            centered
            scrollable
            fullscreen
        >
            <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                <h6>SHOW CHARGES</h6>
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
                            accountChargesList && accountChargesList.map((item, index) => (
                                <div key={index} className='card shadow p-3 mt-2'>
                                    <div className='row'>
                                        <div className='col-2 mt-2'>
                                            <h6>AY:</h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6 className='text-danger'>{item.AY}</h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6>Semester: </h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6 className='text-danger'>{item.Sem}</h6>
                                        </div> 
                                        <div className='col-2 mt-2'>
                                            <h6>Description:</h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6 className='text-danger'>{item.Description}</h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6>Terms: </h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6 className='text-danger'>{item.Terms}</h6>
                                        </div> 
                                        <div className='col-2 mt-2'>
                                            <h6>Amount: </h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6 className='text-danger'>{currency.formatter.format(item.Amount)}</h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6>Balance: </h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6 className='text-danger'>{currency.formatter.format(item.Balance)}</h6>
                                        </div> 
                                        <div className='col-2 mt-2'>
                                            <h6>Amount Paid: </h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6 className='text-danger'>{currency.formatter.format(item.AmountPaid)}</h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6>Is Paid: </h6>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            {item.IsPaid === 1 ? "Yes": "No"}
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

export default ShowCharges