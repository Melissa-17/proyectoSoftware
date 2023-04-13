import React, { useEffect, useState } from "react";
import HeaderDetailApproval from "./HeaderDetailApproval";
import "#Styles/Coordinador/DetailApproval/EditDetail/DetailApproval.css";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import FirstPart from "./FirstPart";
import SecondPart from "./SecondPart";
import FourthPart from "./FourthPart";
import FifthPart from "./FifthPart";
import { Navigate, useLocation, useNavigate } from "react-router";
import { axiosGetThesisDetails } from "#API/Thesis";
import { axiosEditThesis } from "#API/Thesis";
import ModalsAlert from "../../../Modals/ModalsAlert";


export default function DetailApproval() {
  const location = useLocation();
  const { thesis } = location.state;

  const [cambio, setCambio] = useState(false);
  // const [thesis, setThesis] = useState(null);
  const JWTtoken = sessionStorage.getItem("token");
  const [openCommentModal,setOpenCommentModal] = useState(false);
  const [modalMensaje,setModalMensaje] = useState(false);
  const [modalMensajeAlumno,setModalMensajeAlumno] = useState(false);

  const [newTheme, setNewTheme] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [cancel, setCancel] = useState(false);

  const navigate = useNavigate();
  // const getThesisDetail = () => {
  //   axiosGetThesisDetails(JWTtoken, thesisData.id)
  //     .then((response) => {
  //       const data = response.data || [];
  //       console.log(data);
  //       setThesis(data);
  //     })
  //     .catch((error) => {
  //       console.error(`Error: ${error}`);
  //     });
  // };

  // useEffect(() => {
  //   getThesisDetail();
  // }, [cambio, openCommentModal, modalMensajeAlumno, modalMensaje]);

  const actualizarDetallesThesis = () =>{
    const body={
      'tema': newTheme!=''?newTheme:thesis.title,
      'objective':newObjective!=''?newObjective:thesis.objective,
      'area':newArea!=''?newArea:thesis.areaName,
      'description':newDescription!=''?newDescription:thesis.description
    }
     axiosEditThesis(JWTtoken, thesis.id, body)
     .then((response)=>{
       console.log(response);
     })
     .catch((error)=>{
       console.error(`Error: ${error}`);
     })
     navigate('/asesor-approval');
  }

  const retroceder = ()=>{
    navigate('/asesor-approval/detail',{
      state:{
        thesisData:thesis
      }
    });
  }

  return (
    <div className="contenedorGlobalDetailApproval">
      <CreateNewUserPageStudent />
      <div className="contenedorDetailApproval">
        <div className="HeaderDetailApproval">
          <HeaderDetailApproval thesisId={thesis.id}
          save={setConfirmation}
          cancel={setCancel}/>
        </div>
        {thesis ? (
          <div>
            <div className="PrimeraParte">
              <FirstPart thesis={thesis} 
              openCommentModal={openCommentModal} setOpenCommentModal={setOpenCommentModal} 
              cambio={cambio} setCambio={setCambio} thesisData={thesis}
              setModalMensaje={setModalMensaje}
              setModalMensajeAlumno={setModalMensajeAlumno}
              setNewTheme={setNewTheme}
              setNewObjective={setNewObjective}
              setNewArea={setNewArea}
              />
            </div>
            <div className="SegundaParte">
              <SecondPart thesis={thesis} 
              setNewDescription={setNewDescription}/>
            </div>
             
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {
        confirmation && <ModalsAlert closeAlert = {setConfirmation}
        alertText='¿Desea guardar todas las modificaciones?'
        action={actualizarDetallesThesis}/>
      }
      {
        cancel && <ModalsAlert closeAlert = {setCancel}
        alertText='¿Seguro que desea salir sin guardar los cambios?'
        action={retroceder}/>
      }
    </div>
  );
}
