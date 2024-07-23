import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function BlockScheduleButton() {
    return (
        <>  
            <nav>
                <div className='btn-nav-container mb-3'>
                    <Link className='btn text-white' to={`add-block-schedule`}>ADD BLOCK SCHEDULE</Link>
                    <Link className='btn text-white' to={`schedule-category`}>SCHEDULE</Link>
                </div>
                <main>
                    <Outlet />
                </main>
            </nav>
        </>
    )
}

export default BlockScheduleButton
