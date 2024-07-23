import React, { useState, useEffect } from 'react'
import BlockScheduleButton from '../RegNavbar/BlockScheduleButton'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../Security/config'
import Loadings from '../../Loadings/Loadings'

import { getBlockSchedule } from '../../Controller/Blockschedule/view'
import { stringIsNull } from '../../../Tools/text'
import { booleanToString } from '../../../Tools/boolean'

function BlockSchedule() {

  const [blockScheduleList, setBlockScheduleList] = useState([])

  const [isLoadings, setIsLoadings] = useState(false)
  
  // Table Responsive With Pagination
  const MAX_PAGE_BUTTONS = 10; 
  const recordPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blockScheduleList.length / recordPerPage);
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = blockScheduleList.slice(firstIndex, lastIndex);
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

  const getBlockScheduleFunc = () => {
    setIsLoadings(true)
    getBlockSchedule(axios, config)
    .then((res) => {
      setBlockScheduleList(res.data.rows)
      setIsLoadings(false)
    })
    .catch((error) => {
      console.error(error)
      setIsLoadings(false)
    })
  }
 
  useEffect(() => {
    getBlockScheduleFunc()
  }, [])

  return (
    <>
    {isLoadings && <Loadings loadingStatus={isLoadings} />}
      <main>
        <div className='text-center m-3'>
          <h5>BLOCK SCHEDULE</h5>
        </div>
        <nav>
          <BlockScheduleButton />
        </nav>
        <section className='m-3 p-3'>
          <table className='table'>
            <thead>
              <tr>
                <th>Block</th>
                <th>Section</th>
                <th>Block Type</th>
                <th>Program</th>
                <th>Year</th>
                <th>Semester</th>
                <th>AY</th>
                <th>Posted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                records && records.map((item, index) => (
                  <tr key={index}>
                    <td>{stringIsNull(item.BlockID)}</td>
                    <td>{stringIsNull(item.Section)}</td>
                    <td>{stringIsNull(item.BlockType)}</td>
                    <td>{stringIsNull(item.Code)}</td>
                    <td>{stringIsNull(item.Year)}</td>
                    <td>{stringIsNull(item.Sem)}</td>
                    <td>{stringIsNull(item.AY)}</td>
                    <td>{booleanToString(item.IsPosted)}</td>
                    <td>
                      <Link to={`update-block-schedule/${item.BlockID}`} className='btn me-1' style={{width: '90px'}}>EDIT</Link>
                      <Link className='btn me-1' style={{width: '90px'}}>PRINT</Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className='container-fluid'>
            <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${blockScheduleList.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${blockScheduleList.length}`}</label>
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

export default BlockSchedule
