import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import create from '../../../../../../Controller/Student/create'

function AddStudentConfirmation(props) {

    const { modal_status, setModal_Status , data } = props

    const handleSaveData = () => {
        create.createStudent(data)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log('Error is: ' + err)
        });
    }

    const handleCancel = () => {
        setModal_Status(false)
    }

    return (
        <>
            <Modal
                centered
                show={modal_status}
                onHide={setModal_Status}
            >
                <ModalHeader>
                    <h6>Confirmation</h6>
                </ModalHeader>
                <ModalBody>
                    <label>Are you sure you wan't to continue save?</label>
                </ModalBody>
                <ModalFooter>
                    <button onClick={handleCancel} className='btn btn-secondary'>NO</button>
                    <button onClick={handleSaveData} className='btn btn-primary'>YES</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddStudentConfirmation
