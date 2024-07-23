import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import create from '../../../../../../Controller/AcademicStructure/create'
import { useNavigate } from 'react-router-dom'
import sanitizer from '../../../../../../../Tools/sanitizer'

function AddProgramConfirmation(props) {

    const { modalStatus, setModalStatus , data } = props
    const navigate = useNavigate()
    const dataUpdated = {
        program_department: sanitizer.sanitizeInput(data.program_department, 'number'),
        program_degree: sanitizer.sanitizeInput(data.program_degree, 'number'),
        program_code: sanitizer.sanitizeInput(data.program_code, 'string'),
        program_title: sanitizer.sanitizeInput(data.program_title, 'string'),
        program_description: sanitizer.sanitizeInput(data.program_description, 'string')
    }
    
    const handleSaveData = () => {
        create.createProgram(dataUpdated)
        .then((res) => {
            console.log(res)
            if (Boolean(res.success)) {
                if (Boolean(res.data.affectedRows)) {
                    alert('Sucessfully Inserted');
                    navigate('../../program')
                } else {
                    alert('Unsucessful Insert');
                }
            } else {
                alert(res.error)
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

export default AddProgramConfirmation
