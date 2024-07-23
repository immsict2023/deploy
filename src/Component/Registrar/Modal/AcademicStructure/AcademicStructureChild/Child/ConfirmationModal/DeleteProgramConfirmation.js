import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import crudDelete from '../../../../../../Controller/AcademicStructure/delete'

function DeleteProgramConfirmation(props) {

    const { modalStatus, setModalStatus , idno } = props
    
    const handleDeleteData = () => {
        alert(idno)
        crudDelete.deleteProgram({ idno })
        .then((res) => {
            if (Boolean(res.success)) {
                if (Number(res.response.affectedRows) > 0) {
                    alert('Sucessfully Deleted!');
                } else {
                    alert('Unsucessful Deleted!');
                }
            } else {
                if (Number(res.error.errno) === 1451) {
                    alert("This data can't Delete because it has a Connected Child Data!")
                } else {
                    alert('Server error! Please Contact the Software Developer!');
                    console.log(res)
                }
                
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
                    <label>Are you sure you wan't to continue Delete?</label>
                </ModalBody>
                <ModalFooter>
                    <button onClick={handleCancel} className='btn btn-secondary'>No</button>
                    <button onClick={handleDeleteData} className='btn btn-primary'>Yes</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default DeleteProgramConfirmation
