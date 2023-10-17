import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Tabular = ({api, headers, keyHeader}) => {
    const [data, setData] = useState([])

    const getData = async (api) => {
        const response = await fetch(`http://localhost:8000/${api}`)
        const responseJson = await response.json()
        responseJson.forEach(element => {
            var formattedDate = new Date(element["date"])
            formattedDate = formattedDate.getMonth() + 1 + "/" + formattedDate.getDate() + "/" + formattedDate.getFullYear()
            element["date"] = formattedDate
        });
        
        setData(responseJson)
        
    }

    const deleteData = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/${api}/${id}`, {
                method: "DELETE",
            })
            setData(data.filter(item => item[keyHeader] !== id));
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getData(api)
    }, [api])

  return (
    <Fragment>
        <div className="HealthApp-table">
            <table>
                <thead>
                    <tr>
                        {headers.map(header_entry => (
                            <th key={header_entry}>{header_entry.charAt(0).toUpperCase() + header_entry.slice(1)}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(log_entry => (
                        <tr key={log_entry[keyHeader]}>
                            {headers.map(key => (
                                <td key={key}>{log_entry[key]}</td>
                            ))}
                            <td><Link to="/add" state={{id_type: keyHeader, id: log_entry[keyHeader], api: api, headers: headers, log_entry: log_entry}}><button className="HealthApp-button">Edit</button></Link></td>
                            <td><button className="HealthApp-button" onClick={() => deleteData(log_entry[keyHeader])}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/add" state = {{id_type: keyHeader, id: 0, api: api, headers: headers, log_entry: ""}}><button className="HealthApp-button">Add {api}</button></Link>
        </div>
        
    </Fragment>
  )
}

export default Tabular