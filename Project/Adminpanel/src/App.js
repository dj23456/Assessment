import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Addproduct from './pages/Addproduct';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import Table from './pages/Table';

function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route index element={<><LoginPage/></>}></Route>
        <Route path="/index" element={<><LoginPage/></>}></Route>
        <Route path="/register" element={<><Signup/></>}></Route>
        <Route path="/dashboard" element={<><Header/><Dashboard/></>}></Route>
        <Route path="/products" element={<><Header /><Addproduct/></>}></Route>
        <Route path="/tables" element={<><Header /><Table/></>}></Route>
      </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
