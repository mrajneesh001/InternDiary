import React from 'react'
import Navbar from './Navbar'
import './About.css'

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-header text-center mb-5">
                <h1 className="display-4 font-weight-bold">About InternDiary</h1>
                <p className="lead text-muted">Bridging the gap between students and alumni for better internship opportunities</p>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="about-content">
                <h2 className="mb-4">What is InternDiary?</h2>
                <p className="text-justify">
                  InternDiary is a comprehensive platform designed to connect students with alumni and industry professionals 
                  for internship and job opportunities. We understand that finding the right internship can be challenging, 
                  and networking plays a crucial role in career development. That's why we created a space where students 
                  can discover opportunities shared by alumni who have walked the same path and understand the journey.
                </p>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="about-content">
                <h2 className="mb-4">Our Mission</h2>
                <p className="text-justify">
                  Our mission is to create a thriving community where knowledge, opportunities, and experiences are shared 
                  freely between students and alumni. We aim to simplify the internship search process and provide students 
                  with direct access to opportunities posted by trusted alumni and professionals from their own institutions.
                </p>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-12">
              <h2 className="text-center mb-4">Key Features</h2>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="feature-card p-4">
                    <h4 className="mb-3">📋 Internship Listings</h4>
                    <p>Alumni can post internship and job opportunities from their companies, making it easier for students to find relevant positions.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="feature-card p-4">
                    <h4 className="mb-3">🎓 Student Profiles</h4>
                    <p>Students can create comprehensive profiles with their resumes, making it easy to apply for positions with just one click.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="feature-card p-4">
                    <h4 className="mb-3">🤝 Direct Connection</h4>
                    <p>Connect directly with alumni from your institution who understand your background and can provide valuable insights.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="feature-card p-4">
                    <h4 className="mb-3">📄 Resume Management</h4>
                    <p>Upload and manage your resume seamlessly, and apply to multiple opportunities without the hassle of repeated uploads.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="about-content">
                <h2 className="mb-4">For Students</h2>
                <p className="text-justify">
                  As a student, InternDiary gives you access to curated internship opportunities posted by alumni who want 
                  to help students from their alma mater. Browse through listings, apply with your profile, and track your 
                  applications all in one place. Build your professional network while searching for the perfect internship 
                  that aligns with your career goals.
                </p>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="about-content">
                <h2 className="mb-4">For Alumni</h2>
                <p className="text-justify">
                  As an alumnus, you have the power to make a difference in students' lives by sharing internship opportunities 
                  from your company or network. Post openings, review applications, and connect with talented students who 
                  are eager to learn and grow. Give back to your institution and help shape the next generation of professionals.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default About
