
import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='register'>
      <form action="" className='formm'>
        <label htmlFor="name">Username:</label>
        <input type="text"  placeholder='username' name="" id="" /> <br />
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='password' name="" id="" /> <br />
        <label htmlFor="confirmpassword">Confirmpassword:</label>
        <input type="password" placeholder='confirmpassword' name="" id="" /> <br />
       <div className='btnn'>
         <button>Register  </button> <br />
         <div>Already register <Link to={'/login'}>  <span className='link'>login</span> </Link>  here.</div>
       </div>
      </form>
    </div>
  )
}

export default Register
