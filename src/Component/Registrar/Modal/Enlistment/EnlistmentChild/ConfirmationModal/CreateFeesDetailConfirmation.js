import React from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import update from '../../../../../Controller/Enlistment/update'
import create from '../../../../../Controller/Enlistment/create';

function CreateFeesDetailConfirmation(props) {

    const { modalStatus, setModalStatus, onSuccessCount, count, tempMatriculationChange, newFeeDetailsValidated, matriculationChangeExist } = props;
    
    const handleSaveData = async () => {
        
        const newFeesRes = await create.createNewFeeDetail(newFeeDetailsValidated)
        
        if (Boolean(newFeesRes.data.success) === true) {
            if (newFeesRes.data.res.affectedRows > 0) {
                alert("Successfully Inserting New Fee!")
                switch(matriculationChangeExist) {
                    case true:
                        const updateMatriculationRes = await update.updateMatriculationChange(tempMatriculationChange)
                        console.log(updateMatriculationRes)
                        if (Boolean(updateMatriculationRes.data.success) === false) {
                            alert("Error: Updating Matriculation Change! Please Contact the Software Developer!")
                        } else {
                            onSuccessCount(count+1)
                        }
                        break;
                    case false: 
                        const createMatriculationRes = await create.createMatriculationChange(tempMatriculationChange)
                        console.log(tempMatriculationChange)
                        console.log(createMatriculationRes)
                        if (Boolean(createMatriculationRes.data.success) === false) {
                            alert("Error: Updating Matriculation Change! Please Contact the Software Developer!")
                        } else {
                            onSuccessCount(count+1)
                        }
                        break; 
                    default:
                        alert("Error: This form will close!")
                        setModalStatus(false)
                }
                
            }
        } else {
            alert("Error: Inserting new Fees! Please Contact the Software Developer!")
        }
        setModalStatus(false)
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
                    <label>Are you sure you wan't to continue Add New Fee?</label>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <button onClick={handleCancel} className='btn btn-secondary'>No</button>
                    <button onClick={handleSaveData} className='btn btn-primary'>Yes</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default CreateFeesDetailConfirmation
