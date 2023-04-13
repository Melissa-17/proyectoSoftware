import React from "react";
import "../../../assets/styles/Student/InfoPresentation/FinalPart.css";
import FeedbackRow from "./FeedbackRow";

export default function FinalPart(props) {
  return (
    (props.assign && props.assign.studentAssignment) ? 
    <div className="FinalPart">
      <div className="titulo-feedback">
        <img
          className="icon"
          src="https://cdn-icons-png.flaticon.com/512/17/17004.png"
          alt="Feedbacks icon"
        />
        <p className="feedback-message">Retroalimentación</p>
      </div>
      <div className="work-area">
        <FeedbackRow
          img="https://www.ashoka.org/sites/default/files/styles/medium_1600x1000/public/thumbnails/images/daniela-kreimer.jpg?itok=R89tVtb4"
          name="Mariel Espillico"
          assign={props.assign}
        />
      </div>
    </div>
    : null
  );
}
