import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import create from '../../../../../../Controller/AcademicStructure/create'
import { useNavigate } from 'react-router-dom'
import update from '../../../../../../Controller/AcademicStructure/update'

function UpdateProgramConfirmation(props) {

    const { modalStatus, setModalStatus , data } = props
    const navigate = useNavigate()
    
    const handleSaveData = () => {
        update.updateProgram(data)
        .then((res) => {
            if (res.success) {
                if (Number(res.response.affectedRows) > 0 ) {
                    if ( Number(res.response.changedRows) > 0) {
                        alert('Successfully Updated!');
                        navigate('../');
                    } else {
                        alert('No Changes!');
                    }
                } else {
                    alert('Unsuccessfully Update!');
                }
            } else {
                alert('Server Error, Please Contant the Software Developer!');
            }
        })
        .catch((err) => {
            console.error(err)
        })
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
                    <button onClick={handleCancel} className='btn btn-secondary'>No</button>
                    <button onClick={handleSaveData} className='btn btn-primary'>Yes</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default UpdateProgramConfirmation
