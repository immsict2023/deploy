import React, { useState }  from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import create from '../../../../../Controller/Personnel/create'
import { useNavigate } from 'react-router-dom'
import Loadings from '../../../../../Loadings/Loadings'


function CreatePersonnelConfirmation(props) {

    const [isLoadings, setIsLoadings ] = useState(false)
    const { modalStatus, setModalStatus, data } = props
    const navigate = useNavigate();

    const handleSubmitPersonnel = () => {
        setIsLoadings(true)
        create.createPersonnel(data).then((res) => {
            console.log(res)
            if (res.data.success) {
                if (Number(res.data.data.affectedRows) > 0) {
                    alert('Successfully Inserted New Personnel!')
                    setModalStatus(false)
                    navigate('?information=1&background=0')
                } else {
                    alert('Unsucessful Insert!')
                }
                setIsLoadings(false)
            }
            if (!Boolean(res.data.success)) {
                alert(res.data.error)
                setIsLoadings(false)
            }
        }).catch((err) => {
            console.error(err)
        })
    }

  return (
    <>
    { isLoadings && <Loadings loadingStatus={isLoadings} />}
        <Modal
                centered
                show={modalStatus}
                onHide={setModalStatus}
            >
            <ModalHeader>
                <h6>Confirmation</h6>
            </ModalHeader>
            <ModalBody>
                <label>Are you sure you wan't to continue save?</label>
            </ModalBody>
            <ModalFooter>
                <button style={{ width: '90px' }} onClick={() => setModalStatus(false)} className='btn btn-secondary'>No</button>
                <button style={{ width: '90px' }} onClick={handleSubmitPersonnel} className='btn btn-primary'>Yes</button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default CreatePersonnelConfirmation