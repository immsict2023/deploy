import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import view from '../../../Controller/Personnel/view'
import AssignCourse from './PersonalChild/Child/FacultyList/AssignCourse'

function ReportFilter() {

    const [facultyList, setFacultyList] = useState([])

    // Table Responsive With Pagination
    const recordPerPage = 10;
    const [ currentPage, setCurrentPage ] = useState(1)
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = facultyList.slice(firstIndex, lastIndex);
    const npage = Math.ceil(facultyList.length / recordPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const [selectedAssignCourse, setSelectedAssignCourse] = useState(null)
    const [assignCourseModalStatus, setAssignCourseModalStatus] = useState(false)

    const nextPage = () => {
        if (currentPage !== lastIndex) {
        setCurrentPage(currentPage + 1)
        }
    }

    const changeCurrentPage = (id) => {
        setCurrentPage(id)
    }

    const prePage = () => {
        if (currentPage !== firstIndex) {
        setCurrentPage(currentPage - 1)
        }
    }

    const getPersonnelFacultyListFunc = () => {
        view.getPersonnelFacultyList().then((res) => {
            setFacultyList(res.data.res)
        }).catch((err) => {
            console.error(Error)
        })
    }

    const handleAssignCourse = (e) => {
        setSelectedAssignCourse(e)
        setAssignCourseModalStatus(true)
    }

    useEffect(() => {
        getPersonnelFacultyListFunc()
    }, [])

    return (
        <>
            { assignCourseModalStatus && <AssignCourse modalStatus={assignCourseModalStatus} setModalStatus={setAssignCourseModalStatus} data={selectedAssignCourse} /> }
            <Modal
                show={true}
                fullscreen
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>REPORT FILTER</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid d-flex justify-content-center'>
                        <div style={{ width: '1200px' }}>
                            <div className='row'>
                                <div className='col-12'>
                                    {
                                        /*
                                            <div className='card shadow m-4 p-4'>
                                                <div className='row'>
                                                    <div className='col-2'>
                                                        <h6>AY</h6>
                                                        <select className='form-control' name='ay' id='ay'>
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                    <div className='col-2'>
                                                        <h6>Semester</h6>
                                                        <select className='form-control' name='semester' id='semester'>
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        */
                                    }
                                </div>
                                <div className='col-12'>
                                    <div className='card shadow m-4 p-4'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>Faculty ID</th>
                                                    <th>Faculty Name</th>
                                                    <th>Active</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    records && records.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.PersonnelID}</td>
                                                            <td>{item.Prefix} {item.LastName}, {item.FirstName} {item.MiddleName}</td>
                                                            <td>{item.IsActive === 1 ? 'Yes' : 'No'}</td>
                                                            <td>
                                                                <button onClick={() => handleAssignCourse(item.PersonnelID)} className='btn btn-primary' >Assign Course</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <div className='container-fluid'>
                                            <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage*records.length}/${facultyList.length}` : `${((currentPage-1)*recordPerPage)+records.length}/${facultyList.length}`}</label>
                                            <nav className='float-end'>
                                                <ul className='pagination'>
                                                    <li className='page-item'>
                                                    <button href='#' className='page-link' onClick={prePage}>Prev</button>
                                                    </li>
                                                    {
                                                    numbers.map((item, index) => (
                                                        <li className={`page-item ${currentPage === item ? 'active' : ''}`} key={index}> 
                                                        <button href='#' className='page-link' onClick={() => changeCurrentPage(item)} >{item}</button>
                                                        </li>
                                                    ))
                                                    }
                                                    <li className='page-item'>
                                                    <button href='#' className='page-link' onClick={nextPage}>Next</button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to='../' className='btn btn-secondary'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ReportFilter
