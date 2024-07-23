import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import deleteSchedule from '../../../../../Controller/Blockschedule/delete'

function deleteSubjectSchedule(props) {

    const { modalStatus, setModalStatus, data } = props

    const deleteSubjectScheduleFunc = () => {
        deleteSchedule.deleteSubjectSchedule(data).then((res) => {
            if (res.data.success) {
                if (res.data.res.affectedRows > 0) {
                    alert("Successfully Deleted!")
                } else {
                    alert("Unsuccessful Delete!")
                }
            } else {
                alert("Server Error: Please Contact Software Developer!")
            }
            setModalStatus(false)
        }).catch((err) => {
            console.error(err.data.message);
        })
    }

    return (
        <>
            <Modal
                show={modalStatus}
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h6>Confirmation</h6>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid'>
                        <label>Are you sure you wan't to remove this Subject?</label>
                    </div>
                    <div className='container-fluid text-end'>
                        <button className='btn btn-secondary me-2' onClick={() => setModalStatus(false)}>No</button>
                        <button className='btn btn-primary' onClick={deleteSubjectScheduleFunc}>Yes</button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default deleteSubjectSchedule