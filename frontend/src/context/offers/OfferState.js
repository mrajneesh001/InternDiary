import OfferContext from "./offerContext";
import { useState } from "react";

const OfferState = (props) => {
  const host = process.env.REACT_APP_BACKEND_API;
  const offersInitial = []
  const [offers, setOffers] = useState(offersInitial)

  // Get all Offers
  const getOffers = async () => {
    // API Call 
    const response = await fetch(`${host}/api/offers/fetchalloffers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setOffers(json)
  }
  // get alums offers
  const getAlumOffers = async () => {
    // API Call 

    const response = await fetch(`${host}/api/offers/fetchallalumoffers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setOffers(json)
  }
  // Add a Offer
  const addOffer = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/offers/addoffer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const offer = await response.json();
    setOffers(offers.concat(offer))
  }

  // Delete a Offer
  const deleteOffer = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/offers/deleteoffer/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    const json = await response.json();
    const newOffers = offers.filter((offer) => { return offer._id !== id })
    setOffers(newOffers)
  }

  // Edit a Offer
  const editOffer = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/offers/updateoffer/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    // eslint-disable-next-line no-unused-vars
    const json = await response.json();

    let newOffers = JSON.parse(JSON.stringify(offers))
    // Logic to edit in client
    for (let index = 0; index < newOffers.length; index++) {
      const element = newOffers[index];
      if (element._id === id) {
        newOffers[index].title = title;
        newOffers[index].description = description;
        newOffers[index].tag = tag;
        break;
      }
    }
    setOffers(newOffers);
  }

  // add student id to offer he applied for
  const addStudentToOffer = async (id, studentid, name, email, profilepic, resume) => {
    // API Call 
    const response = await fetch(`${host}/api/offers/addstudent/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ studentid, name, email, profilepic, resume })
    });
    const json = await response.json();
    if (json.success) {
      window.location.reload(false);
    }

  }

  return (
    <OfferContext.Provider value={{ offers, addOffer, deleteOffer, editOffer, getOffers, getAlumOffers, addStudentToOffer }}>
      {props.children}
    </OfferContext.Provider>
  )

}
export default OfferState;