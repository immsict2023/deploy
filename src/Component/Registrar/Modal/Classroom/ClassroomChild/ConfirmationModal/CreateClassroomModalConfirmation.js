import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import create from '../../../../../Controller/Classroom/create'
import { useNavigate } from 'react-router-dom'

function CreateClassroomModalConfirmation(props) {

    const { modalStatus, setModalStatus, data } = props
    const navigate = useNavigate()

    const handleSubmit = () => {
        create.createClassrrom(data).then((res) => {
            console.log(res)
            console.log(res.data.success)
            if (res.data.success) {
                alert("Successfully Created!")
                navigate('../')
            } else {
                alert(res.data.err.sqlMessage)
                setModalStatus(false)
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <Modal
            show={modalStatus}
            centered
        >
            <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                <h6>Confirmation</h6>
            </ModalHeader>
            <ModalBody>
                <div className='container-fluid p-3'>
                    <div className='col-12'>
                        <label>Are you sure you wan't to continue?</label>
                    </div>
                    <div className='col-12 mt-4 text-end'>
                        <button style={{ width: "50px" }} onClick={() => {setModalStatus(false)}} className='btn btn-secondary me-3'>No</button>
                        <button style={{ width: "50px" }} onClick={handleSubmit} className='btn btn-primary'>Yes</button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default CreateClassroomModalConfirmation
