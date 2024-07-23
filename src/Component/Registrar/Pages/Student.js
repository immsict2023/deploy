import React, { useEffect, useState } from 'react'

import StudentNavButton from '../RegNavbar/StudentNavButton'
import { Link, Outlet } from 'react-router-dom'

import { convertDateWTime } from '../../../Tools/date' 
import { stringIsNull } from '../../../Tools/text' 
import { booleanToString } from '../../../Tools/boolean'
import view from '../../Controller/Student/view'

// Icons
import Show from '../../../Assets/Icons/eye.png'
import Edit from '../../../Assets/Icons/pencil.png'
import Delete from '../../../Assets/Icons/delete.png'
import Ledger from '../../../Assets/Icons/ledger.png' 
import noPhoto from '../../../Assets/Icons/nophoto.png' 
import { listStudent } from '../../Controller/Student/view'
import Loadings from '../../Loadings/Loadings'

function Student() {

  const [studentListData, setStudentListData] = useState([]);

  const MAX_PAGE_BUTTONS = 10; 
  const recordPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(studentListData.length / recordPerPage);
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = studentListData.slice(firstIndex, lastIndex);
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const numbers = [...Array(endPage - startPage + 1).keys()].map((_, i) => startPage + i);
  const [loadingStatus, setLoadingStatus] = useState(false)

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

  const studentList = () => {
    setLoadingStatus(true)
    view.getStudentList().then((res) => {
      setStudentListData(res)
      setLoadingStatus(false)
    }).catch((err) => {
      console.error(err)
      setLoadingStatus(false)
    })
  }

  useEffect(() => {
   
    studentList()
  }, [])

  return (
    <>
      {loadingStatus && <Loadings loadingStatus={loadingStatus} />}
      <main>
        <div className='text-center m-3'>
          <h5>STUDENT</h5>
        </div>
        <nav>
          <StudentNavButton />
        </nav>
        <section className='p-3'>
          <div className='container-fluid row mb-2'>
            <div className='col'>
              <form>
                <input type='search' placeholder='Search name...' className='form-control float-end' style={{width: '300px'}} />
              </form>
            </div>
          </div>
          <table className='table table-hover navigation p-5'>
            <thead>
              <tr>
                <th>STUDENT ID</th>
                <th>PROGRAM</th>
                <th>YEAR LEVEL</th>
                <th>LAST NAME</th>
                <th>FIRST NAME</th>
                <th>MIDDLE NAME</th>
                <th>SUFFIX</th>
                <th>CITIZENSHIP</th>
                <th>GENDER</th>
                <th>DATE OF BIRTH</th>
                <th>ACTIVE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {/*
              <td className='text-center'>
                <img src={item.profilephoto !== null && item.profilephoto !== undefined ? item.profilephoto : noPhoto} alt='' width={60} height={60} />
              </td>
            */}
            {
              records.map((item, index) => (
                <tr key={index}>
                  <td>{item.StudentID && item.StudentID}</td>
                  <td>{item.Code && item.Code}</td>
                  <td className='text-center'>{stringIsNull(item.YearLevel)}</td>
                  <td>{stringIsNull(item.LastName)}</td>
                  <td>{stringIsNull(item.FirstName)}</td>
                  <td>{stringIsNull(item.MiddleName)}</td>
                  <td>{stringIsNull(item.Suffix)}</td>
                  <td>{stringIsNull(item.CountryName)}</td>
                  <td>{stringIsNull(item.Gender)}</td>
                  <td>{convertDateWTime(item.DOB)}</td>
                  <td>{booleanToString(item.IsActive)}</td>
                  <td>
                    <Link className='btn' to={`show-student/${stringIsNull(item.StudentID)}`}>SHOW</Link>
                    <Link className='btn' to={`show-student-ledger/${stringIsNull(item.StudentID)}`}>LEDGER</Link>
                  </td>
                  {
                    /*
                      <th>
                        <Link to={`edit-student/${stringIsNull(item.StudentID)}`}>
                          <img src={Edit} width={20} height={20} alt='edit icon' />
                        </Link>
                      </th>
                      <td>
                        <Link>
                          <img src={Delete} width={20} height={20} alt='delete icon' />
                        </Link>
                      </td>
                      <td>
                        <Link to='shift-student' className='btn btn-danger'>
                          SHIFT  
                        </Link>
                      </td>
                    */
                  }
                </tr>
              ))
            }
            </tbody>
          </table>
          <div className='container-fluid'>
            <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${studentListData.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${studentListData.length}`}</label>
            <nav className=' d-flex justify-content-end'>
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
        </section>
        <Outlet />
      </main>
    </>
  )
}

export default Student
