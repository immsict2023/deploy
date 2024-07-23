import React from 'react'
import { Link } from 'react-router-dom'

function StudentAddmission() {
  return (
    <>
      <div>
        <div className='container-fluid text-center'>
            <h5>STUDENT ADDMISSION</h5>
        </div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Program</th>
                    <th>AY</th>
                    <th>Semester</th>
                    <th>Program</th>
                    <th>Remarks</th>
                    <th>Create On</th>
                    <th>Created By</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {
                            'BSMarE'
                        }
                    </td>
                    <td>
                        {
                            '2021-2022'
                        }
                    </td>
                    <td>
                        {
                            'First Semester'
                        }
                    </td>
                    <td>
                        {

                        }
                    </td>
                    <td>
                        
                    </td>
                    <td>
                        {
                            '23/08/2021 4:24 pm'
                        }
                    </td>
                    <td>
                        {
                            'Juan Dela Cruz'
                        }
                    </td>
                </tr>
            </tbody>
        </table>
        <div className='container-fluid text-center'>
            <Link to='../basic-information' className='btn btn-secondary me-2'>BACK</Link>
            <Link to='../basic-background' className='btn btn-primary'>NEXT</Link>
        </div>
      </div>
    </>
  )
}

export default StudentAddmission
