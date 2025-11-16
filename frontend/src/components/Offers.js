import React, { useContext, useEffect, useRef, useState } from 'react'
import OfferContext from "../context/offers/offerContext"
import Offeritem from './Offeritem';
import AddOffer from './AddOffer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-custom-alert';
import Spinner from './Spinner';
const Offers = (props) => {
    const context = useContext(OfferContext);
    let navigate = useNavigate();
    const [load, setLoad] = useState(true);
    const { offers, getOffers, editOffer } = context;
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
    const ref = useRef(null)
    const refClose = useRef(null)
    const [offer, setOffer] = useState({
        id: "", etitle: "", edescription: "", etag: "", estudentsenrolled: [
            {
                userid: "",
                name: "",
                email: "",
                profilepic: "",
                resume: ""
            },
        ]
    })

    const updateOffer = (currentOffer) => {
        ref.current.click();
        setOffer({ id: currentOffer._id, etitle: currentOffer.title, edescription: currentOffer.description, etag: currentOffer.tag, estudentsenrolled: currentOffer.studentsenrolled })

    }

    const handleClick = (e) => {
        editOffer(offer.id, offer.etitle, offer.edescription, offer.etag)
        refClose.current.click();
        toast.success("Updated Successfully")

    }

    const onChange = (e) => {
        setOffer({ ...offer, [e.target.name]: e.target.value })
    }

    return (
        <>

            {/* <h1>{offer}</h1> */}
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <AddOffer />
                </div>
            </div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="updatemodal">
                {/* Launch demo modal */}
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Offer</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={offer.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={offer.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={offer.etag} onChange={onChange} />
                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={offer.etitle.length < 5 || offer.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Offer</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-5 mx-0">

                <div className='d-flex justify-content-between mb-3'><h2>All Offers</h2>   <button className="btn btn-primary mb-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Want to Add</button></div>
                {load ? <Spinner /> : <>
                    <div className="container mx-2">
                        {offers.length === 0 && 'No offers to display'}
                    </div>
                    {
                        Array.isArray(offers) && offers.map((off) => {
                            return <Offeritem key={off._id} updateOffer={updateOffer} offer={off} />
                        })
                    }

                </>}
            </div>
        </>
    )
}

export default Offers
