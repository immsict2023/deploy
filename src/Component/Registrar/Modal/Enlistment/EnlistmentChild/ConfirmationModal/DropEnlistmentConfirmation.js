import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import update from '../../../../../Controller/Enlistment/update'
import create from '../../../../../Controller/Enlistment/create';

function DropEnlistmentConfirmation(props) {

    const { modalStatus, setModalStatus , data, onSuccessCount, count, mData, matriculationChangeExist } = props;
    
    const handleSaveData = async () => {
        try {
            const res = await update.updateDropEnlistmentDetails(data)
            if (res.data.success) {
                if (res.data.res.affectedRows > 0) {
                    alert('Successfully Dropped!')
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
                    setModalStatus(false)
                } else {
                    alert('Unsuccessful Drop!')
                    setModalStatus(false)
                    onSuccessCount(count)
                }
            } else {
                alert('Something Error! Please Contact the Software Developer!')
                setModalStatus(false)
                onSuccessCount(count)
            }
        } catch(err) {
            console.error(err)
        }
    }  

    const handleCancel = () => {
        setModalStatus(false)
        onSuccessCount(count)
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
                    <label>Are you sure you wan't to continue Drop Subject?</label>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <button onClick={handleCancel} className='btn btn-secondary'>No</button>
                    <button onClick={handleSaveData} className='btn btn-primary'>Yes</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default DropEnlistmentConfirmation
