import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import update from '../../../../../Controller/Enlistment/update'
import create from '../../../../../Controller/Enlistment/create'

function DropFeesConfirmation(props) {

    const { modalStatus, setModalStatus , data, onSuccessCount, count, mData, matriculationChangeExist  } = props
    
    const handleSaveData = async () => {
        const res = await update.updateDropRegFeesDetails(data)
        if (res.data.success) {
            if (Number(res.data.res.affectedRows) > 0 && Number(res.data.res.changedRows)  > 0) {
                alert("Successfully Dropped!")
                switch(matriculationChangeExist) {
                    case true:
                        try {
                            const resMCUpdate = await update.updateMatriculationChange(mData)
                            if (resMCUpdate.data.success) {
                                if (resMCUpdate.data.res.affectedRows === 0) {
                                    alert('Unsuccessful Update the Matriculation Change! ')
                                } else {
                                    onSuccessCount(count + 1)
                                }
                            }
                        } catch(err) {
                            console.log(err)
                        }   
                        break;
                    case false:
                        try {
                            const resMCCreate = await create.createMatriculationChange(mData)
                            console.log(resMCCreate)
                            if (resMCCreate.data.success) {
                                if (resMCCreate.data.res.affectedRows === 0) {
                                    alert('Unsuccessful Creating the Matriculation Change! ')
                                } else {
                                    onSuccessCount(count + 1)
                                }
                            }
                        } catch(err) {
                            console.error(err)
                        }
                        break;
                    default:
                        alert("Invalid Update!")
                }
            }
        } else {
            alert("Server Error! Please Contact the Software Developer!")
        }
        setModalStatus(false)
    }

    const handleCancel = () => {
        setModalStatus(false)
    }

    return (
        <>
            <Modal
                centered
                show={modalStatus}
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <h6>Confirmation</h6>
                </ModalHeader>
                <ModalBody>
                    <label>Are you sure you wan't to continue Drop Fees                                                                                         ?</label>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <button onClick={handleCancel} className='btn btn-secondary'>No</button>
                    <button onClick={handleSaveData} className='btn btn-primary'>Yes</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default DropFeesConfirmation
