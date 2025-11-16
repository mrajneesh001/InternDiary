import UserContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
  const host = process.env.REACT_APP_BACKEND_API;

const [user, setUser] = useState()
  // Edit a Offer
  const editUser = async (name,userType,profilepic,resume) => {
    // API Call 
    const response = await fetch(`${host}/api/auth/updateuser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({name,userType,profilepic,resume})
    });
    const json = await response.json(); 
    setUser(json);
  }


// to fetch user
  const getUser = async () => {
    // API Call 
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json(); 
    setUser(json);
    
  }


  return (
    <UserContext.Provider value={{editUser,getUser,user}}>
      {props.children}
    </UserContext.Provider>
  )

}
export default UserState;