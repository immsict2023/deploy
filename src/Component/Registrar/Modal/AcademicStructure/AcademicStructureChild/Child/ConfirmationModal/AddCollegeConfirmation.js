import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import create from '../../../../../../Controller/AcademicStructure/create'
import { useNavigate } from 'react-router-dom'
import sanitizer from '../../../../../../../Tools/sanitizer'

function AddCollegeConfirmation(props) {

    const { modalStatus, setModalStatus , data } = props
    const navigate = useNavigate()
    const handleSaveData = () => {
        create.createCollege({ collegeName: sanitizer.sanitizeInput(data.collegeName, 'string'), collegeCode: sanitizer.sanitizeInput(data.collegeCode, 'string')})
        .then((res) => {
            console.log(res)
            if (res.success) {
                if (Number(res.data.affectedRows) > 0) {
                    alert('Successfully Inserted');
                    navigate('../../college')
                } else {
                    alert('Unsuccessful Insert!');
                }
            } else {
                alert("Server Error! Please Contact the Software Developer!");
            }
            setModalStatus(false);
        })
        .catch((err) => {
            console.log('Error is: ' + err)
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

export default AddCollegeConfirmation
