import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function AddChargetoGroup() {
    return (
        <>
            <Modal
                show={true}
                fullscreen
                centered
            >
                <ModalHeader style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-white'>
                        <h5>ADD CHARGE TO GROUP</h5>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid'>
                        <div className='text-center m-4'>
                            <h5>NEW CHARGE</h5>
                        </div>
                        <form>
                            <div className='row'>
                                <div className='col-4'>
                                    <h6>AY</h6>
                                    <select name='a_y' className='form-control'>
                                        <option></option>
                                    </select>
                                </div>
                                <div className='col-4'>
                                    <h6>Semester</h6>
                                    <select name='semester' className='form-control'>
                                        <option></option>
                                        <option value='First Semester'>First Semester</option>
                                        <option value='Second Semester'>Second Semester</option>
                                        <option value='Third Semester'>Third Semester</option>
                                        <option value='Summer'>Summer</option>
                                    </select>
                                </div>
                                <div className='col-4'>
                                    <h6>Course Code</h6>
                                    <select name='course_code' className='form-control'>
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button type='submit' className='btn btn-primary mt-2' style={{width: '120px'}}>SAVE</button>
                            </div>
                        </form>
                        <hr className='mt-3' />
                        <div className='text-center m-4'>
                            <h5>CHARGE DETAIL</h5>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Item Code</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Terms</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <button className='btn btn-danger w-25 m-1'>DELETE</button>
                                        <button className='btn btn-secondary w-25 m-1'>EDIT</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div>
                        <Link to='../' className='btn btn-secondary'>CANCEL</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddChargetoGroup
