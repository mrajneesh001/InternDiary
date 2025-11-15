import React from 'react'
const Studentitem = (props) => {

  const { student, showPdf } = props;
  return (
    <>

      <div className="card mb-3 mx-2" style={{ maxWidth: "20rem" }}>
        <div className="row g-0 ">
          <div className="col-md-4">
            <div className="">
              <img src={student.profilepic} className="img-fluid student-card-img" alt="..." />
            </div></div>
          <div className="col-md-8">
            <div className="card-body pe-0 pb-0">
              <h5 className="card-title pb-0">{student.name}</h5>
              <p className="card-text">{student.email}</p>
              <div className="d-flex justify-content-end">
                <button className='btn btn-primary btn-resume mb-2 me-0 ' onClick={() => { showPdf(student.resume); }}>Resume</button>
              </div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Studentitem
