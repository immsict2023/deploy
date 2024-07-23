import React, { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreateClassroomModalConfirmation from './ClassroomChild/ConfirmationModal/CreateClassroomModalConfirmation'

function NewEditClassroom(props) {

    const [classroomData, setClassroomData] = useState([])
    const [modalStatusCreateClassroom, setModalStatusCreateClassroom] = useState(false)

    const handleCreateClassroom = (e) => {
        e.preventDefault()
        setModalStatusCreateClassroom(true)
    }

    const inputData = (e) => {
        setClassroomData({
            ...classroomData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            {modalStatusCreateClassroom && <CreateClassroomModalConfirmation modalStatus={modalStatusCreateClassroom} setModalStatus={setModalStatusCreateClassroom} data={classroomData} />}
            <Modal
                show={true}
                size='lg'
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>CLASSROOM</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <div className='p-5 m-3 card shadow'>
                            <form onSubmit={handleCreateClassroom} noValidate={false}>
                                <div className='row'>
                                    <div className='col-4'>
                                        <h6>Room ID</h6>
                                        <input onChange={inputData} className='form-control' name='RoomID' required/>
                                    </div>
                                    <div className='col-8'>
                                        <h6>Building</h6>
                                        <input onChange={inputData} className='form-control' name='Building' required/>
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <h6>Description</h6>
                                        <textarea onChange={inputData} className='form-control' name='Description' required/>
                                    </div>
                                    <div className='col-12 text-center mt-3'>
                                        <input type='submit' className='btn btn-primary' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to='../' className='btn btn-secondary'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default NewEditClassroom
