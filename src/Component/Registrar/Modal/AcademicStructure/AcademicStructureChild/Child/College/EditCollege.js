import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { CollegeData } from '../../../../../../Controller/view/others'
import config from '../../../../../../Security/config'
import axios from 'axios'
import update from '../../../../../../Controller/AcademicStructure/update'
import updateActiveClass from '../../../../../../Controller/Others/update'
import Encryptor from '../../../../../../../Tools/Encryptor'

function EditCollege() {

    const navigate = useNavigate()
    const { collegeno } = useParams()
    const [ data, setData ] = useState([])
    const [ collegeData, setCollegeData ] = useState([])
    const [ editMode, setEditMode ] = useState(false)

    const inputData = (e) => {
        e.preventDefault()
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = (e) => {
        e.preventDefault() 
        if (Boolean(editMode)) {
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const dataInputed = {
            name: data.college_name && String(data.college_name).length > 0 ? String(data.college_name) : String(collegeData.college_name),
            code: data.college_code && String(data.college_code).length > 0 ? String(data.college_code) : String(collegeData.college_code),
            active: data.college_active && String(data.college_active).length > 0 ? Boolean(data.college_active) : Boolean(collegeData.college_active),
            collegeno: Encryptor.decryptInformation(collegeno)
        }
        console.log(dataInputed)
        try {
            update.updateCollege(dataInputed)
            .then((res) => {
                if (res.error && res.error.errno === 1062) {
                    alert('Code is already Existed!');
                }
                console.log(res)
                if (res.success && Number(res.response.affectedRows) > 0 && Number(res.response.changedRows) > 0) {
                    alert('Successfully Updated!')
                    navigate('../')
                }
            })
            .catch((err) => {
                console.error(err.message)
            })
        } catch(err) {
            console.error(err.message)
        }
    }

    const handleActiveChange = (e) => {
        const data = {
            idno: Encryptor.decryptInformation(collegeno),
            value: e.target.checked,
            tableName: 'college',
            columnName: 'collegeno'
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
    
    const getCollegeData = (axios, config) => {
        CollegeData(axios, config)
        .then((res) => {
            res.rows.forEach((item) => {
                if (String(item.collegeno) === String(Encryptor.decryptInformation(collegeno))) {
                    setCollegeData({
                        ...data,
                        college_name: item.name,
                        college_code: item.code,
                        college_active: item.isactive.data[0],
                        collegeno: collegeno
                    })
                }
            });
        })
        .catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getCollegeData(axios, config)
    })

    return (
        <>
            <Modal
                show={true}
                size='lg'
                centered
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='text-center'>
                        <h5>EDIT COLLEGE</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid'>
                        <form onSubmit={handleSubmit} noValidate={false}>
                            <div className='card shadow p-3 m-3'>   
                                <div className='row'>
                                    <div className='col-8'>
                                        <h6>Name</h6>
                                        <input className='form-control' type='text' name='college_name' id='college_name' onChange={inputData} defaultValue={collegeData.college_name} disabled={!editMode} required />
                                    </div>
                                    <div className='col-4'>
                                        <h6>Code</h6>
                                        <input className='form-control' type='text' name='college_code' id='college_code' defaultValue={collegeData.college_code} onChange={inputData} disabled={!editMode} required />
                                    </div>
                                    <div className='col-3 mt-3'>
                                    <label>
                                        <input type='checkbox' checked={collegeData.college_active} onChange={handleActiveChange}/>Active</label>
                                    </div>
                                    <div className='col-12 text-center'>
                                        {
                                            editMode === true ? 
                                            <>
                                                <button style={{ width: '100px' }} className='btn btn-secondary me-2' onClick={handleEdit}>CANCEL</button>
                                                <input style={{ width: '100px' }} type='submit' className='btn btn-primary' value='UPDATE' />
                                            </>
                                            :
                                            <>
                                                <button style={{ width: '100px' }} className='btn btn-primary' onClick={handleEdit}>EDIT</button>
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
                        <Link className='btn btn-secondary' to={'../'}>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default EditCollege
