import React, {useState} from 'react';
import axios from 'axios';

export default function Employees () {
  const [state, setState] = useState("")
  const [isFilter, setIsFilter] = useState(false)

  function getEmps () {
    axios.get(`/employees/all`)
    .then(res => {
      console.log(res.data)
      mapToPage(res.data)
    })
  }

  function mapToPage (arr) {
    arr.map(emp => {
      let ol = document.createElement('ol')
      let nameli = document.createElement('li')
      let addressli = document.createElement('li')
      let phoneli = document.createElement('li')
      nameli.innerHTML = `Name: ${emp.EmpFirstName} ${emp.EmpLastName}`
      addressli.innerHTML = `Address: ${emp.EmpStreetAddress} ${emp.EmpCity}, ${emp.EmpState} ${emp.EmpZipCode} `
      phoneli.innerHTML = `Phone Number: ${emp.EmpAreaCode}-${emp.EmpPhoneNumber}`
      let root = document.getElementById('emps')
      ol.appendChild(nameli)
      ol.appendChild(addressli)
      ol.appendChild(phoneli)
      root.appendChild(ol)
    })
  }

  function getByFilter() {
    axios.get(`/employees/${state}`)
      .then(res => {
        clear()
        console.log(res.data)
        mapToPage(res.data)
      })
  }

  function filter() {
    setIsFilter(prev => !prev)
  }

  function clear() {
    let root = document.getElementById('emps')
    root.innerHTML = ""
  }

  return (
    <div className="displayarea">
      <h1>Employees</h1>
      <div>
        <h3>For a filtered list of customers: </h3>
        {isFilter ? <select onChange={(e) => setState(e.target.value)}>
          <option value="WA">Washington</option>
          <option value="TX">Texas</option>
        </select> : ""}
        {isFilter ? <button onClick={getByFilter}>Submit</button> : ""}
        
        <button onClick={filter}>{isFilter ? "Cancel" : "Filter"}</button>
      </div>

      <button onClick={getEmps}>View All Employees</button>

      <div id='emps'></div>
    </div>
  )
}