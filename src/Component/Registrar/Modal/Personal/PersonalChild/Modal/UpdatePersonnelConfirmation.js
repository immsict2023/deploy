import React  from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import update from '../../../../../Controller/Personnel/update'
import { useNavigate } from 'react-router-dom'

function UpdatePersonnelConfirmation(props) {

    const { modalStatus, setModalStatus, data0, data1, currentPage } = props
    const navigate = useNavigate();

    const handleSubmitPersonnel = () => {
        switch(currentPage) {
            case 0:
                update.updatePersonnelInformation(data0).then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        if (Number(res.data.result.affectedRows) > 0) {
                            alert('Successfully Update Personnel Information!')
                            navigate('../')
                        } else {
                            alert('Unsucessful Update!')
                        }
                    }
                    if (!Boolean(res.data.success)) {
                        alert('Server Error: Please Contact the Software Developer!')
                        console.log(res.data.err)
                    }
                }).catch((err) => {
                    console.error(err)
                })
                break;
            case 1:
                update.updatePersonnelBackground(data1).then((res) => {
                    if (res.data.success) {
                        if (Number(res.data.result.affectedRows) > 0) {
                            alert('Successfully Update Personnel Background!')
                            navigate('../')
                        } else {
                            alert('Unsucessful Update Personnel Background!')
                        }
                    }
                    if (!Boolean(res.data.success)) {
                        alert('Server Error: Please Contact the Software Developer!')
                        console.log(res.data.err)
                    }
                }).catch((err) => {
                    console.error(err)
                })
                break;
            default:
                alert('Invalid Select!')
        }
    }

  return (
    <>
        <Modal
                centered
                show={modalStatus}
                onHide={setModalStatus}
            >
            <ModalHeader>
                <h6>Confirmation</h6>
            </ModalHeader>
            <ModalBody>
                <label>Are you sure you wan't to continue update?</label>
            </ModalBody>
            <ModalFooter>
                <button style={{ width: '90px' }} onClick={() => setModalStatus(false)} className='btn btn-secondary'>No</button>
                <button style={{ width: '90px' }} onClick={handleSubmitPersonnel} className='btn btn-primary'>Yes</button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default UpdatePersonnelConfirmation