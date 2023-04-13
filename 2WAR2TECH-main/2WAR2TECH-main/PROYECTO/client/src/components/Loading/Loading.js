import React, { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import '#Styles/Loading/Loading.css';

function Loading( ) {
  
  return (
    <div className="mainLoader">
      <ClimbingBoxLoader
        color={"#042354"}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;

