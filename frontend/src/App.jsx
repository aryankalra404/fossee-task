import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import WorkshopStatus from './pages/WorkshopStatus'
import WorkshopTypes from './pages/WorkshopTypes'
import WorkshopStatistics from './pages/WorkshopStatistics'
import TeamStatistics from './pages/TeamStatistics'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="status" element={<WorkshopStatus />} />
          <Route path="types" element={<WorkshopTypes />} />
          <Route path="statistics" element={<WorkshopStatistics />} />
          <Route path="teams" element={<TeamStatistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}