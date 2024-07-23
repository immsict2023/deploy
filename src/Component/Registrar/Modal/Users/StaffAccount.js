import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap'

function StaffAccount() {
    return (
        <>
            <Modal
                show={true}
                size='xl'
                centered
            >
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
                    <div className='container-fluid text-end'>
                        <Link className='btn btn-secondary' to={`../`}>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default StaffAccount
