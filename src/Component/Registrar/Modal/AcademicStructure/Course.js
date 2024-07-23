import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import view from '../../../Controller/AcademicStructure/view'
import EditCourse from '../AcademicStructure/AcademicStructureChild/Child/Course/EditCourse'
import AddCourse from './AcademicStructureChild/Child/Course/AddCourse'

function Course() {

    const [ course, setCourse ] = useState([])
    const [modalStatus, setModalStatus] = useState(false)
    const [editCourseModalStatus, setEditCourseModalStatus] = useState(false)

    const [selectedItem, setSelectedItem] = useState(null)

    // Table Responsive With Pagination
    const recordPerPage = 9;
    const [ currentPage, setCurrentPage ] = useState(1)
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = course.slice(firstIndex, lastIndex);
    const npage = Math.ceil(course.length / recordPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

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

    const handleNewCourse = () => {
        setModalStatus(true)
    }

    const getCourseList = () => {
        view.getCourseList()
        .then((res) => {
            setCourse(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const handleCourseEdit = (item) => {
        setSelectedItem(item)
        setEditCourseModalStatus(true)
    }

    useEffect(() => {
        getCourseList()
    }, [])
 
    return (
        <>
            { editCourseModalStatus && <EditCourse modalStatus={editCourseModalStatus} setModalStatus={setEditCourseModalStatus} CourseNo={selectedItem} />}
            { modalStatus && <AddCourse />}
            <Outlet />
            <Modal
                show={true}
                fullscreen={true}
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>COURSE</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid' style={{ width: "1500px" }}>
                        <button onClick={handleNewCourse} className='btn btn-primary m-2'>NEW COURSE</button>
                        <div className='card shadow m-2 p-3'>
                            <div className='container-fluid mb-2'>
                                <input className='form-control float-end' placeholder="Search Name" style={{ width: '300px' }} />
                            </div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Label</th>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>LEC Hours</th>
                                        <th>LAB Hours</th>
                                        <th>Units</th>
                                        <th>Units Free</th>
                                        <th>Corequisite</th>
                                        <th>Prerequisite</th>
                                        <th>Active</th>
                                        <th width={'auto'}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        records && records.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.CourseCode}</td>
                                                <td>{item.Label}</td>
                                                <td>{item.Title}</td>
                                                <td>{item.CourseType}</td>
                                                <td>{item.Lechours}</td>
                                                <td>{item.LabHours}</td>
                                                <td>{item.Units}</td>
                                                <td>{item.UnitFee}</td>
                                                <td>{item.Corequisite}</td>
                                                <td>{item.Prerequisite}</td>
                                                <td>{Boolean(item.IsActive) ? 'Yes': 'No'}</td>
                                                <td>
                                                    <button onClick={() => handleCourseEdit(item.CourseNo)} className='btn btn-primary me-1'>EDIT</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                            <div className='container-fluid'>
                                <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage*records.length}/${course.length}` : `${((currentPage-1)*recordPerPage)+records.length}/${course.length}`}</label>
                                <nav className='float-end'>
                                    <ul className='pagination'>
                                        <li className='page-item'>
                                        <a href='#' className='page-link' onClick={prePage}>Prev</a>
                                        </li>
                                        {
                                        numbers && numbers.map((item, index) => (
                                            <li className={`page-item ${currentPage === item ? 'active' : ''}`} key={index}> 
                                            <a href='#' className='page-link' onClick={() => changeCurrentPage(item)} >{item}</a>
                                            </li>
                                        ))
                                        }
                                        <li className='page-item'>
                                        <a href='#' className='page-link' onClick={nextPage}>Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
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

export default Course
