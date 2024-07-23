import React from 'react'
import { Link } from 'react-router-dom'

function TeachingAssignment() {
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <h5>TEACHING ASSIGNMENT</h5>
                    </div>
                    <div className='col-4'></div>
                    <div className='col-4 m-5'> 
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>Course Code</td>
                                    <td>{}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-4'></div>
                    <div className='col-12 text-center'>
                        <Link to={`../professional-license`} className='btn btn-secondary m-4' style={{width: '90px'}}>BACK</Link>
                        <Link className='btn btn-primary' style={{width: '90px'}}>SUBMIT</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeachingAssignment
