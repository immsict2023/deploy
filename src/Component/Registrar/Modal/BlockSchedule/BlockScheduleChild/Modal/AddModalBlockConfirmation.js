import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loadings from '../../../../../Loadings/Loadings'
import create from '../../../../../Controller/Blockschedule/create'

function AddModalBlockConfirmation(props) {
    
    const [loadingStatus, setLoadingStatus] = useState(false)

    const {modalStatus, setModalStatus , data, response } = props

    const navigate = useNavigate()
    
    const handleSaveData = () => {
        console.log(data)
        try {
            setLoadingStatus(true)
            create.createBlockSchedule(data)
            .then((res) => {
                console.log(res)
                if (Boolean(res.data.success) === true) {
                    if (Number(res.data.res.affectedRows) > 0) {
                        alert('Successfully Created Block!')
                        navigate(`?BlockID=${data.Block}`);
                        response(true)
                        setModalStatus(false)
                    } else {
                        response(false)
                    }
                } else {
                    response(false)
                }
            }).catch((err) => {
                response(false)
                alert(err.message);
            });
            setLoadingStatus(false)
            setModalStatus(false)
        } catch(err) {
            console.log(err)
        }
    }

    const handleCancel = () => {
        setModalStatus(false)
    }
    
    return (
        <>
            { loadingStatus && <Loadings loadingStatus={loadingStatus} /> }
            <Modal
                centered
                show={modalStatus}
                onHide={setModalStatus}
            >
                <ModalHeader>
                    <h6>Confirmation</h6>
                </ModalHeader>
                <ModalBody>
                    <label>Are you sure you wan't to continue save new block?</label>
                </ModalBody>
                <ModalFooter>
                    <button onClick={handleCancel} className='btn btn-secondary'>No</button>
                    <button onClick={handleSaveData} className='btn btn-primary'>Yes</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddModalBlockConfirmation
