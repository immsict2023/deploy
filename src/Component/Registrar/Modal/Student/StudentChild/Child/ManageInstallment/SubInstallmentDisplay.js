import React, { useEffect, useState } from 'react'
import view from '../../../../../../Controller/Student/view'
import currency from '../../../../../../../Tools/currency'
import { convertDateWTime } from '../../../../../../../Tools/date'

function SubInstallmentDisplay(props) {

    const [accountChargesList, setAccountChargesList] = useState([])

    const { data } = props

    const getAccountChargeIndividualFunc = () => {
        view.getAccountChargeIndividual(data).then((res) => {
            setAccountChargesList(res.data.rows)
            console.log(res)
            setAccountChargesList(res.data.rows)
        }).catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {
        getAccountChargeIndividualFunc()
    }, [])

    return (
        <>
            <div className='container-fluid card shadow mt-2'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Installment No.</th>
                            <th>Installment Amount</th>
                            <th>Post On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accountChargesList && accountChargesList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.IPTDetailCode}</td>
                                    <td>{currency.formatter.format(item.Amount)}</td>
                                    <td>{convertDateWTime(item.CreatedOn)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SubInstallmentDisplay
