import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NewCharge() {


    return (
        <>
            <Modal
                show={true}
                size='lg'
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#292A2D'}}>
                    <div className='container-fluid'>
                        <h5>NEW CHARGE</h5>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <form noValidate={false}>
                        <div className='container-fluid row'>
                            <div className='col-4'>
                                <h6>Item Code</h6>
                                <select className='form-control' name='item_code' id='item_code' required={true}>
                                    <option></option>
                                    <option value='Tuition and Fees'>Tuition and Fees</option>
                                    <option value='Laboratory Fee'>Laboratory Fee</option>
                                    <option value='Miscellaneous Fee'>Miscellaneous Fee</option>
                                    <option value='Other Fee'>Other Fee</option>
                                    <option value='Trainings and Assessment Fee'>Trainings and Assessment Fee</option>
                                    <option value='Matriculation Change'>Matriculation Change</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                            <div className='col-4'>
                                <h6>Description</h6>
                                <input className='form-control' name='description' id='description' required={true} />
                            </div>
                            <div className='col-4'>
                                <h6>Amount</h6>
                                <input className='form-control' name='description' id='description' required={true} />
                            </div>
                            <div className='col-4 mt-3'>
                                <h6>Terms</h6>
                                <input className='form-control' value='Due Immediately' name='terms' id='terms' disabledrequired={true} />
                            </div>
                            <div className='col-4 mt-3'>
                                <h6>Post Date</h6>
                                <input className='form-control' type='date' name='post_date' id='post_date' disabledrequired={true} />
                            </div>
                            <div className='col-4 mt-3'>
                                <h6>AY, Semester</h6>
                                <h6 className='form-control'>{'2023-2024, 1ST'}</h6>
                            </div>  
                            <div className='col-4 mt-3'>
                                <h6>Balance</h6>
                                <h6 className='form-control'>{'20.00'}</h6>
                            </div>
                            <div className='col-4 mt-3'>
                                <h6>Paid</h6>
                                <h6 className='form-control'>{'No'}</h6>
                            </div>  
                        </div>
                        <input type='submit' id='new_charge_submit' hidden />
                    </form>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#292A2D'}}>
                    <Link to='../' className='btn btn-secondary'>CLOSE</Link>
                    <label htmlFor='new_charge_submit' className='btn btn-primary'>SAVE</label>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default NewCharge
