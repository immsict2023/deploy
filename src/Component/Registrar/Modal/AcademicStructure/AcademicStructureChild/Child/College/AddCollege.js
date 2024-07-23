import React, { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AddCollegeConfirmation from '../ConfirmationModal/AddCollegeConfirmation'

function AddCollege() {

    const [ modalStatus, setModalStatus ] = useState(false)
    const [ data, setData ] = useState({});

    const inputData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = () => {
        setModalStatus(true)
    }

    return (
        <>
            { modalStatus && <AddCollegeConfirmation modalStatus={modalStatus} setModalStatus={setModalStatus} data={data} />}
            <Modal
                show={true}
                size='lg'
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='text-center'>
                        <h5>ADD COLLEGE</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <form>
                            <div className='card shadow p-3 m-3'>   
                                <div className='row'>
                                    <div className='col-8'>
                                        <h6>Name</h6>
                                        <input type='text' className='form-control' name='collegeName' id='collegeName' onChange={inputData} />
                                    </div>
                                    <div className='col-4'>
                                        <h6>Code</h6>
                                        <input type='text' className='form-control' name='collegeCode' id='collegeCode' onChange={inputData} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to={`../`} className='btn btn-secondary me-1'>CLOSE</Link>
                        <button className='btn btn-primary' onClick={handleSave}>SAVE</button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}
 
export default AddCollege