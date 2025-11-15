import React, { useContext, useEffect, useRef, useState } from 'react'
import OfferContext from "../context/offers/offerContext"
import Offeritem from './Offeritem';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import Studentlist from './Studentlist';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { toast } from 'react-custom-alert';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;



const AlumOffers = () => {
    const context = useContext(OfferContext);
    let navigate = useNavigate();
    // const iniload="true";
    const [load, setLoad] = useState(true);
    const { offers, getAlumOffers, editOffer } = context;
    useEffect(() => {


        const asyncFn = async () => {
            // window.location.reload(false)
            setLoad(true);
            if (localStorage.getItem('token')) {
                await getAlumOffers()

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
    const apref = useRef(null);
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



    const showApplicants = (currentOffer) => {
        apref.current.click();
        setOffer({ id: currentOffer._id, etitle: currentOffer.title, edescription: currentOffer.description, etag: currentOffer.tag, estudentsenrolled: currentOffer.studentsenrolled })

    }


    const updateOffer = (currentOffer) => {
        ref.current.click();
        setOffer({ id: currentOffer._id, etitle: currentOffer.title, edescription: currentOffer.description, etag: currentOffer.tag, estudentsenrolled: currentOffer.studentsenrolled })

    }

    const handleClick = (e) => {
        editOffer(offer.id, offer.etitle, offer.edescription, offer.etag)
        refClose.current.click();
        toast.success("Updated Successfully");

    }

    const onChange = (e) => {
        setOffer({ ...offer, [e.target.name]: e.target.value })
    }

    const pdfref = useRef(null)
  
    const [pdf, setPdf] = useState()

    const showPdf = (currentpdf) => {
        pdfref.current.click();
        setPdf(currentpdf);

    }
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#updatemodal">
                Launch demo modal
            </button>
            <div className="modal fade" id="updatemodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

            <div className="row my-3 d-flex">
                <h2 className='text-center mb-4'>Your Offers</h2>
                {load ? <Spinner /> : <>
                    <div className="container mx-2">
                        {offers.length === 0 && 'No offers to display'}
                    </div>
                    {offers.map((offer) => {
                        return <Offeritem key={offer._id} updateOffer={updateOffer}
                            showApplicants={showApplicants} offer={offer} />

                    })}
                </>}

            </div>


            {/* show students modal  */}

            {/* <!-- Button trigger modal --> */}
            <button ref={apref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#applicantsmodal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="applicantsmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-xl">
                    <div className="modal-content">
                        <div className="modal-header ">
                            <h1 className="modal-title fs-2 d-flex align-items-center" id="exampleModalLabel">Title: {offer.etitle}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">
                            <div className='container'>
                                <Studentlist studentsenrolled={offer.estudentsenrolled} showPdf={showPdf} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>




            {/* <!-- Button trigger modal --> */}
            <button ref={pdfref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#resumemodal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="resumemodal" tabIndex="-5" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-2 " id="exampleModalLabel">Resume</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={pageNumber} />
                            </Document>
                            <div>
                                Page {pageNumber} of {numPages}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default AlumOffers
