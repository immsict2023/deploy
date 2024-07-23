import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function UserButton() {
    return (
        <>  
            <nav>
                <div className='btn-nav-container mb-3'>
                    <Link className='btn text-white' to={`student-account`}>STUDENT ACCOUNT</Link>
                    <Link className='btn text-white' to={`faculty-account`}>FACULTY ACCOUNT</Link>
                </div>
                <main>
                    <Outlet />
                </main>
            </nav>
        </>
    )
}

export default UserButton
