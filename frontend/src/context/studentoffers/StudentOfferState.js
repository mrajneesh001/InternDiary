import StudentOfferContext from "./studentOfferContext";
import { useState } from "react";

const StudentOfferState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [studentoffers, setStudentOffers] = useState(notesInitial)

  // Get all Studentoffers
  const getStudentOffers = async () => {
    // API Call 
    const response = await fetch(`${host}/api/studentoffers/fetchallstudentoffers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setStudentOffers(json)
  }
  // add a student's offer
    const addStudentOffer = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/studentoffers/addstudentoffer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const studentoffer = await response.json();
    setStudentOffers(studentoffers.concat(studentoffer))
  }
 

  return (
    <StudentOfferContext.Provider value={{ studentoffers, getStudentOffers,addStudentOffer }}>
      {props.children}
    </StudentOfferContext.Provider>
  )

}
export default StudentOfferState;