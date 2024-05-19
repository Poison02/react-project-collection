import { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/Search'
import Featured from './components/Featured'
import Latest from './components/Latest'
import Trusted from './components/Trusted'
import Banner from './components/Banner'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className='w-full flex flex-col'>
        <Header />
        <SearchBar />
        <Featured />
        <Trusted />
        <Latest />
        <Banner />
        <Footer />
      </div>
    </>
  )
}

export default App
