import React, { useState } from 'react';
import AddEmployees from './AddEmployees';
import './employees.css';

function Employees(props){

    const { EMPLOYEE_ID, FIRST_NAME, LAST_NAME, PHONE_NUMBER, EMAIL} = props;
    
    const [editToggle, setEditToggle] = useState(false);


    return (
        <div>
        <div>
        <h1 className="badge-title">Badge:</h1>
        </div>
        <div className="container">
        { !editToggle ?
        <> 
            <p className="badge-text"> Employee ID: { EMPLOYEE_ID }</p>
            <p className="badge-text"> Full Name: { FIRST_NAME } { LAST_NAME }</p>
            <p className="badge-text"> Phone Number: {EMAIL} { PHONE_NUMBER }</p>

            {/* <img src={"https://www.osiwa.org/wp-content/uploads/2019/02/Blank-Person.png"} alt=""/> */}
            <div>
            <button
                className="delete-btn"
                onClick={() => props.deleteEmployee(EMPLOYEE_ID)}>
                Delete
            </button>
            <button
                className="edit-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Edit
            </button>
            </div>
        </>
        :
        <>
            <AddEmployees
                EMPLOYEE_ID={EMPLOYEE_ID}
                FIRST_NAME={FIRST_NAME}
                LAST_NAME={LAST_NAME}
                PHONE_NUMBER={PHONE_NUMBER}
                EMAIL={EMAIL}
                btnText="Submit Edit" 
                submit={props.editEmployee}
            />
            <button
                className="delete-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Close
            </button>
        </>
        }
        </div>
        </div>
    )
}
export default Employees;