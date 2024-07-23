import React from 'react'
import Header from '../Component/Header/Header'
import RegNavbar from '../Component/Registrar/RegNavbar/RegNavbar'
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Header/Footer';

function RegistrarLayout() {
  return (
    <>
      <header style={{position: 'sticky'}}>
        <Header />
        <RegNavbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default RegistrarLayout
