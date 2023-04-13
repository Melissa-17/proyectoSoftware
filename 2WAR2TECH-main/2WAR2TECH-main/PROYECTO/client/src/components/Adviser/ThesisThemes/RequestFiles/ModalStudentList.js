import React from "react";
import "#Styles/Adviser/ThesisThemes/RequestFiles/ModalStudentList.css";


function ModalStudentList(props) {
  const {closeModal, studentList} = props;
  console.log(studentList);


  return (
    <div className="modalBackgroundSL">
      <div className="studentList">
        <div className="SLHeader">
          <h4 className="modalTitle">Lista de estudiantes</h4>
          <button className="titleCloseBtn" onClick={() => closeModal(false)}>
            X{" "}
          </button>
        </div>
        <div className="fila">
          <hr color="black" className="lineaContenido" />
        </div>
        <div className="contenedorlistado">
          {studentList.map((e) => {
            return (
            <div>
            <p>
              {e
                ? e.name +
                  " " +
                  e.fLastName +
                  " " +
                  e.mLastName
                : "No tiene nombre"}
            </p>
          </div>)
          })}
          {/* {(studentList.length === 1) ? (
            <div>
              <p>
                {studentList[0]
                  ? studentList[0].name +
                    " " +
                    studentList[0].fLastName +
                    " " +
                    studentList[0].mLastName
                  : "No tiene nombre"}
              </p>
            </div>
          ) : (
            <div>
              <p>
                {studentList[0]
                  ? studentList[0].name +
                    " " +
                    studentList[0].fLastName +
                    " " +
                    studentList[0].mLastName
                  : "No tiene nombre"}
              </p>
              <p>
                {studentList[1]
                  ? studentList[1].name +
                    " " +
                    studentList[1].fLastName +
                    " " +
                    studentList[1].mLastName
                  : "No tiene nombre"}
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ModalStudentList;
