import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='login'>
      <form className='formm'>
        <h2 className='form-title'>Login</h2>

        <label htmlFor="username">Username:</label>
        <input type="text" placeholder='username' id="username" />

        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='password' id="password" />

        <div className='btnn'>
          <button type="submit">Login</button>
          <div className='register-link'>Don’t have an account?
           <Link to={'/login'}><span>Register here</span></Link>  </div>
        </div>
      </form>
    </div>
  )
}

export default Login
