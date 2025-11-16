import React, { useEffect, useState } from 'react'
import AlumOffers from './AlumOffers'
import Studentoffers from './Studentoffers'
import Profile from './profile/Profile'
import { useRef } from 'react'
import { useContext } from 'react';
import avatar from "../assets/defaultpic.png"
import UserContext from '../context/user/userContext';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-custom-alert';
import Navbar from './Navbar';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const Dashboard = (props) => {
  let navigate = useNavigate();
  const context = useContext(UserContext);
  const [euser, setUser] = useState({
    id: "",
    name: "",
    email: "",
    userType: "",
    profilepic: "",
    resume: "",
    datecreated: ""

  });
  const ref = useRef(null)
  const refClose = useRef(null)
  const usertyperef = useRef(null);
  const pdfModalRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const viewResume = () => {
    if (euser.resume) {
      pdfModalRef.current.click();
    } else {
      toast.error("No resume uploaded");
    }
  };


  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  useEffect(() => {

    const asyncFn = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser({
          id: userData.id || userData._id || "",
          name: userData.name || "",
          email: userData.email || "",
          userType: userData.userType || "",
          profilepic: userData.profilepic || "",
          resume: userData.resume || "",
          datecreated: userData.datecreated || ""
        });
      }
    };

    if (localStorage.getItem('firstTime') === "true") {
      usertyperef.current.click();
    }

    asyncFn();


    // eslint-disable-next-line
  }, [])

  const { editUser } = context;





  const handleClickyes = (e) => {
    e.preventDefault();
    let userType = 'Alum'

    editUser(euser.name, userType)
    localStorage.clear();
    navigate('/login');

    window.location.reload(false)

  }
  const handleClickno = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');

  }


  const updateUser = (e) => {

    ref.current.click();

    e.preventDefault();
    let currentUser = JSON.parse(localStorage.getItem('user'))

    setUser({ 
      id: currentUser.id || currentUser._id, 
      name: currentUser.name, 
      userType: currentUser.userType, 
      email: currentUser.email, 
      profilepic: currentUser.profilepic || "",
      resume: currentUser.resume || "",
      datecreated: currentUser.datecreated || ""
    })

  }

  const handleClick = (e) => {
    e.preventDefault();
    editUser(euser.name, euser.userType, euser.profilepic, euser.resume)
    refClose.current.click();
    toast.success("Updated Successfully");
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(euser));


  }

  const onChange = async (e) => {

    setUser({ ...euser, [e.target.name]: e.target.value })


  }
  const onChangepic = async (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      return;
    }

    const filesize = file.size / 1024
    if (filesize > 5120) {
      toast.warning("File size is less than 5mb")
    }
    else {
      const base64 = await convertToBase64(file);
      setUser({ ...euser, profilepic: base64 })
    }





  }
  const onChangeresume = async (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      return;
    }
    
    const filesize = file.size / 1024
    if (filesize > 5120) {
      toast.warning("File size is less than 5mb")
    }
    else {
      const base64 = await convertToBase64(file);
      setUser({ ...euser, resume: base64 })
    }
  }

  return (
    <>
      <Navbar />
      {/* updatemodal*/}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#updateusermodal">
        Launch demo modal
      </button>

      <div className="modal fade" id="updateusermodal" tabIndex="-2" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg ">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-name" id="exampleModalLabel">Edit Offer</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <div className="d-flex justify-content-around edit-user-container">
                    <div className="left">
                      <div className='contianer mb-4'>
                        <div className='d-flex justify-content-center mb-2'>
                          <div className='profileimg-wrap'>
                            <label htmlFor="profilepic" className="form-label profile-img "><img src={euser.profilepic || avatar} style={{
                              borderRadius: "50%", width: "300px", height: "300px", objectFit: "cover", overflow: "hidden"
                            }} alt="..." /></label>
                          </div>
                        </div>
                      </div>
                      <div className='d-flex justify-content-center'>
                        <input type="file" className="form-control d-none" id="profilepic" name="profilepic" accept='.jpeg, .png, .jpg' aria-describedby="emailHelp" onChange={onChangepic} />
                        <label htmlFor="profilepic" className="form-label my-2 mb-0">
                          <span className='btn btn-primary'>{euser.profilepic ? 'Update Profile Picture' : 'Add Profile Picture'}</span>
                        </label>
                      </div>

                    </div>
                    <div className="right my-5">
                      <div className="mb-3">

                        <input type="text"
                          className="form-control my-2 p-3" id="name" name="name" value={euser.name} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />

                      </div>
                      <div className="mb-3">
                        <input type="file" className="form-control d-none" id="resume" name="resume" accept='.pdf' aria-describedby="emailHelp" onChange={onChangeresume} />
                        <label htmlFor="resume" className="form-label my-2 mb-0">
                          <span className='btn btn-primary'>{euser.resume ? 'Update Resume' : 'Add Resume'}</span>
                        </label>
                        {euser.resume && <button type="button" className='btn btn-outline-primary ms-2' onClick={viewResume}>View Resume</button>}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={euser.name.length < 3} onClick={handleClick} type="button" className="btn btn-primary">Update User</button>
            </div>
          </div>
        </div>
      </div>



      {/* <!-- Button trigger modal --> */}
      <button ref={usertyperef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#usertypemodal">
        Launch demo modal
      </button>

      {/* <!--Usertype Modal --> */}
      <div className="modal fade" id="usertypemodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog  modal-xl">
          <div className="modal-content">
            <div className="modal-header ">
              <h1 className="modal-title fs-2 d-flex align-items-center" id="exampleModalLabel">Are you an Alumni</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClickno}>No</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClickyes}>Yes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Viewer Modal */}
      <button ref={pdfModalRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#resumeViewModal">
        View Resume
      </button>

      <div className="modal fade" id="resumeViewModal" tabIndex="-1" aria-labelledby="resumeViewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-2" id="resumeViewModalLabel">Your Resume</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex flex-column align-items-center">
              <Document file={euser.resume} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <div className="mt-3">
                <button 
                  className="btn btn-secondary me-2" 
                  onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                  disabled={pageNumber <= 1}
                >
                  Previous
                </button>
                <span className="mx-3">Page {pageNumber} of {numPages}</span>
                <button 
                  className="btn btn-secondary ms-2" 
                  onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
                  disabled={pageNumber >= numPages}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className='dashboard'>
        <div className='sideprofile'>
          <Profile user={euser} updateUser={updateUser} />
        </div>
        <div className="container leftbar" style={{ flex: "3" }}>

          {(localStorage.getItem('userType') === 'Alum') ? <AlumOffers /> : <Studentoffers />
          }
        </div>
      </div>
    </>

  )
}

export default Dashboard
