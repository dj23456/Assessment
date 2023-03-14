import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  return (
      <Routes>
        <Route index element={<><Home/></>}></Route>
        <Route path="/index" element={<><Home/></>}></Route>
        <Route path="/addUser" element={<><AddUser/></>}></Route>
        <Route path="/editUser/:id" element={<><EditUser/></>}></Route>
      </Routes>
  );
}

export default App;
