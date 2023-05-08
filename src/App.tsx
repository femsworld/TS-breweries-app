import React, { useState } from 'react'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Details from './components/Details'

const App = () => {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/details/:id' element={<Details />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App