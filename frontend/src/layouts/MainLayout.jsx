import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="pt-14 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}