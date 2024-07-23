import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../../AuthContext'

function NavButton() {

  const { data } = useAuth()

  return (  
    <>
      <nav className='btn-nav-container mb-3'>
        {
          data.RoleID === 'STF_CAS' ? 
          <>
            { /* <Link to="adddownpayment" className='btn text-white'>ADD DOWN PAYMENT</Link*/ }
          </>
          : data.RoleID === 'REG' ?
          <>
            <Link to="addenlistment" className='btn text-white'>ADD ENLISTMENT</Link>
          </>
          :
          <>
          <Link to="adddownpayment" className='btn text-white'>ADD DOWN PAYMENT</Link>
          <Link to="addenlistment" className='btn text-white'>ADD ENLISTMENT</Link>
          </>
        }
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default NavButton
