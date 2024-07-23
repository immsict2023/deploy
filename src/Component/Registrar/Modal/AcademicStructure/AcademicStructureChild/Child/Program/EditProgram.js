import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Encryptor from '../../../../../../../Tools/Encryptor'
import view from '../../../../../../Controller/AcademicStructure/view'
import updateActiveClass from '../../../../../../Controller/Others/update'
import UpdateProgramConfirmation from '../ConfirmationModal/UpdateProgramConfirmation'

function EditProgram() {

    const { id } = useParams()
    const [ programList, setProgramList ] = useState([])
    const [ departmentList, setDepartmentList ] = useState([])
    const [ programListOnly, setProgramListOnly ] = useState([])
    const [ ifEditMode, setIfEditMode ] = useState(false)
    const [ isActive, setIsActive ] = useState([])
    const [ modalStatusUpdate, setModalStatusUpdate ] = useState(false)

    const handleIsActive = (e) => {
        e.preventDefault()
        const data = {
            idno: Encryptor.decryptInformation(id),
            value: e.target.checked,
            tableName: 'program',
            columnName: 'programno'
        }
        updateActiveClass.updateActive(data)
        .then((res) => {
            if (Number(res.data.affectedRows) > 0 && Number(res.data.changedRows) > 0) {
                if (!e.target.checked) {
                    alert('Successfully Update to Active!')
                } else {
                    alert('Successfully Update to Inactive!')
                }
            } else {
                alert('Unsuccessfully Update!')
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const getProgramListFunc = () => {
        view.getProgramList()
        .then((res) => {
            const data = res.data.rows;
            for (var i = 0; i < data.length ; i++) {
                if (Number(data[i].proNo) === Number(Encryptor.decryptInformation(id))) {
                    setProgramList({
                        proCode: data[i].proCode,
                        proDes: data[i].proDes,
                        proNo: data[i].proNo,
                        proTitle: data[i].proTitle,
                        degreeNo: data[i].degreeNo,
                        deptNo: data[i].deptNo
                    })
                }
            }
            
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const getProgramListFuncIsActive = () => {
        view.getProgramList()
        .then((res) => {
            const data = res.data.rows;
            for (var i = 0; i < data.length ; i++) {
                if (Number(data[i].proNo) === Number(Encryptor.decryptInformation(id))) {
                    setIsActive({isActive: data[i].isActive})
                }
            }
            
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setIfEditMode(false)
    }

    const handleEditMode = (e) => {
        e.preventDefault()
        setIfEditMode(true)
    }
    
    const getDepartmentListFunc = () => {
        view.getDepartmentList()
        .then((res) => {
            setDepartmentList(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const getProgramListOnlyFunc = () => {
        view.getProgramListOnly()
        .then((res) => {
            setProgramListOnly(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const inputData = (e) => {
        setProgramList({
            ...programList,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitProgram = (e) => {
        e.preventDefault()
        setModalStatusUpdate(true)
    }

    useEffect(() => {
        getProgramListFunc()
        getDepartmentListFunc()
        getProgramListOnlyFunc()
    }, [id])

    useEffect(() => {
        getProgramListFuncIsActive()
    })

    return (
        <>
            { modalStatusUpdate && <UpdateProgramConfirmation modalStatus={modalStatusUpdate} setModalStatus={setModalStatusUpdate} data={programList} /> }
            <Modal
                show={true}
                size='xl'
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='text-center'>
                        <h5>EDIT PROGRAM</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <form noValidate={false} onSubmit={handleSubmitProgram}>
                            <div className='card shadow p-3 m-3'>   
                                <div className='row'>
                                    <div className='col-6'>
                                        <h6>Degree</h6>
                                        <select className='form-control' value={programList.degreeNo} name='degreeNo' id='degreeNo' required onChange={inputData} disabled={!ifEditMode}>
                                            {
                                                programListOnly && programListOnly.map((item, index) => (
                                                    <option key={index} value={item.DegreeNo}>{item.Label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <h6>Code</h6>
                                        <input type='text' defaultValue={programList.proCode && programList.proCode} className='form-control' name='proCode' id='proCode' required onChange={inputData} disabled={!ifEditMode} />
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <h6>Title</h6>
                                        <input className='form-control' defaultValue={programList.proTitle && programList.proTitle} name='proTitle' id='proTitle' required onChange={inputData} disabled={!ifEditMode} />
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <h6>Description</h6>
                                        <textarea className='form-control' defaultValue={programList.proDes && programList.proDes} name='proDes' id='proDes'required onChange={inputData} disabled={!ifEditMode}></textarea>
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <h6>Department</h6>
                                        <select className='form-control' value={programList.deptNo && programList.deptNo} name='deptNo' id='deptNo' required onChange={inputData} disabled={!ifEditMode}>
                                            <option></option>
                                            {
                                                departmentList && departmentList.map((item, index) => (
                                                    <option key={index} value={item.departmentNo} >{item.departmentName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-12 mt-1'>
                                        <label><input onChange={handleIsActive} type='checkbox' defaultChecked={isActive.isActive && isActive.isActive} name='isactive' id='isactive' className='me-2' />Active</label>
                                    </div>
                                    <div className='col-12 text-center mt-3'>
                                        {
                                            ifEditMode ?
                                            <>
                                                <button onClick={handleCancel} style={{ width: '80px' }} className='btn btn-secondary me-2' required>Cancel</button>
                                                <button type='submit' className='btn btn-primary' style={{ width: '80px' }}>Update</button>
                                            </> 
                                            :
                                            <>
                                                <button onClick={handleEditMode} style={{ width: '80px' }} className='btn btn-primary' required>Edit</button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to={`../`} className='btn btn-secondary me-1'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}
 
export default EditProgram