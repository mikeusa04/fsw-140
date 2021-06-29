import React, { useState } from 'react';
import axios from 'axios';

export default function Customers() {
  const [state, setState] = useState("")
  const [isFilter, setIsFilter] = useState(false)

  function getCustomers() {
    axios.get('/customers')
      .then(res => {
        clear()
        console.log(res.data)
        mapToPage(res.data)
      })
  }

  function mapToPage(arr) {
    arr.map(customer => {
      let ol = document.createElement('ol')
      let nameli = document.createElement('li')
      let addressli = document.createElement('li')
      let phoneli = document.createElement('li')
      nameli.innerHTML = `Name: ${customer.CustFirstName} ${customer.CustLastName}`
      addressli.innerHTML = `Address: ${customer.CustStreetAddress} ${customer.CustCity}, ${customer.CustState} ${customer.CustZipCode}`
      phoneli.innerHTML = `Phone Number: ${customer.CustAreaCode}-${customer.CustPhoneNumber}`
      ol.appendChild(nameli)
      ol.appendChild(addressli)
      ol.appendChild(phoneli)
      let root = document.getElementById('customers')
      root.appendChild(ol)
    })
  }

  function filter() {
    setIsFilter(prev => !prev)
  }

  function clear() {
    let root = document.getElementById('customers')
    root.innerHTML = ""
  }

  function getByFilter() {
    axios.get(`/customers/${state}`)
      .then(res => {
        clear()
        console.log(res.data)
        mapToPage(res.data)
      })
  }

  return (
    <div className="displayarea">
      <h1>Customers</h1>

      <div>
        <h3>For a filtered list of customers: </h3>
        {isFilter ? <select onChange={(e) => setState(e.target.value)}>
          <option value="WA">Washington</option>
          <option value="TX">Texas</option>
          <option value="OR">Oregon</option>
          <option value="CA">California</option>
        </select> : ""}
        {isFilter ? <button onClick={getByFilter}>Submit</button> : ""}
        
        <button onClick={filter}>{isFilter ? "Cancel" : "Filter"}</button>
      </div>

      <button onClick={getCustomers}>View All Customers</button>

      

      <div id="customers">

      </div>
    </div>
  )
}