import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'

function AddMiscellaneous() {
    return (
        <>
            <Modal
                show={true}
                centered
                size='xl'
            >
                <ModalHeader>
                    <div className='container-fluid'>

                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid'>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className='container-fluid text-end'>

                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddMiscellaneous
