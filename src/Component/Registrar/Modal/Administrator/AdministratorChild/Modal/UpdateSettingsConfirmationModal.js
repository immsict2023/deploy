import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import updateAdministrator from '../../../../../Controller/Administrator/update';
import { useNavigate } from 'react-router-dom';

function UpdateSettingsConfirmationModal(props) {
    const { modalStatus, setModalStatus, data } = props;

    const handleUpdateSettings = () => {
        updateAdministrator.updateSettings(data).then((res) => {
            if (res.success) {
                if (res.res.affectedRows > 0) {
                    alert('Successfully updated! Please log out for the update to take effect.');
                } else {
                    alert('Unsucessful Update!')
                }
            } else {
                alert('Try again later!')
            }
        }).catch((err) => {
            console.error(err)
        })
    }
    console.log(data)
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
                        <label>Are you sure you wan't to update settings?</label>
                    </div>
                    <div className='container-fluid text-end'>
                        <button className='btn btn-secondary me-2' onClick={() => setModalStatus(false)}>No</button>
                        <button className='btn btn-primary' onClick={handleUpdateSettings}>Yes</button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default UpdateSettingsConfirmationModal