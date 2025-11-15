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
import { recognition } from "./API/voicerecognition";
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import { useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {

  const navigate = useNavigate();
  const [stopReco, setStopReco] = useState(false);

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
console.log(command)
    if (command.includes("Go to") || command.includes("Navigate to")) {
      if (command.includes("home") || command.includes("index")) {
        navigate("/");
      } else if (
        command.includes("login") ||
        command.includes("login")
      ) {
        navigate("/login");
      } else if (
        command.includes("sign up") ||
        command.includes("sign up")
      ) {
        navigate("/signup");
      } else if (command.includes("dashboard") || command.includes("Dashboard")) {
        navigate("/dashboard");
      }
    } else if (
      command.includes("stop listening") ||
      command.includes("stop recognition") ||
      command.includes("stop recognizing") ||
      command.includes("stop voice controlling") ||
      command.includes("stop voice control")
    ) {
      recognition.stop();
      setStopReco(true);
    }
    else if (command.includes("Scroll down") || command.includes("Move down"||"move down")) {
      window.scrollBy(0,500)
    }
    else if (command.includes("Scroll up") || command.includes("Move up")) {
      window.scrollBy(0,-500)
    }

  };

  recognition.onend = () => {
    if (!stopReco) {
      recognition.start();
    }
  };
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
