import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../../AuthContext'

function StudentNavButton() {

  const { data } = useAuth()

  return (
    <>
      <nav>
        <div className='btn-nav-container mb-3'>
          {
            data.RoleID && data.RoleID === 'STF_CAS' ?
            <>
              <Link className='btn text-white' to='payment'>ADD PAYMENT</Link>
              <Link className='btn text-white' to='add-exam-permit'>ADD EXAM PERMIT</Link>
              <Link className='btn text-white' to='add-charge-to-group'>ADD CHARGE TO GROUP</Link>
              <Link className='btn text-white' to='manage-payment'>MANAGE PAYMENT</Link>
              <Link className='btn text-white' to='manage-charge'>MANAGE CHARGE</Link>
              <Link className='btn text-white' to='manage-installment'>MANAGE INSTALLMENTS</Link>
              <Link className='btn text-white' to='manage-exam-permit'>MANAGE EXAM PERMIT</Link>
            </>
            : data.RoleID && data.RoleID === 'REG'?
            <>
              <Link className='btn text-white' to='add-student'>ADD STUDENT</Link>
              <Link className='btn text-white' to='pct-tranferees'>PREVIOUS COURSES TAKEN OF TRANSFEREES</Link>
            </>
            :
            <>
              <Link className='btn text-white' to='add-student'>ADD STUDENT</Link>
              <Link className='btn text-white' to='pct-tranferees'>PREVIOUS COURSES TAKEN OF TRANSFEREES</Link>
              <Link className='btn text-white' to='payment'>ADD PAYMENT</Link>
              <Link className='btn text-white' to='add-exam-permit'>ADD EXAM PERMIT</Link>
              <Link className='btn text-white' to='add-charge-to-group'>ADD CHARGE TO GROUP</Link>
              <Link className='btn text-white' to='manage-payment'>MANAGE PAYMENT</Link>
              <Link className='btn text-white' to='manage-charge'>MANAGE CHARGE</Link>
              <Link className='btn text-white' to='manage-installment'>MANAGE INSTALLMENTS</Link>
              <Link className='btn text-white' to='manage-exam-permit'>MANAGE EXAM PERMIT</Link>
            </>
          }
        </div>
        <main>
            <Outlet />
        </main>
      </nav>
    </>
  )
}

export default StudentNavButton
