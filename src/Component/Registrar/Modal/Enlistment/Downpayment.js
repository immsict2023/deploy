import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Downpayment() {  

  return (
    <>
      <Modal
        show={true}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header style={{backgroundColor: '#031B5B'}}>
          <Modal.Title className='text-white'>
            Add Down Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='row'>
              <div className='col-4 mt-2'>
                <label>Student ID</label>
                <input type='search' name='student_id' className='form-control' />
              </div>
              <div className='col-4 mt-2'>
                <label>Name</label>
                <input type='text' className='form-control' readOnly />
              </div>
              <div className='col-4 mt-2'>
                <label>Course/Section</label>
                <input type='text' className='form-control' readOnly />
              </div>
              <div className='col-4 mt-2'>
                <label>Payment Mode</label>
                <select name='payment_mode' className='form-control'>
                  <option value={'Cash'}>Cash</option>
                  <option value={'Cheque'}>Cheque</option>
                </select>
              </div>
              <div className='col-4 mt-2'>
                <label>OR No.</label>
                <input name='or_no' className='form-control' type='text' />
              </div>
              <div className='col-4 mt-2'>
                <label>Amount</label>
                <input name='amount' className='form-control' type='text' />
              </div>
              <div className='col-4 mt-2'>
                <label>Date Payment</label>
                <input name='date_payment' className='form-control' type='datetime-local' />
              </div>
              <div className='col-4 mt-2'>
                <label>Payment Ref. Code</label>
                <input name='payment_ref_code' className='form-control' type='text' />
              </div>
              <div className='col-4 mt-2'>
                <label>Payment Proof</label>
                <input name='payment_proof' className='form-control' type='file' />
              </div>
              <div className='col-4 mt-2'>
                <label>Cheque Date</label>
                <input name='cheque_date' className='form-control' type='date' />
              </div>
              <div className='col-4 mt-2'>
                <label>Cheque No</label>
                <input name='cheque_no' className='form-control' type='text' />
              </div>
              <div className='col-4 mt-2'>
                <label>Bank</label>
                <select name='bank' className='form-control'>
                  <option value={''}></option>
                  <option value={'Bangkok Bank'}>Bangkok Bank</option>
                  <option value={'Bank of America, N.A.'}>Bank of America, N.A.</option>
                  <option value={'Bank of China'}>Bank of China</option>
                  <option value={'BDO Private Bank (subsidiary of BDO Unibank)'}>BDO Private Bank (subsidiary of BDO Unibank)</option>
                  <option value={'Hongkong and Shanghai Banking Corporation'}>Hongkong and Shaihai Banking Corporation</option>
                  <option value={'ING Group'}>ING Group</option>
                  <option value={'JPMorgan Chase'}>JPMorgan Chase</option>
                  <option value={'Korea Exchange Bank'}>Korea Exchange Bank</option>
                  <option value={'Mega International Commercial Bank'}>Mega International Commercial Bank</option>
                  <option value={'Mizuho Bank, Ltd.'}>Mizuho Bank, Ltd.</option>
                  <option value={'Standard Chartered Bank'}>Standard Chartered Bank</option>
                  <option value={'Tha Bank of Tokyo-Mitsubishi UFJ, Ltd.'}>The Bank of Tokyo-Mitsubishi UFJ, Ltd.</option>
                  <option value={'ANZ'}>ANZ</option>
                  <option value={'AUB'}>AUB</option>
                  <option value={'Bank of Commerce'}>Bank of Commerce</option>
                  <option value={'BDO'}>BDO</option>
                  <option value={'BPI'}>BPI</option>
                  <option value={'Chinabank'}>Chinabank</option>
                  <option value={'CITI'}>CITI</option>
                  <option value={'CTBC Bank'}>CTBC Bank</option>
                  <option value={'DBP'}>DBP</option>
                  <option value={'Deutsche'}>Deutsche</option>
                  <option value={'East West Bank'}>East West Bank</option>
                  <option value={'LBP'}>LBP</option>
                  <option value={'Maybank'}>Maybank</option>
                  <option value={'Metrobank'}>Metrobank</option>
                  <option value={'PBCom'}>PBCom</option>
                  <option value={'Philtrust Bank'}>Philtrust Bank</option>
                  <option value={'PNB'}>PNB</option>
                  <option value={'PVB'}>PVB</option>
                  <option value={'RCBC'}>RCBC</option>
                  <option value={'Robinsons Bank'}>Robinsons Bank</option>
                  <option value={'Security Bank'}>Security Bank</option>
                  <option value={'UBP'}>UBP</option>
                  <option value={'UCPB'}>UCPB</option>
                </select>
              </div>
              <div className='col-4 mt-2'>
                <label className='text-danger'>Total Payable</label>
                <input className='form-control border-0' type='text' name='total_payable' id='total_payable' disabled />
              </div>
              <div className='col-4 mt-2'>
                <label className='text-danger'>Total Paid</label>
                <input className='form-control border-0' type='text' name='total_paid' id='total_paid' disabled />
              </div>
              <div className='col-9 mt-2'>
                <label>Remarks</label>
                <input name='remarks' id='remarks' className='form-control' type='text' />
              </div>
            </div>
            <input type='submit' id='submitDownPayment' hidden={true} />
          </form>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: '#031B5B'}}>
          <label htmlFor='submitDownPayment' className='btn btn-primary'>SAVE</label>
          <Link to={'../'} className='btn btn-secondary'>Cancel</Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Downpayment
