import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Thankingpage from './pages/Thankingpage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/thanks' element={<Thankingpage/>}/>
      </Routes>
    </Router>
  )
}

export default App
