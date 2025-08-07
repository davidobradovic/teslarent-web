import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ClientLayout from '../layout/ClientLayout'
import MyReservations from '../routes/client/MyReservations'
import CurrentReservation from '../routes/client/CurrentReservation'
import Settings from '../routes/client/Settings'
import Cookies from 'js-cookie';
import { useAppContext } from '../context/ApplicationContext'
import AllReservations from '../routes/admin/AllReservations'
import AllVehicles from '../routes/admin/AllVehicles'
import SystemUsers from '../routes/admin/SystemUsers'

function ClientRoute() {

  const { user } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    const haveToken = Cookies.get('authToken');
    if (!haveToken) {
      navigate('/auth');
    }
  }, [navigate])

  return (
    <ClientLayout>
      <Routes>
        <Route path='/' element={<MyReservations />} />
        <Route path='/current-reservation' element={<CurrentReservation />} />
        <Route path='/settings' element={<Settings />} />
        {
          user?.role === 'administrator' && (
            <>
              <Route path='/all-reservations' element={<AllReservations />} />
              <Route path='/all-vehicles' element={<AllVehicles />} />
              <Route path='/users' element={<SystemUsers />} />
            </>
          )
        }
      </Routes>
    </ClientLayout>

  )
}

export default ClientRoute