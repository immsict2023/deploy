import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ClassroomButton from '../RegNavbar/ClassroomButton'
import { booleanToString } from '../../../Tools/boolean' 
import { getClassroomList } from '../../Controller/Classroom/view'
import { stringIsNull } from '../../../Tools/text'
import axios from 'axios'
import config from '../../Security/config'
import Loadings from '../../Loadings/Loadings'

function Classroom() {

  const [classroomList, setClassroomList] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const MAX_PAGE_BUTTONS = 10; 
  const recordPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(classroomList.length / recordPerPage);
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = classroomList.slice(firstIndex, lastIndex);
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

  useEffect(() => {
    setIsLoading(true)
    getClassroomList(axios, config)
    .then((res) => {
      console.log()
      setClassroomList(res.data.rows)
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setIsLoading(false)
    })
  }, [])

  return (
    <>
    {isLoading && <Loadings loadingStatus={isLoading} />}
      <main>
        <div className='text-center m-3'>
          <h5>CLASSROOM</h5>
        </div>
        <nav>
          <ClassroomButton />
        </nav>
        <section>
          <div className='container-fluid'>
            <div className='card shadow p-3 m-3'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Room ID</th>
                    <th>Description</th>
                    <th>Building</th>
                    <th>Active</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    records && records.map((item, index) => (
                      <tr key={index}>
                        <td>{stringIsNull(item.RoomID)}</td>
                        <td>{stringIsNull(item.Description)}</td>
                        <td>{stringIsNull(item.Building)}</td>
                        <td>{booleanToString(item.IsActive)}</td>
                        <td>
                          <Link className='btn btn-primary me-2' style={{width: '90px'}}>EDIT</Link>
                          <Link className='btn btn-danger' style={{width: '90px'}}>DELETE</Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div className='container-fluid'>
                <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${classroomList.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${classroomList.length}`}</label>
                <nav className=' d-flex justify-content-center'>
                  <ul className='pagination'>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className='page-link' onClick={prePage}>Prev</button>
                    </li>
                    {
                      numbers && numbers.map((item, index) => (
                        <li className={`page-item ${currentPage === item ? 'active' : ''}`} key={index}>
                          <button className='page-link' onClick={() => changeCurrentPage(item)}>{item}</button>
                        </li>
                      ))
                    }
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className='page-link' onClick={nextPage}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Classroom
