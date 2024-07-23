import React from 'react'
import { Link } from 'react-router-dom'

function StudentBackground() {

  return (
    <>
      <div>
        <div className='container-fluid text-center'>
            <h5>STUDENT BACKGROUND</h5>
        </div>
        <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='text-center' colSpan={4}>
                        <h6><b>PRIMARY SCHOOL</b></h6>
                    </td>
                </tr>
                <tr>
                    <td><b>Primary School</b></td>
                    <td>
                        {
                            ''
                        }
                    </td>
                    <td><b>Entrance Interview Scale</b></td>
                    <td>
                        {
                            ''
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>Primary School Time Period</b></td>
                    <td>
                        {
                            '2010-2014'
                        }
                    </td>
                    <td><b>Entrance English Score</b></td>
                    <td>
                        {
                            ''
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>Awards / Honors</b></td>
                    <td>
                        {
                            ''
                        }
                    </td>
                    <td><b>Entrance Math Score</b></td>
                    <td>
                        {
                            ''
                        }
                    </td>
                </tr>
                <tr>
                    <td className='text-center' colSpan={4}>
                        <h6><b>HIGH SCHOOL</b></h6>
                    </td>
                </tr>
                <tr>
                    <td><b>High School</b></td>
                    <td>
                        {
                            ''
                        }
                    </td>
                    <td><b>	Entrance Science Score</b></td>
                    <td>
                        {
                            '80'
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>High School Time Period</b></td>
                    <td>
                        {
                            '2010-2014'
                        }
                    </td>
                    <td><b>	NCEE Score</b></td>
                    <td>
                        {
                            '80'
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>Awards / Honors</b></td>
                    <td>
                        {
                            ''
                        }
                    </td>
                    <td><b>NCEE Number</b></td>
                    <td>
                        {
                            '80'
                        }
                    </td>
                </tr>
                <tr>
                    <td className='text-center' colSpan={4}>
                        <h6><b>COLLEGE SCHOOL</b></h6>
                    </td>
                </tr>
                <tr>
                    <td><b>College</b></td>
                    <td>
                        {
                            ''
                        }
                    </td>
                    <td><b>NCEE Year Taken</b></td>
                    <td>
                        {
                            '80'
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>College Time Period</b></td>
                    <td>
                        {
                            '2010-2014'
                        }
                    </td>
                    <td><b>Percentile Rank</b></td>
                    <td>
                        {
                            '80'
                        }
                    </td>
                </tr>
                <tr>
                    <td><b>Awards / Honors</b></td>
                    <td>
                        {
                            '2010-2014'
                        }
                    </td>
                    <td><b>Remarks</b></td>
                    <td>
                        {
                            '80'
                        }
                    </td>
                </tr>
            </tbody>
        </table>
        <div className='container-fluid text-center'>
            <Link to='../basic-addmission' className='btn btn-secondary me-2'>BACK</Link>
            <Link to='../../' className='btn btn-danger'>CLOSE</Link>
        </div>
      </div>
    </>
  )
}

export default StudentBackground
