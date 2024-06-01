import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Signin from './pages/Signin';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



