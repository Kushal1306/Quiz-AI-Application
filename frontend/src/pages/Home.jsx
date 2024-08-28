import React from 'react'
import Header from './Header'
import LandingPage from './LandingPage'
import { Navbar } from './Navbar';
import Pricing from './Pricing'
import { Features } from '../components/ui/Features';

function Home() {
  return (
    <>
      <Header />
      {/* <Navbar/> */}
      <main>
        <section id="landing">
          <LandingPage />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id='pricing'>
          <Pricing />
        </section>
      </main>
    </>
  )
}

export default Home
