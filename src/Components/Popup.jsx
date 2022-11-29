import React,{ useContext } from 'react'
import AddUser from './AddUser'
import UpdateUser from './UpdateUser'
import {ActionContext} from '../Context/ActionContext'
import ViewUser from './ViewUser'


function Popup() {

    const {setShowPopup,showAddUser,showUpdateUser,setShowAddUser,setShowUpdateUser,userView,setUserView} = useContext(ActionContext)

   





  return (
    <div className="popupWrapper">
    <div className='popup'>
       
        <button className='closeBtn' onClick={()=>{
            setShowPopup(false)
            setShowAddUser(false)
            setShowUpdateUser(false)
            setUserView(false)
        }
        
        }>X</button>
{
    userView && <ViewUser/>
}        
{
    showAddUser && <AddUser/>
}

{
    showUpdateUser && <UpdateUser/>
}

    </div>
    </div>
  )
}

export default Popup