import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'

function ShowPermitExam() {
    return (
        <>
            <Modal
                show={true}
                size='xl'
                scrollable
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>SHOW EXAM PERMIT</h5>
                    </div>
                </ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>

                </ModalFooter>
            </Modal>
        </>
    )
}

export default ShowPermitExam
