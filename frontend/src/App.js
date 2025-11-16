import './App.css';
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import { Home } from './components/Home';

import Studentlist from './components/Studentlist';
import OfferState from './context/offers/OfferState';
import StudentOfferState from './context/studentoffers/StudentOfferState';
import UserState from './context/user/UserState';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Dashboard from './components/Dashboard';
import About from './components/About';
import { useEffect } from 'react';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Remove any lingering modal backdrops when route changes
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    
    // Remove modal-open class from body
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, [location]);

  return (
    <>
      <UserState>
        <StudentOfferState>
          <OfferState>
    
              <div className='my-0'>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/signup" element={<Signup />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/studentlist/:id" element={<Studentlist />} />
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<Home />} />

                </Routes>
              </div>
              {/* <div>
            <Routes>
            </Routes>
          </div> */}

          
          </OfferState>
        </StudentOfferState>
      </UserState>

    </>
  );
}

export default App;
