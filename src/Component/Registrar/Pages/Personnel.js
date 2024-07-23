import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import PersonnelNavButton from '../RegNavbar/PersonnelNavButton'
import { stringIsNull } from '../../../Tools/text' 
import { convertDate } from '../../../Tools/date' 
import { booleanToString } from '../../../Tools/boolean'
import DeletePersonnelConfirmation from '../Modal/Personal/PersonalChild/Modal/DeletePersonnelConfirmation'
import Loadings from '../../Loadings/Loadings'

import view from '../../Controller/Personnel/view'

// import deleteIcon from '../../../Assets/Icons/delete.png'
import showIcon from '../../../Assets/Icons/eye.png'
import editIcon from '../../../Assets/Icons/pencil.png'

function Personnel() {

  const [personnelListData, setPersonnelListData] = useState([])
  const [ deleteModalStatus, setDeleteModalStatus ] = useState(false)
  // const [ selectedItem, setSelectedItem ] = useState([])
  
  const [loadingStatus, setLoadingStatus] = useState(false)

  // Table Responsive With Pagination
  const recordPerPage = 10;
  const [ currentPage, setCurrentPage ] = useState(1)
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = personnelListData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(personnelListData.length / recordPerPage)
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

  // Suggestion Div
  const handleSearchSuggest = () => {

  }

  /*
    const handleDeleteInformation = (personnelname, personnelid) => {
      setSelectedItem({
        personnelname,
        personnelid
      })
      setDeleteModalStatus(true)
    }
  */

  const getPersonnelFunc = () => {
    setLoadingStatus(true)
    view.personnelList()
    .then((response) => {
      setPersonnelListData(response.data.rows)
      setLoadingStatus(false)
    })
    .catch((error) => {
      console.error(error)
      setLoadingStatus(false)
    })
  }

  useEffect(() => {
    getPersonnelFunc()
  }, [])

  // { deleteModalStatus && <DeletePersonnelConfirmation modalStatus={deleteModalStatus} setModalStatus={setDeleteModalStatus} data={selectedItem} /> }

  return (
    <>
      {loadingStatus && <Loadings loadingStatus={loadingStatus} />}
      <main>
        <div className='text-center m-3'>
          <h5>PERSONNEL</h5>
        </div>
        <nav> 
          <PersonnelNavButton />
        </nav>
        <section className='m-3 p-3'>
          {
            /*
              <select>
                <option></option>
                {
                  records && records.map((item, index) => (
                    <option value={item.personnelid} key={index}>({item.personnelid}) {item.lastname} {item.firstname} {item.middlename}</option>
                  ))
                }
              </select>
            */
              <form className='float-end'>
                <input type='search' style={{ width: '300px'}} className='form-control mb-2' placeholder='Search Name' onKeyDown={(e) => { if (e.key === "Enter") handleSearchSuggest(); }}/>
                <div style={{ width: '400px', height: 'auto' }}>
                  
                </div>
              </form>
          }
          <table className='table-responsive table table-hover navigation  mt-2'>
            <thead>
              <tr>
                <th>PERSONNEL ID</th>
                <th>LAST NAME</th>
                <th>FIRST NAME</th>
                <th>MIDDLE NAME</th>
                <th>SUFFIX</th>
                <th>PREFIX</th>
                <th>DESIGNATION</th>
                <th>GENDER</th>
                <th>DATE OF BIRTH</th>
                <th>ACTIVE</th>
                <th width='200px' className='text-center'>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {
                records && records.map((item, index) => (
                  <tr key={index}>
                    <td>{stringIsNull(item.PersonnelID)}</td>
                    <td>{stringIsNull(item.LastName)}</td>
                    <td>{stringIsNull(item.FirstName)}</td>
                    <td>{stringIsNull(item.MiddleName)}</td>
                    <td>{stringIsNull(item.Suffix)}</td>
                    <td>{stringIsNull(item.Prefix)}</td>
                    <td>{stringIsNull(item.Label)}</td>
                    <td>{stringIsNull(item.Gender)}</td>
                    <td>{convertDate(item.DOB)}</td>
                    <td>{booleanToString(item.IsActive)}</td>
                    <td className='text-center'>

                      {
                        /*   
                          <Link className='pe-2' to={`update-personnel/${item.PersonnelID}`}><img alt='Edit Icon' width={20} height={20} src={editIcon} /></Link>
                          <button className='pe-2 btn' onClick={() => handleDeleteInformation(`${item.firstname} ${item.middlename} ${item.lastname}`, item.PersonnelID)}><img alt='Delete Icon' width={20} height={20} src={deleteIcon} /></button> 
                        */
                      }
                      <Link className='pe-2 btn' to={`show-personnel/${item.PersonnelID}`}>SHOW</Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className='container-fluid mb-3'>
            <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage*records.length}/${personnelListData.length}` : `${((currentPage-1)*recordPerPage)+records.length}/${personnelListData.length}`}</label>
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
        </section>
        <Outlet />
      </main>
    </>
  )
}

export default Personnel
