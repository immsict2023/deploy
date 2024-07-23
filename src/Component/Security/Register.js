import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileIcon from '../../Assets/Icons/icon-image.png'

function Register() {

    const [showpasswordstatus, setShowPasswordStatus] = useState(false)

    return (  
        <div className='container-register shadow'>
            <form className='login-form'>   
                <h4 className='text-start'>Create an Account</h4>
                <div className='row'>
                    <div className='col-12 d-flex justify-content-center'>
                        <img src={ProfileIcon} className='rounded-circle' alt='Icon logo' width={110} height={110} />
                    </div>
                    <div className='col-12 d-flex justify-content-center'>
                        <input type='file' className='form-control mt-4' />
                    </div>
                    <div className='col-6'>
                        <label htmlFor='reg-name' className='col-form-label'>Name</label>
                        <input id='reg-name' type='text' name='name' className='form-control' />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor='reg-status' className='col-form-label'>Status</label>
                        <select name="status" id="reg-status" className='form-control'>
                            <option value=""></option>
                            <option value="registrar">Registrar</option>
                            <option value="cashier">Cashier</option>
                        </select>
                    </div>
                    <div className='form-group col-12'>
                        <label htmlFor='reg-email' className='col-form-label'>Email</label>
                        <input id='reg-email' type='email' name='email' className='form-control' />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor='reg-password' className='col-form-label'>Password</label>
                        <input id='reg-password' name='password'  type={showpasswordstatus ? 'text' : 'password'} className='form-control' />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor='reg-repassword' className='col-form-label'>Re-type Password</label>
                        <input id='reg-repassword' name='password'  type={showpasswordstatus ? 'text' : 'password'} className='form-control' />
                    </div>
                    <div className="form-group form-check mt-2 mb-2">
                        <input type="checkbox" className="form-check-input" id="login-checkbox" onChange={(e)=>setShowPasswordStatus(e.target.checked)}/>
                        <label className="form-check-label" htmlFor="login-checkbox">Show Password</label>
                    </div>
                    <div className='mt-3 col-6'>
                        <Link to={'../login'} className='form-control btn btn-danger mb-2'>Cancel</Link>
                    </div>
                    <div className='mt-3 col-6'>
                        <button className='form-control btn btn-primary mb-2'>Create</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
