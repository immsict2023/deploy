import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import create from '../../../../../../Controller/Student/create'
import { useNavigate } from 'react-router-dom'
import Loadings from '../../../../../../Loadings/Loadings'

function AddModalStudentConfirmation(props) {

    
    const [loadingStatus, setLoadingStatus] = useState(false)

    const {modalStatus, setModalStatus , data } = props

    const navigate = useNavigate()
    
    const handleSaveData = () => {
        try {
            setLoadingStatus(true)
            create.createStudentInformation(data)
            .then((res) => {
                alert(res.message)
                console.log(res)
                if (Boolean(res.success) === true) {
                    setModalStatus(false)
                    navigate('../')
                }
            }).catch((err) => {
                alert(err);
            });
        } catch(err) {
            console.log(err)
        }
    }

    const handleCancel = () => {
        setModalStatus(false)
    }
    
    return (
        <>
            { loadingStatus && <Loadings loadingStatus={loadingStatus} /> }
            <Modal
                centered
                show={modalStatus}
                onHide={setModalStatus}
            >
                <ModalHeader>
                    <h6>Confirmation</h6>
                </ModalHeader>
                <ModalBody>
                    <label>Are you sure you wan't to continue save new student?</label>
                </ModalBody>
                <ModalFooter>
                    <button onClick={handleCancel} className='btn btn-secondary'>No</button>
                    <button onClick={handleSaveData} className='btn btn-primary'>Yes</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddModalStudentConfirmation
