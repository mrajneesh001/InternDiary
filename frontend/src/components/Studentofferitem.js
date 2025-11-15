// import React, {useContext} from 'react'
// import noteContext from "../context/offers/noteContext"


const StudentOfferitem = (props) => {
    // const context = useContext(noteContext);
    // const { deleteNote } = context;
    const { studentoffer } = props;
    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{studentoffer.title}</h5>
       
                       
                    </div>
                    <p className="card-text">{studentoffer.description}</p>

                </div>
            </div>
        </div>
    )
}

export default StudentOfferitem
