import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import create from '../../../../../../Controller/AcademicStructure/create';

function AddCourseDetailConfirmation(props) {

    const { modalStatus, setModalStatus, data, response } = props;

    const handleSubmit = () => {
        create.createCourseDetails(data).then((res) => {
            if (res.success) {
                if (res.res.affectedRows > 0) {
                    response(true)
                    alert("Successfully Created!")
                } else {
                    alert("Unsuccessful Created")
                }
            } else {
                alert("Server Error: Please Contact the Software Developer!")
            }
            setModalStatus(false)
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <>
            <Modal
                show={modalStatus}
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h6>NEW COURSE DETAIL</h6>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid'>
                        <div className='row m-1'>
                            <div className='col-12'>
                                <h6>Are you sure you wan't to continue?</h6>
                            </div>
                            <div className='col-12 text-end mt-2'>
                                <button style={{ width: "60px" }} onClick={() => setModalStatus(false)} className='btn btn-secondary me-2'>No</button>
                                <button style={{ width: "60px" }} onClick={handleSubmit} className='btn btn-primary'>Save</button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AddCourseDetailConfirmation