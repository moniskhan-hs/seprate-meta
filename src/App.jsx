import React from 'react'
import About from './Components/About'
import Website from './Components/Website'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
      <BrowserRouter>
      <Routes>
          <Route path="/website/:id" element={<Website />} />
         <Route path="/about" element={<About />} />
      
        </Routes>
    </BrowserRouter>
  )
}

export default App
