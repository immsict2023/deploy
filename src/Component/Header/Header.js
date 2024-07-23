import React, { useEffect, useState } from 'react'
import { useAuth } from '../../AuthContext'
import auth from '../Controller/Login/auth'

// Icon
import IMMSIcon from '../../Assets/Header/logo-header-ismsys.png'
import LogoutModal from './Modal/LogoutModal'
import { useNavigate } from 'react-router-dom'
import NoInternetConnection from '../Registrar/Pages/NoInternetConnection'

function Header() {

    const { data } = useAuth()
    const [modalStatus, setModalStatus] = useState(false)
    const navigate = useNavigate()

    const checkLogin = () => {
        auth.isAuthenticated().then((res) => {
            if (!res.data.isAuthenticated) {
                navigate('./login')
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <>
            {modalStatus && <LogoutModal modalStatus={modalStatus} setModalStatus={setModalStatus} />}
            <div className='d-flex justify-content-between text-white p-2' style={{backgroundColor: '#143E69'}}>
                <div className='container ms-5'>
                    <img style={{width: '550px'}} src={IMMSIcon} alt='icon' /> 
                </div>
                <NoInternetConnection />
                <div className='container d-flex align-items-center justify-content-end me-5'>
                    <div className='row text-start'>
                        <button className='btn border-0 text-white text-start' onClick={() => setModalStatus(true)} disabled={data === null}>{data !== null ? <h6>Hello! {data.fullname && data.fullname.toUpperCase()}</h6> : <h6>Hello Guest!</h6>}{ data ? (<h6> AY  {data && data.AY} {data && data.Sem} Semester </h6>): <></> } </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
