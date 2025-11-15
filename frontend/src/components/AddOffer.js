import React, {useContext, useState} from 'react'
import offerContext from "../context/offers/offerContext"
import { toast } from 'react-custom-alert';
const AddOffer = () => {
    const context = useContext(offerContext);
    const {addOffer} = context;

    const [offer, setOffer] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addOffer(offer.title, offer.description, offer.tag);
        setOffer({title: "", description: "", tag: ""})
        toast.success("Added successfully!");
    }

    const onChange = (e)=>{
        setOffer({...offer, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Offer</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={offer.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={offer.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={offer.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={offer.title.length<5 || offer.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Offer</button>
            </form>
        </div>
    )
}

export default AddOffer
