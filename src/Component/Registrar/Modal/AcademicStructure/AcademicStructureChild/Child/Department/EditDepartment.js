import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import view from '../../../../../../Controller/AcademicStructure/view'
import Encryptor from '../../../../../../../Tools/Encryptor'
import updateActiveClass from '../../../../../../Controller/Others/update'


function EditDepartment() {

    const { id } = useParams()
    const [ departmentList, setDepartmentList ] = useState([])
    const [ collegeList, setCollegeList ] = useState([])
    const [ editMode, setEditMode ] = useState(false)

    const getDepartmentListFunc = () => {
        view.getDepartmentList()
        .then((res) => {
            const data = res.data.rows;
            console.log(res.data.rows)
            for (let i = 0; i < data.length; i++) {
                if (Number(data[i].departmentNo) === Number(Encryptor.decryptInformation(id))) {
                    setDepartmentList({
                        ...departmentList,
                        collegeCode: data[i].collegeCode,
                        departmentCode: data[i].departmentCode,
                        departmentIsActive: data[i].departmentIsActive,
                        departmentName: data[i].departmentName,
                        collegeNo: data[i].collegeNo,
                        isActive: data[i].isActive
                    })
                }
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const handleChangeActive = (e) => {
        const data = {
            idno: Encryptor.decryptInformation(id),
            value: e.target.checked,
            tableName: 'department',
            columnName: 'departmentno'
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

    const handleEditMode = (e) => {
        e.preventDefault()
        setEditMode(true)
    }

    const getCollegeListFunc = () => {
        view.getCollege()
        .then((res) => {
            setCollegeList(res.data.rows)
            console.log(res.data.rows)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getDepartmentListFunc()
        getCollegeListFunc()
    }, [])

    return (
        <>
            <Modal
                show={true} 
                centered
                size='lg'
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>EDIT DEPARTMENT</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <form>
                            <div className='card shadow m-2 p-3'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <h6>Code</h6>
                                        <input type='text' defaultValue={departmentList.departmentCode} className='form-control' name='department_code' id='department_code' disabled={!editMode} />
                                    </div>
                                    <div className='col-6'>
                                        <h6>College</h6>
                                        <select className='form-control' name='department_college' value={departmentList.collegeNo} id='department_college' disabled={!editMode} >
                                            <option></option>
                                            {
                                                collegeList && collegeList.map((item, index) => (
                                                    <option key={index} value={item.CollegeNo}>{`(${item.Code}) ${item.Name}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <h6>Name</h6>
                                        <input type='text' defaultValue={departmentList.departmentName} className='form-control' name='department_name' id='department_name' disabled={!editMode} />
                                    </div>
                                    {
                                        Boolean(editMode) ?
                                        (
                                            <div className='col-12 text-center mt-3'>
                                                <Link to={`../`} style={{width: '80px'}} className='btn btn-secondary me-2'>Cancel</Link>
                                                <button style={{width: '80px'}} className='btn btn-primary me-2'>SAVE</button>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className='col-12 text-center mt-3'>
                                                <button style={{width: '80px'}} onClick={handleEditMode} className='btn btn-primary me-2'>EDIT</button>
                                            </div>
                                        )
                                    }
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link to={`../`} style={{width: '80px'}} className='btn btn-secondary'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default EditDepartment
