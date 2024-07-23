import React from 'react'
import { Modal, ModalFooter } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

function FacultyAccount() {
    return (
        <>
            <Modal>
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>FACULTY ACCOUNT</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <Outlet />
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>

                </ModalFooter>
            </Modal>
        </>
    )
}

export default FacultyAccount
