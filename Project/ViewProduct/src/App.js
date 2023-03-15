import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';
import Index from './pages/Index';
import About from './pages/About';
import Products from './pages/Products';
import Fashion from './pages/Fashion';
import News from './pages/News';
import Contact from './pages/Contact';
import Product_Details from './pages/Product_Details';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Login from './pages/Login';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<><Header/><Index/><Footer/></>}></Route>
        <Route path='/index' element={<><Header/><Index/><Footer/></>}></Route>
        <Route path='/about' element={<><Header/><About/> <Footer/></>}></Route>
        <Route path='/products' element={<><Header/><Products/><Footer/></>}></Route>
        <Route path='/fashion' element={<><Header/><Fashion/><Footer/></>}></Route>
        <Route path='/news' element={<><Header/><News/><Footer/></>}></Route>
        <Route path='/contact' element={<><Header/><Contact/><Footer/></>}></Route>
        <Route path='/login' element={<><Login/></>}></Route>
        <Route path='/register' element={<><Signup/></>}></Route>
        <Route path='/viewdetails/:id' element={<><Header/><Product_Details/><Footer/></>}></Route>
        {/* <Route path='/login' element={<><Login/></>}></Route> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
