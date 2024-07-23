import React from 'react'
import ReportsNavButton from '../RegNavbar/ReportsNavButton'
import { Outlet } from 'react-router-dom'

function Reports() {
  return (
    <main>
      <div className='text-center m-3'>
        <h5>Reports</h5>
      </div>
      <nav>
        <ReportsNavButton />
      </nav>
      <section>
        
      </section>
      <Outlet />
    </main>
  )
}

export default Reports
