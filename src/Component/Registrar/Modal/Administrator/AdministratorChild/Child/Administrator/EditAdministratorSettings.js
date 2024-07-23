import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import view from '../../../../../../Controller/Administrator/view'
import { dateDefaultInput, defaultDateInputValue } from '../../../../../../../Tools/date'
import { getAcademicYear } from '../../../../../../../Tools/date'
import { getInstallment } from '../../../../../../Controller/Administrator/view'
import axios from 'axios'
import config from '../../../../../../Security/config'
import UpdateSettingsConfirmationModal from '../../Modal/UpdateSettingsConfirmationModal'

function EditAdministratorSettings() {

    const [slide_no, setSlide_No] = useState(0)
    const [settings, setSettings] = useState([])
    const [academicYear, setAcademicYear] = useState([])
    const [installmentOne, setInstallmentOne] = useState([])
    const [installmentTwo, setInstallmentTwo] = useState([])
    const [installmentThree, setInstallmentThree] = useState([])
    const [installmentFour, setInstallmentFour] = useState([])

    const [updateSettingsModalStatus, setUpdateSettingsModalStatus] = useState(false)

    const getSettingsFunc = () => {
        view.getSettings().then((res) => {
            setSettings(res.data.rows[0])
            console.log(res.data.rows[0])
        }).catch((err) => {
            console.error(err)
        })
    }

    const getInstallmentListFunc = () => {
        getInstallment(axios, config)
        .then((res) => {
            setInstallmentOne(res.data.rows[0])
            setInstallmentTwo(res.data.rows[1])
            setInstallmentThree(res.data.rows[2])
            setInstallmentFour(res.data.rows[3])
            console.log(res.data.rows)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const handleUpdateSettings = () => {
        setUpdateSettingsModalStatus(true)
    }

    const getAcademicYearFunc = async () => {
        getAcademicYear().then((res) => {
            setAcademicYear(res)
        }).catch((err) => {
            console.error(err)
        })
    }

    const inputData = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        getSettingsFunc()
        getAcademicYearFunc()
        getInstallmentListFunc()
    }, [])

    return (
        <>
            { updateSettingsModalStatus && <UpdateSettingsConfirmationModal  modalStatus={updateSettingsModalStatus} setModalStatus={setUpdateSettingsModalStatus} data={settings} /> }
            <Modal
                show={true}
                centered
                fullscreen
            >
                <ModalHeader className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid'>
                        <h5>UPDATE ADMINISTRATION SETTINGS</h5>
                    </div>
                </ModalHeader>
                <ModalBody style={{backgroundColor: '#B2BEB5'}}>
                    <div className='container-fluid '>
                        {
                            slide_no === 0 ?
                            <div className='card shadow p-5 m-2'>
                                <div className='container-fluid d-flex justify-content-center'>
                                    <fieldset className='card shadow p-4 m-3' style={{width: '500px'}}>
                                        <legend><h5>Academic Term</h5></legend>
                                        <div className='container-fluid'>
                                            <div className='row'>
                                                <div className='col-7'>
                                                    <h6>Current AY</h6>
                                                    <select onChange={inputData} value={settings.CurrentAY && settings.CurrentAY} className='form-control'name='CurrentAY' id='CurrentAY'>
                                                        <option></option>
                                                        {
                                                            academicYear && academicYear.map((item, index) => (
                                                                <option value={item} key={index}>{item}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className='col-5'>
                                                    <h6>Current Semester</h6>
                                                    <select onChange={inputData} value={settings.CurrentSem && settings.CurrentSem} className='form-control'name='CurrentSem' id='CurrentSem'>
                                                        <option></option>
                                                        <option value="1ST">1ST</option>
                                                        <option value="2ND">2ND</option>
                                                        <option value="3RD">3RD</option>
                                                        <option value="SUM">SUM</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <table className='table table-borderless'>
                                    <tbody>
                                        <tr>
                                            <td><b>Trade Name</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.TradeName && settings.TradeName} className='form-control' type='text' name='TradeName' id='TradeName' /></td>
                                            <td></td>
                                            <td></td>
                                            <td><b>AY From</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.AYFrom && dateDefaultInput(settings.AYFrom)} className='form-control' type='date' name='AYFrom' id='AYFrom' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Business Permit No.</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.BusinessPermitNo && settings.BusinessPermitNo} className='form-control' type='text' name='BusinessPermitNo' id='BusinessPermitNo' /></td>
                                            <td></td>
                                            <td></td>
                                            <td><b>AY To</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.AYTo && dateDefaultInput(settings.AYTo)} className='form-control' type='date' name='AYTo' id='AYTo' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Business Type</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.BusinessType && settings.BusinessType} className='form-control' type='text' name='BusinessType' id='BusinessType' /></td>
                                            <td><b>Maximum Class Size</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.MaxClassSize && settings.MaxClassSize} className='form-control' type='number' name='MaxClassSize' id='MaxClassSize' /></td>
                                            <td><b>First Semester Registration From</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.FirstSemRegistrationFrom && dateDefaultInput(settings.FirstSemRegistrationFrom)} className='form-control' type='date' name='FirstSemRegistrationFrom' id='FirstSemRegistrationFrom' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>School Name</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.SchoolName && settings.SchoolName} className='form-control' type='text' name='SchoolName' id='SchoolName' /></td>
                                            <td><b>Minimum Class Size</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.MaxClassSize && settings.MaxClassSize} className='form-control' type='number' name='MaxClassSize' id='MaxClassSize' /></td>
                                            <td><b>First Semester Registration To</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.FirstSemRegistrationTo && dateDefaultInput(settings.FirstSemRegistrationTo)} className='form-control' type='date' name='FirstSemRegistrationTo' id='FirstSemRegistrationTo' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Proponent</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.Proponent && settings.Proponent} className='form-control' type='text' name='Proponent' id='Proponent' /></td>
                                            <td><b>Year Levels</b></td>
                                            <td>
                                                <select onChange={inputData} value={settings.YearLevels && settings.YearLevels} className='form-control' name='YearLevels' id='YearLevels'>
                                                    <option></option>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                    <option value='6'>6</option>
                                                </select>
                                            </td>
                                            <td><b>First Semester Term Starts On</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.FirstSemTermStartsOn && dateDefaultInput(settings.FirstSemTermStartsOn)} className='form-control' type='date' name='FirstSemTermStartsOn' id='FirstSemTermStartsOn' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>TIN</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.TIN && settings.TIN} className='form-control' type='text' name='TIN' id='TIN' /></td>
                                            <td><b>Unit Fee</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.UnitFee && settings.UnitFee} className='form-control' type='number' name='UnitFee' id='UnitFee' /></td>
                                            <td><b>Second Semester Registration From	</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.SecondSemRegistrationFrom && dateDefaultInput(settings.SecondSemRegistrationFrom)} className='form-control' type='date' name='SecondSemRegistrationFrom' id='SecondSemRegistrationFrom' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Address</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.Address && settings.Address} className='form-control' type='text' name='Address' id='Address' /></td>
                                            <td><b>Min. Down Payment</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.DownPayment && settings.DownPayment} className='form-control' type='number' name='DownPayment' id='DownPayment' /></td>
                                            <td><b>Second Semester Registration To</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.SecondSemRegistrationTo && dateDefaultInput(settings.SecondSemRegistrationTo)} className='form-control' type='date' name='SecondSemRegistrationTo' id='SecondSemRegistrationTo' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Phone No.</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.PhoneNo && settings.PhoneNo} className='form-control' type='text' name='PhoneNo' id='PhoneNo' /></td>
                                            <td><b>Discount (%)</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.PercentDiscount && settings.PercentDiscount} className='form-control' type='number' name='PercentDiscount' id='PercentDiscount' /></td>
                                            <td><b>Second Semester Term Starts On</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.SecondSemTermStartsOn && dateDefaultInput(settings.SecondSemTermStartsOn)} className='form-control' type='date' name='SecondSemTermStartsOn' id='SecondSemTermStartsOn' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Fax No.</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.Faxnoo && settings.Faxnoo} className='form-control' type='text' name='Faxnoo' id='Faxnoo' /></td>
                                            <td><b>Late Registration Fee</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.LateRegistrationFee && settings.LateRegistrationFee} className='form-control' type='number' name='LateRegistrationFee' id='LateRegistrationFee' /></td>
                                            <td><b>	Third Semester Registration From</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.ThirdSemRegistrationFrom && dateDefaultInput(settings.ThirdSemRegistrationFrom)} className='form-control' type='date' name='ThirdSemRegistrationFrom' id='ThirdSemRegistrationFrom' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Email</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.Email && settings.Email} className='form-control' type='email' name='Email' id='Email' /></td>
                                            <td><b>Matriculation Change Fee</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.MatriculationChangeFee && settings.MatriculationChangeFee} className='form-control' type='number' name='MatriculationChangeFee' id='MatriculationChangeFee' /></td>
                                            <td><b>Third Semester Registration To</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.ThirdSemRegistrationTo && dateDefaultInput(settings.ThirdSemRegistrationTo)} className='form-control' type='date' name='ThirdSemRegistrationTo' id='ThirdSemRegistrationTo' /></td>
                                        </tr>
                                        <tr>
                                            <td><b></b></td>
                                            <td></td>
                                            <td><b>	Late Reg. Deadline (Days)</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.LateRegistrationDeadline && settings.LateRegistrationDeadline} className='form-control' type='number' name='LateRegistrationDeadline' id='LateRegistrationDeadline' /></td>
                                            <td><b>Third Semester Term Starts On</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.ThirdSemTermStartsOn && dateDefaultInput(settings.ThirdSemTermStartsOn)} className='form-control' type='date' name='ThirdSemTermStartsOn' id='ThirdSemTermStartsOn' /></td>
                                        </tr>
                                        <tr>
                                            <td><b></b></td>
                                            <td></td>
                                            <td><b>Mat. Change Deadline (Days)</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.MatriculationChangeDeadline && settings.MatriculationChangeDeadline} className='form-control' type='number' name='MatriculationChangeDeadline' id='MatriculationChangeDeadline' /></td>
                                            <td><b>Summer Registration From</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.SummerRegistrationFrom && dateDefaultInput(settings.SummerRegistrationFrom)} className='form-control' type='date' name='SummerRegistrationFrom' id='SummerRegistrationFrom' /></td>
                                        </tr>
                                        <tr>
                                            <td><b></b></td>
                                            <td></td>
                                            <td><b></b></td>
                                            <td></td>
                                            <td><b>Summer Registration To</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.SummerRegistrationTo && dateDefaultInput(settings.SummerRegistrationTo)} className='form-control' type='date' name='SummerRegistrationTo' id='SummerRegistrationTo' /></td>
                                        </tr>
                                        <tr>
                                            <td><b></b></td>
                                            <td></td>
                                            <td><b></b></td>
                                            <td></td>
                                            <td><b>Summer Term Starts On</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.SummerTermStartsOn && dateDefaultInput(settings.SummerTermStartsOn)} className='form-control' type='date' name='SummerTermStartsOn' id='SummerTermStartsOn' /></td>
                                            </tr>
                                        <tr>
                                            <td><b></b></td>
                                            <td></td>
                                            <td><b>SOA Late Fee</b></td>
                                            <td><input onChange={inputData} defaultValue={settings.SOALateFee && settings.SOALateFee} className='form-control' type='text' name='SOALateFee' id='SOALateFee' /></td>
                                            <td><b>Force Open Registration?</b></td>
                                            <td>
                                                <select onChange={inputData} className='form-control' name='force_open_registration' id='force_open_registration'>
                                                    <option value='Yes'>Yes</option>
                                                    <option value='No'>No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b></b></td>
                                            <td></td>
                                            <td><b>SOA Nonpayment Fee</b></td>
                                            <td></td>
                                            <td><b>Force Open Registration From</b></td>
                                            <td><input onChange={inputData} className='form-control' defaultValue={settings.ForceOpenRegistrationFrom && dateDefaultInput(settings.ForceOpenRegistrationFrom)} type='date' name='ForceOpenRegistrationFrom' id='ForceOpenRegistrationFrom' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Last Updated By</b></td>
                                            <td></td>
                                            <td><b>SOA Cut Off</b></td>
                                            <td>
                                                <option className='form-control' name='SOACutOff'>

                                                </option>
                                            </td>
                                            <td><b>Force Open Registration To</b></td>
                                            <td><input onChange={inputData} className='form-control' type='date' defaultValue={settings.ForceOpenRegistrationTo && defaultDateInputValue(settings.ForceOpenRegistrationTo)} name='ForceOpenRegistrationTo' id='ForceOpenRegistrationTo' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Last Updated On</b></td>
                                            <td></td>
                                            <td><b>SOA Payment Due</b></td>
                                            <td>
                                                <option className='form-control' name='SOAPaymentDue'>

                                                </option>
                                            </td>
                                            <td><b>Force Close Registration?</b></td>
                                            <td>
                                                <select onChange={inputData} className='form-control' name='ForceCloseRegistration'>
                                                    <option value='1'>Yes</option>
                                                    <option value='0'>No</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='container-fluid text-center'>
                                    <button onClick={handleUpdateSettings} className='btn btn-primary me-2' style={{width: '150px'}}>UPDATE</button>
                                    <button onClick={() => setSlide_No(slide_no+1)} className='btn btn-secondary' style={{width: '150px'}}>NEXT</button>
                                </div>
                            </div>
                            :
                            <div className='card shadow m-5 p-5'>
                                <table className='table table-borderless card shadow p-3 '>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>Plan Code</b></td>
                                            <td>{installmentFour.PlanCode}</td>
                                            <td><b>No. Of Payments</b></td>
                                            <td>{installmentFour.NumberOfPayments && installmentFour.NumberOfPayments}</td>
                                            <td><b>Is Default?</b></td>
                                            <td><input onChange={inputData} checked={installmentFour.IsDefault} type='checkbox' /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Label</b></td>
                                            <td>{installmentFour.Label && installmentFour.Label}</td>
                                            <td><b>Description</b></td>
                                            <td colSpan={1}>{installmentFour.Description && installmentFour.Description}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>First Payment Date</b></td>
                                            <td><input onChange={inputData} defaultValue={installmentFour.FirstPaymentDate && dateDefaultInput(installmentFour.FirstPaymentDate)} className='form-control' type='date' name='FirstPaymentDate' disabled/></td>
                                            <td><b>Second Payment Date</b></td>
                                            <td><input onChange={inputData} defaultValue={installmentFour.FirstPaymentPercent && dateDefaultInput(installmentFour.SecondPaymentDate)} className='form-control' type='date' name='SecondPaymentDate' disabled/></td>
                                            <td><b>Third Payment Date</b></td>
                                            <td><input onChange={inputData} defaultValue={installmentFour.ThirdPaymentDate && dateDefaultInput(installmentFour.ThirdPaymentDate)} className='form-control' type='date' name='ThirdPaymentDate' disabled/></td>
                                        </tr>
                                        <tr>
                                            <td><b>First Payment Percent</b></td>
                                            <td>{installmentFour.FirstPaymentPercent && `${installmentFour.FirstPaymentPercent * 100}%`}</td>
                                            <td><b>Second Payment Percent</b></td>
                                            <td>{installmentFour.SecondPaymentPercent && `${installmentFour.SecondPaymentPercent * 100}%`}</td>
                                            <td><b>Third Payment Percent</b></td>
                                            <td>{installmentFour.ThirdPaymentPercent && `${installmentFour.ThirdPaymentPercent * 100}%`}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className='table table-borderless card shadow p-3 '>
                                    <tbody>
                                        <tr>
                                            <td><b>Plan Code</b></td>
                                            <td>{installmentThree.PlanCode && installmentThree.PlanCode}</td>
                                            <td><b>No. Of Payments</b></td>
                                            <td>{installmentThree.NumberOfPayments && installmentThree.NumberOfPayments}</td>
                                            <td><b>Is Default?</b></td>
                                            <td><input onChange={inputData} checked={installmentThree.IsDefault} type='checkbox'/></td>
                                        </tr>
                                        <tr>
                                            <td><b>Label</b></td>
                                            <td>{installmentThree.Lbel && installmentThree.Lbel}</td>
                                            <td><b>Description</b></td>
                                            <td colSpan={1}>{installmentThree.Description && installmentThree.Description}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>First Payment Date</b></td>
                                            <td>{installmentThree.FirstPaymentDate && dateDefaultInput(installmentThree.FirstPaymentDate)}</td>
                                            <td><b>Second Payment Date</b></td>
                                            <td>{installmentThree.SecondPaymentDate && dateDefaultInput(installmentThree.SecondPaymentDate)}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>First Payment Percent</b></td>
                                            <td>{installmentThree.FirstPaymentPercent && `${installmentThree.FirstPaymentPercent * 100}%`}</td>
                                            <td><b>Second Payment Percent</b></td>
                                            <td>{installmentThree.SecondPaymentPercent && `${installmentThree.SecondPaymentPercent * 100}%`}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className='table table-borderless card shadow p-3 '>
                                    <tbody>
                                        <tr>
                                            <td><b>Plan Code</b></td>
                                            <td>{installmentOne.PlanCode && installmentOne.PlanCode}</td>
                                            <td><b>No. Of Payments</b></td>
                                            <td>{installmentOne.NumberOfPayments && installmentOne.NumberOfPayments}</td>
                                            <td><b>Is Default?</b></td>
                                            <td><input onChange={inputData} type='checkbox' checked={installmentOne.IsDefault} /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Label</b></td>
                                            <td>{installmentOne.Label && installmentOne.Label}</td>
                                            <td><b>Description</b></td>
                                            <td colSpan={2}>{installmentOne.Description && installmentOne.Description}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className='table table-borderless card shadow p-3 '>
                                    <tbody>
                                        <tr>
                                            <td><b>Plan Code</b></td>
                                            <td>{installmentTwo.PlanCode && installmentTwo.PlanCode}</td>
                                            <td><b>No. Of Payments</b></td>
                                            <td>{installmentTwo.NumberOfPayments && installmentTwo.NumberOfPayments}</td>
                                            <td><b>Is Default?</b></td>
                                            <td><input onChange={inputData} type='checkbox' checked={installmentTwo.IsDefault} /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Label</b></td>
                                            <td>{installmentTwo.Label && installmentTwo.Label}</td>
                                            <td><b>Description</b></td>
                                            <td colSpan={2}>{installmentTwo.Description && installmentTwo.Description}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Payment Date</b></td>
                                            <td>{installmentTwo.FirstPaymentDate && dateDefaultInput(installmentTwo.FirstPaymentDate)}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Payment Percent</b></td>
                                            <td>{installmentTwo.FirstPaymentPercent && `${installmentTwo.FirstPaymentPercent * 100}%`}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='container-fluid text-center'>
                                    <button onClick={() => setSlide_No(slide_no-1)} className='btn btn-secondary' style={{width: '150px'}}>BACK</button>
                                </div>
                            </div>
                        }
                    </div>
                </ModalBody>
                <ModalFooter className='text-white' style={{backgroundColor: '#031B5B'}}>
                    <div className='container-fluid text-end'>
                        <Link className='btn btn-secondary' to={`../`}>CLOSE</Link>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default EditAdministratorSettings
