import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import config from '../../../Security/config'
import axios from 'axios'
import view from '../../../Controller/Administrator/view'

function SemesterSettings() {
    const [semester, setSemester] = useState([])

    const semesterFunc = () => {
        view.getSemesterSettings()
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
            <Modal
                show={true}
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>SEMESTER SETTINGS</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <div className='card shadow m-2 p-3'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>AY</th>
                                        <th>Semester</th>
                                        <th>Is Semester Open?</th>
                                        <th>Is Registration Open?</th>
                                        <th>Is Late Registration Open?</th>
                                        <th>Classes Started?</th>
                                        <th>Is Grading Open?</th>
                                        <th>Is Semester Closed?</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        semester && semester.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.AY}</td>
                                                <td>{item.Sem}</td>
                                                <td>{Boolean(item.IsSemOpen) ? 'Yes' : 'No'}</td>
                                                <td>{Boolean(item.IsRegistrationOpen) ? 'Yes' : 'No'}</td>
                                                <td>{Boolean(item.IsLateRegistrationOpen) ? 'Yes' : 'No'}</td>
                                                <td>{Boolean(item.ClassesStarted) ? 'Yes' : 'No'}</td>
                                                <td>{Boolean(item.IsGradingOpen) ? 'Yes' : 'No'}</td>
                                                <td>{Boolean(item.IsSemOpen) === false ? 'Yes' : 'No'}</td>
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
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to={`../`} className='btn btn-secondary'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default SemesterSettings
