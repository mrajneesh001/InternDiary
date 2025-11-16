import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import avatar from "../assets/defaultpic.png"


const Navbar = () => {

    let navigate = useNavigate();
    let location = useLocation();

    const [user, setUser] = useState();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.clear();
        navigate('/login');
    }

    useEffect(() => {

        const asyncFn = async () => {
            let User = (JSON.parse(localStorage.getItem('user')))

            setUser(User)
        };
        asyncFn();

        // eslint-disable-next-line
    }, [])
    return (

        // modal for logout confirmation

        <>
            {/* <!-- Button trigger modal --> */}


            {/* <!-- Modal --> */}
            <div className="modal fade" id="logout" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Do you want to Logout?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleLogout}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>



            <nav className="navbar navbar-expand-lg navbar-light nav-container">
                <div className="container-fluid ">
                    <Link className="navbar-brand" to="/"><h3 className='font-weight-bold '>InternDiary</h3></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/"><p className='nav-ele'>Home</p></Link>
                            </li>

                            {(localStorage.getItem('token')) ? <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`} to="/dashboard"><p className='nav-ele'>Dashboard</p></Link>
                            </li> : ""
                            }
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about"><p className='nav-ele'>About</p></Link>
                            </li>


                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            {location.pathname !== "/login" && <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>}
                            {location.pathname !== "/signup" && <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>}
                        </form> :  <section><img src={user?.profilepic || avatar }className="nav-avatar mx-2" alt="..."/> <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#logout">
                            Logout
                        </button></section>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
