import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Employees from './components/Employees';
import AddEmployees from './components/AddEmployees';
import './App.css';

function App() {

  const [employees, setEmployees] = useState([])
  
  const getEmployees = (() => {
      axios.get("http://localhost:9000/get")
          .then(res => setEmployees(res.data))
          .catch(err => console.log(err))
  })

  const addEmployee = ((newEmployee) => {
    axios.post("http://localhost:9000/post", newEmployee)
        .then(res => {
          setEmployees(prevEmployees => [...prevEmployees, newEmployee])
        })
        .catch(err => console.log(err))
  })

  const deleteEmployee = ((EMPLOYEE_ID) => {
    console.log (EMPLOYEE_ID)
    axios.delete(`http://localhost:9000/delete/${EMPLOYEE_ID}`)
  
        .then(res => {
            // setEmployees(prevEmployees => prevEmployees.filter(employee => employee.EMPLOYEE_ID !== EMPLOYEE_ID))
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee.EMPLOYEE_ID !== EMPLOYEE_ID))


        })
        .catch(err => console.log(err))
  })

  const editEmployee = ((updates, employeeId) => {
    axios.put(`http://localhost:9000/edit/${employeeId}`, updates)
        .then(res => {
            setEmployees(prevEmployees => prevEmployees.map (employee => employee.EmployeeID !== employeeId ? employee : res.data))
        })
        .catch(err => console.log(err))
  })





useEffect(() => {
      getEmployees()
  }, [])


return (
    <div>
        <h1 className='title'>New Hire Badge Database</h1>
        <AddEmployees 
            submit={addEmployee}
            btnText="Add Employee"
        />
      {
            employees.map(employee => 
                      { 
                            console.log(employee)
          return <Employees
            {...employee}
            key= {employee.EMPLOYEE_ID}
            EMPLOYEE_ID={employee.EMPLOYEE_ID}
            FIRST_NAME={employee.FIRST_NAME}
            LAST_NAME={employee.LAST_NAME}
             PHONE_NUMBER={employee.PHONE_NUMBER}
            EMAIL={employee.EMAIL}
            deleteEmployee={deleteEmployee}
            editEmployee={editEmployee}
          />}) 
        }
    </div>
  )
}

export default App;