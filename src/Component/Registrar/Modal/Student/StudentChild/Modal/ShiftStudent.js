import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ShiftStudent() {

    return (
        <>
            <Modal
                show={true}
                size='lg'
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div>
                        <h5 className='text-white'>SHIFT COURSE</h5>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid row'>
                        <div className='col-12'>
                            <h5 className='text-center mb-4'><b>STUDENT INFORMATION</b></h5>
                        </div>
                        <div className='col-6'>
                            <h6>Student ID</h6>
                            <input className='form-control' type='text' value={'DELA CRUZ, JUAN (2019-321145)'} disabled={true} />
                        </div>
                        <div className='col-6'>
                            <h6>Current Program</h6>
                            <input className='form-control' type='text' value={'BSMarE (Bachelor of Science in Marine Engineering)'} disabled={true} />
                        </div>
                        <hr className='mt-4' />
                        <div className='col-12 mb-3'>
                            <h5 className='text-center'>Shift Information</h5>
                        </div>
                        <div className='col-6'>
                            <h6>Program to Shift In</h6>
                            <select className='form-control' name='program_shift' id='program_shift'>
                                
                            </select>
                        </div>
                        <div className='col-6'>
                            <h6>Beginning Semester</h6>
                            <select className='form-control' name='beginning_semester' id='beginning_semester'>
                                
                            </select>
                        </div>
                        <div className='col-6 mt-2'>
                            <h6>Year Level</h6>
                            <select className='form-control' name='beginning_semester' id='beginning_semester'>
                                <option></option>
                                <option value='Year 1'>Year 1</option>
                                <option value='Year 2'>Year 2</option>
                                <option value='Year 3'>Year 3</option>
                                <option value='Year 4'>Year 4</option>
                            </select>
                        </div>
                        <div className='col-6 mt-2'>
                            <h6>Status Of Admission</h6>
                            <select className='form-control' defaultValue={'SHIFT (Shiftee)'} name='beginning_semester' id='beginning_semester'>
                                <option></option>
                                <option value='CONT (Continuing)'>CONT (Continuing)</option>
                                <option value='RET (Returnee)'>RET (Returnee)</option>
                                <option value='SHIFT (Shiftee)'>SHIFT (Shiftee)</option>
                                <option value='TFE (Transferee)'>TFE (Transferee)</option>
                                <option value='XREG (Cross Enrollee)'>XREG (Cross Enrollee)</option>
                            </select>
                        </div>
                        <div className='col-12 mt-2'>
                            <h6>Reason For Shifting</h6>
                            <textarea className='form-control' name='reason_for_shifting' id='reason_for_shifting' />
                        </div>
                        <div className='col-12 mt-2'>
                            <h6>Remarks</h6>
                            <textarea className='form-control' name='remarks' id='remarks' />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <Link className='btn btn-primary'>SAVE</Link>
                    <Link to='../' className='btn btn-secondary'>CLOSE</Link>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ShiftStudent
