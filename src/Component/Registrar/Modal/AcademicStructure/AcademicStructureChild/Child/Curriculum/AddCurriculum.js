import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import view from '../../../../../../Controller/AcademicStructure/view'
import create from '../../../../../../Controller/AcademicStructure/create'
import deleteIcon from '../../../../../../../Assets/Icons/delete.png'
import CurriculumModal from '../../Modal/CurriculumModal'
import AddSubjects from './AddSubjects'

function AddCurriculum() {

    const [ programList, setProgramList ] = useState([])
    const [ data, setData ] = useState([])
    const [ ifSuccess, setIfSuccess ] = useState(false)
    const [ curriculumNo, setCurriculumNo ] = useState(null)
    const [ curriculumDetailsList, setCurriculumDetailsList ] = useState([])
    const [ selectedNo, setSelectedNo ] = useState([])
    const [ deleteModalStatus, setDeleteModalStatus ] = useState(false)
    const [ addSubjectModalStatus, setAddSubjectModalStatus ] = useState(false)

    const inputData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const getProgramListFunc = async () => {
        view.getProgramList()
        .then((res) => {
            setProgramList(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const getCurriculumDetailsListFunc = () => {
        try {
            view.getCurriculumDetails({ CurriculumNo: curriculumNo })
            .then((res) => {
                setCurriculumDetailsList(res.data.rows)
            })
            .catch((err) => {
                console.error(err)
            })
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmitCurriculum = (e) => {
        e.preventDefault()
        create.createCurriculum(data)
        .then((res) => {
            if (Number(res.data.affectedRows) > 0 ) {
                alert('Successfully Created!')
                setCurriculumNo(res.CurriculumNo)
                setIfSuccess(true)
            } else {
                alert('Unsuccessful Create!')
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }
      
    const handleGetNo = (cdetailno, units) => {
        setSelectedNo({idno: cdetailno, units: units, cno: curriculumNo});
        setDeleteModalStatus(true)
    };

    useEffect(() => {
        getProgramListFunc()
    }, [])

    useEffect(() => {
        getCurriculumDetailsListFunc()
    })

    return (
        <>
            { addSubjectModalStatus && <AddSubjects modalStatus={addSubjectModalStatus} setModalStatus={setAddSubjectModalStatus} curriculumNo={curriculumNo} /> }
            { deleteModalStatus && <CurriculumModal modalStatus={deleteModalStatus} setModalStatus={setDeleteModalStatus} data={selectedNo} transType="DELETE" /> }
            <Outlet />
            <Modal
                show={true}
                fullscreen
                centered
                scrollable
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>ADD CURRICULUM</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid' style={{ width: '1700px' }}>
                        <div className='card shadow p-4 m-5'>
                            <form onSubmit={handleSubmitCurriculum}>
                                <div className='row'>
                                    <div className='col-9 mt-2'>
                                        <h6>Title</h6>
                                        <input type='text' className='form-control' name='curriculum_title' id='curriculum_title' onChange={inputData} disabled={ifSuccess} />
                                    </div>
                                    <div className='col-3 mt-2' >
                                        <h6>Program</h6>
                                        <select className='form-control' name='curriculum_programno' id='curriculum_programno' onChange={inputData} disabled={ifSuccess} >
                                            <option></option>
                                            {
                                                programList && programList.map((item, index) => (
                                                    <option key={index} value={item.proNo}>{item.proCode}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6 mt-2'>
                                        <h6>Long Title</h6>
                                        <textarea className='form-control' name='curriculum_longtitle' id='curriculum_longtitle' onChange={inputData} disabled={ifSuccess} ></textarea>
                                    </div>
                                    <div className='col-6 mt-2'>
                                        <h6>Remarks</h6>
                                        <textarea className='form-control' name='curriculum_remarks' id='curriculum_remarks' onChange={inputData} disabled={ifSuccess} ></textarea>
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <h6>Description</h6>
                                        <textarea className='form-control' name='curriculum_description' id='curriculum_description' onChange={inputData} disabled={ifSuccess} ></textarea>
                                    </div>
                                    <div className='col-12 mt-2 text-center'>
                                        <button className='btn btn-primary m-3' style={{width: '100px'}} disabled={ifSuccess} >SAVE</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {
                            ifSuccess ? 
                            <>
                                <div className='card shadow p-4 m-5'>
                                    <button className='btn btn-primary' style={{width: '145px'}} onClick={() => setAddSubjectModalStatus(true)} >NEW COURSE</button>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>YEAR</th>
                                                <th>SEMESTER</th>
                                                <th>COURSE CODE</th>
                                                <th>COURSE TITLE</th>
                                                <th>LEC HOURS</th>
                                                <th>LAB HOURS</th>
                                                <th>UNITS</th>
                                                <th>COREQUISITE</th>
                                                <th>PREREQUISITE</th>
                                                <th>XGWA?</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                curriculumDetailsList && curriculumDetailsList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.Year}</td>
                                                        <td>{item.Sem}</td>
                                                        <td>{item.CourseCode}</td>
                                                        <td>{item.CourseTitle}</td>
                                                        <td>{item.LecHours}</td>
                                                        <td>{item.LabHours}</td>
                                                        <td>{item.Units}</td>
                                                        <td>{item.Corequisite === null ? "-" : item.Corequisite}</td>
                                                        <td>{item.Prerequisite === null ? "-" : item.Prerequisite}</td>
                                                        <td>{Boolean(item.ExcludedInTheGWA) === true ? 'Yes' : 'No'}</td>
                                                        <td className='text-center'>
                                                            <button className='btn' onClick={() => handleGetNo(item.CDetailNo, item.Units)}>
                                                                <img width={'23px'} src={deleteIcon} alt='Delete Icon' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                            :
                            null
                        }
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link className='btn btn-secondary' to={`../`}>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddCurriculum
