import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import view from '../../../Controller/Blockschedule/view'
import { militaryToStandardTime } from '../../../../Tools/date'

function ScheduleCatalogModal() {

    const [scheduleList, setScheduleList] = useState([])

    const MAX_PAGE_BUTTONS = 15; 
    const recordPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(scheduleList.length / recordPerPage);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = scheduleList.slice(firstIndex, lastIndex);
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
    const numbers = [...Array(endPage - startPage + 1).keys()].map((_, i) => startPage + i);

    const nextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const changeCurrentPage = (page) => {
        setCurrentPage(page);
    };

    const prePage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    const getScheduleList = () => {
        view.getScheduleList().then((res) => {
            setScheduleList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getScheduleList()
    }, [])

    return (
        <>
            <Modal
                show={true}
                centered
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>SCHEDULE CATALOG</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <div className='card shadow m-3 p-3'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Block</th>
                                        <th>Course Code</th>
                                        <th>Room</th>
                                        <th>Time From</th>
                                        <th>Time Span</th>
                                        <th>Days</th>
                                        <th>Units</th>
                                        <th>Instructor</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        records && records.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.BlockID}</td>
                                                <td>{item.CourseCode}</td>
                                                <td>{item.RoomID}</td>
                                                <td>{militaryToStandardTime(item.TimeFrom)}</td>
                                                <td>{item.TimeSpan} hrs</td>
                                                <td>{item.Days}</td>
                                                <td>{item.Units}</td>
                                                <td>{item.Prefix} {item.FirstName} {item.MiddleName} {item.LastName}</td>
                                                <td>
                                                    <Link className='btn btn-primary'>EDIT</Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className='container-fluid'>
                                <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${scheduleList.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${scheduleList.length}`}</label>
                                <nav className=' d-flex justify-content-center'>
                                <ul className='pagination'>
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className='page-link' onClick={prePage}>Prev</button>
                                    </li>
                                    {numbers.map((item, index) => (
                                    <li className={`page-item ${currentPage === item ? 'active' : ''}`} key={index}>
                                        <button className='page-link' onClick={() => changeCurrentPage(item)}>{item}</button>
                                    </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className='page-link' onClick={nextPage}>Next</button>
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

export default ScheduleCatalogModal
