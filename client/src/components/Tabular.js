import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'

const Tabular = ({api}) => {
    const [data, setData] = useState([])
    const [headers, setHeaders] = useState([])

    const getData = async (api) => {
        const response = await fetch(`http://localhost:8000/${api}`)
        const responseJson = await response.json()
        setData(responseJson)
        const header_values = Object.keys(responseJson[0])
        console.log(header_values)
        setHeaders(header_values)
    }

    useEffect(() => {
        getData(api)
    }, [])

  return (
    <Fragment>
        <table>
            <thead>
                <tr>
                    {headers.map(header_entry => (
                        <th>{header_entry}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map(log_entry => (
                    <tr>
                        <td>{log_entry.food_id}</td>
                        <td>{log_entry.date}</td>
                        <td>{log_entry.calories}</td>
                        <td>{log_entry.carbs}</td>
                        <td>{log_entry.protein}</td>
                        <td>{log_entry.fat}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </Fragment>
  )
}

export default Tabular