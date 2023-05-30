import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './scss/style.css'
import Navbar from "./components/Navbar"
import Time from "./components/Time"
import Forecast from "./components/Forecast";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Time />} path="/time" />
        <Route element={<Forecast />} path="/forecast" />
      </Routes>
    </BrowserRouter>
  )
}

export default App;