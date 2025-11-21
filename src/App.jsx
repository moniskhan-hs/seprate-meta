import React from 'react'
import About from './Components/About'
import Website from './Components/Website'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'

const App = () => {
  return (
      <BrowserRouter>
      <Routes>
          <Route path="/website/:id" element={<Website />} />
         <Route path="/about" element={<About />} />
         <Route path="/" element={<Home />} />
      
        </Routes>
    </BrowserRouter>
  )
}

export default App
