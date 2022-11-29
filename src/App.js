import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';


function App() {

  

  return (
    <div className="App">

<Router>
<Routes>


<Route path='/login' element={<Login/>}></Route>

<Route exact path='/' element={<Dashboard/>}></Route>



</Routes>
</Router>
    </div>
  );
}

export default App;
