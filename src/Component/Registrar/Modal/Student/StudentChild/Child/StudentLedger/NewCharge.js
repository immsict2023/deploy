import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import view from '../../../../../../Controller/Administrator/view'

function NewCharge(props) {

    const { modalStatus, setModalStatus, data } = props
    const [transactionItemList, setTransactionItemList] = useState([])

    const handleExit = (e) => {
        e.preventDefault()
        setModalStatus(false)
    }

    const getTransactionItemFunc = () => {
        view.getTransactionItem().then((res) => {
            console.log(res.data.rows)
            setTransactionItemList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getTransactionItemFunc()
    }, [])

    return (
        <>
            <Modal
                show={modalStatus}
                size='lg'
                centered
                backdrop='static'
                keyboard='false'
                scrollable='true'
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-start text-white'>
                        <h5>NEW CHARGE</h5>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid rows'>
                        <div className='col-12-md card p-3 m-3'>
                            <table className='table table-borderless'>
                                <tbody>
                                    <tr>
                                        <td><b>Student ID:</b></td>
                                        <td>{data.studentid}</td>
                                        <td><b>Name:</b></td>
                                        <td>{data.studentname}</td>
                                    </tr>
                                    <tr>
                                        <td><b>AY, Sem:</b></td>
                                        <td>{data.aysem}</td>
                                        <td><b>Post Date:</b></td>
                                        <td>{data.postdate}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Terms:</b></td>
                                        <td>{data.terms}</td>
                                        <td><b>Registration No:</b></td>
                                        <td>{data.registrationno}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='col-12-md card p-3 m-3'>
                            <form>
                                <div className='row mt-3'>
                                    <div className='col-7'>
                                        <label><h6>Item Code</h6></label>
                                        <select className='form-control'>
                                            <option value={null}></option>
                                            {
                                                transactionItemList && transactionItemList.map((item, index) => (
                                                    <option key={index} value={item.ItemCode}>{item.Description}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-5'>
                                        <label><h6>Amount</h6></label>
                                        <input type='number' className='form-control' />
                                    </div>
                                    <div className='col-12 mt-3'>
                                        <label><h6>Description</h6></label>
                                        <textarea className='form-control'></textarea>
                                    </div>
                                    <div className='col-12-md text-center mt-3'>
                                        <button style={{width: '100px'}} className='btn btn-secondary me-3' onClick={handleExit}>Cancel</button>
                                        <button style={{width: '100px'}} className='btn btn-primary'>SAVE</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white text-end' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <button className='btn btn-secondary' onClick={()=> setModalStatus(false)}>Close</button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default NewCharge