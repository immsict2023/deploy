import React, { useEffect, useState } from 'react'
import NavButton from '../RegNavbar/EnlistmentNavButton'
import { Link } from 'react-router-dom'
import Ekis from '../../../Assets/Icons/ekis.png'
import Check from '../../../Assets/Icons/check.png'
import Show from '../../../Assets/Icons/eye.png'
import Delete from '../../../Assets/Icons/delete.png'
import Printer from '../../../Assets/Icons/printer.png'
import EditPaper from '../../../Assets/Icons/edit-paper.png'
import currency from '../../../Tools/currency'

import { convertDateWTime } from '../../../Tools/date' 
import { stringIsNull } from '../../../Tools/text' 
import view from '../../Controller/Enlistment/view'
import Loadings from '../../Loadings/Loadings'

function Enlistment() {

  const [studentEnlistmentList, setStudentEnlistmentList] = useState([])
  
  const MAX_PAGE_BUTTONS = 10; 
  const recordPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(studentEnlistmentList.length / recordPerPage);
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = studentEnlistmentList.slice(firstIndex, lastIndex);
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const numbers = [...Array(endPage - startPage + 1).keys()].map((_, i) => startPage + i);
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

  const getEnlistment = () => {
    setLoadingStatus(true)
    view.enlistmentList()
    .then((res) => {
      setStudentEnlistmentList(res.data.rows)
      setLoadingStatus(false)
    })
    .catch((err) => {
      console.error(err)
      setLoadingStatus(false)
    })
  }

  const filteredData = searchTerm ? studentEnlistmentList.filter((item) => item.StudentName.toLowerCase().includes(searchTerm.toLowerCase()) ) : records; // Show all data if searchTerm is empty

  const handlePDFRFPrint = () => {
    
  }

  useEffect(() => {
    getEnlistment()
  }, [])

  return (
    <>
    {loadingStatus && <Loadings loadingStatus={loadingStatus} />}
      <main>
        <div className='text-center m-3'>
          <h5>ENLISTMENT</h5>
        </div>
        <nav>
          <NavButton />
        </nav>
        <section className='p-3'>
          <div className='container-fluid'>
            <input onChange={handleChange} className='form-control float-end mb-3' placeholder="Search Name" style={{ width: '300px' }} />
          </div>
          <table className='table-responsive table table-hover navigation'>
            <thead>
              <tr>
                <th>EN</th>
                <th>STUDENT ID</th>
                <th>STUDENT NAME</th>
                <th>STATUS</th>
                <th>PROGRAM</th>
                <th>YEAR</th>
                <th>BLOCK</th>
                <th>A.Y Sem</th>
                <th>ENLISTED ON</th>
                <th>TU</th>
                <th>TOTAL DUE</th>
                <th>PO</th>
                <th className='text-center'>ASSESSED</th>
                <th className='text-center'>PRINTED</th>
                <th width='180px'></th>
              </tr>
            </thead>
            <tbody >
              {
                filteredData && filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{stringIsNull(item.RegistrationNo)}</td>
                    <td>{stringIsNull(item.StudentID)}</td>
                    <td>{stringIsNull(item.StudentName)}</td>
                    <td>{stringIsNull(item.Status)}</td>
                    <td>{stringIsNull(item.Code)}</td>
                    <td>Year {stringIsNull(item.Year)}</td>
                    <td>{stringIsNull(item.Section)}</td>
                    <td>{item.AY}, {item.Sem}</td>
                    <td>{convertDateWTime(item.CreatedOn)}</td>
                    <td>{stringIsNull(item.TotalUnits)}</td>
                    <td>{currency.formatter.format(item.TotalDue)}</td>
                    <td>{stringIsNull(item.PaymentOption)}</td>
                    <td className='text-center'><img alt={'Assessed Icon'} src={Boolean(item.IsAssessed) ? Check : Ekis} width={15} height={15}/></td>
                    <td className='text-center'><img alt={'Printed Icon'} src={Boolean(item.IsPrinted) ? Check : Ekis} width={15} height={15}/></td>
                    <td className='text-center'>
                      <Link className='btn' to={`showenlistment/${item.RegistrationNo}`}>SHOW</Link>
                      <button className='btn' onClick={handlePDFRFPrint}>PRINT</button>
                      { /* <Link className='pe-2' to={`matriculationchange/${item.RegistrationNo}`}><img alt='Matriculation Changes' src={EditPaper} width={20} height={20} /></Link> */ }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className='container-fluid  m'>
            <label><b>Total Record:</b> {filteredData.length === recordPerPage ? `${currentPage * filteredData.length}/${studentEnlistmentList.length}` : `${((currentPage - 1) * recordPerPage) + filteredData.length}/${studentEnlistmentList.length}`}</label>
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
      </main>
    </>
  )
}

export default Enlistment