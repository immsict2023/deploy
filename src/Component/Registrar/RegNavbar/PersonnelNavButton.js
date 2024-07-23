import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function PersonnelNavButton() {
    return (
        <>  
        <Outlet/>
            <nav>
                <div className='btn-nav-container mb-3'>
                    <Link className='btn text-white' to={`add-personnel?information=0&background=0`}>ADD PERSONNEL</Link>
                    <Link className='btn text-white' to={`report-filter`}>FACULTY LIST</Link>
                </div>
                <main>
                    
                </main>
            </nav>
        </>
    )
}

export default PersonnelNavButton
