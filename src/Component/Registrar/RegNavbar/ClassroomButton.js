import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function ClassroomButton() {
    return (
        <>  
            <nav>
                <div className='btn-nav-container mb-3'>
                    <Link to={`classroom-new-edit`} className='btn text-white'>ADD CLASSROOM</Link>
                </div>
                <main>
                    <Outlet />
                </main>
            </nav>
        </>
    )
}

export default ClassroomButton
