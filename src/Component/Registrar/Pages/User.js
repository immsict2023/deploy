import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserButton from '../RegNavbar/UserButton'
import axios from 'axios'
import config from '../../Security/config'
import { stringIsNull } from '../../../Tools/text' 
import { convertDateWTime } from '../../../Tools/date' 
import { getUserList } from '../../Controller/users/view'

function User() {

  const [userList, setUserList] = useState([])

  const MAX_PAGE_BUTTONS = 10; 
  const recordPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(userList.length / recordPerPage);
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = userList.slice(firstIndex, lastIndex);
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

  const getUserListFunc = (axios, config) => {
    getUserList(axios, config)
    .then((res) => {
      setUserList(res.data.rows)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  useEffect(() => {
    getUserListFunc(axios, config)
  }, [])

  return (
    <>
      <main>
        <div className='text-center m-3'>
          <h5>PERSONNEL LOGIN CATEGORY</h5>
        </div>
        <nav>
          <UserButton />
        </nav>
        <section>
          <div className='container-fluid'>
            <Link className='btn btn-primary ms-3' to={`user-staff-account/new-staff`}>NEW STAFF</Link>
            <div className='card shadow p-3 m-3'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Personnel ID</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Full Name</th>
                    <th>Remarks</th>
                    <th>Last Login On</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    records && records.map((item, index) => (
                      <tr key={index}>
                        <td>{stringIsNull(item.PersonnelID)}</td>
                        <td>{stringIsNull(item.UserName)}</td>
                        <td>{stringIsNull(item.RoleID)}</td>
                        <td>{`${stringIsNull(item.Prefix)} ${stringIsNull(item.LastName)}, ${stringIsNull(item.FirstName)} ${stringIsNull(item.MiddleName)}`}</td>
                        <td>{stringIsNull(item.Remarks)}</td>
                        <td>{convertDateWTime(item.LastLoginOn)}</td>
                        <td>
                          <Link className='btn btn-primary me-2' style={{width: '110px'}}>EDIT</Link>
                          <Link className='btn btn-danger' style={{width: '110px'}}>DELETE</Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div className='container-fluid'>
                <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${userList.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${userList.length}`}</label>
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
        </section>
      </main>
    </>
  )
}

export default User
