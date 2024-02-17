import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../pages/LoginPage.jsx';
import Table from '../pages/HomePage.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Table" element={<Table/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;