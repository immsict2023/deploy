import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function AcademicStructureButton() {

    return (
        <>  
            <nav>
                <div className='btn-nav-container mb-3'>
                    <Link className='btn text-white' to={`course`}>COURSE</Link>
                    <Link className='btn text-white' to={`program`}>PROGRAM</Link>
                    <Link className='btn text-white' to={`department`}>DEPARTMENT</Link>
                    <Link className='btn text-white' to={`college`}>COLLEGE</Link>
                </div>
                <main>
                    <Outlet />
                </main>
            </nav>
        </>
    )
}

export default AcademicStructureButton
