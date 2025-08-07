import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainScreen from './routes/MainScreen'
import Cars from './routes/Cars'
import Authentication from './routes/Authentication'
import ClientRoute from './path/ClientRoute'
import { AppProvider } from './context/ApplicationContext'
import ConfirmReservation from './routes/ConfirmReservation'
import NotFound from './routes/NotFound'
import GeneralTerms from './routes/infoPages/GeneralTerms'
import PaymentMethods from './routes/infoPages/PaymentMethods'
import PaymentTerms from './routes/infoPages/PaymentTerms'
import RightToWithdraw from './routes/infoPages/RightToWithdraw'
import TermsOfComplaintsEtc from './routes/infoPages/TermsOfComplaintsEtc'
import ProtectionOfTransaction from './routes/infoPages/ProtectionOfTransaction'

function App() {

  
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<MainScreen />} />
          <Route path='/vehicles' element={<Cars />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/reservation-confirm' element={<ConfirmReservation />} />
          <Route path='/client/*' element={<ClientRoute />} />
          <Route path='/general-terms' element={<GeneralTerms />} />
          <Route path='/payment-methods' element={<PaymentMethods />} />
          <Route path='/payment-terms' element={<PaymentTerms />} />
          <Route path='/rights-to-withdraw' element={<RightToWithdraw />} />
          <Route path='/terms-of-complaints' element={<TermsOfComplaintsEtc />} />
          <Route path='/protection-of-transaction' element={<ProtectionOfTransaction />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App