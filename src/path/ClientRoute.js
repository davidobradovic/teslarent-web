import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../routes/client/Dashboard'
import ClientLayout from '../layout/ClientLayout'
import MyReservations from '../routes/client/MyReservations'
import CurrentReservation from '../routes/client/CurrentReservation'
import Settings from '../routes/client/Settings'

function ClientRoute() {
  return (
    <ClientLayout>
          <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/my-reservations' element={<MyReservations />} />
              <Route path='/current-reservation' element={<CurrentReservation />} />
              <Route path='/settings' element={<Settings />} />
          </Routes>
    </ClientLayout>

  )
}

export default ClientRoute