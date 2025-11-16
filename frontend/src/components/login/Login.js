import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { toast } from "react-custom-alert"
import "./login.css"
import loginimg from "../../assets/login.jpg"
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('userType', json.userType);
            localStorage.setItem('user', JSON.stringify(json.result));

            navigate("/")

            toast.success("Logged in successfully");

        }
        else {
            toast.error("Invalid Credentials");
        }
    }

    async function handleGoogleLoginSuccess(tokenResponse) {
        try {
            setIsGoogleLoading(true);
            
            if (!tokenResponse || !tokenResponse.access_token) {
                console.error("No access token received:", tokenResponse);
                toast.error("Failed to get access token from Google");
                return;
            }
            
            const accessToken = tokenResponse.access_token;
            console.log("Sending Google token to backend...");
            
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ googleAccessToken: accessToken })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Backend error:", response.status, errorText);
                toast.error(`Login failed: ${response.status} ${response.statusText}`);
                return;
            }
            
            const json = await response.json()

            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                localStorage.setItem('userType', json.userType);
                localStorage.setItem('user', JSON.stringify(json.result));
                navigate("/")

                toast.success("Logged in successfully");
            } else {
                toast.error(json.message || "Google login failed");
            }
        } catch (error) {
            console.error("Google login error:", error);
            toast.error(`Error during Google login: ${error.message}`);
        } finally {
            setIsGoogleLoading(false);
        }
    }
    
    const handleGoogleLoginError = (error) => {
        console.error("Google OAuth error details:", error);
        const errorMessage = error?.error || error?.error_description || "Google login failed";
        toast.error(`Google login error: ${errorMessage}`);
    }
    
    const handleGoogleLoginClick = () => {
        setIsGoogleLoading(true);
        login();
    }
    
    const login = useGoogleLogin({ 
        onSuccess: handleGoogleLoginSuccess,
        onError: (error) => {
            setIsGoogleLoading(false);
            handleGoogleLoginError(error);
        },
        ux_mode: 'redirect', // Redirect mode avoids COOP policy issues
        flow: 'implicit', // Use implicit flow for access token
    });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Navbar />
            <section className='Form my-5 mx-5'>
                <div className="container">
                    <div className="row loginrow no-gutters">
                        <div className="col-lg-5 px-0">
                            <img src={loginimg}className='img-fluid loginimg' alt="..." />
                        </div>
                        <div className="col-lg-7 px-5 pt-5">
                            <div><h1 className='font-weight-bold py-3'>InternDiary</h1></div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <input type="email" placeholder="Email-Address" className="form-control my-3 p-4" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-row">
                                    <input type="password" placeholder="*******" className="form-control my-3 p-4" value={credentials.password} onChange={onChange} name="password" id="password" />
                                </div>
                                <button type="submit" className="btn btn1 btn-dark my-3">Login</button>
                            </form>
                            <div className='d-flex justify-content-between'>
                                {process.env.REACT_APP_client_Id && (
                                    <div className='my-4'>
                                        <p>Login with google</p>
                                        <button 
                                            onClick={handleGoogleLoginClick} 
                                            className="btn btn2"
                                            disabled={isGoogleLoading}
                                        >
                                            {isGoogleLoading ? (
                                                <span>Loading...</span>
                                            ) : (
                                                <i className="fa-brands fa-google"></i>
                                            )}
                                        </button>
                                    </div>
                                )}
                                <div className='my-4'>
                                    <p>Don't have any account?</p><Link to="/signup"> Register here</Link>
                                </div></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
