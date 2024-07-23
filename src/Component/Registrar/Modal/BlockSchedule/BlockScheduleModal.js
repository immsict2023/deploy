import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import viewAcademic from '../../../Controller/AcademicStructure/view'
import view from '../../../Controller/Blockschedule/view'
import AddModalBlockConfirmation from './BlockScheduleChild/Modal/AddModalBlockConfirmation'
import AddBlockScheduleModal from './BlockScheduleChild/Modal/AddBlockScheduleModal'
import { militaryToStandardTime } from '../../../../Tools/date'
import { useLocation } from 'react-router-dom'
import DeleteSubjectSchedule from './BlockScheduleChild/Modal/DeleteSubjectSchedule'

function BlockScheduleModal() {

    const [blockScheduleData, setBlockScheduleData] = useState({ Program: "", Semester: "", AY: "", BlockType: "REG", Year: "", ProCourse: "", Curriculum: "", Section: "", Block: "" })
    const [program, setProgram] = useState([])
    const [year, setYear] = useState([])
    const [curriculum, setCurriculum] = useState([])
    const [flagCount, setFlagCount] = useState(0)
    const [addBlockStatusModal, setAddBlockStatusModal] = useState(false)
    const [statusIfSuccessfullyCreated, setStatusIfSuccessfullyCreated] = useState(false)
    const [addBlockScheduleModalStatus, setAddBlockScheduleModalStatus] = useState(false)
    const [subjectScheduleList, setSubjectScheduleList] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [deleteSubjectScheduleModal, setDeleteSubjectScheduleModal] = useState(false)

    const [getSectionList, setSectionList] = useState([])

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const BlockID = params.get('BlockID')

    const generateYear = () => {
        const temp = []
        for (var i = new Date().getFullYear(); i >= 2015; i--) {
          temp.push(`${i}-${i+1}`)
        }
        setYear(temp)
      }

    const inputData = (e) => {
        const { name, value } = e.target;
        if (String(name) === 'Program') {
            getCurriculumListFunc(value)
            for (let i = 0; i < program.length; i++) {
                if (Number(program[i].proNo) === Number(value)) {
                    setBlockScheduleData({
                        ...blockScheduleData,
                        ProCourse: program[i].proCode,
                        [name]: value
                    })
                }
            }
        } else {
            setBlockScheduleData({
                ...blockScheduleData,
                [name]: value
            })
        }

        if (String(name) === "Program" || String(name) === "Semester" || String(name) === "AY" || String(name) === "BlockType" || String(name) === "Year" || String(name) === "Curriculum") {
            setFlagCount(flagCount + 1)
        }
    }

    const getCurriculumListFunc = (ProgramNo) => {
        viewAcademic.getCurriculumListByProgram(ProgramNo).then((res) => {
            setCurriculum(res.data.rows && res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    const handleSubmit = () => {
        console.log(blockScheduleData)
        if (String(blockScheduleData.Program).length > 0 && String(blockScheduleData.Semester).length > 0 && String(blockScheduleData.AY).length > 0 && String(blockScheduleData.BlockType).length > 0 && String(blockScheduleData.Year).length > 0 && String(blockScheduleData.Curriculum).length > 0 ) {
            setAddBlockStatusModal(true);
        } else {
            alert("Please fillup all Fields!");
        }
    }

    const handleReceiveData = (data) => {
        setStatusIfSuccessfullyCreated(data)
    }

    const getSubjectScheduleFunc = () => {
        view.getSubjectSchedule({BlockID}).then((res) => {
            setSubjectScheduleList(res.data.rows)
        }).catch((err) => {
            console.log(err)
        })
    }

    const selectToDelete = (id) => {
        setSelectedItem({ ScheduleNo: id })
        setDeleteSubjectScheduleModal(true)
    }

    const getProgramListFunc = () => {
        viewAcademic.getProgramList().then((res) => {
            setProgram(res.data.rows)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
            event.preventDefault();
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    useEffect(() => {
        generateYear()
        getProgramListFunc()
    }, [])

    useEffect(() => {
        getSubjectScheduleFunc()
    })

    useEffect(() => {
        if (String(blockScheduleData.Program).length > 0 && String(blockScheduleData.Semester).length > 0 && String(blockScheduleData.AY).length > 0 && String(blockScheduleData.BlockType).length > 0 && String(blockScheduleData.Year).length > 0 && String(blockScheduleData.Curriculum).length > 0 ) {
            view.getPossibleBlockID(blockScheduleData).then((res) => {
                const block = res.data.section;
                if (String(block).length > 0) {
                    const section = String(block).split('-');
                    setBlockScheduleData({
                        ...blockScheduleData,
                        Block: block,
                        Section: `${section[1] && section[1]}-${section[2] && section[2]}`
                    })
                }
            }).catch((err) => {
                console.error(err)
            })
            
            view.getSectionList(blockScheduleData).then((res) => {
                setSectionList(res.data.rows);
            }).catch((err) => {
                console.log(err);
            })
        }

    }, [flagCount])

    return (
        <>
        { deleteSubjectScheduleModal && <DeleteSubjectSchedule modalStatus={deleteSubjectScheduleModal} setModalStatus={setDeleteSubjectScheduleModal} data={selectedItem} /> }
        { addBlockStatusModal && <AddModalBlockConfirmation modalStatus={addBlockStatusModal} setModalStatus={setAddBlockStatusModal} data={blockScheduleData} response={handleReceiveData} /> }
        { addBlockScheduleModalStatus && <AddBlockScheduleModal modalStatus={addBlockScheduleModalStatus} setModalStatus={setAddBlockScheduleModalStatus} data={blockScheduleData} /> }
            <Modal
                show={true}
                fullscreen
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>ADD NEW BLOCK SCHEDULE</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid' style={{ width: "1500px" }}>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='card shadow m-3 p-3'>
                                    <div className='row'>
                                        <div className='col-2 mt-2'>
                                            <h6>Block</h6>
                                            <input className='form-control border-0' name='Block' id='Block' defaultValue={blockScheduleData.Block && blockScheduleData.Block} disabled />
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6>Program</h6>
                                            <select onChange={inputData} className='form-control' name='Program' id='Program' disabled={statusIfSuccessfullyCreated}>
                                                <option></option>
                                                {
                                                    program && program.map((item, index) => (
                                                        <option key={index} value={item.proNo}>{item.proCode}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6>Semester</h6>
                                            <select onChange={inputData} className='form-control' name='Semester' id='Semester' disabled={statusIfSuccessfullyCreated}>
                                                <option></option>
                                                <option value='1ST'>1ST</option>
                                                <option value='2ND'>2ND</option>
                                                <option value='3RD'>3RD</option>
                                                <option value='SUM'>SUM</option>
                                            </select>
                                        </div>
                                        
                                        <div className='col-2 mt-2'>
                                            <h6>Year</h6>
                                            <select onChange={inputData} className='form-control' name='Year' id='Year' disabled={statusIfSuccessfullyCreated}>
                                                <option></option>
                                                <option value={1}>1st Year</option>
                                                <option value={2}>2nd Year</option>
                                                <option value={3}>3rd Year</option>
                                                <option value={4}>4th Year</option>
                                            </select>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6>AY</h6>
                                            <select onChange={inputData} className='form-control' name='AY' id='AY' disabled={statusIfSuccessfullyCreated}>
                                                <option></option>
                                                {
                                                    year && year.map((item, index) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6>Block Type</h6>
                                            <select onChange={inputData} className='form-control' name='BlockType' id='BlockType' disabled={statusIfSuccessfullyCreated}>
                                                <option></option>
                                                <option value={'REG'}>REGULAR</option>
                                                <option value={'IRREG'}>IRREGULAR</option>
                                            </select>
                                        </div>
                                        <div className='col-2 mt-2'>
                                            <h6>Section</h6>
                                            <input className='form-control' name='Section' defaultValue={blockScheduleData.Section && blockScheduleData.Section} disabled/>
                                        </div>
                                        {
                                            /*
                                                blockScheduleData.BlockType === 'REG' ?
                                                (  
                                                    <div className='col-2 mt-2'>
                                                        <h6>Section</h6>
                                                        <input className='form-control border-0' name='Section' defaultValue={blockScheduleData.Section && blockScheduleData.Section} disabled/>
                                                    </div>
                                                )
                                                :
                                                    <div className='col-2 mt-2'>
                                                        <h6>Section</h6>
                                                        <select onChange={inputData} className='form-control' name='Section'>
                                                            <option></option>
                                                            {
                                                                getSectionList && getSectionList.map((item, index) => (
                                                                    <option key={index} value={item.Section}>{item.Section}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                            */
                                        }
                                        <div className='col-4 mt-2'>
                                            <h6>Curriculum</h6>
                                            <select onChange={inputData} className='form-control' name='Curriculum' id='Curriculum' disabled={statusIfSuccessfullyCreated}>
                                                <option></option>
                                                {
                                                    curriculum && curriculum.map((item, index) => (
                                                        <option key={index} value={item.curriculumnoCurr}>{item.titleCurr}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-12 text-center m-4'>
                                            <button onClick={handleSubmit} className='btn btn-primary' disabled={statusIfSuccessfullyCreated}>CREATE BLOCK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='card shadow m-3 p-3'>
                                    <div className='container-fluid'>
                                        <button className='btn btn-primary mt-3 mb-3' onClick={() => setAddBlockScheduleModalStatus(true)} disabled={!statusIfSuccessfullyCreated}>ADD SCHEDULE</button>
                                    </div>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Course Code</th>
                                                <th>Room</th>
                                                <th>Time From</th>
                                                <th>Time Span</th>
                                                <th>Days</th>
                                                <th>Units</th>
                                                <th>Unit Fee</th>
                                                <th>Instructor</th>
                                                <th>XGWA?</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                subjectScheduleList && subjectScheduleList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.ScheduleNo}</td>
                                                        <td>{item.CourseCode}</td>
                                                        <td>{item.RoomID}</td>
                                                        <td>{militaryToStandardTime(item.TimeFrom)}</td>
                                                        <td>{item.TimeSpan} Hours</td>
                                                        <td>{item.Days}</td>
                                                        <td>{item.Units}</td>
                                                        <td>{item.UnitFee}</td>
                                                        <td>{item.LastName}, {item.FirstName} {item.MiddleName}</td>
                                                        <td>{Boolean(item.ExcludedInTheGWA) === true ? "Yes" : "No"}</td>
                                                        <td><button onClick={() => selectToDelete(item.ScheduleNo)} className='btn-danger'>DELETE</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to='../' className='btn btn-secondary'>Close</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default BlockScheduleModal
