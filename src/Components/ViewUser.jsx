import React,{useContext} from 'react'
import {ActionContext} from '../Context/ActionContext'
function ViewUser() {
    const {viewUserData} = useContext(ActionContext)
  return (
    <div className='viewuser'>
        <h3>Username : {viewUserData.username}</h3>
        <h3>Email : {viewUserData.email}</h3>
    </div>
  )
}

export default ViewUser