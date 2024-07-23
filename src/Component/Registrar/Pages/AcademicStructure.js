import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AcademicStructureButton from '../RegNavbar/AcademicStructureButton'
import view from '../../Controller/AcademicStructure/view'
import { convertDateWTime } from '../../../Tools/date' 
import { stringIsNull } from '../../../Tools/text'
import { booleanToString } from '../../../Tools/boolean'
import deleteIcon from '../../../Assets/Icons/delete.png'
import editIcon from '../../../Assets/Icons/pencil.png'
import printerIcon from '../../../Assets/Icons/printer.png'
import showIcon from '../../../Assets/Icons/eye.png'
import Loadings from '../../Loadings/Loadings'

function AcademicStructure() {
  
  const [curriculumList, setCurriculumList] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const MAX_PAGE_BUTTONS = 10; 
  const recordPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(curriculumList.length / recordPerPage);
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = curriculumList.slice(firstIndex, lastIndex);
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
  
  const getCurriculumListFunc = () => {
    setIsLoading(true)
    view.getCurriculumList() 
    .then((res) => {
      setCurriculumList(res.data.rows)
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getCurriculumListFunc()
  }, [])

  return (
    <>
    {isLoading && <Loadings loadingStatus={isLoading} />}
      <main>
        <div className='text-center m-3'>
          <h5>CURRICULUM CATALOG</h5>
        </div>
        <nav>
          <AcademicStructureButton />
        </nav>
        <section className='m-3 p-3'>
          <Link className='btn btn-primary' to={`add-curriculum`}>NEW CURRICULUM</Link>
          <table className='table-responsive table table-hover navigation table-bordered mt-2'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Program</th>
                <th>Total Units</th>
                <th>Created On</th>
                <th>Posted On</th>
                <th>Posted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                records && records.map((item, index) => (
                  <tr key={index}>
                    <td>{stringIsNull(item.titleCurr)}</td>
                    <td>{stringIsNull(item.codeProg)}</td>
                    <td>{stringIsNull(item.totalunitsCurr)}</td>
                    <td>{convertDateWTime(item.createdonCurr)}</td>
                    <td>{convertDateWTime(item.postedonCurr)}</td>
                    <td>{Boolean(item.ispostedCurr) ? 'Yes' : 'No'}</td>
                    <td className='text-center'>
                      <Link to={`edit-curriculum/${item.curriculumnoCurr}`} className='btn btn-secondary me-3'>EDIT</Link>
                      <Link className='btn btn-danger'>DELETE</Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className='container-fluid'>
                <label><b>Total Record:</b> {records.length === recordPerPage ? `${currentPage * records.length}/${curriculumList.length}` : `${((currentPage - 1) * recordPerPage) + records.length}/${curriculumList.length}`}</label>
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
        </section>
      </main>
    </>
  )
}

export default AcademicStructure