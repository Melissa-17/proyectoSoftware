import React from "react";
import "#Styles/Student/Presentation/DatesInfo.css";

function DatesInfo(props) {
  const {message} = props;
  return (
    <div className="infoContainer">
      <i class="bi bi-info-circle fa-2x"></i>
      <p>
        {message}
      </p>
    </div>
  );
}

export default DatesInfo;
