import React, { useEffect, useState } from 'react'
import AdminstrationButton from '../RegNavbar/AdminstrationButton'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../Security/config'
import { getSettings, getInstallment } from '../../Controller/Administrator/view'
import { convertDate, convertDateWTime } from '../../../Tools/date'
import Loadings from '../../Loadings/Loadings'

function Administrator() {

  const [setting, setSetting] = useState([]) 
  const [installment, setInstallment] = useState([])
  const [isLoadings, setIsLoadings] = useState(false)
  
  const { SettingsNo, TradeName, SchoolName, Proponent, BusinessPermitNo, Address, AYFrom
, AYTo, PhoneNo, TIN, BusinessType, CurrentAY, CurrentSem, YearLevels, SummerTermStartsOn, DownPayment, Email, FirstSemRegistrationTo, FirstSemTermStartsOn, FaxNo, MaxClassSize, MinClassSize, UnitFee
, PercentDiscount, LateRegistrationFee, MatriculationChangeFee, SOALateFee, SOANonpaymentFee, SOACutOff, SOAPaymentDue, FirstSemRegistrationFrom, SecondSemRegistrationFrom, SecondSemRegistrationTo
, ThirdSemRegistrationFrom, ThirdSemRegistrationTo, SummerRegistrationFrom, SummerRegistrationTo, LateRegistrationDeadline, MatriculationChangeDeadline, ForceOpenRegistrationFrom, ForceOpenRegistrationTo
, ForceCloseRegistration, ThirdSemTermStartOn, SecondSemTermStartsOn, ForceOpenRegistratiOn, LastUpdatedOn, LastUpdatedBy} = setting
  
  const Settings = () => {
    setIsLoadings(true)
    getSettings(axios, config)
    .then((res) => {
      setSetting(res.data.rows[0])
    })
    .catch((error) => {
      console.error(error)
      setIsLoadings(false)
    })
  }

  const Installment = () => {
    getInstallment(axios, config)
    .then((res) => {
      setInstallment(res.data.rows)
      setIsLoadings(false)
    })
    .catch((error) => {
      console.error(error)
      setIsLoadings(false)
    })
  }

  useEffect(() => {
    try {
      Settings()    
      Installment() 
    } catch(err) {
      console.error(err)
    }
  }, [])

  return (
    <>
    {isLoadings && <Loadings loadingStatus={isLoadings}/>}
      <main>
        <div className='text-center m-3 position-static'>
          <h5>ADMINISTRATION</h5>
        </div>
        <nav className='position-sticky'>
          <AdminstrationButton />
        </nav>
        <section className='container-fluid'>
          <div className='card shadow m-5 p-5 mb-5'>
            <h5>SYSTEM SETTINGS</h5>
            <Link to={`edit-administrator-settings`} className='btn btn-secondary' style={{width: '100px'}}>EDIT</Link>
            <hr />
            <table className='table table-borderless'>
              <tbody>
                <tr key={"1.1"}>
                  <td><b>Trade Name</b></td>
                  <td>{TradeName}</td>
                  <td><b>Current AY</b></td>
                  <td>{CurrentAY}</td>
                  <td><b>AY From</b></td>
                  <td>{convertDate(AYFrom)}</td>
                </tr>
                <tr key={"2.2"}>
                  <td><b>Business Permit No.</b></td>
                  <td>{BusinessPermitNo}</td>
                  <td><b>Current Sem</b></td>
                  <td>{CurrentSem}</td>
                  <td><b>AY To</b></td>
                  <td>{convertDate(AYTo)}</td>
                </tr>
                <tr key={"3.3"}>
                  <td><b>Business Type</b></td>
                  <td>{BusinessType}</td>
                  <td><b>Maximum Class Size</b></td>
                  <td>{MaxClassSize}</td>
                  <td><b>First Semester Registration From</b></td>
                  <td>{convertDate(FirstSemRegistrationFrom)}</td>
                </tr>
                <tr key={"4.4"}>
                  <td><b>School Name</b></td>
                  <td>{SchoolName}</td>
                  <td><b>Minimum Class Size</b></td>
                  <td>{MinClassSize}</td>
                  <td><b>First Semester Registration To</b></td>
                  <td>{convertDate(FirstSemRegistrationTo)}</td>
                </tr>
                <tr key={"5.5"}>
                  <td><b>Proponent</b></td>
                  <td>{Proponent}</td>
                  <td><b>Year Levels</b></td>
                  <td>{YearLevels}</td>
                  <td><b>First Semester Term Starts On</b></td>
                  <td>{convertDate(FirstSemTermStartsOn)}</td>
                </tr>
                <tr key={"6.6"}>
                  <td><b>TIN</b></td>
                  <td>{TIN !== null && TIN !== undefined ? TIN : "-"}</td>
                  <td><b>Unit Fee</b></td>
                  <td>{UnitFee}</td>
                  <td><b>Second Semester Registration From	</b></td>
                  <td>{convertDate(SecondSemRegistrationFrom)}</td>
                </tr>
                <tr key={"7.7"}>
                  <td><b>Address</b></td>
                  <td>{Address}</td>
                  <td><b>Down Payment</b></td>
                  <td>{DownPayment}</td>
                  <td><b>Second Semester Registration To</b></td>
                  <td>{convertDate(SecondSemRegistrationTo)}</td>
                </tr>
                <tr key={"8.8"}>
                  <td><b>Phone No.</b></td>
                  <td>{PhoneNo}</td>
                  <td><b>Discount (%)</b></td>
                  <td>{PercentDiscount}</td>
                  <td><b>Second Semester Term Starts On</b></td>
                  <td>{convertDate(SecondSemTermStartsOn)}</td>
                </tr>
                <tr key={"9.9"}>
                  <td><b>Fax No.</b></td>
                  <td>{FaxNo !== null && FaxNo !== undefined ? FaxNo : "-"}</td>
                  <td><b>Late Registration Fee</b></td>
                  <td>{LateRegistrationFee}</td>
                  <td><b>	Third Semester Registration From</b></td>
                  <td>{ThirdSemRegistrationFrom !== null && ThirdSemRegistrationFrom !== undefined ? convertDate(ThirdSemRegistrationFrom): "-"}</td>
                </tr>
                <tr key={"10.10"}>
                  <td><b>Email</b></td>
                  <td>{Email}</td>
                  <td><b>Matriculation Change Fee</b></td>
                  <td>{MatriculationChangeFee}</td>
                  <td><b>Third Semester Registration To</b></td>
                  <td>{ ThirdSemRegistrationTo !== null && ThirdSemRegistrationTo !== undefined ? convertDate(ThirdSemRegistrationTo) : "-"}</td>
                </tr>
                <tr key={"11.11"}>
                  <td><b></b></td>
                  <td></td>
                  <td><b>	Late Reg. Deadline (Days)</b></td>
                  <td>{convertDate(LateRegistrationDeadline)}</td>
                  <td><b>Third Semester Term Starts On</b></td>
                  <td>{ThirdSemTermStartOn !== null && ThirdSemTermStartOn !== undefined ? convertDate(ThirdSemTermStartOn) : "-"}</td>
                </tr>
                <tr key={"12.12"}>
                  <td><b></b></td>
                  <td></td>
                  <td><b>Mat. Change Deadline (Days)</b></td>
                  <td>{convertDate(MatriculationChangeDeadline)}</td>
                  <td><b>Summer Registration From</b></td>
                  <td>{convertDate(SummerRegistrationFrom)}</td>
                </tr>
                <tr key={"13.13"}>
                  <td><b></b></td>
                  <td></td>
                  <td><b></b></td>
                  <td></td>
                  <td><b>Summer Registration To</b></td>
                  <td>{convertDate(SummerRegistrationTo)}</td>
                </tr>
                <tr key={"14.14"}>
                  <td><b></b></td>
                  <td></td>
                  <td><b></b></td>
                  <td></td>
                  <td><b>Summer Term Starts On</b></td>
                  <td>{convertDate(SummerTermStartsOn)}</td>
                </tr>
                <tr key={"15.15"}>
                  <td><b></b></td>
                  <td></td>
                  <td><b>SOA Late Fee</b></td>
                  <td>{SOALateFee}</td>
                  <td><b>Force Open Registration?</b></td>
                  <td>{Boolean(ForceOpenRegistratiOn) ? 'Yes' : 'No'}</td>
                </tr>
                <tr key={"16.16"}>
                  <td><b></b></td>
                  <td></td>
                  <td><b>SOA Nonpayment Fee</b></td>
                  <td>{SOANonpaymentFee}</td>
                  <td><b>Force Open Registration From</b></td>
                  <td>{convertDate(ForceOpenRegistrationFrom)}</td>
                </tr>
                <tr key={"17.17"}>
                  <td><b>Last Updated By</b></td>
                  <td>{LastUpdatedBy}</td>
                  <td><b>SOA Cut Off</b></td>
                  <td>{SOACutOff}</td>
                  <td><b>Force Open Registration To</b></td>
                  <td>{convertDate(ForceOpenRegistrationTo)}</td>
                </tr>
                <tr key={"18.18"}>
                  <td><b>Last Updated On</b></td>
                  <td>{convertDateWTime(LastUpdatedOn)}</td>
                  <td><b>SOA Payment Due</b></td>
                  <td>{SOAPaymentDue}</td>
                  <td><b>Force Close Registration?</b></td>
                  <td>{Boolean(ForceCloseRegistration) ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='card shadow m-5 p-5 mb-5'>
            <h5>INSTALLMENT PAYMENT SCHEDULE</h5>
            <hr />
              {
              installment && installment.map((item, index) => (
                <table className='table card p-4 table-borderless hover'>
                  <tbody>
                    <tr key={index + .01}>
                      <td width={'300px'}>{item.PlanCode &&  <b>Plan Code</b>}</td>
                      <td width={'300px'}>{item.PlanCode && item.PlanCode}</td>
                      <td width={'300px'}>{item.NumberOfPayments && <b>No. Of Payments</b>}</td>
                      <td colSpan={2}>{item.NumberOfPayments && item.NumberOfPayments}</td>
                      <td><b>Is Default?</b></td>
                      <td>{Boolean(item.IsDefault) && Boolean(item.IsDefault) === true ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr key={index + .2}>
                      <td width={'300px'}><b>Label</b></td>
                      <td width={'300px'}>{item.Label}</td>
                      <td width={'300px'}><b>Description</b></td>
                      <td colSpan={2}>{item.Description}</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr key={index + .3}>
                      <td width={'300px'}><b>First Payment Date</b></td>
                      <td width={'300px'}>{convertDate(item.FirstPaymentDate)}</td>
                      <td width={'300px'}><b>{convertDate(item.SecondPaymentDate) !== "01/01/1970" ? "Second Payment Date" : null}</b></td>
                      <td colSpan={2}>{convertDate(item.SecondPaymentDate)}</td>
                      <td><b>Third Payment Date</b></td>
                      <td>{convertDate(item.ThirdPaymentDate)}</td>
                    </tr>
                    <tr key={index + .4}>
                      <td width={'300px'}><b>First Payment Percent</b></td>
                      <td width={'300px'}>{item.FirstPaymentPercent}</td>
                      <td width={'300px'}><b>Second Payment Percent</b></td>
                      <td colSpan={2}>{item.SecondPaymentPercent}</td>
                      <td><b>Third Payment Percent</b></td>
                      <td>{item.ThirdPaymentPercent}</td>
                    </tr>
                  </tbody>
                </table>
              ))
            }
          </div>
        </section>
      </main>
    </>
  )
}

export default Administrator
