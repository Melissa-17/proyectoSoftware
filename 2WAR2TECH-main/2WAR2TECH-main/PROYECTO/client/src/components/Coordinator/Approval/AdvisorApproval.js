import React, { useState, useEffect } from "react";
import CreateNewUserPageStudent from "#Pages/CreateNewUserPage/Student";
import "../../../assets/styles/Coordinador/Approval/AdvisorApproval.css";
import InitialPartApproval from "./InitialPartApproval";
import AdviserPart from "./AdviserPart";
import ModalCambio from "./ModalCambio";
import { axiosPatchThesis } from "#API/Thesis";
import ModalComment from "../ModalsApproval/ModalComment";
import ModalExito from "./ModalExito.js";
import { axiosPatchCommentProposedThesis } from "#API/Thesis";
import { useNavigate } from "react-router";

export default function AdvisorApproval() {
  const JWTtoken = sessionStorage.getItem("token");
  const [cambiarEstado, setcambiarEstado] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [nuevoEstado, setnuevoEstado] = useState("NO ESTADO");
  const [confirmacion, setconfirmar] = useState(false);
  const [botonaceptar, settriggerboton] = useState(false);
  const [idtesis, setidtesis] = useState();
  const [statustesis, setstatustesis] = useState();

const navigate = useNavigate();
const goToRegister = () =>{
  navigate("/Coordinador/registrar-tema");
}

  const ejecutarAxios = (accion) => {
    const body = {
      thesisId: idtesis,
      status: accion,
      originalStatus: statustesis,
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
    <div className="contenedorAdvisorApprovalTodo">
      <CreateNewUserPageStudent />

      <div className="contenedorAdvisorApprovalPantalla">
        <div className="encabezadoApproval">
          <div className="tituloEncabezadoApproval">
            <h1>APROBACIONES DE TEMAS</h1>
          </div>
          <hr color="black" className="lineaContenidoApproval" />
        </div>

        <div className="ParteInicialApproval">
          <InitialPartApproval />
        </div>
        <div className="registerTheme">
          <div className="nametag">
            <i class="bi bi-info-circle"></i>
            <p>
              ¿Desea registrar un tema de tesis? Presione el botón{" "}
              <strong>
                <i>Registrar</i>.
              </strong>
            </p>
          </div>
          <button onClick={goToRegister}>Registrar</button>
        </div>
        <div className="ParteAsesor">
          <AdviserPart
            cambioEstado={setcambiarEstado}
            nuevoEstado={setnuevoEstado}
            setidtesis={setidtesis}
            setOpenCommentModal={setOpenCommentModal}
            setstatustesis={setstatustesis}
          />
        </div>
      </div>
      <div>
        {/* {console.log("ingresara al modal : "+cambiarEstado)}*/}
        {/* {console.log("el nuevo estado : "+nuevoEstado)}  */}
        {/* {console.log("Comentario ingresado por el submint:  "+comentario)}  */}

        {
          cambiarEstado&&nuevoEstado!="EN OBSERVACIÓN"&&nuevoEstado!="NO ESTADO"&&<ModalCambio
            closeAlert={setcambiarEstado}
            NuevoEstado={nuevoEstado}    
            ejecutarAxios={ejecutarAxios}
          />
        }
        {
          confirmacion&&nuevoEstado!="NO ESTADO"&&<ModalExito 
          closeMessage={setconfirmar} 
          message={"Se ha cambiado el estado con éxito."}
          />
        }
         
        {cambiarEstado&& openCommentModal &&  nuevoEstado=="EN OBSERVACIÓN"&&nuevoEstado!="NO ESTADO"&&(
          <ModalComment
          closeMessage={setOpenCommentModal}
          NuevoEstado={nuevoEstado}    
          ejecutarAxios={ejecutarAxios}  
          botonaceptar={setconfirmar}  
          thesisId={idtesis}
          />
      )}
      
      
      </div>
    </div>
  );
}
