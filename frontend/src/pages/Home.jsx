import React from 'react'
import Header from './Header'
import LandingPage from './LandingPage'
import Pricing from './Pricing'

function Home() {
  return (
    <>
    <Header/>
    <main>
        <section id="landing">
        <LandingPage/>
        </section>
        <section id='pricing'>
        <Pricing/>
        </section>
    </main>
    </>
  )
}

export default Home