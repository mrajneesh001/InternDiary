import React, { useContext, useEffect, useState } from 'react'
import OfferContext from "../context/offers/offerContext"
import Offeritem from './Offeritem';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const AllOffers = () => {
    const context = useContext(OfferContext);
    let navigate = useNavigate();
    const [load, setLoad] = useState(true);
    const { offers, getOffers } = context;
    useEffect(() => {


        const asyncFn = async () => {
            setLoad(true);

            if (localStorage.getItem('token')) {
                await getOffers()

            }
            else {
                navigate("/login")
            }

            setLoad(false);

        };
        asyncFn();
        // eslint-disable-next-line
    }, [])

    return (
        <>

            <div className="row my-3">
                <h2>All Offers</h2>
                {load ? <Spinner /> : <>
                    <div className="container mx-2">
                        {offers.length === 0 && 'No offers to display'}
                    </div>
                    {offers.map((offer) => {
                        return <Offeritem key={offer._id} offer={offer} />
                    })}
                </>}
            </div>
        </>
    )
}

export default AllOffers
