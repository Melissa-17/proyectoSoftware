import React, { useEffect, useState } from "react";
import HeaderDetailApproval from "./HeaderDetailApproval";
import "../../../assets/styles/Coordinador/DetailApproval/DetailApproval.css";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import FirstPart from "./FirstPart";
import SecondPart from "./SecondPart";
import ThirdPart from "./ThirdPart";
import FourthPart from "./FourthPart";
import FifthPart from "./FifthPart";
import { Navigate, useLocation, useNavigate } from "react-router";
import { axiosGetThesisDetails } from "#API/Thesis";
import { axiosEditThesis } from "../../../api/Thesis";
import ModalComment from "../ModalsApproval/ModalComment";
import { GridLoader } from "react-spinners";
import { axiosPatchThesis } from "#API/Thesis";

import ModalCambio from "../../Coordinator/Approval/ModalCambio";
import ModalExito from "../../Coordinator/Approval/ModalExito";
export default function DetailApproval() {
  const location = useLocation();
  const { thesisData } = location.state;

  const [cambio, setCambio] = useState(false);
  const [thesis, setThesis] = useState(null);
  const JWTtoken = sessionStorage.getItem("token");
  const [openCommentModal,setOpenCommentModal] = useState(false);
  const [modalMensaje,setModalMensaje] = useState(false);
  const [modalMensajeAlumno,setModalMensajeAlumno] = useState(false);
  const navigate = useNavigate();
  const [modalAsesor, setModalAsesor] = useState(false);
  const [modalAlumno, setModalAlumno] = useState(false);

  const [modalMensaje2, setModalMensaje2] = useState(false);
  const [modalMensajeAlumno2, setModalMensajeAlumno2] = useState(false);

  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  const [modalAlertaAlumno, setModalAlertaAlumno] = useState(false);
  const [modalConfirmacionAlumno, setModalConfirmacionAlumno] = useState(false);

  const [cambiarEstado,setCambioEstado]=useState(false);
  const [confirmacion,setconfirmar]=useState(false);
  const [nuevoEstado,setnuevoEstado]=useState("NO ESTADO");
  const [isLoading, setIsLoading] = useState(true);

  const getThesisDetail = () => {
    setIsLoading(true);
    axiosGetThesisDetails(JWTtoken, thesisData.id)
      .then((response) => {
        const data = response.data || [];
        console.log(data);
        setThesis(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getThesisDetail();
  }, [modalMensajeAlumno, modalMensaje,confirmacion, modalConfirmacion, modalConfirmacionAlumno, modalMensaje2, modalMensajeAlumno2]);
  

  const goEdit = () =>{
    navigate('/asesor-approval/detail/edit',{
      state:{
        thesis:thesis
      }
    });
  }
  const ejecutarAxios = (accion) => {
    const body = {
      thesisId: thesis.id,
      status: accion,
      originalStatus: thesis.status,
    };

    axiosPatchThesis(JWTtoken, body)
      .then((response) => {
        setconfirmar(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  return (
    <div className="contenedorGlobalDetailApproval">
      <CreateNewUserPageStudent />
      <div className="contenedorDetailApproval">
        <div className="HeaderDetailApproval">
          <HeaderDetailApproval thesisId={thesisData.id}
          goEdit={goEdit}/>
        </div>
        {
          isLoading ? 
          <GridLoader
          className="mx-auto"
          color="#042354"
          loading={isLoading}
          size={24}
        /> 
        :
        thesis ? (
          <div>
            <div className="PrimeraParte">
              <FirstPart thesis={thesis} 
              setnuevoEstado={setnuevoEstado}  

              openCommentModal={openCommentModal} setOpenCommentModal={setOpenCommentModal} 
              cambio={cambio} setCambio={setCambio} thesisData={thesisData}
              setModalMensaje={setModalMensaje}
              setModalMensajeAlumno={setModalMensajeAlumno}
              modalAsesor={modalAsesor}
              setModalAsesor={setModalAsesor}
              modalAlumno={modalAlumno} 
              setModalAlumno={setModalAlumno}
              modalMensaje2={modalMensaje2} 
              setModalMensaje2={setModalMensaje2}
              modalMensajeAlumno2={modalMensajeAlumno2}
              setModalMensajeAlumno2={setModalMensajeAlumno2}
              modalAlerta={modalAlerta}
              setModalAlerta={setModalAlerta}
              modalConfirmacion={modalConfirmacion}
              setModalConfirmacion={setModalConfirmacion}
              modalAlertaAlumno={modalAlertaAlumno}
              setModalAlertaAlumno={setModalAlertaAlumno}
              modalConfirmacionAlumno={modalConfirmacionAlumno}
              setModalConfirmacionAlumno={setModalConfirmacionAlumno}
              />
            </div>
            <div className="SegundaParte">
              <SecondPart thesis={thesis} />
            </div>
            {/* <div className="TerceraParte">
              <ThirdPart thesis={thesis} />
            </div> */}
            <div className="CuartaParte">
              <FourthPart thesis={thesis} />
            </div>
            <div className="QuintaParte">
              <FifthPart thesis={thesis} />
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {
          cambio&&nuevoEstado!="EN OBSERVACIÓN"&&nuevoEstado!="NO ESTADO"&&<ModalCambio
            closeAlert={setCambio}
            NuevoEstado={nuevoEstado}    
            ejecutarAxios={ejecutarAxios}
          />
        }
        {
          confirmacion&&nuevoEstado!="NO ESTADO"&&<ModalExito 
          closeMessage={setconfirmar} 
          message={"Se ha cambiado el estado con éxito"} 
          />
        }
        {cambio&& openCommentModal &&  nuevoEstado=="EN OBSERVACIÓN"&&nuevoEstado!="NO ESTADO"&&(
          <ModalComment
          closeMessage={setOpenCommentModal}
          NuevoEstado={nuevoEstado}    
          ejecutarAxios={ejecutarAxios}  
          botonaceptar={setconfirmar}  
          thesisId={thesisData.id}
          />
      )}
      </div>
    </div>
  );
}
