import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
import config from '../../../Security/config'

import { getGradingSystem } from '../../../Controller/Administrator/view' 
import { stringIsNull } from '../../../../Tools/text'
function GradingSystem() {

    const [ gradingSystem, setGradingSystem ] = useState([])

    const getGradingSystemFunc = (axios, config) => {
        getGradingSystem(axios, config)
        .then((res) => {
            setGradingSystem(res.data.rows)
            console.log(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getGradingSystemFunc(axios, config)
    }, [])

    return (
        <>
            <Outlet />
            <Modal
                show={true}
                centered
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>GRADING SYSTEM</h5>
                    </div>
                </ModalHeader>
                <ModalBody className='d-flex justify-content-center align-items-center' style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid' style={{ width: '1300px' }}>
                        <div className='card show p-3 m-2 table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th style={{ width: '140px' }}>Grade Code</th>
                                        <th style={{ width: '140px' }}>Grade Point</th>
                                        <th style={{ width: '140px' }}>Equivalence</th>
                                        <th style={{ width: '250px' }}>Qualitative Desc</th>
                                        <th>Notes</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        gradingSystem && gradingSystem.map((item, index) => (
                                            <tr>
                                                <td>{item.GradeCode}</td>
                                                <td>{item.GradePoint}</td>
                                                <td>{item.EquivalenceMin} - {item.EquivalenceMax}</td>
                                                <td>{item.Description}</td>
                                                <td>{item.Notes}</td>
                                                <td>
                                                    <Link to={`edit-grading-system`} style={{width: '120px'}} className='btn btn-secondary'>EDIT</Link>
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

export default GradingSystem
