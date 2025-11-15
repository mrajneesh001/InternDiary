import React from 'react'

import Studentitem from "./Studentitem";
const Studentlist = (props) => {
    const { studentsenrolled,showPdf } = props;
    const students = studentsenrolled;

    return (
        <>
            <div className="row my-0 d-flex justify-content-around">
               
                <div className="container mx-2 my-1">
                    {students?.length === 0 && 'No Applicants to display'}
                </div>

                {students?.map((student, index) => {
                    return <Studentitem key={index} showPdf={showPdf} student={student} />
                })}
            </div>
        </>
    )
}

export default Studentlist
