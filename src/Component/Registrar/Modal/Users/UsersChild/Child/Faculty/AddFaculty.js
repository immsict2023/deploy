import React from 'react'
import NoPhoto from '../../../../../../../Assets/Icons/nophoto.png'

function AddFaculty() {
  return (
    <>
        <div className='container-fluid'>
            <div className='card shadow p-3 m-2'>
                <form>
                    <div className='row'>
                        <div className='col-12 text-center'>
                            <h5>NEW FACULTY</h5>
                        </div>
                        <div className='col-12 text-center mb-4'>
                            <div className='row'>
                                <div className='col-12'>
                                    <img src={NoPhoto} className='rounded-circle m-2' width={120} height={120} alt='Staff Profile' />
                                </div>
                                <div className='col-12 d-flex justify-content-center'>
                                    <input type='file' className='form-control' name='profile_image' id='profile_image' style={{width: '600px'}} />
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <h6>Email</h6>
                            <input className='form-control' type='email' name='email' id='email' />
                        </div>
                        <div className='col-6'>
                            <h6>Full Name</h6>
                            <input className='form-control' type='text' name='full_name' id='full_name' />
                        </div>
                        <div className='col-4 mt-2'>
                            <h6>Gender</h6>
                            <select className='form-control' name='gender' id='gender'>
                                <option></option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <div className='col-4 mt-2'>
                            <h6>Role</h6>
                            <select className='form-control' name='gender' id='gender'>
                                <option></option>
                                <option value='HR Officer'>HR Officer</option>
                                <option value='Faculty / Teaching Staff'>Faculty / Teaching Staff</option>
                                <option value='Cashier'>Cashier</option>
                                <option value='Librarian'>Librarian</option>
                                <option value='Clinic Nurse'>Clinic Nurse</option>
                                <option value='Encoder / NTSTF'>Encoder / NTSTF</option>
                                <option value='Encoder Rank 2'>Encoder Rank 2</option>
                            </select>
                        </div>
                        <div className='col-4 mt-2'>
                            <h6>Date of Birth</h6>
                            <input className='form-control' type='date' name='date_of_birth' id='date_of_birth' />
                        </div>
                        <div className='col-12 text-center mt-4'>
                            <button style={{width: '120px'}} className='btn btn-primary me-2' type='submit'>CREATE</button>
                            <button style={{width: '120px'}} className='btn btn-secondary' type='reset'>RESET</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddFaculty
