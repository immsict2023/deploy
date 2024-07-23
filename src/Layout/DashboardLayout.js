import React, { useEffect } from 'react'
import Header from '../Component/Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Component/Header/Footer';
import auth from '../Component/Controller/Login/auth';

function DashboardLayout() {

  const navigate = useNavigate()

  const isAuthenticatedFunc = async () => {
    const res = await auth.isAuthenticated()
      if (res.data.isAuthenticated) {
        navigate('/registrar')
      } else {
        navigate('/login')
      }
  }

  useEffect(() => {
    isAuthenticatedFunc()
  }, [])

  return (
    <>
      <header>
        <Header />
      </header>
      <main className='dashboard'>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default DashboardLayout