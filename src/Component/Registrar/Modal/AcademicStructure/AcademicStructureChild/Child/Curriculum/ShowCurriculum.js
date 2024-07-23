import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import view from '../../../../../../Controller/AcademicStructure/view'

function ShowCurriculum() {

    const { id } = useParams()
    const [ curriculumDetailsList, getCurriculumDetailsList ] = useState([])

    const curriculumDetailsListFunc = (id) => {
        const data = { curno: id }
        view.getCurriculumSolo(data)
        .then((res) => {
            getCurriculumDetailsList(res.data.rows[0])
        })
        .catch((err) => {
            console.error(err.message)
        })
    }

    useEffect(() => {
        curriculumDetailsListFunc(id)
    }, [id])

    return (
        <>
            <Modal
                show={true}
                fullscreen
                scrollable
            >
                <ModalHeader>
                    <div className='container-fluid text-start'>
                        <h5>CURRICULUM</h5>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='container-fluid'>
                        <div className='card shadow no-border p-3'>
                            <table className='table table-borderless'>
                                <tbody>
                                    <tr>
                                        <td><b>Title</b></td>
                                        <td>{curriculumDetailsList.title}</td>
                                        <td></td>
                                        <td>{}</td>
                                        <td><b>Program</b></td>
                                        <td>{curriculumDetailsList.code}</td>
                                        <td><b>Total Units</b></td>
                                        <td>{curriculumDetailsList.totalunits}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Long Title</b></td>
                                        <td colSpan={1}>{curriculumDetailsList.longtitle}</td>
                                        <td></td>
                                        <td>{}</td>
                                        <td><b>Remarks</b></td>
                                        <td>{curriculumDetailsList.remarksCurr}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Description</b></td>
                                        <td>{curriculumDetailsList.description}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Created On</b></td>
                                        <td>{}</td>
                                        <td><b>Created By</b></td>
                                        <td>{}</td>
                                        <td><b>Last Updated On</b></td>
                                        <td>{}</td>
                                        <td><b>Last Updated By</b></td>
                                        <td>{}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Posted On</b></td>
                                        <td>{}</td> 
                                        <td><b>Posted By</b></td>
                                        <td>{}</td>
                                        <td><b>Is Posted</b></td>
                                        <td>{}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {
                            
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className='container-fluid text-end'>
                        <Link to='../' className='btn btn-secondary'>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ShowCurriculum
