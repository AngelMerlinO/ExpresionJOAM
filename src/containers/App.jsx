import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../pages/LoginPage.jsx';
import Table from '../pages/HomePage.jsx';
import UserContext from "../Context/UserContext.js";
import Protected from "./Protected.jsx"
import Af from "../pages/expresion.jsx";

function App() {

  const [isLoged, setIsLoged] = useState(false);

  return (
    <BrowserRouter>
    <UserContext.Provider value={{isLoged, setIsLoged}}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route element={<Protected isLoged={isLoged}/>}>
         <Route path="/Table" element={<Table/>}/>
         <Route path="/expresion" element={<Af/>}/>

         
        </Route>
      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;