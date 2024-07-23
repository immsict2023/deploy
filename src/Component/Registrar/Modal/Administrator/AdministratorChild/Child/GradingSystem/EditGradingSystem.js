import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function EditGradingSystem() {
    return (
        <>
            <Modal
                show={true}
                size='lg'
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>EDIT GRADING SYSTEM</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <div className='card shadow p-3 m-2'>
                            <form>
                                <div className='row'>
                                    <div className='col-4'>
                                        <h6>Grade Code</h6>
                                        <input className='form-control' type='text' name='grade_code' id='grade_code' disabled/>
                                    </div>
                                    <div className='col-4'>
                                        <h6>Grade Point</h6>
                                        <input className='form-control' type='number' name='grade_point' id='grade_point' />
                                    </div>
                                    <div className='col-4'>
                                        <h6>Equivalence Min</h6>
                                        <input className='form-control' type='number' name='equivalence_min' id='equivalence_min' />
                                    </div>
                                    <div className='col-4'>
                                        <h6>Equivalence Max</h6>
                                        <input className='form-control' type='number' name='equivalence_max' id='equivalence_max' />
                                    </div>
                                    <div className='col-8'>
                                        <h6>Qualitative Desc</h6>
                                        <input className='form-control' type='text' name='qualitative_desc' id='qualitative_desc' />
                                    </div>
                                    <div className='col-12'>
                                        <h6>Notes</h6>
                                        <textarea className='form-control'  name='notes' id='notes'></textarea>
                                    </div>
                                    <div className='col-12 text-center m-3'>
                                        <button className='btn btn-primary' style={{width: '120px'}}>UPDATE</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to={`../`} className='btn btn-secondary'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default EditGradingSystem
