import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Thankingpage from './pages/Thankingpage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MyQuizzes from './pages/MyQuizzes';
import Play from './pages/Play';
import Create from './pages/Create';
function App() {

  return (
    <GoogleOAuthProvider clientId='845374820354-bsm9cor20ifqa1vi140rk8i7h11k48uo.apps.googleusercontent.com'>
    <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/myQuizzes' element={<MyQuizzes/>}/>
      <Route path='play' element={<Play/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/thanks' element={<Thankingpage/>}/>
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  )
}

export default App
