import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Form = () => {
  const [title, setTitle] = useState()
  const navigate = useNavigate();

  const location = useLocation()
  const { id, keyHeader, api, headers, log_entry } = location.state

  const addItem = async e => {
    e.preventDefault();
    
    try {
      const form = e.target;
      const formData = new FormData(form);
      const body = Object.fromEntries(formData.entries());
      const response = await fetch(`http://localhost:8000/${api}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      navigate("/home")
    } catch (error) {
      console.log(error.message)
    }
    
  }

  const updateItem = async e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    body[keyHeader] = id

    try {
      const response = await fetch(`http://localhost:8000/${api}/${id}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
      })
      navigate("/home")
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitForm = e => {
    if(id === 0){
      addItem(e)
    } else {
      updateItem(e)
    }
  }

  useEffect(() => {
    setTitle(api[0].toUpperCase() + api.slice(1))
  }, [api])


    

  return (
    <div className="HealthApp-main">
      <h1>Update {title} Log</h1>
      <form className="HealthApp-form" onSubmit={submitForm}>
        {headers.map(header => (
          <label key={header + "-label"}>{header[0].toUpperCase() + header.slice(1)}<input key={header + "-input"} type="text" name={header} defaultValue={log_entry[header]}></input></label>
        ))}

        <button className="HealthApp-button" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form