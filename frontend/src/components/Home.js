import Offers from './Offers';
import AllOffers from './AllOffers'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
export const Home = () => {
    let navigate = useNavigate();

    // setInterval(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login');
    //     }
    // }, 1000);


    useEffect(() => {
        const asyncFn = async () => {
            let firstTime = localStorage.getItem('firstTime');

            if (firstTime === "true") {
                navigate("/dashboard");
            }

        };
        asyncFn();

        // eslint-disable-next-line
    }, [])






    return (
        <>
            <Navbar />
            <div className="container">
                {
                    (localStorage.getItem('userType') === 'Alum') ? <Offers /> : <AllOffers />
                }
            </div>
        </>
    )
}
