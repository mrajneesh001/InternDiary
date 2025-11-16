import React, { useContext, useEffect, useState, useRef } from 'react'
import offerContext from "../context/offers/offerContext"
import studentOfferContext from "../context/studentoffers/studentOfferContext"
import userContext from "../context/user/userContext"
import { useLocation } from 'react-router-dom'
import { toast } from 'react-custom-alert';
import Newbadge from './Newbadge';


const Offeritem = (props) => {
    const context = useContext(offerContext);
    const studentcontext = useContext(studentOfferContext);
    const usercontext = useContext(userContext);
    const { deleteOffer, addStudentToOffer } = context;
    const { addStudentOffer } = studentcontext;
    const { editUser } = usercontext;
    const { offer, updateOffer, showApplicants} = props;
    const inidate=new Date();
    const[curdate,setCurdate]=useState(inidate)
    const [user, setUser] = useState();
    const [apply, setApply] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const resumeModalRef = useRef(null);
    const resumeModalCloseRef = useRef(null);
 
    let location = useLocation();

    const offerdate = new Date((offer.date).slice(0, -1));



    useEffect(() => {

        const asyncFn = async () => {
            let User = (JSON.parse(localStorage.getItem('user')))

            setUser(User)
            await checkapplied();
            setInterval(() => {
                let d=new Date();
                setCurdate(d);
           }, 1000);
           console.log(offerdate);
           console.log(curdate);


        };
        asyncFn();

        // eslint-disable-next-line
    }, [])

    const checkapplied = async () => {

        let students = await offer.studentsenrolled;
        let currentuserid = await (JSON.parse(localStorage.getItem('user'))).id;

        if (!currentuserid) {
            currentuserid = await (JSON.parse(localStorage.getItem('user')))._id;
        }

        for (let i = 0; i < students.length; i++) {
            if (currentuserid === students[i].userid) {
                setApply(true);
                break;
            }
        }
    }
    const handleClick = async (e) => {
        e.preventDefault();
 
        // Check if user has uploaded resume
        if (!user || !user.resume) {
            // Open modal to prompt user to upload resume
            resumeModalRef.current.click();
            return;
        }

        addStudentOffer(offer.title, offer.description, offer.tag);

        if (user) {
            addStudentToOffer(offer._id, (user.id || user._id), user.name, user.email, user.profilepic, user.resume);
            toast.success("Applied Successfully");
        }
        else {
            toast.error("Invalid Credentials");

        }
    }

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                setResumeFile(base64);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Please upload a PDF file");
        }
    }

    const handleResumeSubmit = async () => {
        if (!resumeFile) {
            toast.error("Please select a resume file");
            return;
        }

        try {
            // Update user profile with resume
            await editUser(user.name, user.userType, user.profilepic, resumeFile);
            
            // Update local storage
            const updatedUser = { ...user, resume: resumeFile };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            
            // Close modal
            resumeModalCloseRef.current.click();
            
            toast.success("Resume uploaded successfully!");
            
            // Now apply for the job
            addStudentOffer(offer.title, offer.description, offer.tag);
            addStudentToOffer(offer._id, (updatedUser.id || updatedUser._id), updatedUser.name, updatedUser.email, updatedUser.profilepic, updatedUser.resume);
            toast.success("Applied Successfully");
        } catch (error) {
            toast.error("Failed to upload resume");
        }
    }

    return (
        <>

            <div className="col-md-4">

                <div className="card my-3">
                    <div className="card-body ">
                        <span className=" offer-badge position-absolute top-0 end-0 px-3 pb-0 translate-middle badge rounded-pill bg-danger">
                            <h5>{offer.studentsenrolled.length}</h5>
                            <span className="visually-hidden">Students Enrolled</span>
                        </span>
                       {(curdate.getDate()-offerdate.getDate()<=1&&curdate.getMonth()-offerdate.getMonth()<=0&&curdate.getFullYear()-offerdate.getFullYear()<=0)&& <Newbadge/>}
                        <div className="d-flex align-items-center justify-content-space-around">
                            <h5 className="card-title">{offer.title}</h5>
                        </div>
                        <p className="card-text">{offer.description}</p>
                        {!(localStorage.getItem('userType') === 'Alum') ? <div>
                            {(apply) ? <button className="btn btn-secondary" disabled>Applied</button> : <button className="btn btn-outline-primary" onClick={handleClick}>Apply</button>}</div> : ""

                        }

                        <div className="d-flex justify-content-between">
                            {(localStorage.getItem('userType') === 'Alum' && location.pathname === "/dashboard") ? <button className="btn btn-outline-primary" onClick={() => { showApplicants(offer); }} >Applicants</button> : ""

                            }
                            <div className="my-2 mb-0">
                                {location.pathname === "/dashboard" && localStorage.getItem('userType') === 'Alum' ? <i className="far fa-trash-alt mx-2" data-bs-toggle="modal" data-bs-target="#deletionmodal" ></i> : ""
                                }
                                {location.pathname === "/dashboard" && localStorage.getItem('userType') === 'Alum' ? <i className="far fa-edit mx-2" onClick={() => { updateOffer(offer); }}></i> : ""
                                }</div>
                        </div>

                    </div>
                </div>

            </div >



            {/* Modal for resume upload */}
            <button ref={resumeModalRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#resumeUploadModal">
                Upload Resume
            </button>

            <div className="modal fade" id="resumeUploadModal" tabIndex="-1" aria-labelledby="resumeUploadModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="resumeUploadModalLabel">Upload Resume to Apply</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={resumeModalCloseRef}></button>
                        </div>
                        <div className="modal-body">
                            <p>You need to upload your resume before applying for this position.</p>
                            <div className="mb-3">
                                <label htmlFor="resumeUpload" className="form-label">Select Resume (PDF only)</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    id="resumeUpload" 
                                    accept=".pdf" 
                                    onChange={handleResumeUpload}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleResumeSubmit}>Upload & Apply</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* //  modal for deletion */}
            <div className="modal fade" id="deletionmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Do you want to delete ?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Title: {offer.title}</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={() => { deleteOffer(offer._id); toast.success("Deleted Successfully");  }} >Delete</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Offeritem
