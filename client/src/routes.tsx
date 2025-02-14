import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { CrimeReportForm } from './components/CrimeReportForm'
import { IncidentDetails } from './components/IncidentDetails'
// import { Login } from './pages/Login'
// import { Register } from './pages/Register'
// import { Dashboard } from './pages/Dashboard'
// import { NotFound } from './pages/NotFound'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<CrimeReportForm />} />
      <Route path="/report/:id" element={<IncidentDetails />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}
