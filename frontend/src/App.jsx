// import { useState } from 'react';
// import LandingPage from './pages/LandingPage';
// import Thankingpage from './pages/Thankingpage';
// import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
// import Home from './pages/Home';
// import Signin from './pages/Signin';
// import Signup from './pages/Signup';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import MyQuizzes from './pages/MyQuizzes';
// import Play from './pages/Play';
// import Create from './pages/Create';
// import TakeaQuiz from './pages/TakeaQuiz';
// import Leaderboard from './pages/Leaderboard';
// import ImageQuiz from './pages/ImageQuiz';
// import AppHeader from './pages/AppHeader';


// function HeaderWrapper() {
//   const location = useLocation();
//   const headerPaths = ['/dashboard', '/create', '/play', '/take-a-quiz', '/image', '/leaderboard'];
  
//   return headerPaths.includes(location.pathname) ? <AppHeader /> : null;
// }
// function App() {
//   const headerPaths = ['/dashboard', '/create','play', '/take-a-quiz','image', '/leaderboard'];

//   return (
//     <GoogleOAuthProvider clientId='845374820354-bsm9cor20ifqa1vi140rk8i7h11k48uo.apps.googleusercontent.com'>
//     <Router>
//     <HeaderWrapper/>
//     <main className="flex-grow  {headerPaths.includes(location.pathname)}?:pt-12">
//       <Routes>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/signin' element={<Signin/>}/>
//       <Route path='/signup' element={<Signup/>}/>
//       <Route path='/dashboard' element={<MyQuizzes/>}/>
//       <Route path='/play' element={<Play/>}/>
//       <Route path='/take-a-quiz' element={<TakeaQuiz/>}/>
//       <Route path='/create' element={<Create/>}/>
//       <Route path='/image' element={<ImageQuiz/>}/>
//       <Route  path='/leaderboard' element={<Leaderboard/>}/>
//       <Route path='/thanks' element={<Thankingpage/>}/>
//       </Routes>
//       </main>
//     </Router>
    
//     </GoogleOAuthProvider>
//   )
// }

// export default App

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import MyQuizzes from './pages/MyQuizzes';
import Play from './pages/Play';
import Create from './pages/Create';
import TakeaQuiz from './pages/TakeaQuiz';
import Leaderboard from './pages/Leaderboard';
import ImageQuiz from './pages/ImageQuiz';
import Thankingpage from './pages/Thankingpage';
import AppHeader from './pages/AppHeader';

function HeaderWrapper() {
  const location = useLocation();
  const headerPaths = ['/dashboard', '/create',  '/take-a-quiz', '/image', '/leaderboard'];
  
  return headerPaths.includes(location.pathname) ? <AppHeader /> : null;
}

function MainContent() {
  const location = useLocation();
  const headerPaths = ['/dashboard', '/create', '/take-a-quiz', '/image', '/leaderboard'];
  
  return (
    <main className={`flex-grow ${headerPaths.includes(location.pathname) ? 'pt-16' : ''}`}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<MyQuizzes/>}/>
        <Route path='/play' element={<Play/>}/>
        <Route path='/take-a-quiz' element={<TakeaQuiz/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/image' element={<ImageQuiz/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/thanks' element={<Thankingpage/>}/>
      </Routes>
    </main>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId='845374820354-bsm9cor20ifqa1vi140rk8i7h11k48uo.apps.googleusercontent.com'>
      <Router>
        <div className="min-h-screen flex flex-col">
          <HeaderWrapper />
          <MainContent />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;