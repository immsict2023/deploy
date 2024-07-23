import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import create from '../../../../../../Controller/AcademicStructure/create'
import { useNavigate } from 'react-router-dom'

function AddCourseConfirmation(props) {

    const { modalStatus, setModalStatus , data, handleResponse } = props
    
    const handleSaveData = () => {
        create.createCourse(data)
        .then((res) => {
            if (Boolean(res.success)) {
                if (Number(res.data.affectedRows) > 0) {
                    alert('Successfully Created!')
                    setModalStatus(false)
                    handleResponse(true)
                }
            } else {
                alert(res.error)
                handleResponse(false)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleCancel = () => {
        setModalStatus(false)
    }

    return (
        <>
            <Modal
                show={modalStatus}
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h6>NEW COURSE</h6>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid'>
                        <div className='row m-1'>
                            <div className='col-12'>
                                <h6>Are you sure you wan't to continue?</h6>
                            </div>
                            <div className='col-12 text-end mt-2'>
                                <button style={{ width: "60px" }} onClick={() => setModalStatus(false)} className='btn btn-secondary me-2'>No</button>
                                <button onClick={handleSaveData} style={{ width: "60px" }} className='btn btn-primary'>Save</button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AddCourseConfirmation
