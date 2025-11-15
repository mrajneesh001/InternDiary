import React from 'react'
import avatar from "../../assets/defaultpic.png"
import "./Profile.css"
const Profile = (props) => {

    const { user, updateUser } = props;

    return (
        <>

            <div className="container mt-5 mb-4 p-3 d-flex justify-content-center profile">
                <div className='profile-wrap'>
                    <div className="card cardprofile" style={{ width: "18rem" }}>
                        <div className='d-flex justify-content-center'>
                            <div className='card-profileimg-wrap'>
                                <div className=" imgedit-badge position-absolute top-0 start-100 my-2 mx-0 pb-0  translate-middle ">
                                    <button className="btn px-0" onClick={updateUser}><i className="fa-regular fa-pen-to-square fa-xl profile-edit-icon"></i></button>
                                    <span className="visually-hidden">Edit profile pic</span>
                                </div>
                                <img src={user.profilepic || avatar} className="card-img-top" alt="..." />
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="name mt-2">
                                <h5 className="card-title">{user?.name}</h5>
                            </div>
                            <div className="idd my-2">
                                {user?.email}
                            </div>
                            <div className=" d-flex my-4 justify-content-center">
                                <button className="btn btn-new btn-primary" onClick={updateUser}>Edit Profile</button>
                            </div>
                            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                                <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span>
                                <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
