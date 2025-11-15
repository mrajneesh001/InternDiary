import React, { useContext, useEffect} from 'react'
import StudentOfferContext from "../context/studentoffers/studentOfferContext"
import StudentOfferitem from './Studentofferitem';
import { useNavigate } from 'react-router-dom';

const Offers = () => {
    const context = useContext(StudentOfferContext);
    let navigate=useNavigate();
    const { studentoffers, getStudentOffers } = context;
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getStudentOffers()
        }
        else
        {
            navigate("/login")
        }
        
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="row my-3">
                <h2>Your Offers</h2>
                <div className="container mx-2"> 
                {studentoffers.length===0 && 'No studentoffers to display'}
                </div>
                {studentoffers.map((studentoffer) => {
                    return <StudentOfferitem key={studentoffer._id} studentoffer={studentoffer} />
                })}
            </div>
        </>
    )
}

export default Offers
