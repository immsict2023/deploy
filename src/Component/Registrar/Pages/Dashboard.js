import React from 'react'
import School from '../../../Assets/Image-Background/school-background.png'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

    return (
        <>
            <div className='text-center mt-5'>
                <img  src={School} alt='School Background' style={{width: '75%'}}/>
            </div>
        </>
    )
}

export default Dashboard
