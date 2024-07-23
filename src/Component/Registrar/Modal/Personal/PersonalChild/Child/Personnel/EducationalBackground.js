import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function EducationalBackground() {

    const { personneldetails } = useParams()
    const [personnel_details_data, setPersonnel_Details_Data] = useState(personneldetails)

    return (
        <>
            
        </>
    )
}

export default EducationalBackground
