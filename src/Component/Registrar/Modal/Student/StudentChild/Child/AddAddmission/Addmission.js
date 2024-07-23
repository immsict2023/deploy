import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

function Addmission() {

    const { studInfo, studAdd, studBack } = useParams();

    const [student_information, setStudent_Information] = useState({});
    const [student_admission, setStudent_Admission] = useState({});
    const [student_background, setStudent_Background] = useState({});

    useEffect(() => {
      setStudent_Information(JSON.parse(studInfo));
      setStudent_Admission(JSON.parse(studAdd))
      setStudent_Background(JSON.parse(studBack))
    }, [studInfo, studAdd, studBack]);

    const inputData = (e) => {
        setStudent_Admission({
            ...student_admission,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Modal
                show={true}
                centered
                size='xl'
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#292A2D'}}>
                    <h5>ADD ADDMISSION</h5>
                </ModalHeader>
                <ModalBody>
                    <form noValidate={false}>
                        <div>
                            <div className='row'>
                                <div className='col-6'>
                                    <h6>Program</h6>
                                    <select onChange={inputData} name='student_program' id='student_program' className='form-control' value={student_admission.student_program} required>
                                        <option></option>
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <h6>AY</h6>
                                    <select onChange={inputData} name='student_ay' id='student_ay' className='form-control'  value={student_admission.student_ay}  required>
                                        <option></option>
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <h6>Semester</h6>
                                    <select onChange={inputData} name='student_semester' id='student_semester' className='form-control' value={student_admission.student_semester} required>
                                        <option></option>
                                        <option value='First Semester'>First Semester</option>
                                        <option value='Second Semester'>Second Semester</option>
                                        <option value='Third Semester'>Third Semester</option>
                                        <option value='Summer'>Summer</option>
                                    </select>
                                </div>
                                <div className='col-12'>
                                    <h6>Remarks</h6>
                                    <textarea onChange={inputData} className='form-control' type='text' name='student_remarks' defaultValue={student_admission.student_remarks} id='student_remarks' required/>
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#292A2D'}}>
                    <Link to={`../${JSON.stringify(student_information)}/${JSON.stringify(student_admission)}/${JSON.stringify(student_background)}`} className='btn btn-secondary'>CANCEL</Link>
                    <Link to={`../../student-addmission/${JSON.stringify(student_information)}/${JSON.stringify(student_admission)}/${JSON.stringify(student_background)}`} className='btn btn-primary me-3'>SAVE</Link>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Addmission
