import React from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../SidebarMenu/Navbar";

function AsesorDetalle() {
  const { asesorItem } = useLocation().state;
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/Coordinador/asesores");
  };

  return (
    <div>
      <Navbar />
      <div className="contenedorPrincipalVisualCoordinator">
        <div className="headerPrincipalVisualCoordinator">
          <div className="contenedorHeaderRegisterCoordinatorAdmin">
            <div className="primeraLineaHeaderRegisterCoordinatorAdmin">
              <div
                className="contenedoRegisterCoordinatorTituloFacultyAdmin"
                style={{ marginRight: "540px" }}
              >
                <p className="facultad" style={{ marginTop: "10px" }}>
                  DETALLE DE ASESOR
                </p>
              </div>
              <div className="retrocederHeaderRegisterCoordinator">
                <button
                  onClick={retrocesoClic}
                  className="botonRetrocesoDetalle"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                    className="imagenRetrocesoDetalle"
                  />
                </button>
              </div>
            </div>

            <div>
              <hr
                color="black"
                className="lineaRegisterCoordinatorHorizontalFacultyAdmin"
              />
            </div>
          </div>
        </div>
        <div className="contenedorInfoCoordinador">
          <div className="nombreCambioPrincipalRegister">
            <p>Nombres</p>
            <p className="nombre">
              {asesorItem && asesorItem.name
                ? asesorItem.name
                : "No tiene un nombre"}
            </p>
          </div>

          <div className="primeraFilaInfoCambioPrincipalRegister">
            <div className="apellidoPCambioPrincipalRegister">
              <p>Apellido Paterno</p>
              <p className="apellidoPaterno">
                {asesorItem && asesorItem.fLastName
                  ? asesorItem.fLastName
                  : "No tiene apellido paterno"}
              </p>
            </div>
            <div className="apellidoMCambioPrincipalRegister">
              <p>Apellido Materno</p>
              <p className="apellidoMaterna">
                {asesorItem && asesorItem.mLastName
                  ? asesorItem.mLastName
                  : "No tiene apellido materno"}
              </p>
            </div>
          </div>

          <div className="segundaFilaInfoCambioPrincipalRegister">
            <div className="correoPUCPCambioPrincipalRegister">
              <p>Correo PUCP</p>
              <p className="correoPUCP">
                {asesorItem && asesorItem.email
                  ? asesorItem.email
                  : "No tiene correo PUCP"}
              </p>
            </div>
            <div className="codigoPUCPCambioPrincipalRegister">
              <p>Código PUCP</p>
              <p className="codigoPUCP">
                {asesorItem && asesorItem.idPUCP
                  ? asesorItem.idPUCP
                  : "No tiene código PUCP"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsesorDetalle;
