import React,{useState,useContext} from 'react'
import Axios from 'axios'
import {ActionContext} from '../Context/ActionContext'


function AddUser() {
  const {setShowPopup,setShowAddUser} = useContext(ActionContext)
  const [error,setError] = useState('')
    const [addUserData,setAddUserData] = useState({
        username:"",
        email:"",
        password: "",
        confirmPassword: ""
    })
    

    const addUserSubmit = async(e)=> {
      e.preventDefault()
     await Axios.post("http://localhost:3001/addUser", addUserData).then((response)=>{
    console.log(response)
    if(response.data.success){
        setShowPopup(false)
        setShowAddUser(false)
     alert("success")
      
}else if(response.data.error){
setError(response.data.error)
}

 })

    }

  return (
    <div className='formData'>
        <h3>Add User</h3>
        <form onSubmit={addUserSubmit} action="">
        <label htmlFor="">Username</label>
        <input onChange={(e)=>setAddUserData({...addUserData, username : e.target.value})} type="text" name="" id="" required minLength={4}/>
        <label htmlFor="">Email</label>
        <input onChange={(e)=>setAddUserData({...addUserData, email : e.target.value})} type="email" name="" id="" required/>
        <label htmlFor="">Password</label>
        <input onChange={(e)=>setAddUserData({...addUserData, password : e.target.value})} type="password" name="" id="password" required minLength={6}/>
        <label htmlFor="">Confirm Password</label>
        <input onChange={(e)=>setAddUserData({...addUserData, confirmPassword : e.target.value})} type="password" name="" id="confirmPassword" required minLength={6}/>
      <span>{error}</span>
        <button type='submit'>Submit</button>
        </form>
</div>
  )
}

export default AddUser