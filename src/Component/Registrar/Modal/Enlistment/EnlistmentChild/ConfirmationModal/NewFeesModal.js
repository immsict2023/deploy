import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'react-bootstrap'
import viewAcademic from '../../../../../Controller/AcademicStructure/view'
import CreateFeesDetailConfirmation from './CreateFeesDetailConfirmation'

function NewFeesModal(props) {

  const { modalStatus, setModalStatus, onSuccessCount, count, matriculationChange, studentEnlistmentInfo, matriculationChangeExist } = props

  const [feeType, setFeeType] = useState([])
  const [studentEnlistmentInfoData, setStudentEnlistmentInfoData] = useState(studentEnlistmentInfo)
  const [tempMatriculationChange, setTempMatriculationChange] = useState(matriculationChange)
  const [newFeeDetailsValidated, setNewFeeDetailsValidated] = useState([])

  const [defaultCount, setDefaultCount] = useState(null)

  const defaultFlag = count;

  const [modalStatusFeeDetail, setModalStatusFeeDetail] = useState(false)

  const feeTypeItems =["LF", "MF", "OF", "TAAF"]

  const getRegistrationFeeTypeFunc = () => {
    try {
      console.log(matriculationChange)
      viewAcademic.getRegistrationFeeType().then((res) => {
        setFeeType(res.data.rows)
      }).catch((err) => {
        console.error(err)
      })
    } catch(err) {
      console.error(err)
    }
  }

  const inputData = (e) => {
    if (String(e.target.value).length > 0) {
      setStudentEnlistmentInfoData({
        ...studentEnlistmentInfoData,
        [e.target.name]: e.target.value
      })
    } else {
      setStudentEnlistmentInfoData({
        ...studentEnlistmentInfoData,
        [e.target.name]: "NULL"
      })
    }
    
    
    if (String(e.target.name) === "amount") {

      if (String(studentEnlistmentInfoData.feetype) === "LF") {
        setTempMatriculationChange({
          ...matriculationChange,
          addedlabfees: Number(matriculationChange.addedlabfees) + Number(e.target.value),
          addedtuitionandfees: Number(matriculationChange.addedtuitionandfees) + Number(e.target.value),
          totaldue: Number(matriculationChange.totaldue) + Number(e.target.value)
        })
      }
      if (String(studentEnlistmentInfoData.feetype) === "MF") {
        setTempMatriculationChange({
          ...matriculationChange,
          addedmiscfees: Number(matriculationChange.addedmiscfees) + Number(e.target.value),
          addedtuitionandfees: Number(matriculationChange.addedtuitionandfees) + Number(e.target.value),
          totaldue: Number(matriculationChange.totaldue) + Number(e.target.value)
        })
      }
      if (String(studentEnlistmentInfoData.feetype) === "OF") {
        setTempMatriculationChange({
          ...matriculationChange,
          addedotherfees: Number(matriculationChange.addedotherfees) + Number(e.target.value),
          addedtuitionandfees: Number(matriculationChange.addedtuitionandfees) + Number(e.target.value),
          totaldue: Number(matriculationChange.totaldue) + Number(e.target.value)
        })
      }
      if (String(studentEnlistmentInfoData.feetype) === "TAAF") {
        setTempMatriculationChange({
          ...matriculationChange,
          addedtaaf: Number(matriculationChange.addedtaaf) + Number(e.target.value),
          addedtuitionandfees: Number(matriculationChange.addedtuitionandfees) + Number(e.target.value),
          totaldue: Number(matriculationChange.totaldue) + Number(e.target.value)
        })
      }
    }
  }

  useEffect(() => {
    if (defaultCount > defaultFlag) {
      onSuccessCount(defaultCount)
      setModalStatus(false)
    }
  }, [defaultCount])

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewFeeDetailsValidated({ registrationno: studentEnlistmentInfoData.registrationno, coursecode: studentEnlistmentInfoData.coursecode, feetype: studentEnlistmentInfoData.feetype, amount: studentEnlistmentInfoData.amount, description: studentEnlistmentInfoData.description, isadded: 1, isdropped: 0 })
    setModalStatusFeeDetail(true)
  }

  useEffect(() => {
    getRegistrationFeeTypeFunc()
  }, [])

  const handleCancel = () => {
    setModalStatus(false)
  }
    
  return (
    <>
      {modalStatusFeeDetail && <CreateFeesDetailConfirmation modalStatus={modalStatusFeeDetail} setModalStatus={setModalStatusFeeDetail} newFeeDetailsValidated={newFeeDetailsValidated} onSuccessCount={((count) => {setDefaultCount(count)})} count={count} tempMatriculationChange={tempMatriculationChange} matriculationChangeExist={matriculationChangeExist}/>}
      <Modal
        show={modalStatus}
        size='lg'
        centered
      >
        <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
          <div className='container-fluid'>
            <h6>ADD NEW FEES</h6>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='container-fluid card p-4'>
            <form noValidate={false}>
              <div className='row p-2'>
                <div className='mt-3 col-md-4'>
                  <h6>Course Code</h6>
                  <input onChange={inputData} className='form-control' type="text" name='coursecode' required />
                </div>
                <div className='mt-3 col-md-5'>
                  <h6>Fee Type</h6>
                  <select  onChange={inputData} name='feetype' className='form-control' required>
                    <option key={-1}></option>
                    {
                      feeType && feeType.map((item, index) => (
                        <option key={index} value={item.RFTCode}>{item.Label}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='mt-3 col-md-3'>
                  <h6>Amount</h6>
                  <input onChange={inputData} className='form-control' type="number" name='amount' disabled={!feeTypeItems.includes(studentEnlistmentInfoData.feetype)} required />
                </div>
                <div className='mt-3 col-md-12'>
                  <h6>Description</h6>
                  <textarea onChange={inputData} className='form-control' type="text" name='description' required />
                </div>
                <div className='col-md-12 text-center mt-4'>
                  <button onClick={handleSubmit} className='btn btn-primary' style={{width: "150px"}}>ADD</button>
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
          <button onClick={handleCancel} className='btn btn-secondary'>Close</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default NewFeesModal