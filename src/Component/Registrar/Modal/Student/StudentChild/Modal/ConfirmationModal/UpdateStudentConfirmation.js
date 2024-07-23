import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import update from '../../../../../../Controller/Student/update'
import { useNavigate } from 'react-router-dom'

function UpdateStudentConfirmation(props) {

    const { modalStatus, setModalStatus , data } = props

    const navigate = useNavigate()

    const handleSaveData = () => {
        update.updateStudentInformation(data)
        .then((res) => {
            console.log(res)
            if (Number(res.data.affectedRows) > 0) {
                alert(res.message)
            }
        }).catch((err) => {
            alert(err);
        });
        
    }

    const handleCancel = () => {
        setModalStatus(false)
    }

    return (
        <>
            <Modal
                centered
                show={modalStatus}
                onHide={setModalStatus}
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

export default UpdateStudentConfirmation
