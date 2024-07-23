import React  from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function DeletePersonnelConfirmation(props) {

    const { modalStatus, setModalStatus, data } = props
    const navigate = useNavigate();

    const handleDeletePersonnel = () => {
        
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
                <label>Are you sure you wan't to continue Delete {data.personnelname}?</label>
            </ModalBody>
            <ModalFooter>
                <button style={{ width: '90px' }} onClick={() => setModalStatus(false)} className='btn btn-secondary'>No</button>
                <button style={{ width: '90px' }} onClick={handleDeletePersonnel} className='btn btn-primary'>Yes</button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default DeletePersonnelConfirmation