import React, { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import create from "../../../../../Controller/AcademicStructure/create";
import crudDelete from "../../../../../Controller/AcademicStructure/delete";
import { useNavigate } from "react-router-dom";

function CurriculumModal(props) {

    const { modalStatus, setModalStatus, data, transType } = props; 
    const navigate = useNavigate()
    const handleConfirmationYes = () => {
        switch(transType) {
            case "POST":
                create.createCurriculumDetails(data)
                .then((res) => {
                    console.log(res)
                    if (res.success && Number(res.data.affectedRows) > 0) {
                        alert("Successfully Inserted")
                        setModalStatus(false)
                    } else {
                        alert("Unsuccessful Insert")
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
                break;
            case "DELETE":
                crudDelete.deleteCurriculumDetails(data)
                .then((res) => {
                    if (res.success && Number(res.response.affectedRows) > 0) {
                        alert('Successfully Deleted!')
                        setModalStatus(false)
                    } else {
                        alert(res.error)
                    }
                })
                .catch((err) => {
                    console.error(err.message)
                })
                break;
            case "UPDATE":
                break;
            default:
                // code block
        }
    }

    return (
        <>
            <Modal
                show={modalStatus}
                centered={true}
            >
                <ModalHeader>
                    <ModalTitle>
                        <h6>Please Review</h6>
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-12">
                            <label><h6>Are you sure you wan't to {transType}</h6></label>
                        </div>
                        <div className="col-12 text-end">
                            <button onClick={()=> setModalStatus(false)} style={{ width: "60px"}} className="btn btn-secondary me-2">No</button>
                            <button onClick={handleConfirmationYes} className="btn btn-primary">Yes</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default CurriculumModal