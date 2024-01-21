import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ForgotPassword, Login, ResetPassword, Signup } from './user/components/auth';
import { Inventory, InventoryMedicineGroup, InventoryMedicineList, 
  PaymentReport, SalesEntry, SalesReport, Session, UserDashboard } from './user/pages';
import { ALogin } from './admin/components';
import LandingPageHeader from './user/sections/LandingPageHeader';
import RegisterPhamacy from './user/sections/pharmacy/RegisterPharmacy';
import SummaryDetails from './user/components/inventory/SummaryDetails';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/user' element={<LandingPageHeader />}>
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='dashboard/details' element={<SummaryDetails />} />
            <Route path='register-pharmacy' element={<RegisterPhamacy />} />
            <Route path='session' element={<Session />} />
            <Route path='inventory'>
              <Route index element={< Inventory />} />
              <Route path='medicine-list' element={<InventoryMedicineList />}/>
              <Route path='medicine-group' element={<InventoryMedicineGroup />}/>
            </Route>
            <Route path='report'>
              <Route path='sales' element={<SalesReport />}/>
              <Route path='payments' element={<PaymentReport />}/>
            </Route>
          </Route>

          <Route path='/' element={<Login />} />
          <Route path='/user' >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password/:urltoken" element={<ResetPassword />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path='sales-entry' element={<SalesEntry />} />
          </Route>
          <Route path='/admin'>
            <Route path="login" element={<ALogin />} />
          </Route>
        </Routes>
      </div>     
    </>
  )
}

export default App