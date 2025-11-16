import './App.css';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import { Home } from './components/Home';

import Studentlist from './components/Studentlist';
import OfferState from './context/offers/OfferState';
import StudentOfferState from './context/studentoffers/StudentOfferState';
import UserState from './context/user/UserState';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import { useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {

  const navigate = useNavigate();

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
