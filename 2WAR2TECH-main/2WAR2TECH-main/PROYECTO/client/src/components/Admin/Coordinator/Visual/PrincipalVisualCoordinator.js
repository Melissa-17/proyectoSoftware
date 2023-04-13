import React from "react";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import Header from "./Header";
import { useLocation } from "react-router";
import "../../../../assets/styles/Admin/Coordinator/Register/PrincipalRegister.css";
import CardEspecialidad from "./CardEspecialidad";
import { useNavigate } from "react-router";

export default function PrincipalVisualCoordinator() {
  const { coordinadorItem } = useLocation().state;
  const navigate = useNavigate();
  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorPrincipalVisualCoordinator">
        <div className="headerPrincipalVisualCoordinator">
          <Header />
        </div>
        <div className="contenedorEditarCoordinadorVisualCoordinator">
          <button className="editarCoordinadorVisualCoordinator"
          onClick={()=>{
            navigate("/coordinator/edit",{
              state:{
                coordinadorItem:coordinadorItem,
                option:2,
              }
            });
          }}
          >
            Editar Coordinador
          </button>
        </div>
        {/* <p className="leyenda">Leyenda: Los campos con * son obligatorios</p> */}
        <div className="contenedorInfoCoordinador">
          <div className="nombreCambioPrincipalRegister">
            <p>Nombres</p>
            <p className="nombre">
              {coordinadorItem && coordinadorItem.name
                ? coordinadorItem.name
                : "No tiene un nombre"}
            </p>
          </div>

          <div className="primeraFilaInfoCambioPrincipalRegister">
            <div className="apellidoPCambioPrincipalRegister">
              <p>Apellido Paterno</p>
              <p className="apellidoPaterno">
                {coordinadorItem && coordinadorItem.fLastName
                  ? coordinadorItem.fLastName
                  : "No tiene apellido paterno"}
              </p>
            </div>
            <div className="apellidoMCambioPrincipalRegister">
              <p>Apellido Materno</p>
              <p className="apellidoMaterna">
                {coordinadorItem && coordinadorItem.mLastName
                  ? coordinadorItem.mLastName
                  : "No tiene apellido materno"}
              </p>
            </div>
          </div>

          <div className="segundaFilaInfoCambioPrincipalRegister">
            <div className="correoPUCPCambioPrincipalRegister">
              <p>Correo PUCP</p>
              <p className="correoPUCP">
                {coordinadorItem && coordinadorItem.email
                  ? coordinadorItem.email
                  : "No tiene correo PUCP"}
              </p>
            </div>
            <div className="codigoPUCPCambioPrincipalRegister">
              <p>Código PUCP</p>
              <p className="codigoPUCP">
                {coordinadorItem && coordinadorItem.idPUCP
                  ? coordinadorItem.idPUCP
                  : "No tiene código PUCP"}
              </p>
            </div>
          </div>

          <div className="contenedorEspecialidaPrincipalVisualCoordinator">
            <p>ESPECIALIDADES</p>
            {console.log(coordinadorItem)}
            {coordinadorItem && coordinadorItem.SPECIALTies && coordinadorItem.SPECIALTies.length>0
              ? coordinadorItem.SPECIALTies.map((especialidadItem, index) => {
                  return (
                    <div key={index} className="espaciadoDeliverable">
                      <CardEspecialidad especialidadItem={especialidadItem} />
                    </div>
                  );
                })
              :
              <div className="noContieneEspecialidad">
                <p>No contiene una especialidad asignada</p>
              </div>
              }
          </div>
        </div>
      </div>
    </div>
  );
}
