import React, { useState } from 'react';
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [email, setEmail]= useState('')
    const [password,setPassword]= useState('')
    const navigate = useNavigate()
    const [error,setError] = useState('')
    
    
    const login = (e)=> {
      e.preventDefault()
      Axios.post("http://localhost:3001/login",{email:email,password:password}).then((response)=>{
        if(response.data.success){
            navigate('/')
        }else if(response.data.error){
          setError(response.data.error)
        }
      })
    }

   


  return (
    <div className='loginPage'>
<div className="loginForm">
  <form onSubmit={login} action="">
    <label htmlFor="">Email</label>
    <input onChange={(e)=>setEmail(e.target.value)} type="email" name="Email" id="" required/>
    <label htmlFor="">Password</label>
    <input onChange={(e)=> setPassword(e.target.value)} type="password" name="Password" id="" />
    <span>{error}</span>
    <button type='submit'>Login</button>
    </form>
    </div>

    </div>
  )
}

export default Login