import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Signin from './pages/Signin';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import BookInfo from './pages/BookInfo';
import Url from './utils/ServerUrl';
import Loader from "../src/components/Loader/Loader";


function App() {
  const [isServerReady,setIsServerReady]=useState(false);
  const [isCheckingServer,setIsCheckingServer]=useState(true);
  
  function checkServerStatus(){
    // Show loader
    fetch(Url).then((response)=>{
      if(response.ok){
        setIsServerReady(true);
      }
      else{
        console.log("Error",response.status);
        alert(response.status);
      }
    }).catch((error)=>{
      console.log("Server not ready!");
      alert(error);
    }).finally(()=>{
      setIsCheckingServer(false);
    })
  }

  useEffect(()=>{
    checkServerStatus();
  },[20])

  if(isCheckingServer || !isServerReady){
    return <Loader/>
  }
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/book/:id/:added' element={<BookInfo ServerUrl={Url}/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



