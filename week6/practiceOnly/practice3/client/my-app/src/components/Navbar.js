import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar(){
  return (
    <div id = "navbar">
      <Link to='/public'>Home</Link>
      <Link to='/products'>Products</Link>
      <Link to='/employees'>Employees</Link>
      <Link to='/customers'>Customers</Link>
    </div>
  )
}