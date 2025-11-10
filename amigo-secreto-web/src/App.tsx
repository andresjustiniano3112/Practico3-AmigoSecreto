import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import SorteosList from './pages/sorteos/List'
import SorteoDetail from './pages/sorteos/Detail' // <— NUEVO
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import PublicSorteo from './pages/public/SorteoLink'
import PublicBolillo from './pages/public/Bolillo'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/sorteos" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/public/sorteos/:hash" element={<PublicSorteo />} />
        <Route path="/public/bolillo/:hash" element={<PublicBolillo />} />

        <Route path="/sorteos" element={
          <ProtectedRoute><SorteosList /></ProtectedRoute>
        } />
        <Route path="/sorteos/:id" element={
          <ProtectedRoute><SorteoDetail /></ProtectedRoute>
        } />


      </Routes>
    </>
  )
}
export default App
