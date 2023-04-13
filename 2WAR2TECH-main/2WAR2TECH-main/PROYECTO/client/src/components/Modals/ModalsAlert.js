import React, { useEffect, useState } from "react";
import { axiosDeleteAssignment } from "../../api/AssignmentStudent";
import "./ModalsAlert.css";
import ModalsMessage from "./ModalsMessage";
import { axiosDeleteCourse } from "#API/Cursos";
import {axiosDeleteHorario, axiosDeleteProfessor} from "#API/horario";
import {axiosDeleteJury} from '#API/User';



function ModalsAlert(props) {
  // const [openMessage, setOpenMessage] = useState(false);
  const { closeAlert, alertText, messageText, action, item, estado, setEstado, setFileList, fileList, closeMensaje,
    deleteAssignList, setDeleteAssignList, source, navigateFunc,
    deleteList, setDeleteList, setModoChecked, otherModal, setLoadDelete,
  setConfirmAdd, setConfirmDelete, setLoadAdd } = props;
  const JWTtoken = sessionStorage.getItem("token");
  // console.log(deleteAssignList);
  useEffect(() => {

  }, [setEstado, setFileList, fileList])

  return (
    <div className="modalAlertBackground">
      <div className="modalAlertContainer">
        <div className="MAbody">
          {props.num}
          <div className="MAalert">
            <i class="bi bi-question-circle"></i>
            <p className="MAdescripcionTexto">{alertText}</p>
          </div>
          <div className="MAfooter">
            <button
              className="MAaccept"
              onClick={() => {


                if (source == 'CRONOGRAMA') {
                  // console.log(deleteAssignList);
                  setLoadDelete(true);
                  deleteAssignList.map((id) => {
                    axiosDeleteAssignment(JWTtoken, id)
                    .then((res) => {
                      console.log(res);
                      setLoadDelete(false);
                      closeMensaje ? closeMensaje(true) : (()=>{})();
                    })
                    .catch((err) => {
                      console.error(err);
                    })
                    console.log(id);
                  })
                   
                  setDeleteAssignList([]);

                  closeAlert(false);
                  setModoChecked(false);
                  
                  
                } else if (source == 'Alumno-ListaDeTemas') {
                  closeAlert(false);
                  action();
                } else if (source == 'CURSO'){
                  deleteList.map((id) => {
                    axiosDeleteCourse(JWTtoken, id)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    })
                    console.log(id);
                  })
                   
                  setDeleteList([]);

                  closeAlert(false);
                  closeMensaje ? closeMensaje(true) : (()=>{})();  
                } else if (source == 'HORARIO'){
                  deleteList.map((id) => {
                    axiosDeleteHorario(JWTtoken, id)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    })
                    console.log(id);
                  })
                   
                  setDeleteList([]);

                  closeAlert(false);
                  closeMensaje ? closeMensaje(true) : (()=>{})();  
                } 
                else if (source == 'ASESOR'){
                  deleteList.map((id) => {
                    axiosDeleteProfessor(JWTtoken, id)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    })
                    console.log(id);
                  })
                   
                  setDeleteList([]);

                  closeAlert(false);
                  closeMensaje ? closeMensaje(true) : (()=>{})();  
                } 
                else if (source == 'PROFESOR'){
                  deleteList.map((id) => {
                    axiosDeleteProfessor(JWTtoken, id)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    })
                    console.log(id);
                  })
                   
                  setDeleteList([]);

                  closeAlert(false);
                  closeMensaje ? closeMensaje(true) : (()=>{})();  
                } 
                else if (source == 'JURADO'){
                  deleteList.map((id) => {
                    axiosDeleteJury(JWTtoken, id)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    })
                    console.log(id);
                  })
                   
                  setDeleteList([]);

                  closeAlert(false);
                  closeMensaje ? closeMensaje(true) : (()=>{})();  
                } 
                else {

                  closeMensaje ? closeMensaje(true) : (()=>{})();
                  closeAlert ? closeAlert(false) : (()=>{})();

                  action  ? action(item): (()=>{})();
                  setEstado ? setEstado(!estado) : (()=>{})();
                  navigateFunc ? navigateFunc() : (()=>{})();
                  setFileList ? setFileList([]) : (()=>{})();  
                  otherModal ? otherModal(true) : (()=>{})();  
                  
                }
                
                // refreshData();
              }}
            >
              Aceptar
            </button>
            {/* {closeMensaje && (
              <ModalsMessage
                closeMessage={closeMensaje}
                message={messageText}
              />
            )} */}
            <button className="MAcancel" onClick={() => closeAlert(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalsAlert;
