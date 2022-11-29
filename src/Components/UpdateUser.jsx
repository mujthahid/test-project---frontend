import React,{useState,useContext} from 'react'
import {ActionContext} from '../Context/ActionContext'
import Axios from 'axios'

function UpdateUser() {

const [error,setError] = useState('')
    const {editUserData,setShowPopup,setShowUpdateUser} = useContext(ActionContext)
    const [userData,setUserData] = useState({
        id:editUserData.id,
        username:editUserData.username,
        email:editUserData.email,
        password: "",
        confirmPassword: ""
    })

    const editSubmit = async(e) => {
      e.preventDefault()
      if(userData.password!==userData.confirmPassword) setError("password and confirm password should be same")
      else{
   await Axios.patch("http://localhost:3001/updateUser",userData).then((response)=>{
  console.log(response)
     if(response.data.success){
      setShowPopup(false)    
        setShowUpdateUser(false)
        alert("success")
        
     }
 })
}
}
    

  return (
    <div className='formData'>
        <h3>Update User</h3>
       <form onSubmit={editSubmit}>
        <label htmlFor="">Username</label>
        <input onChange={(e)=>{setUserData({...userData,username : e.target.value})}}  type="text" defaultValue={editUserData.username} required minLength={4}/>
        <label htmlFor="">Email</label>
        <input  type="email" value={editUserData.email} disabled/>
        <label htmlFor="">Password</label>
        <input onChange={(e)=>{setUserData({...userData,password : e.target.value})}} type="password" name="" id="password" required minLength={6}/>
        <label htmlFor="">Confirm Password</label>
        <input onChange={(e)=>{setUserData({...userData,confirmPassword : e.target.value})}} type="password" name="" id="confirmPassword" required minLength={6}/>
        <span>{error}</span>
        <button type='submit'>Submit</button>
        </form>
       
        
    </div>
  )
}

export default UpdateUser