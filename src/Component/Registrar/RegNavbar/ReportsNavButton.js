import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function AcademicStructureButton() {

    return (
        <>  
            <nav>
                <div className='btn-nav-container mb-3'>
                    <Link className='btn text-white' to={`report-catalog`}>REPORT CATALOG</Link>
                    <Link className='btn text-white' to={`student-reports`}>STUDENT REPORTS</Link>
                    <Link className='btn text-white' to={`payment-collection`}>PAYMENT COLLECTION</Link>
                    <Link className='btn text-white' to={`account-receivable`}>ACCOUNTS RECEIVABLE</Link>
                </div>
                <main>
                    <Outlet />
                </main>
            </nav>
        </>
    )
}

export default AcademicStructureButton
