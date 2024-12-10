import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainScreen from './routes/MainScreen'
import Cars from './routes/Cars'
import RentCar from './routes/RentCar'
import Authentication from './routes/Authentication'
import ClientRoute from './path/ClientRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainScreen/>} />
        <Route path='/vozila' element={<Cars />} />
        <Route path='/rezerviši-vozilo' element={<RentCar />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/client/*' element={<ClientRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App