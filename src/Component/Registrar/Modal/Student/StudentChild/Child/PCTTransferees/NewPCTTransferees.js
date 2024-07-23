import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import view from '../../../../../../Controller/Student/view'

function NewPCTTransferees(props) {

    const { modalStatus, setModalStatus } = props;
    const [enlistmentList, setEnlistmentList] = useState([])

    const getStudentListFunc = () => {
        view.getStudentList().then((res) => { 
            setEnlistmentList(res)
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getStudentListFunc()
    }, [])

    return (
        <Modal
            show={modalStatus}
            centered
             size='xl'
        >
            <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                <div className='container-fluid'>
                    <h6>NEW PREVIOUS PROGRAMS AND COURSES TAKEN</h6>
                </div>
            </ModalHeader>
            <ModalBody style={{backgroundColor: '#B2BEB5', height: '100%'}}>
                <div className='container-fluid p-4'>
                    <div className='card shadow p-4 m-3'>
                        <div className='row'>
                            <div className='mt-3 col-md-4'>
                                <h6>Student ID</h6>
                                <select className='form-control' name='StudentID'>
                                    <option value={null}>Please select item...</option>
                                    {
                                        enlistmentList && enlistmentList.map((item, index) => (
                                            <option key={index} value={item.StudentID}>{item.StudentName} ({item.StudentID})</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='mt-3 col-md-4'>
                                <h6>Institution Name</h6>
                                <input name='InstitutionName' className='form-control' />
                            </div>
                            <div className='mt-3 col-md-4'>
                                <h6>Institution Address</h6>
                                <input name='InstitutionAddress' className='form-control' />
                            </div>
                            <div className='mt-3 col-md-2'>
                                <h6>AY</h6>
                                <input className='form-control' name='AY' />
                            </div>
                            <div className='mt-3 col-md-2'>
                                <h6>Sem</h6>
                                <select className='form-control' name='Sem'>
                                    <option></option>
                                    <option value='1ST'>1ST</option>
                                    <option value='2ND'>2ND</option>
                                    <option value='3RD'>3RD</option>
                                </select>
                            </div>
                            <div className='mt-3 col-md-4'>
                                <h6>Program Code</h6>
                                <input className='form-control' name='ProgramCode' />
                            </div>
                            <div className='mt-3 col-md-12'>
                                <h6>Program Description</h6>
                                <input className='form-control' name='ProgramCode' />
                            </div>
                            <div className='text-center mt-4 col-md-12'>
                                <button style={{ width: '110px' }} className='btn btn-secondary'>CREATE</button>
                            </div>
                        </div>
                    </div>
                    <div className='card shadow p-4 m-3'>
                        <div className='container-fluid'>
                            <button className='btn btn-primary' style={{ width: '150px' }}> <FontAwesomeIcon icon={faPlus} />  ADD SUBJECT</button>
                        </div>
                        <div className='container-fluid'>
                            <table className='table-responsive table table-hover'>
                                <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Course Description</th>
                                        <th>Units Earned</th>
                                        <th>Final Grade</th>
                                        <th>Completion</th>
                                        <th>XGWA?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                <div className='container-fluid text-end'>
                    <button onClick={() => setModalStatus(false)} className='btn btn-secondary'>Close</button>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default NewPCTTransferees