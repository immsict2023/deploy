import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'react-bootstrap'
import view from '../../../../../../Controller/Student/view';
import create from '../../../../../../Controller/Student/create';

function AddPaymentConfirmation(props) {
    const { modalStatus, setModalStatus, data, ifSuccess } = props;
    const [bankList, setBankList] = useState([])

    const handleSaveData = () => {
        create.createPayments(data).then((res) => {
            console.log(res)
            if (res.data.success) {
                if (res.data.res.affectedRows > 0) {
                    alert(res.data.message)
                    setModalStatus(false)
                    ifSuccess(true)
                }
            } else {
                if (Number(res.data.err.errno) === 1062) {
                    alert('Please Check the the Payment and OR No!')
                }
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    const handleCancel = () => {
        setModalStatus(false)
    }

    const getBankListFunc = () => {
        view.getBankList().then((res) => {
          setBankList(res.data.rows)
        }).catch((err) => {
          console.log(err)
        })
    }

    useEffect(() => {
        getBankListFunc()
    }, [])

    return (
        <>
            <Modal
                centered
                show={modalStatus}
                size='lg'
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h6>Confirmation</h6>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-12 card shadow p-3 text-center'>
                                <h6>Are you sure you wan't to continue?</h6>
                            </div>
                            <div className='col-12 mt-5 card shadow p-3'>
                                <div className='row'>
                                    <div className='col-4'>
                                        <h6>Payment Mode:</h6>
                                        <input className='form-control' value={data.PaymentMode} disabled/>
                                    </div>
                                    <div className='col-4'>
                                        <h6>OR No:</h6>
                                        <input className='form-control' value={data.ORNo} disabled/>
                                    </div>
                                    <div className='col-4'>
                                        <h6>Amount:</h6>
                                        <input className='form-control' value={data.Amount} disabled/>
                                    </div>
                                    {
                                        data.PaymentMode === 'Cheque' ?
                                        <>
                                            <div className='col-4'>
                                                <h6>Cheque Date:</h6>
                                                <input type='date' className='form-control' defaultValue={data.ChequeDate} disabled />
                                            </div>
                                            <div className='col-4'>
                                                <h6>Cheque No:</h6>
                                                <input className='form-control' defaultValue={data.ChequeNo} disabled/>
                                            </div>
                                            <div className='col-12'>
                                                <h6>Amount:
                                                    <select value={data.BankNo ? data.BankNo : -1} className='form-control' name='bank' disabled>
                                                        <option></option>
                                                        {
                                                        bankList && bankList.map((item, index) => (
                                                            <option key={index} value={item.BankNo}>{item.BankName}</option>
                                                        ))
                                                    }
                                                    </select></h6>
                                            </div>
                                            <div className='col-12'>
                                                <h6>Remarks:</h6>
                                                <textarea className='form-control' defaultValue={data.Remarks} disabled />
                                            </div>
                                        </>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container-fluid text-end mt-3'>
                        <button style={{ width: '60px' }} onClick={handleCancel} className='btn btn-secondary me-2'>No</button>
                        <button style={{ width: '60px' }} onClick={handleSaveData} className='btn btn-primary'>Yes</button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AddPaymentConfirmation