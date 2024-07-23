import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function AdminstrationButton() {
    return (
        <>  
            <nav>
                <div className='btn-nav-container mb-3'>
                    <Link className='btn text-white' to={`grading-system`}>GRADING SYSTEM</Link>
                    <Link className='btn text-white' to={`miscellaneous-fee`}>MISCELLANEOUS FEE</Link>  
                    <Link className='btn text-white' to={`others-fee`}>OTHERS FEE</Link>     
                </div>
                <main>
                    <Outlet />
                </main>
            </nav>
        </>
    )          
}

export default AdminstrationButton
