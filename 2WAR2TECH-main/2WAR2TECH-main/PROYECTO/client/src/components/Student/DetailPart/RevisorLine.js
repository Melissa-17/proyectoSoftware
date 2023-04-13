import React from "react";
import { useNavigate } from "react-router";

import "#Styles/Student/DetailPart/RevisorModal.css";

function RevisorLine(props) {
  const {
    revisorId,
    revisorName,
    revisorRol,
    valor,
    opcion,
    studAssignment,
    revisor,
    cxsid,
    index,
    courseName,
  } = props;
  const navigate = useNavigate();
  const rubricaClic = () => {
    navigate(`/rubrica/${valor}/${opcion}/${revisorId}`, {
      state: {
        assignment: studAssignment,
        revisorName: revisorName,
        revisorRol: revisorRol,
        index: index,
        cxsid: cxsid,
        courseName: courseName,
      },
    });
  };
  console.log(revisorName);
  console.log(revisorRol);
  return (
    <div className="revisorLine">
      <button onClick={rubricaClic}>
        <p>
          {revisorName} - {revisorRol}
        </p>
      </button>
      <hr color="black" className="lineaRevModal" />
    </div>
  );
}

export default RevisorLine;
