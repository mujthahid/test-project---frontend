import React ,{ useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import Popup from '../Components/Popup'
import {ActionContext} from '../Context/ActionContext'


function Dashboard() {
    const [showPopup,setShowPopup] = useState(false)
  const [showAddUser,setShowAddUser] = useState(false)
  const [showUpdateUser,setShowUpdateUser] = useState(false)
  const [editUserData,setEditUserData] = useState({})
  const [viewUserData,setViewUserData]= useState({})
  const [userView,setUserView] = useState(false)
 const [users,setUsers] = useState([]) 
 const [activeUser,setActiveUser] = useState('')
 
 const navigate = useNavigate()


 
Axios.defaults.withCredentials = true;

useEffect(()=>{


const getUsers = async()=>{
    await Axios.get("http://localhost:3001/userData").then((response)=>{
    setUsers(response.data)
   })
    }  
getUsers()
},[users])

useEffect (()=>{
  Axios.get('http://localhost:3001/login').then((response)=>{
    console.log(response.data)
    if(response.data.loggedIn){
      setActiveUser(response.data.user.username)
    }else{
      navigate('/login')
    }
  })
},[])

const addUser = ()=>{
    setShowAddUser(true)
    setShowPopup(true)
}
const viewUser = (username,email)=>{
  setViewUserData({username,email})
  setShowPopup(true)
  setUserView(true)
}
const editUser = (id,username,email)=>{
    setEditUserData({id,username,email})
    setShowPopup(true)
    setShowUpdateUser(true)
}
const deleteUser = async(id)=>{
   await Axios.delete(`http://localhost:3001/users/${id}`).then((response)=>{
    if(response.data.success){
        alert('deletion success')
         }
   }) 
}

const logout = () => {
  Axios.get("http://localhost:3001/logout").then((response)=>{
    if(response.data.success){
      navigate('/login')
    }
  })
}

let data = users.map((user,i)=>{
    return <tr key={i}>
        <td>{i+1}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td><button onClick={()=>viewUser(user.username,user.email)}>view</button>
        <button onClick={()=>editUser(user.id,user.username,user.email)}>edit</button>
        <button onClick={
            ()=> {if (window.confirm(`Are you sure about deleting the account associated with the mail ID ${user.email}`)) deleteUser(user.id)}}>
         delete</button>
        </td>
    </tr>
    
})

  return (
    <ActionContext.Provider value={{showPopup,setShowPopup,showAddUser,setShowAddUser,showUpdateUser,setShowUpdateUser,editUserData,viewUserData,userView,setUserView}}>

    <div className='dashboard'>
      {activeUser && <button onClick={logout} className='logoutBtn'>logout</button>}
      <h3>All Users</h3>
        <button className='addUserBtn' onClick={addUser}>Add User</button>
<div className="tableDiv">
       <table>
        <thead>
        <tr>
            <th>S.NO</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        </thead>
       
       <tbody>
        {data}
      </tbody>
    </table>
    </div>
      {showPopup && <Popup/>}

    </div>
    </ActionContext.Provider>
  )
}

export default Dashboard