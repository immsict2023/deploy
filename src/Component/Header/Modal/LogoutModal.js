import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import auth from '../../Controller/Login/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../AuthContext'

function LogoutModal(props) {

    const { modalStatus, setModalStatus } = props
    const navigate = useNavigate()
    const { logout } = useAuth()

    const logoutFunc = () => {
        auth.userLogout().then((res) => {
            if (Boolean(res.data.cookiesCleared) === true) {
                alert(res.data.message)
                navigate('../login')
                logout()
            }
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
                    <h6>Logout</h6>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid mt-2'>
                        <div className='container-fluid'>
                            <h6>Are you sure you wan't to sign out?</h6>
                        </div>
                        <div className='container-fluid text-end mt-2'>
                            <button style={{ width: '60px' }} onClick={() => setModalStatus(false)} className='btn btn-secondary me-2'>No</button>
                            <button style={{ width: '60px' }} onClick={logoutFunc} className='btn btn-danger'>Yes</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default LogoutModal