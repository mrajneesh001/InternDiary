import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import { GoogleOAuthProvider } from "@react-oauth/google"
// const dotenv = require(".dotenv").config();
const root = ReactDOM.createRoot(document.getElementById("root"));
const googleClientId = process.env.REACT_APP_client_Id;

if (!googleClientId ) {
  console.warn("⚠️ Google OAuth Client ID is not configured. Google login will not work.");
  console.warn("Please add REACT_APP_client_Id to your .env file");
}

root.render(
  <React.StrictMode>
    <Router>
      {googleClientId && googleClientId !== "dummy-client-id" ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          <ToastContainer floatingTime={2000} />
          <App />
        </GoogleOAuthProvider>
      ) : (
        <>
          <ToastContainer floatingTime={2000} />
          <App />
        </>
      )}
    </Router>
  </React.StrictMode>,
);
