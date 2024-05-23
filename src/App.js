import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from './component/Navbar';
import Form from './component/Form';
import {  Route, Routes } from 'react-router-dom';
import Register from './component/Register';
import Edit from './component/Edit';
import View from './component/View';
import Footer from './component/Footer';

function App() {
  return (
   
      <>
        {/* Adding Navbar */}
        <Navbar />

        <Routes>
          {/* Rendering the form */}
          <Route exact path="/" element={<Form />} />
          <Route exact path="/register" element={<Register />} />
           <Route exact path="/edit/:id" element={<Edit />} />
           <Route exact path="/view/:id" element={<View />} />
        </Routes>
        
        <Footer/>
      </>
   
  );
}

export default App;
