import React, { useState } from 'react';


function AddEmployees(props){

    const initInputs = { EmpFirstName: props.EmpFirstName || "", EmpLastName: props.EmpLastName || "", EmpStreetAddress: props.EmpStreetAddress || "", EmpCity: props.EmpCity|| "", EmpState: props.EmpState || "", EmpPhoneNumber: props.EmpPhoneNumber || "", EmpZipCode: props.EmpZipCode || "", EmpAreaCode: props.EmpAreaCode || ""  }
    
    const [inputs, setInputs] = useState(initInputs)

    const handleChange = ((e) => {
        const {name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    })
    
    const handleSubmit = ((e) => { e.preventDefault()
        props.submit(inputs, props.EmployeeID)
        setInputs(initInputs)
    })

    return (
        <div>
        <h1 className="form-title">Information Form</h1>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="FIRST_NAME"
                    value={inputs.FIRST_NAME}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="form-text"
                />
                <input
                    type="text"
                    name="LAST_NAME"
                    value={inputs.LAST_NAME}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="form-text"
                />
                <input
                    type="text"
                    name="EMAIL"
                    value={inputs.EMAIL}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="form-text"
                />                                          
                <input
                    type="text"
                    name="PHONE_NUMBER"
                    value={inputs.PHONE_NUMBER}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="form-text"
                />
                <input
                    type="text"
                    name="EMPLOYEE_ID"
                    value={inputs.EMPLOYEE_ID}
                    onChange={handleChange}
                    placeholder="EMPLOYEE_ID"
                    className="form-text"
                />
                <button className="add-btn">{ props.btnText }</button>
            </form>
        </div>
        </div>
    )
}

export default AddEmployees;