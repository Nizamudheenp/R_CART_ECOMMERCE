import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout({searchTerm,setSearchTerm}) {
  return (
    <div>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <main>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout