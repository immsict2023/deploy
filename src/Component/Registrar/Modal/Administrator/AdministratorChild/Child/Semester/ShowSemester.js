import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../../Security/config'
import axios from 'axios'

import { getSemesterSettings } from '../../../../../../Controller/Administrator/view'

function ShowSemester() {

    const [semester, setSemester] = useState([])

    const semesterFunc = () => {
        getSemesterSettings(axios, config)
        .then((res) => {
            setSemester(res.data.rows)
            console.log(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        semesterFunc()
    }, [])

    return (
        <>
            <div className='card shadow m-2 p-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>AY</th>
                            <th>Semester</th>
                            <th>Semester Open?</th>
                            <th>Registration Open?</th>
                            <th>Late Registration Open?</th>
                            <th>Classes Started?</th>
                            <th>Grading Open?</th>
                            <th>Semester Closed?</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //console.log(`${item.ay} ${item.sem} value is ${Boolean(item.issemopen.data[0]) ? 'Yes' : 'No'}`)
                            semester && semester.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ay}</td>
                                    <td>{item.sem}</td>
                                    <td>{Boolean(item.issemopen.data[0]) ? 'Yes' : 'No'}</td>
                                    <td>{Boolean(item.isregistrationopen.data[0]) ? 'Yes' : 'No'}</td>
                                    <td>{Boolean(item.islateregistrationopen.data[0]) ? 'Yes' : 'No'}</td>
                                    <td>{Boolean(item.classesstarted.data[0]) ? 'Yes' : 'No'}</td>
                                    <td>{Boolean(item.isgradingopen.data[0]) ? 'Yes' : 'No'}</td>
                                    <td>{Boolean(item.issemopen.data[0]) === false ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Link style={{width: '110px'}} className='me-2 btn btn-primary'>SHOW</Link>
                                        <Link style={{width: '110px'}} className='me-2 btn btn-secondary'>EDIT</Link>
                                        <Link style={{width: '110px'}} className='btn btn-danger'>DELETE</Link>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShowSemester
