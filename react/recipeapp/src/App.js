import './App.css';
import React , {useState} from 'react';
import {BrowserRouter as Router, Link, Route, Routes, BrowserRouter} from 'react-router-dom';

import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import AddRecipe from './screens/AddRecipe';
import Profile from './screens/Profile';



function App() {
  const [userToken, setUserToken]  = useState(null);
  const [username, setUsername] = useState("");

    const handleLogin = (token, username) => {
      setUserToken(token);
      setUsername(username);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    }

    const handleLogout = () => {
      setUserToken(null);
      localStorage.remove('token');
    }
  return (
  
    <BrowserRouter>

      <Routes>
        <Route path='/Register' element={<Register />} />
        <Route path='/' element={<Login onLogin={handleLogin} />}/>
        <Route path='/Home'  element={<Home onLogout={handleLogout} username={username}/>} />
        <Route path='/AddRecipe' element={ userToken ? <AddRecipe token={userToken}/>: <Login onLogin ={handleLogin} />} />
        <Route path='/Profile' element={<Profile username={username}/>} />
      </Routes>
     
    </BrowserRouter>
    

  );
  
}

export default App;
