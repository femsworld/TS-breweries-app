import React, { useState } from 'react'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Details from './components/Details'

const App = () => {
  
const [searchResult, setSearchResult] = useState("")
const getSearchResult = (search: string) => {
  setSearchResult(search)
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home getSearchResult={getSearchResult}/>} />
      <Route path='/details/:id' element={<Details />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App